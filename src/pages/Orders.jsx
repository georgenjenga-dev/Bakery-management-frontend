import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import './Order.css';

const rawUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://bakery-management-backend.onrender.com';
const API_BASE_URL = rawUrl.replace(/\/+$/, '').replace(/\/api$/, '');


const Order = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    deliveryAddress: '',
    phoneNumber: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    message: '',
    type: '', // 'success' | 'error' | 'info'
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stk');
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  const PAYBILL_NUMBER = '522522';
  const WHATSAPP_NUMBER = '254769021360';

  if (cartItems.length === 0) {
    return (
      <div className="order-page">
        <div className="order-empty">
          <div className="order-empty-icon"></div>
          <h2>No items to order</h2>
          <p>Your cart is empty. Add some cakes first!</p>
          <button className="btn-browse" onClick={() => navigate('/products')}>
            Browse Cakes
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, email, deliveryAddress, phoneNumber } = formData;
    if (!fullName.trim()) return 'Full name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Valid email is required';
    if (!deliveryAddress.trim()) return 'Delivery address is required';
    if (!phoneNumber.trim() || !/^(0|\+?254)?[71]\d{8}$/.test(phoneNumber.replace(/\s/g, '')))
      return 'Valid M-Pesa phone number is required (e.g., 0712345678)';
    return null;
  };

  const formatPhone = (phone) => {
    let cleaned = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.slice(1);
    if (!cleaned.startsWith('254')) cleaned = '254' + cleaned;
    return cleaned;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus({ loading: false, message: error, type: 'error' });
      return;
    }

    setStatus({ loading: true, message: 'Initiating M-Pesa payment...', type: 'info' });

    const orderPayload = {
      customer_name: formData.fullName,
      customer_email: formData.email,
      customer_phone: formatPhone(formData.phoneNumber),
      delivery_address: formData.deliveryAddress,
      items: cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      total_amount: totalPrice,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/stk-push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initiation failed');
      }

      setStatus({
        loading: true,
        message: 'STK Push sent! Check your phone and enter M-Pesa PIN...',
        type: 'info',
      });

      // Poll for payment status
      pollPaymentStatus(data.checkout_request_id);

    } catch (err) {
      setStatus({
        loading: false,
        message:
          err.message.includes('Unable to connect') ||
          err.message.includes('M-Pesa')
            ? 'Unable to connect to M-Pesa at the moment. You can alternatively pay using the "Pay with Paybill" option below.'
            : err.message || 'Something went wrong. Please try again.',
        type: 'error',
      });
    }
  };

  const pollPaymentStatus = async (checkoutRequestId) => {
    let attempts = 0;
    const maxAttempts = 30; // ~2.5 minutes

    const interval = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(interval);
        setStatus({
          loading: false,
          message: 'Payment confirmation timed out. Please check your M-Pesa messages.',
          type: 'error',
        });
        setPaymentStatus('Pending');
        return;
      }

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/payments/status/${checkoutRequestId}`
        );
        const result = await res.json();

        if (result.status === 'Paid') {
          clearInterval(interval);
          setPaymentStatus('Paid');
          setStatus({
            loading: false,
            message: 'Payment successful! Your order has been placed.',
            type: 'success',
          });
          clearCart();
          setTimeout(() => navigate('/products'), 4000);
        } else if (result.status === 'Cancelled') {
          clearInterval(interval);
          setPaymentStatus('Cancelled');
          setStatus({
            loading: false,
            message: 'Payment was cancelled or failed.',
            type: 'error',
          });
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 5000);
  };

  return (
    <div className="order-page">
      <div className="order-container">
        <h1 className="order-title">Checkout</h1>

        <div className="order-content">
          {/* Order Items */}
          <div className="order-items-section">
            <h2>Order Items</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.image_url || item.image || '/placeholder-cake.jpg'} alt={item.name} />
                  </div>
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total-row">
              <span>Total Amount</span>
              <span className="order-total-amount">KES {totalPrice.toLocaleString()}</span>
            </div>

            <div className="payment-status-row">
              <span>Payment Status:</span>
              <span className={`status-badge status-${paymentStatus.toLowerCase()}`}>
                {paymentStatus}
              </span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            {!showCheckout ? (
              <div className="payment-intro">
                <div className="payment-icon"></div>
                <h3>Ready to pay?</h3>
                <p>Click below to complete your order. You can pay via M-Pesa STK Push or Paybill.</p>
                <button
                  className="btn-pay-now"
                  onClick={() => setShowCheckout(true)}
                >
                  Pay Now
                </button>

                <div className="whatsapp-enquiry-wrapper">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Sweet%20delicacy%20Bakery,%20I%20have%20a%20quick%20enquiry%20about%20my%20order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-enquiry"
                  >
                    <span className="whatsapp-icon">...</span> WhatsApp Enquiry
                  </a>
                </div>
              </div>
            ) : (
              <div className="checkout-wrapper">
                <div className="payment-method-selector">
                  <button
                    type="button"
                    className={`method-btn ${paymentMethod === 'stk' ? 'method-active' : ''}`}
                    onClick={() => {
                      setPaymentMethod('stk');
                      setStatus({ loading: false, message: '', type: '' });
                    }}
                  >
                    M-Pesa STK Push
                  </button>
                  <button
                    type="button"
                    className={`method-btn ${paymentMethod === 'paybill' ? 'method-active' : ''}`}
                    onClick={() => {
                      setPaymentMethod('paybill');
                      setStatus({ loading: false, message: '', type: '' });
                    }}
                  >
                    Pay with Paybill
                  </button>
                </div>

                {paymentMethod === 'stk' ? (
                  <form className="checkout-form" onSubmit={handlePayment}>
                    <h3>M-Pesa Checkout</h3>

                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Kosh Tullo"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="kosh@gmail.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="deliveryAddress">Delivery Address</label>
                      <textarea
                        id="deliveryAddress"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="20 Ngong Road, Nairobi"
                        rows="3"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="0769000350"
                        required
                      />
                      <small>E.g 0769000350 or +254769000350</small>
                    </div>

                    {status.message && (
                      <div className={`alert alert-${status.type}`}>
                        {status.loading && <span className="spinner"></span>}
                        {status.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-pay-now"
                      disabled={status.loading}
                    >
                      {status.loading ? 'Processing...' : 'Confirm Payment'}
                    </button>

                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setShowCheckout(false);
                        setStatus({ loading: false, message: '', type: '' });
                      }}
                      disabled={status.loading}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="paybill-view">
                    <h3>Pay with Paybill</h3>

                    <div className="paybill-details">
                      <div className="paybill-info-row">
                        <span className="paybill-label">Paybill Number</span>
                        <span className="paybill-value">{PAYBILL_NUMBER}</span>
                      </div>
                      <div className="paybill-info-row">
                        <span className="paybill-label">Account Number</span>
                        <span className="paybill-value">{formData.fullName || 'Your Name'}</span>
                      </div>
                      <div className="paybill-info-row">
                        <span className="paybill-label">Amount</span>
                        <span className="paybill-value">KES {totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="paybill-instructions">
                      <h4>How to pay:</h4>
                      <ol>
                        <li>Go to your M-Pesa menu (Safaricom App or SIM)</li>
                        <li>Select <strong>Lipa na M-Pesa</strong></li>
                        <li>Select <strong>Pay Bill</strong></li>
                        <li>Enter Paybill: <strong>{PAYBILL_NUMBER}</strong></li>
                        <li>Enter Account: <strong>{formData.fullName || 'Your Name'}</strong></li>
                        <li>Enter Amount: <strong>KES {totalPrice.toLocaleString()}</strong></li>
                        <li>Enter M-Pesa PIN and confirm</li>
                      </ol>
                    </div>

                    <div className="paybill-note">
                      <strong>Note:</strong> After completing the payment, please send the
                      M-Pesa confirmation code (e.g. MXXXXX) via WhatsApp so we can
                      verify and process your order quickly.
                    </div>

                    <div className="paybill-actions">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Sweet%20delicasy%20Bakery,%20I%20just%20made%20a%20paybill%20payment%20for%20my%20order.%20Here%20is%20my%20confirmation%20code:%20`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp-send"
                      >
                        <span className="whatsapp-icon">...</span> Send Payment Confirmation on WhatsApp
                      </a>

                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => {
                          setShowCheckout(false);
                          setStatus({ loading: false, message: '', type: '' });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;