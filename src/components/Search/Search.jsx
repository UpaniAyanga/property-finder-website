import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AdvancedSearchFilter = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        dateAdded: '',
        postcode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters); // Pass filters to parent
    };

    return (
        <Form className="mb-5" onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md={4}>
                    <Form.Group controlId="type">
                        <Form.Label>Property Type</Form.Label>
                        <Form.Select
                            name="type"
                            value={filters.type}
                            onChange={handleInputChange}
                        >
                            <option value="">Any</option>
                            <option value="house">House</option>
                            <option value="flat">Flat</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="minPrice">
                        <Form.Label>Min Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter minimum price"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="maxPrice">
                        <Form.Label>Max Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter maximum price"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="minBedrooms">
                        <Form.Label>Min Bedrooms</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter minimum bedrooms"
                            name="minBedrooms"
                            value={filters.minBedrooms}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="maxBedrooms">
                        <Form.Label>Max Bedrooms</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter maximum bedrooms"
                            name="maxBedrooms"
                            value={filters.maxBedrooms}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="dateAdded">
                        <Form.Label>Date Added</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateAdded"
                            value={filters.dateAdded}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="postcode">
                        <Form.Label>Postcode Area</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., BR1, NW1"
                            name="postcode"
                            value={filters.postcode}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Search Property
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AdvancedSearchFilter;
