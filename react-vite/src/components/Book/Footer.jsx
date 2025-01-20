import { useState, useEffect } from 'react';
import "./Footer.css";

const Footer = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('popup-overlay')) {
                setIsPopupOpen(false);
            }
        };

 
        document.addEventListener('mousedown', handleClickOutside);

 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <footer className="footer">
            <p>© 2025 House of Wisdom</p>
            <nav>
                <a href="#" onClick={openPopup}>Terms of Service</a>
                <a href="https://github.com/wisam2882" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/wisam-khaleefa-461ab4250/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i> LinkedIn
                </a>
            </nav>

      
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={closePopup}>×</button>
                        <p className="popup-text">Terms of Service is coming soon</p>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;