import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    /**
     * Handles the change in form inputs and updates state accordingly.
     * @param {Object} e - The event object from form input change.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Handles form submission by logging the form data and resetting the form.
     * @param {Object} e - The event object from form submission.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset form data after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });

        // Mailto link to send the message to the given email
        const mailtoLink = `mailto:upani.20223235@iit.ac.lk?subject=Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
        window.location.href = mailtoLink; // Opens the default mail client
    };

    return (
        <Container fluid className="py-5">
            <Row className="text-center mb-5">
                <Col>
                    <h1 className="fw-bold" style={{ color: '#b71c1c' }}>Get in Touch</h1>
                    <p className="text-muted">
                        We'd love to hear from you! Fill out the form or contact us using the details below.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                {/* Contact Details Section */}
                <Col md={5} className="mb-4">
                    <div
                        className="p-4 rounded"
                        style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0' }}
                    >
                        <h2 style={{ color: '#b71c1c' }}>Contact Details</h2>
                        <p className="text-secondary">
                            <strong>Address:</strong> 123 Real Estate St, City, Country
                        </p>
                        <p className="text-secondary">
                            <strong>Phone:</strong> +1 (234) 567-890
                        </p>
                        <p className="text-secondary">
                            <strong>Email:</strong> info@realestate.com
                        </p>
                    </div>
                </Col>

                {/* Contact Form Section */}
                <Col md={5}>
                    <div
                        className="p-4 rounded"
                        style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0' }}
                    >
                        <h2 style={{ color: '#b71c1c' }}>Contact Form</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label style={{ color: '#b71c1c' }}>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="border-1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label style={{ color: '#b71c1c' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="border-1"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label style={{ color: '#b71c1c' }}>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="border-1"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                className="w-100"
                                style={{
                                    backgroundColor: '#b71c1c',
                                    borderColor: '#b71c1c',
                                    color: '#ffffff'
                                }}
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;
