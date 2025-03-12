import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send data to backend API (make sure to replace the URL with the correct one)
            const response = await axios.post('http://localhost:5000/api/contact/add', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResponseMessage('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            setResponseMessage('Failed to send the message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
            <h1 style={{ fontSize: '2rem', textAlign: 'left', marginBottom: '20px' }}>Contact Us</h1>
            <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bolder'}}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            width: '80%',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            border : '2px solid gray'
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{ fontSize: '1rem', marginBottom: '5px',fontWeight: 'bolder' }}>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: '80%',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            border : '2px solid gray'
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label style={{ fontSize: '1rem', marginBottom: '5px' ,fontWeight: 'bolder'}}>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{
                            width: '80%',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            border : '2px solid gray'
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bolder' }}>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                            width: '80%',
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box',
                            border : '2px solid gray'
                        }}
                    />
                </Form.Group>

                <Button
                    // variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        alignSelf: 'flex-end',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'black',
                        transition: 'all 0.4s ease',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = 'black';
                        e.target.style.border = '2px solid black';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'black';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1)';
                      }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </Form>

            {responseMessage && (
                <p
                    style={{
                        fontSize: '1.5em',
                        color: 'green',
                        textAlign: 'center',
                        marginTop: '10px',
                    }}
                >
                    {responseMessage}
                </p>
            )}
        </Container>

    );
};

export default Contact;

