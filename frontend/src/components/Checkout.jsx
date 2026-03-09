import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService, cartService } from '../services/api';
import { CreditCard, Truck, CheckCircle, Loader } from 'lucide-react';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  if (!isAuthenticated) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="auth-required">
            <p>Please log in to proceed with checkout</p>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="empty-cart">
            <p>Your cart is empty. Add items before checkout.</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              Back to Menu
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create order with payment method
      const response = await orderService.create(user.id, notes);
      const order = response.data;

      // Clear cart after successful order
      await cartService.clear(user.id).catch(() => {});
      clearCart();

      setOrderData(order);
      setOrderSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess && orderData) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">
              <CheckCircle size={64} strokeWidth={1} />
            </div>
            <h2>Order Confirmed!</h2>
            <p className="order-number">Order #{orderData.orderNumber}</p>
            <div className="order-details">
              <div className="detail-row">
                <span>Total Amount:</span>
                <span className="amount">${orderData.totalAmount.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span>Payment Method:</span>
                <span>Cash on Delivery</span>
              </div>
              <div className="detail-row">
                <span>Status:</span>
                <span className="status-badge">{orderData.status}</span>
              </div>
              <div className="detail-row">
                <span>Items:</span>
                <span>{orderData.items?.length} items</span>
              </div>
            </div>
            <p className="confirmation-message">
              Your order has been placed successfully! You will receive your order soon.
            </p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => navigate('/orders')}>
                View My Orders
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/menu')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="container">
        <div className="checkout-header">
          <p className="checkout-label">Almost There</p>
          <h2 className="section-title">Checkout</h2>
        </div>

        <div className="checkout-layout">
          {/* Order Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item._id} className="summary-item">
                  <div>
                    <p className="item-name">{item.productName}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleCheckout}>
              {/* User Info */}
              <div className="form-section">
                <h4>Delivery Information</h4>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={user?.fullName} disabled />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user?.email} disabled />
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h4>Payment Method</h4>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="CASH_ON_DELIVERY"
                      checked={paymentMethod === 'CASH_ON_DELIVERY'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-info">
                      <Truck size={20} />
                      <div>
                        <p className="payment-title">Cash on Delivery</p>
                        <p className="payment-desc">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="form-section">
                <h4>Special Instructions (Optional)</h4>
                <textarea
                  placeholder="E.g., No sugar in coffee, extra napkins, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                />
              </div>

              {/* Terms */}
              <div className="form-section terms">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the terms and conditions</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-large"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={18} className="spinner" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Place Order - ${(total * 1.1).toFixed(2)}
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
