import "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Search.css";

const AdvancedSearch = () => {
    return (
        <Container className="advanced-search-page">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="advanced-search-card">
                        <Card.Body>
                            <h3 className="text-center mb-4">Find Your Dream Property</h3>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="location">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="text" placeholder="Enter location" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="propertyType">
                                            <Form.Label>Property Type</Form.Label>
                                            <Form.Select>
                                                <option value="">Select</option>
                                                <option value="house">House</option>
                                                <option value="apartment">Apartment</option>
                                                <option value="villa">Villa</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="priceRange">
                                            <Form.Label>Price Range</Form.Label>
                                            <Form.Control type="text" placeholder="e.g. $1000 - $5000" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="bedrooms">
                                            <Form.Label>Bedrooms</Form.Label>
                                            <Form.Select>
                                                <option value="">Any</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4+">4+</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="text-center mt-3">
                                    <Button variant="primary" className="search-button">
                                        Search
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdvancedSearch;
