import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Clock, MapPin, Phone, Mail, ArrowRight, Leaf, Heart, Star } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-tagline">Est. 2024</p>
          <h1 className="hero-title">
            Crafted with<br />
            <span className="hero-italic">Passion</span>
          </h1>
          <p className="hero-desc">
            Every cup tells a story — from the highlands where our beans are born
            to the gentle hands that craft your perfect brew.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">
              Explore Menu <ArrowRight size={16} />
            </Link>
            <a href="#about" className="btn btn-secondary">Our Story</a>
          </div>
          <div className="hero-info">
            <div className="hero-info-item">
              <Clock size={16} />
              <span>7:00 AM — 9:00 PM</span>
            </div>
            <div className="hero-info-item">
              <MapPin size={16} />
              <span>123 Brew Lane, Downtown</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <p className="about-label">Our Philosophy</p>
              <h2 className="about-title">Where Quality<br />Meets Simplicity</h2>
              <p className="about-desc">
                We believe great coffee doesn't need complexity. It needs care,
                precision, and the finest ingredients sourced from sustainable farms
                around the world. Each bean is hand-selected, each roast perfected.
              </p>
              <div className="about-values">
                <div className="value-item">
                  <div className="value-icon">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h4>Sustainably Sourced</h4>
                    <p>Direct trade partnerships with farms across three continents</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4>Crafted with Care</h4>
                    <p>Small-batch roasting ensures peak flavor in every cup</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">
                    <Star size={20} />
                  </div>
                  <div>
                    <h4>Community First</h4>
                    <p>A gathering place for those who appreciate the finer things</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image-card">
                <Coffee size={80} strokeWidth={1} />
                <p className="about-image-text">Perfection in every pour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambiance Section */}
      <section className="ambiance">
        <div className="container">
          <div className="ambiance-header">
            <p className="ambiance-label">The Experience</p>
            <h2 className="ambiance-title">More Than Just Coffee</h2>
          </div>
          <div className="ambiance-grid">
            <div className="ambiance-card ambiance-card-large">
              <div className="ambiance-card-content">
                <h3>Morning Ritual</h3>
                <p>Start your day with intention. Our sunrise blends are crafted to awaken gently.</p>
              </div>
            </div>
            <div className="ambiance-card">
              <div className="ambiance-card-content">
                <h3>Afternoon Pause</h3>
                <p>A moment of calm in the middle of everything.</p>
              </div>
            </div>
            <div className="ambiance-card">
              <div className="ambiance-card-content">
                <h3>Evening Warmth</h3>
                <p>Wind down with our signature decaf and specialty teas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-label">Visit Us</p>
              <h2 className="contact-title">We'd Love to<br />See You</h2>
              <div className="contact-details">
                <div className="contact-detail">
                  <MapPin size={18} />
                  <div>
                    <p className="detail-primary">123 Brew Lane</p>
                    <p className="detail-secondary">Downtown, NY 10001</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <Phone size={18} />
                  <div>
                    <p className="detail-primary">(555) 123-4567</p>
                    <p className="detail-secondary">Call for reservations</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <Mail size={18} />
                  <div>
                    <p className="detail-primary">hello@brewmaster.com</p>
                    <p className="detail-secondary">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-hours-card">
              <h3>Hours</h3>
              <div className="hours-list">
                <div className="hours-row">
                  <span>Monday — Friday</span>
                  <span>7:00 AM — 9:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Saturday</span>
                  <span>8:00 AM — 10:00 PM</span>
                </div>
                <div className="hours-row">
                  <span>Sunday</span>
                  <span>8:00 AM — 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <Coffee size={20} />
                <span>BrewMaster</span>
              </div>
              <p className="footer-tagline">Crafted with passion since 2024</p>
            </div>
            <div className="footer-links">
              <h4>Navigate</h4>
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/login">Account</Link>
            </div>
            <div className="footer-links">
              <h4>Connect</h4>
              <a href="#contact">Contact</a>
              <a href="#about">Our Story</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BrewMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
