const path = require("path");
const express = require("express");
const fs = require ("fs");
let notesData = JSON.parse(fs.readFileSync("./db/db.json", 'utf8'));


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("/api/notes", function(req, res){

        let note = req.body;

        if (notesData.length > 0) {
        
        let latestID = notesData.sort((a,b) => b.id - a.id)[0].id;
        note.id = latestID + 1;

        } else {
            note.id = 1
        }
       
        notesData.push(note);
        let stringNotes = JSON.stringify(notesData)

        fs.writeFile("./db/db.json", stringNotes, function(err){
            if (err) throw err;
            console.log("Successfully added note")
        })
        res.sendStatus(200)
    });


    app.delete("/api/notes/:id", function (req, res){
        const id = req.params.id;

        let updatedNotes = notesData.filter(x => {
            return x.id != id;
        })

        let notesNotEmpty = (updatedNotes.length > 0) ? updatedNotes : [];
        
        let stringNotes = JSON.stringify(notesNotEmpty)

        fs.writeFile("./db/db.json", stringNotes, function(err){
            if (err) throw err;
            notesData =  updatedNotes;
            console.log("Successfully deleted note")
        })
        res.sendStatus(200)
    })
}

