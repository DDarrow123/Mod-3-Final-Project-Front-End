// console.log('hello!')

let collections = []
let card = []
let collectionsContainer = document.querySelector('#collections-container')
let cardContainer = document.querySelector('#card-container')
const cardUrl = `http://localhost:3000/api/v1/cards`
const collectionUrl = `http://localhost:3000/api/v1/collections`
const commentUrl = `http://localhost:3000/api/v1/comments`
const userUrl = `http://localhost:3000/api/v1/users`

fetch(collectionUrl)
.then(res => res.json())
.then((parsedResponse) => {
  console.log(parsedResponse)
  collections = parsedResponse
  addCollectionsToDom(collections)
})

function addCollectionsToDom(collections){
collections.forEach((collection) =>{
  collectionsContainer.innerHTML += singleCollectionToPage(collection)
  })
}  //end of func

function singleCollectionToPage(collection){

  return `<div class="collection-header" data-id=${collection.id}>Collection
    <h2 class="collection-designer">Designer: ${collection.designer}</h2>
    <h3 class="collection-season">Season: ${collection.season}</h3>
    <h4 class="collection-brand">Brand: ${collection.brand}</h4>
  </div>`
  // if ()
}

collectionsContainer.addEventListener('click', (event) => {
  // debugger
  let collectionId = event.target.dataset.id
  // console.log(event.target.dataset.id)
  if (event.target.className === 'collection-header'){
    fetch(cardUrl + `/${collectionId}`)
    .then(res => res.json())
    .then((parsedResponse) => {
      card = parsedResponse
      console.log(parsedResponse)
        // cards.forEach((card) =>{
      // let htmlStr = ''
      console.log(cardContainer)
    cardContainer.innerHTML =
      `<div class="card" data-id="${card.id}">
        <img class="image-rendered" src="${card.image}" alt="fashion look image">
        <h4>Likes: ${card.likes}</h4>
        <p>${card.details}</p>
        <span data-id=${card.collection_id}>Test</span>
      </div>`
     // })
   })
  }
})

// let htmlStr = ''
//       for (i in trainer) {
//           htmlStr += `<div class="card" data-id="${i}">
//           <p>${trainer[i].name}</p>
//           <button id="add-pokemon-button" data-trainer-id="${trainer[i].id}">Add Pokemon</button>
//             <ul id="list-container">`
//         for (j in trainer[i].pokemons) {
//           htmlStr += `<li>${trainer[i].pokemons[j].nickname} (${trainer[i].pokemons[j].species}) <button class="release" data-pokemon-id="${trainer[i].pokemons[j].id}">Release</button></li>`
//         }
//         htmlStr += `
//           </ul>
//         </div>`

















// spacing
