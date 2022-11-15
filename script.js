const cardContainer = document.getElementById('card_container');
let myLibrary = [];

function Book(title, author, pages, haveRead, bookID) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.haveRead = haveRead;
    this.bookID = bookID
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead}`;
    };
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

//Book Form//
const bookFormBtn = document.getElementById('open_form');
const bookFormSubmit = document.getElementById('book_form_submit');
const bookForm = document.getElementById('book_form');

bookFormBtn.addEventListener('click', () => {
    bookForm.style.display = "flex";
});

bookFormSubmit.addEventListener('click', () => {
    const formTitle = document.getElementById('form_title').value;
    const formAuthor = document.getElementById('form_author').value;
    const formPages = document.getElementById('form_pages').value;
    const formHasRead = document.getElementById('form_has_read').checked;

    const newBook = new Book(formTitle, formAuthor, formPages, formHasRead, myLibrary.length);
    addBookToLibrary(newBook);
    displayNewCards(myLibrary);

    bookForm.style.display = 'none';

    formTitle.innerHTML = '';
    formAuthor.innerHTML = '';
    formPages.innerHTML = '';
    formHasRead.innerHTML = '';
});


//UI Book Card //

function createCard(obj) {
    const bookContainer = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const btnContainer = document.createElement('div');
    const hasReadBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    cardContainer.appendChild(bookContainer);
    bookContainer.classList.add('book_containers')
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(btnContainer);
    btnContainer.classList.add('btn_container');
    btnContainer.appendChild(hasReadBtn);
    hasReadBtn.classList.add('have_read_btn');
    btnContainer.appendChild(removeBtn);
    
    title.innerHTML = obj.title;
    author.innerHTML = `By: ${obj.author}`;
    pages.innerHTML = `# of Pages: ${obj.pages}`;
    removeBtn.innerHTML = "Remove";

    function hasRead() {
        obj.haveRead = true;
        hasReadBtn.innerHTML = "Have Read";
        hasReadBtn.style.backgroundColor = "lightgreen";
    };

    function hasNotRead() {
        obj.haveRead = false;
        hasReadBtn.innerHTML = "Have Not Read";
        hasReadBtn.style.backgroundColor = 'lightcoral';
    };

    if (obj.haveRead) {
        hasRead();
    } else {
        hasNotRead();
    };

    removeBtn.addEventListener('click', () => {
        let index = myLibrary.indexOf(obj.bookID)
        let arr = myLibrary 
        arr.splice(index, 1);
        myLibrary = arr;
        cardContainer.removeChild(bookContainer);
    });

    hasReadBtn.addEventListener('click', () => {
        if (obj.haveRead === true) {
            hasNotRead();
        } else {
            hasRead();
        };
    });
};

function displayCards(arr) {
    for (let i = 0; i < arr.length; i++) {
        createCard(arr[i]);
    };
};

function displayNewCards(arr) {
    createCard(arr[arr.length - 1]);
};

if (myLibrary.length === 0) {
    bookForm.style.display = 'flex';
} else {
    bookForm.style.display = 'none';
};

displayCards(myLibrary);