import 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';
import {Link} from "react-router-dom";

/**
 * Footer component displays the footer section of the website with various informational sections and social media links.
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => (
    <footer className="footer bg-grey text-light mt-5 p-4">
        <Container>
            <Row>
                <Col md={3} className="mb-4">
                    <h5>About Us</h5>
                    <p>
                        We are a trusted real estate platform connecting buyers and sellers worldwide.
                        Our mission is to make property trading seamless and secure.
                    </p>
                </Col>
                <Col md={3} className="mb-4">
                    <h5>Contact Us</h5>
                    <p>123 Real Estate St, City, Country</p>
                    <p>Phone: +1 (234) 567-890</p>
                    <p>Email: <a href="mailto:upani.20223235@iit.ac.lk" className="text-light">upani.20223235@iit.ac.lk</a></p>
                </Col>
                <Col md={3} className="mb-4">
                    <h5>Quick Links</h5>
                    <ul className="list-unstyled">
                        {/* Using React Router Link for navigation */}
                        <li><Link to="/" className="text-light">Home</Link></li>
                        <li><Link to="/properties" className="text-light">Properties</Link></li>
                        <li><Link to="/contact" className="text-light">Contact</Link></li>
                    </ul>
                </Col>
                <Col md={3} className="mb-4">
                    <h5>Follow Us</h5>
                    <p>Stay connected for the latest updates:</p>
                    <div className="d-flex">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                            <FaLinkedinIn size={24} />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </Col>
            </Row>
            <Row className="text-center">
                <hr/>
                <p className="mb-0">&copy; {new Date().getFullYear()} Upani Lokusuriya. All rights reserved.</p>
            </Row>
        </Container>
    </footer>
);

export default Footer;