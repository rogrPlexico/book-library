// create empty library array
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// function to print book info in readable sentence on Book.prototype
Book.prototype.info = function () {
	//allows to use a truthy/falsy value or yes/no for a Book's 'read' property. Converts to a readable value
	if (!this.read || this.read == 'no') {
		this.haveRead = "have not";
	} else {
		this.haveRead = "have";
	};

	return `You ${this.haveRead} read the ${this.pages} pages long book "${this.title}" by ${this.author}.`;
};

// adds a new book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
	let newBook = new Book(title, author, pages, read);
	
	myLibrary.push(newBook);
}

// appends ALL myLibrary items to page
function printMyLibrary() {
	myLibrary.forEach(element => {
		// converts 'read' property to value 'yes' or 'no'
		if (!element.read || element.read == 'no') {
			readBool = 'no';
		} else {
			readBool = 'yes';
		}
		const li = document.createElement('li');
		
		li.textContent = 
			`Title: ${element.title}
			Author: ${element.author}
			Pages: ${element.pages}
			Read: ${readBool}`;
		booksList.appendChild(li); 
	});
}
addBookToLibrary('How To Eat A Live Duck', 'Dr. Dorkington', 9847, 0);

addBookToLibrary('Run From Ducks Your Way to Success', 'Senor Pastey', 113, 1);

addBookToLibrary('99 Fun Duck Apple Strudel Recipes', 'Wilma Sputtererer', 396, 1);

addBookToLibrary('A Tale of Two Ducks', 'Dwilliam Quackspeare', 503, 'yes');

// element selectors
const body = document.querySelector('body');
const booksList = document.getElementsByClassName('books-list')[0];
const newBookButton = document.getElementsByClassName('new-book')[0];

// new book button event listener
newBookButton.addEventListener('click', ()=> {
	
	//remove existing form
	const existingForm = document.querySelector('form');
	if (existingForm) {
		existingForm.remove();
	}

	//create new form
	const newBookForm = document.createElement('form');
	newBookForm.method = 'POST';
	
		//create book title form elements
	const bookTitleDiv = document.createElement('div');
	const inputBookTitle = document.createElement('input');
	inputBookTitle.type = 'text';
	inputBookTitle.name = 'bookTitle';
	inputBookTitle.id = 'bookTitle';
	const labelBookTitle = document.createElement('label');
	labelBookTitle.for = 'bookTitle';
	labelBookTitle.textContent = 'Book Title:';

		//create author form elements
	const authorDiv = document.createElement('div');
	const inputAuthor = document.createElement('input');
	inputAuthor.type = 'text';
	inputAuthor.name = 'author';
	inputAuthor.id = 'author';
	const labelAuthor = document.createElement('label');
	labelAuthor.for = 'author';
	labelAuthor.textContent = 'Author:';
	
		//create number of pages form elements
	const pagesDiv = document.createElement('div');
	const inputPages = document.createElement('input');
	inputPages.type = 'number';
	inputPages.name = 'pages';
	inputPages.id = 'pages';
	const labelPages = document.createElement('label');
	labelPages.for = 'pages';
	labelPages.textContent = 'Pages:';

		// create read/not-read radio form elements
	const readDiv = document.createElement('div');
	const fieldset = document.createElement('fieldset');
	const legend = document.createElement('legend');
	legend.textContent = 'Read:';

	const readYesDiv = document.createElement('div');
	const inputReadYes = document.createElement('input');
	inputReadYes.type = 'radio';
	inputReadYes.name = 'read';
	inputReadYes.value = 'yes';
	inputReadYes.id = 'read';
	const labelReadYes = document.createElement('label');
	labelReadYes.for = 'read-yes';
	labelReadYes.textContent = 'Yes';

	const readNoDiv = document.createElement('div');
	const inputReadNo = document.createElement('input');
	inputReadNo.type = 'radio';
	inputReadNo.name = 'read';
	inputReadNo.value = 'no';
	inputReadNo.id = 'not-read';
	inputReadNo.checked = true;
	const labelReadNo = document.createElement('label');
	labelReadNo.for = 'read-no';
	labelReadNo.textContent = 'No';

		// create 'submit new book' button element
	const submitNewBookButton = document.createElement('button');
	submitNewBookButton.textContent = 'Add Book';
	submitNewBookButton.type = 'button';
	
	let index = 0;

	submitNewBookButton.addEventListener('click', ()=> {
		const readSelection = document.querySelector('input[name="read"]:checked').value;
		const newBookli = document.createElement('li');
		newBookli.setAttribute('data-index', index);
		
		newBookli.textContent = `Title: ${inputBookTitle.value}
			Author: ${inputAuthor.value}
			Pages: ${inputPages.value} 
			Read: ${readSelection}`;
		const removeBookButton = document.createElement('button');
		removeBookButton.type = 'button';
		removeBookButton.textContent = 'Remove Book From Library';
		removeBookButton.setAttribute('data-index', index);
		
		newBookli.appendChild(removeBookButton);
		booksList.appendChild(newBookli);

		removeBookButton.addEventListener('click', function() {
			const bookToDelete = document.querySelector(`.books-list > [data-index='${this.getAttribute('data-index')}']`);
			bookToDelete.remove();
		})
			 
		newBookForm.reset();
		index++;
	});
	
	// add form elements to page
	newBookForm.appendChild(bookTitleDiv);
	bookTitleDiv.appendChild(labelBookTitle);
	bookTitleDiv.appendChild(inputBookTitle);

	newBookForm.appendChild(authorDiv);
	authorDiv.appendChild(labelAuthor);
	authorDiv.appendChild(inputAuthor);

	newBookForm.appendChild(pagesDiv);
	pagesDiv.appendChild(labelPages);
	pagesDiv.appendChild(inputPages);

	newBookForm.appendChild(readDiv);
	readDiv.appendChild(fieldset);
	fieldset.appendChild(legend);

	fieldset.appendChild(readYesDiv);
	readYesDiv.appendChild(labelReadYes);
	readYesDiv.appendChild(inputReadYes);

	fieldset.appendChild(readNoDiv);
	readNoDiv.appendChild(labelReadNo);
	readNoDiv.appendChild(inputReadNo);

	newBookForm.appendChild(submitNewBookButton);

	body.appendChild(newBookForm);
})

printMyLibrary();