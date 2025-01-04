import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import propertiesData from '../../data/properties.json'; // Import the properties JSON

const PropertyList = () => (
    <Container>
        <Row>
            {propertiesData.properties.map(property => ( // Access the properties array inside the JSON
                <Col key={property.id} sm={12} md={6} lg={4}>
                    <PropertyCard property={property} />
                </Col>
            ))}
        </Row>
    </Container>
);

export default PropertyList;
