function book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function ui() {}

ui.prototype.getBook = function (book) {
  //console.log(book.title);
  if (book.title != '' || book.author != '' || book.isbn != '') {
    var row = document.createElement('tr');
    var bookList = document.getElementById('book-list');
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class= "delete">Remove</a></td>`
    bookList.appendChild(row);
  }

}
ui.prototype.remove = function (target) {
  if (target.className == 'delete') {
    target.parentElement.parentElement.remove();
    var uival = new ui()
    uival.validate("book removed from table", "success");
  }
}
ui.prototype.validate = function (message, color) {
  var div = document.createElement('div');
  div.className = `error ${color}`
  var node = document.createTextNode(message);
  div.appendChild(node);
  var container = document.querySelector('.container');
  var form = document.getElementById("book-form");
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector('.error').remove();
  }, 1000)
}

var form = document.getElementById("book-form");
form.addEventListener("submit", function (e) {

  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  var isbn = document.getElementById("isbn").value;
  var b1 = new book(title, author, isbn);
  //console.log(b1);

  var uival = new ui()
  uival.getBook(b1)

  if (title == '' || author == '' || isbn == '') {
    uival.validate("enter all fields", "error");
  } else {
    uival.validate("added successfull", "success");
  }
  e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function (e) {
  var uival = new ui();
  uival.remove(e.target);

})