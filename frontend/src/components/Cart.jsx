import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, total, removeItem, updateItem, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <div className="container">
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <h2>Your Cart is Empty</h2>
            <p>Discover our handcrafted coffee selection</p>
            <Link to="/menu" className="btn btn-primary">
              Browse Menu <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="container">
        <div className="cart-header">
          <p className="cart-label">Your Selection</p>
          <h2 className="section-title">Cart</h2>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <h4>{item.productName}</h4>
                  <p className="item-price">${item.price}</p>
                </div>

                <div className="item-quantity">
                  <button onClick={() => updateItem(item._id, item.quantity - 1)} aria-label="Decrease">
                    <Minus size={14} />
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button onClick={() => updateItem(item._id, item.quantity + 1)} aria-label="Increase">
                    <Plus size={14} />
                  </button>
                </div>

                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeItem(item._id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
              Checkout <ArrowRight size={14} />
            </button>
            <button className="btn btn-secondary btn-block" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
