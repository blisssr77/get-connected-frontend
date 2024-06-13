import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© 2024 GetConnected. All rights reserved.</p>
                <div className="footer-links">
                    <a href="https://www.linkedin.com/in/robinchae/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:info1308208@gmail.com">Contact Us</a>
                </div>
            </div>
            <style jsx>{`
                .footer {
                    background-color: rgb(243 244 246);
                    color: #007bff;
                    padding: 5px 0;
                    width: 100%;
                    bottom: 0;
                    z-index: 1000;
                }

                .footer-container {
                    width: 90%;
                    margin: auto;
                    display: flex;
                    justify-content: space-between;
                }

                .footer-links a {
                    color: #007bff;
                    text-decoration: none;
                    margin: 0 10px;
                }

                .footer-links a:hover {
                    color: #000000;
                    text-decoration: underline;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
