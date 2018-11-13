let collections = []
let card = []
let collectionsContainer = document.querySelector('#collections-container')
let cardContainer = document.querySelector('#card-container')
let addCommentForm = false
const commentForm = document.querySelector('.card-form-container')

//fetching links
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
    cardContainer.innerHTML =
      `<div class="card" data-id="${card.id}">
        <img class="image-rendered" src="${card.image}" alt="fashion look image">
        <p>${card.details}</p>
        <h4 data-id="${card.id}" class="likes">Likes: ${card.likes}</h4>
        <span data-id=${card.collection_id}>Test</span>
        <div>
        <button type="button" name="comment-button" class="comment-button">Leave a Comment</button>
        </div>
      </div>`
     // })
   })
  }
})

  cardContainer.addEventListener('click', (event) => {
    let likeId = event.target.dataset.id
    if (event.target.className === 'likes'){
    let postedLikes = card.likes + 1
    fetch(cardUrl + `/${likeId}`, {
      method: 'PATCH',
      headers:
        {
          "Content-Type": "application/json; charset=utf-8"
         },
      body: JSON.stringify({
        "likes" :postedLikes
      })
    })
    .then(res => res.json())
    .then((parsedResponse) => {
      event.target.parentElement.querySelector('.likes').innerHTML = "Likes: " + postedLikes
      //card is the original JSON data that is saved in an array assigned to this global variable card
        card.likes = postedLikes
    })
  } else if (event.target.className === 'comment-button'){
      let clickedButton = event.target.className
    // hide & seek with the form
      console.log(addCommentForm)
      addCommentForm = !addCommentForm
      console.log(addCommentForm)
    if (addCommentForm) {
      commentForm.style.display = 'block'
      // submit listener here
    } else {
      commentForm.style.display = 'none'
      }
    }
 })

  //   postClickedButton.addEventListener('click', () => {
  // // hide & seek with the form
  //   addCommentForm = !addCommentForm
  // if (addCommentForm) {
  //   commentForm.style.display = 'block'
  //   // submit listener here
  // } else {
  //   commentForm.style.display = 'none'
  //   }
  // })













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
