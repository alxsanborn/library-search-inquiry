var allBooks = []

function Library(title, author, year, isbn) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isbn = isbn;
  this.result = function(){
    return this
  };
  allBooks.push(this);
}

//Some search engines allow a user to search for any attribute in a single field, while other search engines require a user to select which attribute they are trying to search from a dropdown menu in order to perform an accurate search. I'm assuming the latter for now because that's what I've used in library search engines, specifically, but on Amazon, for example, you can look a book up by any attribute.
function isbnSearch(userIsbn) {
 for (var book = 0; book < allBooks.length; book++){
   if (allBooks[book].isbn == userIsbn) {
    return allBooks[book].result()
  }
 }
}
//I will optomize this with a better algorithm later, I just want to get it working.

var book1 = new Library("blah", "blah", 333, 444)
var book2 = new Library("meh", "meh", 111, 222)


// We're after an ES5 Javascript class for a library which allows people to find book details by ISBN number and search for books by their title. Please add comments/thoughts about any limitations your implementations yours had and why you chose to do things a certain way.
