import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import { Package } from 'lucide-react';
import '../styles/Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await orderService.getUserOrders(userId);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <section className="orders-section">
        <div className="container">
          <div className="orders-empty">
            <Package size={48} strokeWidth={1} />
            <p>Please login to view your orders</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-section">
      <div className="container">
        <div className="orders-header">
          <p className="orders-label">Order History</p>
          <h2 className="section-title">My Orders</h2>
        </div>

        {loading ? (
          <div className="loading">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <Package size={48} strokeWidth={1} />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <h3>{order.orderNumber}</h3>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span className="order-item-name">{item.productName}</span>
                      <span className="order-item-qty">×{item.quantity}</span>
                      <span className="order-item-price">${item.subtotal}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total">Total: ${order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
