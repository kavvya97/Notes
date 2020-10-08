const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const NotesController = require('../controllers/notes');


router.post('/create',isAuth, NotesController.createNotes);

router.get('/view_notes',isAuth, NotesController.getNotes);

router.get('/download/:_id', NotesController.downloadPdf);

router.get('/single_note/:_id', isAuth, NotesController.getSingleNoteInfo);

router.post('/update_note/:_id', isAuth,  NotesController.updateNote);

router.delete('/delete_note/:_id', isAuth, NotesController.deleteNote);

module.exports = router;