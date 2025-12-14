import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Mt-Kenya Agro-Loup</h3>
          <p>Connecting farmers directly to consumers for fresher produce and fair prices.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Browse Products</a></li>
            <li><a href="/farmer-dashboard">Sell Your Produce</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📧 info@mtkenya-agro.com</p>
          <p>📞 +254 712 080 139</p>
          <p>📞 +254 743 113 815</p>
          <p>📍 Mt Kenya Region, Kenya</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Mt-Kenya Agro-Loup. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
