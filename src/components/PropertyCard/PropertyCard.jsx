import 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * PropertyCard component displays a card with property details.
 * @component
 * @param {Object} property - The property object containing details to display.
 * @param {string} property.image - The URL of the property's image.
 * @param {string} property.title - The title of the property.
 * @param {string} property.shortDescription - A short description of the property.
 * @param {string} property.id - The unique identifier of the property.
 * @returns {JSX.Element} The rendered PropertyCard component.
 */
// eslint-disable-next-line react/prop-types
const PropertyCard = ({ property }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={property.image} />
        <Card.Body>
            <Card.Title>{property.title}</Card.Title>
            <Card.Text>
                {property.shortDescription}
            </Card.Text>
            <Button as={Link} to={`/properties/${property.id}`} variant="primary">
                More Details
            </Button>
        </Card.Body>
    </Card>
);

export default PropertyCard;