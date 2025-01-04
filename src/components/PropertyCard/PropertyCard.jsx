import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PropertyCard = ({ property }) => (
    <Card style={{ width: '18rem' }}>
        {/* eslint-disable-next-line react/prop-types */}
        <Card.Img variant="top" src={property.image} />
        <Card.Body>
            {/* eslint-disable-next-line react/prop-types */}
            <Card.Title>{property.title}</Card.Title>
            <Card.Text>
                {/* eslint-disable-next-line react/prop-types */}
                {property.shortDescription}
            </Card.Text>
            {/* eslint-disable-next-line react/prop-types */}
            <Button as={Link} to={`/properties/${property.id}`} variant="primary">
                More Details
            </Button>
        </Card.Body>
    </Card>
);

export default PropertyCard;
