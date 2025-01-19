import React, { useState } from "react";

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError("All fields are required.");
            return;
        }
        setError("");
        setSuccess(true);
        // You can add form submission logic here (e.g., sending data to a server)
    };

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Your message has been sent!</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;
