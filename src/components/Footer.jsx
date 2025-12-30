import '../styles/Footer.css';
import React, { useEffect, useState } from "react";



  const getCurrentYear = () => new Date().getFullYear();

const Footer = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${show ? 'show' : ''}`}>
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