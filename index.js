var library = []

function Book(title, author, year, isbn) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isbn = isbn;
  library.push(this);
}

//Some search engines allow a user to search for any attribute in a single field, while other search engines require a user to select which attribute they are trying to search from a dropdown menu in order to perform an accurate search. I'm assuming the latter for now because that's what I've used in library search engines, specifically, but on Amazon, for example, you can look a book up by any attribute.


// function isbnSearch(userIsbn) {
//  for (var book = 0; book < library.length; book++){
//    if (library[book].isbn == userIsbn) {
//     return library[book]
//   }
//  }
// return "No results found for ISBN."
// }
// I'm going to go with the binary search, rather than the linear search for this particular case. If I were only iterating through 10 (or some other similarly small number) cases, I would just go with the linear case because there is less complexity in the search function and the number of iterations would be negligable. However, in this context, a library will contain hundred/thousands/millions of books to which a/user(s) will continue to add, and for this reason a binary search is better.

function isbnBinarySearch(userIsbn) {
  library.sort(function(a, b){
    return a.isbn - b.isbn
  })
    var low = 0,
        high = library.length -1;

        while (low <= high) {
            mid = parseInt((low + high) / 2);
            current = library[mid].isbn;

            if (current > userIsbn) {
               high = mid - 1;
             } else if (current < userIsbn) {
                low = mid + 1;
              } else {
                return library[mid]
             }

        }
        return "No results found for ISBN."

}

// function titleSearch(userTitle) {
//   for (var book = 0; book < library.length; book++){
//     if (library[book].title == userTitle) {
//      return library[book] //what if there is more than one book with the same title?
//    }
//   }
// }

function titleBinarySearch(userTitle){
  library.sort(function(a, b){
    if ( a.title < b.title )
        return -1;
    if ( a.title > b.title )
        return 1;
    return 0;
  })

  var low = 0,
      high = library.length -1;

      while (low <= high) {
          mid = parseInt((low + high) / 2);
          current = library[mid].title;

          if (current > userTitle) {
             high = mid - 1;
           } else if (current < userTitle) {
              low = mid + 1;
            } else {
              return library[mid]
           }

      }
      return "No results found for title."

}

//Future: a function that returns a book by author? a function that returns all of the books published in a given year? should these all be separate functions or is there a way to DRY this out?

var book1 = new Book("Cats", "Author", 1993, 444)
var book2 = new Book("Dogs", "Author", 1995, 222)
var book3 = new Book("How to Make Smoothies", "Author", 1278, 546)
var book4 = new Book("How to Make Coffee", "Author", 1645, 873)
var book5 = new Book("Cars", "Author", 1042, 246)
var book6 = new Book("Hello", "Author", 1876, 553)
var book7 = new Book("Blah", "Author", 1983, 098)



// We're after an ES5 Javascript class for a library which allows people to find book details by ISBN number and search for books by their title. Please add comments/thoughts about any limitations your implementations yours had and why you chose to do things a certain way.
