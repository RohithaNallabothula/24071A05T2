const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Student API running 🚀" });
});

const studentRoutes = require("./routes/students");
app.use("/students", studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});