const mybookList = document.getElementById("insertBooksHere");

const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formIsRead = document.getElementById("isRead");

const newBookButton = document.getElementById("newBookButton");

const modal = document.getElementById("modal");
const quit = document.getElementById("quitButton");
const addBookToLibrary = document.getElementById("addButton");
const form = document.getElementById("form");

// modal events

newBookButton.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "block";
};

quit.onclick = (e) => {
  e.preventDefault();
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

addBookToLibrary.onclick = (e) => {
  addBook();
};

//modal events

let myLibrary = [
  {
    title: "The Lord of the Rings",
    author: "J.R.R Tolkien",
    pages: 321,
    read: true,
  },

  { title: "Naruto", author: "Masashi Kishimoto", pages: 237, read: true },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const updateLocalStorage = () => {
  localStorage.setItem(myLibrary, JSON.stringify(myLibrary));
};

const addBook = () => {
  title = formTitle.value;
  author = formAuthor.value;
  pages = formPages.value;
  read = getCheckValue();

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLocalStorage();
};

const getCheckValue = () => {
  if (form.querySelector('input[name="read"]:checked').value == "yes")
    return true;
  else return false;
};

function checkLocalStorage() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  } else {
    myLibrary = myLibrary;
  }
}

function removeBook(e) {
  e = event.target.id;
  let insideBook = event.target.parentNode;
  let flexBook = insideBook.parentNode;
  console.log(flexBook);

  myLibrary.filter((item) => {
    if (item.id == e) {
      flexBook.remove(flexBook);

      let library = JSON.parse(localStorage.getItem("myLibrary"));
      let myLibrary = library.filter((book) => book.id != item.id);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
  });
}

function changeReadStatus() {
  console.log("fuck me right?");
}

const render = () => {
  checkLocalStorage();

  myLibrary.forEach((item, i) => {
    item.id = i;

    let aBook = `
  <div id="${item.id}" class="flexBook">
  <div class="insideBook">
  <h3>${item.title}</h3>
  <hr />
  <h3>${item.author}</h3>
  <h4>${item.pages} Pages</h4>
  <h4> Read? ${item.read}</h4>

  <button id="${item.id}" class="delete btn-danger" onclick={removeBook()}>Delete</button>
  <button style="font-size: 10px" onclick={changeReadStatus()}>Read?</button>
  </div>
  </div>`;

    mybookList.insertAdjacentHTML("afterbegin", aBook);
  });
};

render();
console.log(myLibrary);
