import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../../data/properties';
import testimonials from '../Testimonials.js';
import './Home.css'; // Import custom CSS

const Home = () => {
    const featuredProperties = properties.slice(0, 3); // Select first 3 properties as featured

    return (
        <div>
            <div className="hero-section">
                <Container className="text-center text-white">
                    <h1>Welcome to Perfect Estate</h1>
                    <p>Your dream home awaits. Discover a place you will love to live.</p>
                    <Button as={Link} to="/properties" variant="danger" size="lg" className="m-2">View All Properties</Button>
                </Container>
            </div>

            <Container className="my-5">
                <Row className="text-center mb-4">
                    <Col>
                        <h2>Turn your House into a Home</h2>
                        <p>We offer a diverse selection of properties tailored to fit your preferences and budget. Whether you're seeking a luxurious villa, a sleek modern apartment, or a charming cottage, we have the perfect home waiting for you!</p>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <h3>Featured Properties</h3>
                        <Row>
                            {featuredProperties.map(property => (
                                <Col key={property.id} sm={12} md={6} lg={4} className="mb-4">
                                    <Card className="property-card">
                                        <Card.Img variant="top" src={property.image} />
                                        <Card.Body>
                                            <Card.Title>{property.title}</Card.Title>
                                            <Card.Text>{property.description}</Card.Text>
                                            <Button as={Link} to={`/properties/${property.id}`} variant="outline-primary">More Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <h3>What Our Clients Say</h3>
                        <Carousel>
                            {testimonials.map((testimonial, index) => (
                                <Carousel.Item key={index}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <Card.Text className="blockquote mb-0">
                                                "{testimonial.feedback}"
                                            </Card.Text>
                                            <footer className="blockquote-footer mt-2">{testimonial.name}</footer>
                                        </Card.Body>
                                    </Card>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <h3>Why Choose Us</h3>
                        <Row>
                            <Col md={4} className="mb-4">
                                <Card className="text-center">
                                    <Card.Body>
                                        <Card.Title>Experienced Agents</Card.Title>
                                        <Card.Text>Our agents have years of experience in the real estate market.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="text-center">
                                    <Card.Body>
                                        <Card.Title>Customer Focused</Card.Title>
                                        <Card.Text>We prioritize our clients' needs and provide personalized service.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="text-center">
                                    <Card.Body>
                                        <Card.Title>Wide Range of Properties</Card.Title>
                                        <Card.Text>We offer a diverse range of properties to suit all preferences and budgets.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;