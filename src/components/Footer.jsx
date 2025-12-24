import React from 'react';
import '../styles/Footer.css';


  const getCurrentYear = () => new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer"> 
        <div className="footer_bottom">
          <p>
            © {getCurrentYear()} Perfumes. All Rights Reserved.
          </p>      
          <div className="footerLangCurrency">
            <div className="footerLang">
              <p>Language</p>
              <select name="language" id="language">
                <option value="english">United States | English</option>
                <option value="Arabic">Arabic</option>
                <option value="Germany">Germany</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="footerCurrency">
              <p>Currency</p>
              <select name="currency" id="currency">
                <option value="USD">$ USD</option>
                <option value="MAD">DH MAD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;