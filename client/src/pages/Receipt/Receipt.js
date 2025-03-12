import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/simon-sons logo.png";

function Receipt() {
    const location = useLocation();
    const { paymentId, customerName, customerEmail, customerPhone, products } = location.state || {};

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", textAlign: "center" }}>
            <img src={logo} style={{ height: "60px", padding: "3px", marginRight: '50px' }}/>
            <h2>Receipt</h2>
            <p><strong>Payment ID:</strong> {paymentId || "N/A"}</p>
            <p><strong>Customer Name:</strong> {customerName || "N/A"}</p>
            <p><strong>Email:</strong> {customerEmail || "N/A"}</p>
            <p><strong>Phone:</strong> {customerPhone || "N/A"}</p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "1px solid #ddd" }}>Product Name</th>
                        <th style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "1px solid #ddd" }}>Quantity</th>
                        <th style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "1px solid #ddd" }}>Price</th>
                        <th style={{ backgroundColor: "#007bff", color: "white", padding: "10px", border: "1px solid #ddd" }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={index}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.name}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.quantity}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{Number(product.price).toFixed(2)}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{(product.quantity * product.price).toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", color: "red" }}>No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button onClick={() => window.print()} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "black", color: "white", border: "none", borderRadius: "5px", fontWeight:"bolder" }}>
                Print Receipt
            </button>
        </div>
    );
}

export default Receipt;
