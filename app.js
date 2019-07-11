// console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

var titleOptions = {
		describe: 'Title of note',
		demand: true,
		alias: 't'
};

var bodyOptions = {
		describe: 'Body of note',
		demand: true,
		alias: 'b'
};

const notes = require('./notes.js');

const argv = yargs
.command('Add', 'Add a new note',{
	title: titleOptions,
	body: bodyOptions
	})
.command('list','List all notes')
.command('read','Read a note', {
	title: titleOptions
})
.command('remove','Remove note', {title: titleOptions
})
.help()
.argv;
var command = argv._[0];


// console.log('Command: ', command);
// console.log('Process: ', process.argv);
// console.log('yargs', argv);

if (command==='Add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note)
	{
		notes.logNote(note);
	}
	else
	{
		console.log('Duplicate title');
	}
}
else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log('Printing', allNotes.length, 'notes');
	allNotes.forEach((note)=>notes.logNote(note));
}
else if (command === 'read') {
	var note = notes.Read(argv.title);
	if (note)
	{
		notes.logNote(note);
	}
	else
	{
		console.log('Note not found');
	}
}
else if (command === 'remove') {
	var removeResult = notes.Remove(argv.title);
	if (removeResult)
	{
		console.log('Note removed');
	}
	else
	{
		console.log('Note not removed');
	}
}
else{
	console.log('Command not found');
}