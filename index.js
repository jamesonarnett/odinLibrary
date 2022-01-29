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
  e.preventDefault();
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
    this.info = () => {
      console.log(
        `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} `
      );
    };
  }
}

// form.addEventListener("submit", (e) => {
//   let bookTitle = form.elements[0].value;
//   let bookAuthor = form.elements[1].value;
//   let bookPages = form.elements[2].value;
//   let bookRead = form.elements[3].value;

//   return new Book(bookTitle, bookAuthor, bookPages, bookRead);
// });

const addBook = () => {
  title = formTitle.value;
  author = formAuthor.value;
  pages = formPages.value;
  read = getCheckValue();

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
};

myLibrary.forEach((item) => {
  const aBook = `
  <div class="flexBook">
  <div class="insideBook">
  <h3>${item.title}</h3>
  <hr />
  <h3>${item.author}</h3>
  <h4>${item.pages} Pages</h4>
  <h4> Read? ${item.read}</h4>
  </div>
  </div>`;

  mybookList.insertAdjacentHTML("afterbegin", aBook);
});

const getCheckValue = () => {
  if (form.querySelector('input[name="read"]:checked').value == "yes")
    return true;
  else return false;
};
