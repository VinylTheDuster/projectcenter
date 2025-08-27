const library = [
  { title: "Dune", author: "Frank Herbert", year: 1965, available: true },
  { title: "1984", author: "George Orwell", year: 1949, available: false },
  { title: "Neuromancer", author: "William Gibson", year: 1984, available: true },
  { title: "Brave New World", author: "Aldous Huxley", year: 1932, available: true },
  { title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, available: false },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, available: true },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, available: false },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, available: true },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: false },
  { title: "Moby Dick", author: "Herman Melville", year: 1851, available: true },
  { title: "Frankenstein", author: "Mary Shelley", year: 1818, available: true },
  { title: "Dracula", author: "Bram Stoker", year: 1897, available: false },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: 1890, available: true },
  { title: "The Handmaid's Tale", author: "Margaret Atwood", year: 1985, available: true },
  { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", year: 1969, available: false },
  { title: "Catch-22", author: "Joseph Heller", year: 1961, available: true },
  { title: "Animal Farm", author: "George Orwell", year: 1945, available: true },
  { title: "Ender's Game", author: "Orson Scott Card", year: 1985, available: true },
  { title: "The Road", author: "Cormac McCarthy", year: 2006, available: true }
];

const booksList = document.getElementById('booksList');
const searchBtn = document.getElementById('search-button');

// ajoute les events listeners
function initializeEventsListener () {

  searchBtn.addEventListener('click', () => searchPrerogative());
}

initializeEventsListener();

// enclenche une série de fonction pour déterminer le résultat de recherche
function searchPrerogative () {

  let libraryTemp = [...library];
  const availableBox = document.getElementById('availableBooks').checked;
  const filterSelect = document.getElementById('filter-select').value;
  
  // si le checkbox à été coché
  if (availableBox) {

    libraryTemp = getAvailableBooks(libraryTemp);
    console.log('Filtered');
  }

  // si un ordre de tri à été sélectionner
  if (filterSelect != '') {
    libraryTemp = filterBooks(libraryTemp, filterSelect);
  } else {
  }

  initializeBooksList(libraryTemp);

}

// retourne un tableau avec tout les objets contenants un livre disponible
function getAvailableBooks (bookArray) {
  
  let availableBooksTemp = bookArray.filter((x) => x.available);

  return availableBooksTemp;
}

// retourne un tableau filtrer selon le select
function filterBooks(bookArray, valueOrder) {

  let orderMethod;
  let ascendent;

  switch (valueOrder) {

    case 'nameUp':
      orderMethod = 'title';
      ascendent = true;
      break;

    case 'nameDown':
      orderMethod = 'title';
      ascendent = false;
      break;

    case 'authorUp':
      orderMethod = 'author';
      ascendent = true;
      break;

    case 'authorDown':
      orderMethod = 'author';
      ascendent = false;
      break;

    case 'yearUp':
      orderMethod = 'year';
      ascendent = true;
      break;

    case 'yearDown':
      orderMethod = 'year';
      ascendent = false;
      break;
  }

  let filteredBooksTemp = bookArray.sort(function arraySorter (a, b) {

    if (a[orderMethod] < b[orderMethod]) {
      return ascendent ? -1 : 1;
    }

    if (a[orderMethod] > b[orderMethod]) {
      return ascendent ? 1 : -1;
    }

    return 0;
  });

  console.log(filteredBooksTemp);
  return filteredBooksTemp;
}

// Affiche les infos de livres en fonction de l'array bookArray (donc appeler la fonction avec un array traiter)
function initializeBooksList (bookArray) {

  booksList.textContent = "";

  bookArray.map(x => booksList.innerHTML += 
    `<div class="book-item">

                <div>
                    <p>Titre : ${x.title}</p>
                </div>

                <div>
                    <p>Auteur : ${x.author}</p>
                </div>

                <div>
                    <p>Année : ${x.year}</p>
                </div>

                <div>
                    <p>Disponible : ${x.available ? 'Oui' : 'Non'}</p>
                </div>
            </div>`
  );
}

initializeBooksList(library);