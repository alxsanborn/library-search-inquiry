var library = []

function Book(title, author, year, isbn) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isbn = isbn;
  this.result = function(){
    return this
  };
  library.push(this);
}

//Some search engines allow a user to search for any attribute in a single field, while other search engines require a user to select which attribute they are trying to search from a dropdown menu in order to perform an accurate search. I'm assuming the latter for now because that's what I've used in library search engines, specifically, but on Amazon, for example, you can look a book up by any attribute.
function isbnSearch(userIsbn) {
 for (var book = 0; book < library.length; book++){
   if (library[book].isbn == userIsbn) {
    return library[book].result()
  }
 }
}
//I will optomize this with a better algorithm later, I just want to get it working.

function titleSearch(userTitle) {
  for (var book = 0; book < library.length; book++){
    if (library[book].title == userTitle) {
     return library[book].result() //what if there is more than one book with the same title?
   }
  }
}

//Future: a function that returns a book by author? a function that returns all of the books published in a given year? should these all be separate functions or is there a way to DRY this out?

var book1 = new Book("blah", "blah", 333, 444)
var book2 = new Book("meh", "meh", 111, 222)


// We're after an ES5 Javascript class for a library which allows people to find book details by ISBN number and search for books by their title. Please add comments/thoughts about any limitations your implementations yours had and why you chose to do things a certain way.
