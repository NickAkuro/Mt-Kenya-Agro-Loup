import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h3>Location</h3>
              <p>Mt Kenya Region, Kenya</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-content">
              <h3>Email</h3>
              <p>info@mtkenya-agro.com</p>
              <p>support@mtkenya-agro.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-content">
              <h3>Phone</h3>
              <p>+254 712 080 139</p>
              <p>+254 743 113 815 </p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-content">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          
          {submitted && (
            <div className="success-message">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          <p>📍 Mt Kenya Region - Serving Nanyuki, Meru, Nyeri and surrounding areas</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
