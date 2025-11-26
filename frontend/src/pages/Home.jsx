import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Mt-Kenya Agro-Loup</h1>
          <p className="hero-subtitle">The Future of Food</p>
          <p className="hero-description">
            A transparent, tech-enabled marketplace that smooths regional supply,
            protects farmer incomes, and delivers fresher produce to consumers
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link to="/farmer-dashboard" className="btn btn-secondary">
              Sell Your Produce
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Direct from Farmers</h3>
            <p>Connect directly with local farmers and get the freshest produce at fair prices</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Transparent Pricing</h3>
            <p>See exactly where your money goes with our transparent pricing system</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Regional Supply</h3>
            <p>Efficient distribution network ensuring smooth regional supply chains</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Fair Income</h3>
            <p>Protecting farmer incomes by eliminating middlemen and ensuring fair compensation</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Fresh Quality</h3>
            <p>Farm-fresh produce delivered to your doorstep at peak freshness</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Tech-Enabled</h3>
            <p>Modern technology making agricultural trade simple and efficient</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Farmers List Products</h3>
            <p>Local farmers upload their available produce with details and pricing</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Buyers Browse</h3>
            <p>Consumers explore available products from verified local farmers</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Direct Purchase</h3>
            <p>Place orders directly with farmers at transparent, fair prices</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Fresh Delivery</h3>
            <p>Receive fresh produce directly from the farm to your location</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join our community of farmers and consumers building a better food system</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn btn-light">
              Start Shopping
            </Link>
            <Link to="/farmer-dashboard" className="btn btn-outline">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
