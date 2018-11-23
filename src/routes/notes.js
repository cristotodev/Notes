const router = require('express').Router();
const NoteModel = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/add-note');
});

router.post('/notes/new-note', async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "You must write a Title" });
    }
    if (!description) {
        errors.push({ text: "You must write a Description" });
    }

    if (errors.length > 0) {
        res.render('notes/add-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new NoteModel({ title, description });
        await newNote.save();

        res.redirect('/notes');
    }

});

router.get('/notes', async(req, res) => {
    const notes = await NoteModel.find().sort({ date: 'desc' });
    res.render('notes/all-notes', {
        notes
    });
});

router.get('/notes/edit/:id', async(req, res) => {
    const note = await NoteModel.findById(req.params.id);
    res.render('notes/edit-note', {
        note
    });
});

router.put('/notes/edit-note/:id', async(req, res) => {
    const { title, description } = req.body;
    await NoteModel.findByIdAndUpdate(req.params.id, { title, description });
    console.log(req.params.id);
    console.log(req.body);
    res.redirect('/notes');
});

module.exports = router;