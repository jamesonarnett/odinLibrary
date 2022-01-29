const mybookList = document.getElementById("bookList");
let myLibrary = [
  { name: "The Lord of the Rings", author: "J.R.R Tolkien", status: "read" },
  {
    name: "Alice in Wonderland",
    author: "Lewis Caroll",
    status: "not read",
  },
  { name: "Naruto", author: "Masashi Kishimoto", status: "read" },
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

const addBookToLibrary = (title, author, pages, read) => {
  let book = new Book(title, author, pages, read);

  myLibrary.push(book);
};
