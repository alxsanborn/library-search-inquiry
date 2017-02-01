function Library(title, author, year, isbn) {
  this.title = title,
  this.author = author,
  this.year = year,
  this.isbn = isbn,
  this.result = function(){
    return this
  }
}


// We're after an ES5 Javascript class for a library which allows people to find book details by ISBN number and search for books by their title. Please add comments/thoughts about any limitations your implementations yours had and why you chose to do things a certain way.
