const path = require("path");
const express = require("express");
const fs = require ("fs");
let notesData = require("./db/db.json");

module.exports = function(app) {

    app.use(express.static(__dirname + "/public"));

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
    
    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res){
        
        let note = req.body; //why is req.body undefined?
        console.log(note)
        let latestID = notesData.sort((a,b) => a.id > b.id)[0].id;
        note.id = latestID + 1;
        notesData.push(note);
        fs.writeFile("./db/db.json", note, function(err){
            if (err) throw err;
            console.log("Successfully added note")
        })
        res.send(200)
    });

    // api/notes/4
    app.delete("/api/notes/:id", function (req, res){
        const id = req.params.id;

        let updatedNotes = notesData.filter(x => {
            return x.id != id;
        })

        fs.writeFile("./db/db.json", updatedNotes.length > 0 ? updatedNotes : '[]', function(err){
            if (err) throw err;
            notesData =  updatedNotes;
            console.log("successfully deleted note")
        })
        res.send(200)
    })

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

}