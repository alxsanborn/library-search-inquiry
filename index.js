//Tested in Node CLI
var library = []

function Book(title, author, year, isbn, keywords=[]) {
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
//I think with ISBN, cases where a user is trying to approximate what it might be are very rare (unlike title), so I'm not going to try to account for variations here. However, there is a standard length for ISBN numbers, so I'd like to account for that later.

// function titleSearch(userTitle) {
//   for (var book = 0; book < library.length; book++){
//     if (library[book].title == userTitle) {
//      return library[book]
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
          current = library[mid].title.toLowerCase();

          if (current > userTitle.toLowerCase()) {
             high = mid - 1;
           } else if (current < userTitle.toLowerCase()) {
              low = mid + 1;
            } else {
              return library[mid]
           }

      }
      return -1

}

//Many times, users can't remember the exact title they are searching for and search engines need to approximate. I wouldn't want to split the phrase and compare each word in the phrase against every word in every title in the database because it's performing useless operations in a lot of cases. I would want to use keywords, mainly composed of nouns and verbs; people are less likely to be concerned with looking up the subject of "and" or "the." I decided to create an array of words that people would be less likely to be interested in (below), mainly composed of known conjunctions and prepositions.

var keywordExclusions= ['and', 'but', 'or', 'the', 'a', 'an', 'to', 'of', 'at']
//Overall, there are less keywords that we want to exclude than keywords that we want would want to include that exist, so I think it's better approach it from this angle. I know this isn't all of the possible conjunctions/prepositions/etc. that ought to be excluded from a search but this is the general gist. I think the significance of words like "and" change less frequently than the creation of new noun or verbs (i.e. new words that get created over time tend to be related to new technology or slang). It's more efficient than having a database of all of the possible nouns, verbs, adjectives, etc. and having to continuously query a dictionary API and this doesn't even account for search terms that might not be listed in the dictionary.

function phraseOptomization(searchPhrase) {
  var optomizedPhrase = []
  for (var word = 0; word < searchPhrase.length; word++) {
    var currentWord = searchPhrase[word].toLowerCase()
        exclusion = false
    for (var keyword = 0; keyword < keywordExclusions.length; keyword++){
      if (currentWord == keywordExclusions[keyword]){
          var exclusion = true
      }
    }
    if (exclusion == false) {
      optomizedPhrase.push(currentWord)
    }
  }
  return optomizedPhrase
}

function wordMatch(wordInput) {
  var matches = []
  var regExPhrase = new RegExp("(" + wordInput.join("|") + ")(s|es|d|ed|ing)*[^A-z]", "gi")
   for (var book = 0; book < library.length; book++) {
     if (library[book].title.match(regExPhrase)) {
       matches.push(library[book])
     }
   }
  return matches
}

function returnTitleResults(searchTerm){
  if (titleBinarySearch(searchTerm.toLowerCase()) == -1) {
      var splitPhrase = searchTerm.split(" ")

      return wordMatch(phraseOptomization(splitPhrase))
  } else {
    return titleBinarySearch(searchTerm.toLowerCase())
  }
}

//more than one book with same title?

//Future: a function that returns a book by author? a function that returns all of the books published in a given year? Should these all be separate functions or is there a way to DRY this out?

//Seed data:
var book1 = new Book("Cats", "Author", 1993, 444)
var book2 = new Book("Dogs", "Author", 1995, 222)
var book3 = new Book("How to Make Smoothies", "Author", 1278, 546)
var book4 = new Book("How to Make Coffee", "Author", 1645, 873)
var book5 = new Book("Cars", "Author", 1042, 246)
var book6 = new Book("The History of Coffee", "Author", 1980, 384)


// We're after an ES5 Javascript class for a library which allows people to find book details by ISBN number and search for books by their title. Please add comments/thoughts about any limitations your implementations yours had and why you chose to do things a certain way.
