const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth-event', (req, res) => {
    const { userId, authenticated } = req.body;
    // Log the authentication event here, you could save this in your database
    console.log(`Authentication event: User ${userId} authenticated: ${authenticated}`);
    res.status(200).json({ message: "Authentication event logged" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));