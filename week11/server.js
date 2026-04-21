const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student API with JWT 🚀");
});

app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/students"));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});