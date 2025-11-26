import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Mt-Kenya Agro-Loup</h1>
        <p className="tagline">The Future of Food Distribution</p>
      </div>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Mt-Kenya Agro-Loup is a transparent, tech-enabled marketplace designed to revolutionize
            agricultural trade in the Mt Kenya region. We connect farmers directly with consumers,
            smoothing regional supply chains, protecting farmer incomes, and delivering fresher
            produce to families across Kenya.
          </p>
        </div>
      </section>

      <section className="about-section bg-light">
        <div className="about-content">
          <h2>The Problem We're Solving</h2>
          <div className="problems-grid">
            <div className="problem-card">
              <h3>🚜 Middlemen Exploitation</h3>
              <p>Farmers receive unfair prices due to multiple intermediaries taking large cuts.</p>
            </div>
            <div className="problem-card">
              <h3>📉 Price Volatility</h3>
              <p>Lack of market transparency leads to unpredictable pricing and farmer losses.</p>
            </div>
            <div className="problem-card">
              <h3>🥬 Quality Issues</h3>
              <p>Long supply chains result in produce losing freshness before reaching consumers.</p>
            </div>
            <div className="problem-card">
              <h3>📊 Information Gap</h3>
              <p>Farmers lack access to real-time market data and demand information.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Solution</h2>
          <div className="solution-grid">
            <div className="solution-item">
              <div className="solution-icon">🌐</div>
              <h3>Direct Marketplace</h3>
              <p>Connect farmers and consumers directly, eliminating unnecessary intermediaries.</p>
            </div>
            <div className="solution-item">
              <div className="solution-icon">💎</div>
              <h3>Transparent Pricing</h3>
              <p>Clear, fair pricing that benefits both farmers and consumers.</p>
            </div>
            <div className="solution-item">
              <div className="solution-icon">📱</div>
              <h3>Technology-Driven</h3>
              <p>User-friendly platform accessible from any device, anywhere.</p>
            </div>
            <div className="solution-item">
              <div className="solution-icon">🤝</div>
              <h3>Community Building</h3>
              <p>Creating a sustainable ecosystem that supports local agriculture.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section bg-light">
        <div className="about-content">
          <h2>Our Impact</h2>
          <div className="impact-stats">
            <div className="stat">
              <div className="stat-number">100+</div>
              <div className="stat-label">Local Farmers</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">kg Produce Traded</div>
            </div>
            <div className="stat">
              <div className="stat-number">30%</div>
              <div className="stat-label">Higher Farmer Income</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content center">
          <h2>Join Our Movement</h2>
          <p>
            Whether you're a farmer looking to reach more customers or a consumer wanting fresher,
            locally-sourced produce, Mt-Kenya Agro-Loup is here to help. Together, we're building
            a more sustainable and equitable food system.
          </p>
          <div className="cta-buttons">
            <a href="/farmer-dashboard" className="btn btn-primary">Start Selling</a>
            <a href="/products" className="btn btn-secondary">Start Shopping</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
