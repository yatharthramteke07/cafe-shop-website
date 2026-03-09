import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Check } from 'lucide-react';
import '../styles/Menu.css';

const Menu = () => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      alert('Please login first to add items to cart');
      return;
    }
    await addItem(productId, 1);
    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      try {
        const response = await productService.getByCategory(category);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    }
  };

  const categories = ['all', 'coffee', 'breakfast', 'snacks'];

  return (
    <section className="menu-section">
      <div className="container">
        <div className="menu-header">
          <p className="menu-label">Our Collection</p>
          <h2 className="section-title">The Menu</h2>
          <p className="section-subtitle">Handpicked beans, carefully roasted, expertly brewed</p>
        </div>

        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Curating your selection...</div>
        ) : (
          <div className="menu-grid">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="menu-card fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="menu-card-body">
                  <div className="menu-card-top">
                    <h3>{product.name}</h3>
                    {product.badge && <span className="badge">{product.badge}</span>}
                  </div>
                  <p className="menu-card-desc">{product.description}</p>
                </div>
                <div className="menu-card-footer">
                  <span className="price">${product.price}</span>
                  <button
                    className={`btn btn-sm ${addedItems[product._id] ? 'btn-added' : 'btn-primary'}`}
                    onClick={() => handleAddToCart(product._id)}
                    disabled={addedItems[product._id]}
                  >
                    {addedItems[product._id] ? (
                      <><Check size={14} /> Added</>
                    ) : (
                      <><ShoppingBag size={14} /> Add</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
