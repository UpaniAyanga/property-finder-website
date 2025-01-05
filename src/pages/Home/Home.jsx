import 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import properties from '../../../public/data/properties.json'; // Import JSON file
import './Home.css'; // Import custom CSS

/**
 * Home component displays the homepage with a hero section and featured properties.
 * @component
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
    // Get the first 3 properties to display as featured properties
    const featuredProperties = properties.properties.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section d-flex align-items-center justify-content-center">
                <Container className="text-center text-white">
                    <h1 className="display-4 fw-bold">Welcome to Perfect Estate</h1>
                    <p className="lead">Your dream home awaits. Discover a place you will love to live.</p>
                    <Button as={Link} to="/properties" variant="danger" size="lg" className="m-2">View All Properties</Button>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="my-5">
                {/* Intro Section */}
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="fw-bold mb-3">Turn your House into a Home</h2>
                        <p className="text-muted">We offer a diverse selection of properties tailored to fit your preferences and budget. Whether you're seeking a luxurious villa, a sleek modern apartment, or a charming cottage, we have the perfect home waiting for you!</p>
                    </Col>
                </Row>

                {/* Featured Properties */}
                <Row className="mb-5">
                    <Col>
                        <h3 className="text-danger text-center fw-bold mb-4">Featured Properties</h3>
                        <Row className="g-4">
                            {featuredProperties.map(property => (
                                <Col key={property.id} sm={12} md={6} lg={4}>
                                    <Card className="property-card shadow-sm h-100">
                                        <Card.Img variant="top" src={property.picture} className="rounded-top" />
                                        <Card.Body>
                                            <Card.Title>{property.title}</Card.Title>
                                            <Card.Text>{property.shortDescription}</Card.Text>
                                            <Button as={Link} to={`/properties/${property.id}`} variant="outline-danger">More Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;