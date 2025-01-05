import "react";
import { Container } from "react-bootstrap";

/**
 * NoPropertiesFound component displays a message indicating that no properties were found.
 * @component
 * @returns {JSX.Element} The rendered NoPropertiesFound component.
 */
const NoPropertiesFound = () => {
    return (
        <Container className="text-center my-5">
            <h3 className="text-danger">No Properties Found</h3>
            <p className="text-muted">
                Try adjusting your search filters to find your perfect property.
            </p>
        </Container>
    );
};

export default NoPropertiesFound;