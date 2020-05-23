const path = require("path");
const express = require("express");
const fs = require ("fs");
let notesData = require("./db/db.json");

module.exports = function(app) {

    app.use(express.static(__dirname + "/public"));

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

}