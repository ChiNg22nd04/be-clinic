const express = require("express");
const app = express();
const PORT = 3500;

// API test
app.get("/", (req, res) => {
    res.send("Hello from BE-Clinic!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
