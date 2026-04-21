const express = require("express");
const r = express.Router();
const auth = require("../middleware/authMiddleware");

let s = [];

// CREATE student
r.post("/", auth, (req, res) => {
    const st = { id: s.length + 1, ...req.body };
    s.push(st);
    res.json(st);
});

// GET all students
r.get("/", auth, (req, res) => res.json(s));

// GET single student
r.get("/:id", auth, (req, res) => {
    const st = s.find(x => x.id == req.params.id);
    if (!st) return res.status(404).json({ msg: "Not found" });
    res.json(st);
});

// UPDATE student
r.put("/:id", auth, (req, res) => {
    const st = s.find(x => x.id == req.params.id);
    if (!st) return res.status(404).json({ msg: "Not found" });
    Object.assign(st, req.body);
    res.json(st);
});

// DELETE student
r.delete("/:id", auth, (req, res) => {
    s = s.filter(x => x.id != req.params.id);
    res.json({ msg: "Deleted" });
});

module.exports = r;