// console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
	try
	{
	var notesString = fs.readFileSync('notes-data.json');
	return JSON.parse(notesString);	
	}
	catch (e)
	{
		return [];
	}
};

var saveNotes = (notes) => {
fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) =>{
	var notes= fetchNotes();
	var note = {
		title,
		body
	};
	
	var duplicateNotes = notes.filter((note)=> note.title===title);

	if (duplicateNotes.length ===0) 
	{
	notes.push(note);
	saveNotes(notes);
	return note;
	}
	
	
};

var getAll = () => {
	return fetchNotes();
};

var Read = (title) => {	//getNote()
	var notes = fetchNotes();
	var readNote = notes.filter((note)=> note.title === title);
	return readNote[0];
};
var Remove = (title) => {	//removeNote()
	var notes = fetchNotes();
	var FilteredNotes = notes.filter((note)=> note.title!==title);
	saveNotes(FilteredNotes);

	return notes.length !== FilteredNotes.length;
};

var logNote = (note)=> {
		//debugger;
		console.log('------');
		console.log ('Title: ' ,note.title);
		console.log('body: ', note.body);
		console.log('------');
};
 module.exports = {
 	addNote,
 	getAll,
 	Read,
 	Remove,
 	logNote
 };
