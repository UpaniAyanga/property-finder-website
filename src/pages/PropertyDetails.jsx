import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Image, Tabs, Tab, Badge } from "react-bootstrap";
import propertiesData from "../data/properties.json"; // Import the JSON data directly

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState(""); // For selecting the main image

    useEffect(() => {
        // Find the property by id directly from the imported propertiesData
        const property = propertiesData.properties.find((p) => p.id === id);
        setProperty(property);
        setSelectedImage(property?.images[0] || ""); // Default to the first image
    }, [id]);

    if (!property) {
        return (
            <Container className="text-center my-5">
                <h1 className="text-danger">Property not found</h1>
            </Container>
        );
    }

    return (
        <Container fluid className="my-5">
            <Row className="justify-content-center">
                <Col md={12} className="text-center mb-4">
                    <h2>
                        <Badge bg="danger">{property.type}</Badge>
                    </h2>
                </Col>

                {/* Main Image and Thumbnails */}
                <Col md={6} className="text-center">
                    <Image
                        src={selectedImage}
                        alt={property.type}
                        fluid
                        className="rounded mb-3"
                    />
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                        {property.images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                fluid
                                className="border rounded"
                                style={{
                                    cursor: "pointer",
                                    width: "80px",
                                    height: "80px",
                                }}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </Col>

                {/* Property Info */}
                <Col md={6}>
                    <Tabs defaultActiveKey="description" id="property-tabs" className="mb-3">
                        <Tab eventKey="description" title="Description">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <p className="text-muted">{property.description}</p>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="floorplan" title="Floor Plan">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-center align-items-center bg-light text-secondary border rounded" style={{ height: "300px" }}>
                                        Floor Plan Placeholder
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="map" title="Map">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <div className="d-flex justify-content-center align-items-center bg-light text-secondary border rounded" style={{ height: "300px" }}>
                                        Google Map Placeholder
                                    </div>
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertyDetails;
