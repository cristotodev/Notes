const moongose = require('mongoose');

moongose.connect('mongodb://localhost/notes-db', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));