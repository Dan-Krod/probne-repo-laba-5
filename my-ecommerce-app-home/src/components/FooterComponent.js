import React from 'react';
import '../styles/FooterComponent.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="branding">
        <h3>Your Gateway to Knowledge</h3>
          <p>
            Dive into a world of literature and discover a curated selection 
            of books, audiobooks, and exclusive author photos. Join us at our 
            book events and enrich your reading journey.
          </p>
        </div>
        <div className="logo">
          <img src="/logo-3.png" alt="Logo" className="logo-img" />
        </div>
        <div className="social-links">
          <a href="/facebook" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"><img src="/facebook.png" alt="Link" className="link-img" /></i></a>
          <a href="/twitter" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"><img src="/twitter.png" alt="Link" className="link-img" /></i></a>
          <a href="/linkedin" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"><img src="/linkedin.png" alt="Link" className="link-img" /></i></a>
          <a href="/google" className="social-link" aria-label="Google Plus"><i className="fab fa-google-plus-g"><img src="/google.png" alt="Link" className="link-img" /></i></a>
        </div>
      </div>
      <hr className="footer-divider" /> 
      <div className="footer-bottom">
        <p>2024 World of Books. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

