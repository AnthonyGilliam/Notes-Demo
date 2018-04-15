console.log('starting Notes-Demo\n');

const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptons = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const appInputArgs = yargs
    .command('add', 'Add a new note', {
        title: titleOptons,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptons
    })
    .command('remove', 'Remove a note', {
        title: titleOptons
    })
    .help()
    .argv;
const command = appInputArgs._[0];

switch(command){
    case 'add':
        console.log('Adding new note\n');
        notes.addNote(appInputArgs.title, appInputArgs.body);
        break;
    case 'list':
        console.log('Listing all notes\n');
        let notesList = notes.getAll();
        if(notesList.length)
            notesList.forEach((note) => notes.logNote(note));
        else
            console.log('No notes to retrieve');
        break;
    case 'read':
        console.log('Getting note\n');
        let note = notes.getNote(appInputArgs.title);
        if(note)
            notes.logNote(note);
        break;
    case 'remove':
        console.log('Removing note\n');
        notes.removeNote(appInputArgs.title);
        break;
    default:
        console.log('Input command not recognized. Use --help flag for instructions\n');
        break;
}