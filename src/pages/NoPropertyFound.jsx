import "react";
import { Container } from "react-bootstrap";

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
