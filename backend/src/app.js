// Import dependencies
const express = require('express');
const app = express();
const request = require('supertest'); // For testing
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html for all unknown routes (SPA-like behavior)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Middleware
app.use(express.json());

// Sample products array (no database for now)
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 }
];

// Routes
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for testing
module.exports = app;
