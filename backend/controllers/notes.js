const Notes = require('../models/notes');
const mongoose = require('mongoose');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const fs  = require('fs');
const path  = require('path');
exports.createNotes = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('validation Failed. please try again');
        error.status = 422;
        next(error);
    }
    if(!req.files.file) {
        const error = new Error('No notes provided.');
        error.status = 422;
        next(error);
    }
    const file = req.files.file[0];
    const pdf_doc = file.path;
    const note = new Notes({
        title: req.body.title,
        description: req.body.description,
        standard: req.body.standard,
        subject: req.body.subject,
        pdf_doc: pdf_doc,
        userId: req.userId
    })
    try {
        await note.save();
        const user  = await User.findById(req.userId);
        user.notes.push(note);
        await user.save();
        res.status(201).json({
            message: 'Note added successfully',
            note: note,
            userId: req.userId
        });
    } catch(err) {
        if(!err.status) {
            err.status = 500;
        }
        next(err);
    }
    
}

exports.getNotes = async (req, res, next) => {
    const userID = req.userId;
    try {
        const totalItems = await Notes.find().countDocuments();
        const notes = await Notes.find().populate('userId');
        res.status(200).json({
            message: 'Fetched notes successfully',
            notes: notes,
            userId: req.userId,
            total_notes: totalItems
        });
    }  catch(err) {
        if(!err.status) {
            err.status = 500;
        }
        next(err);
    }
    
}

exports.getSingleNoteInfo = async (req,res,next) => {
    const notes_id = req.params._id;
    const userID = req.userId;
    try {
        const note = await Notes.findById(notes_id);
        const user = await User.findById(userID);
        if(!note) {
            const error = new Error('Note not found!. Please try again.');
            error.status = 404;
            next(error);
            throw error;
        }
        res.status(200).json({
            message: 'Fetched notes successfully',
            note: note,
            user_details: user,
            total_notes: 1
        })
    } catch(err) {
        if(!err.status) {
            err.status = 500;
            next(err);
        }
    }
}

exports.updateNote = async(req,res,next) => {
    const note_id = req.params._id;
    const userId = req.userId;
    let doc = req.body.pdf_doc;
    if(req.files) {
        doc = req.files.file;
    }
    if(!req.files.file) {
        const error = new Error('No notes provided.');
        error.status = 422;
        next(error);
    }
    const document = req.files.file[0];
    try {
        const note = await Notes.findById(note_id).populate('userId');
        if(!note){
            const error = new Error('Note not found!, please try again!');
            error.status = 404;
            next(error);
            throw error;
        }
        if(note.userId._id.toString() !== userId.toString()) {
            const error = new Error('User not Authorized to update Note');
            error.status = 404;
            next(error);
            throw error;
        }  
        if(doc !== note.pdf_doc) {
            clearPDF(note.pdf_doc);
        }
        note.title = req.body.title;
        note.description = req.body.description;
        note.standard = req.body.standard;
        note.subject = req.body.subject;
        note.pdf_doc = document.path;
        note.userId = req.userId;
        const result = note.save();
        res.status(200).json({
            message: 'Note Updated successfully',
            Note: result,
            userId: req.userId
        });

    } catch(err) {
        if(!err.status) {
            err.status =500; 
            next(err);
        }
    }
}

exports.downloadPdf = async (req,res, next) => {
    const notes_id = req.params._id;
    try {
        const note = await Notes.findById(notes_id);
        if(!note) {
            const error = new Error('Note not found!. Please try again.');
            error.status = 404;
            next(error);
            throw error;
        }
        const filename = note.pdf_doc.split('-')[0].split('/')[1];
        const file = fs.createReadStream(note.pdf_doc);
        res.setHeader('Content-Type', 'application/pdf'); 
        res.setHeader('Content-Disposition', 'attachment;filename="' + filename + '"');
        file.pipe(res);
    } catch(err) {
        if(!err.status) {
            err.status = 500;
            next(err);
        }
    }
}

exports.deleteNote = async (req,res,next) => {
    const note_id = req.params._id;
    const userId = req.userId;
    try {
        const note = await Notes.findById(note_id).populate('userId');
        if(!note) {
            const error = new Error('Note does not exist!. Please try again');
            error.status = 404;
            next(error);
            throw error;
        }
        if(note.userId._id.toString() !== userId.toString()) {
            const error = new Error('Current user not authorized to delete notes');
            error.status = 403;
            next(error);
            throw error;
        }
        clearPDF(note.pdf_doc);
        await Notes.findByIdAndDelete(note_id);
        const user = await User.findById(userId);
        user.notes.pull(note_id);
        await user.save();
        res.status(200).json({
            message: 'Deleted Note successfully',
            userId: userId
        });
    } catch(err) {
        if(!err.status) {
            err.status = 500;
            next(err);
        }
    }
}

clearPDF = pathToFile => {
    const filePath = path.join(__dirname, '../', pathToFile);
    fs.unlink(filePath, err => {
        console.log(err);
    })
}

