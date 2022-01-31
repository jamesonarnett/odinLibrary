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
    read: "Finished",
  },

  {
    title: "Naruto",
    author: "Masashi Kishimoto",
    pages: 237,
    read: "Finished",
  },
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
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

const addBook = () => {
  title = formTitle.value;
  author = formAuthor.value;
  pages = formPages.value;
  read = formIsRead.value;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLocalStorage();
};

function checkLocalStorage() {
  if (localStorage.getItem("myLibrary")) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

    if (myLibrary.length == 0) {
      myLibrary.push({
        title: "The Lord of the Rings",
        author: "J.R.R Tolkien",
        pages: 321,
        read: "Finished",
      });
    }
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

function readStatus(e) {
  e = event.target.id;
  let id = document.getElementById(e);
  let h4 = id.children[0].children[4];

  if (h4.textContent.trim() == "Not read") {
    h4.textContent = "Finished";
  } else {
    h4.textContent = "Not read";
  }
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
  <h4>Pages: ${item.pages}</h4>
  <h4 id=${item.id}>${item.read} </h4>
  <button id="${item.id}" class="delete btn-danger" onclick={removeBook()}>Delete</button>
  <button id=${item.id} "style="font-size: 10px" onclick={readStatus()}>Read?</button>
  </div>
  </div>`;

    mybookList.insertAdjacentHTML("afterbegin", aBook);
  });
  updateLocalStorage();
};

render();
