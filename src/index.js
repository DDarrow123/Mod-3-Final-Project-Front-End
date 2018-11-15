let collections = []
let collectionCards = []
let collectionsContainer = document.querySelector('#collections-container')
let cardContainer = document.querySelector('#card-container')
let firstCardContainer = document.querySelector('#first-container')
let signUpForm = document.querySelector('#sign-up-form')
let addCommentForm = false
let postComment = []
let userId;

//fetching links
const cardUrl = `http://localhost:3000/api/v1/cards`
const collectionUrl = `http://localhost:3000/api/v1/collections`
const commentUrl = `http://localhost:3000/api/v1/comments`
const userUrl = `http://localhost:3000/api/v1/users`
const userNameUrl = `http://localhost:3000/api/v1/users/signin`


function addCollectionsToDom(collections){
collections.forEach((collection) =>{
  collectionsContainer.innerHTML += singleCollectionToPage(collection)
  })
}  //end of func

function singleCollectionToPage(collection){
  return `<div class="collection-header" data-id=${collection.id}>
    Collection
    <h2 class="collection-designer"> ${collection.designer}</h2>
    <h3 class="collection-season">Season: ${collection.season}</h3>
    <h4 class="collection-brand">${collection.brand}</h4>
    <div></div>
  </div>`
  // if ()
}

collectionsContainer.addEventListener('click', (event) => {
  let collectionId = event.target.dataset.id
  // console.log(event.target.dataset.id)
  if (event.target.className === 'collection-header'){
    fetch(collectionUrl + `/${collectionId}`)
    .then(res => res.json())
    .then((parsedResponse) => {
      collectionCards = parsedResponse
      cardContainer.innerHTML = ''
      let htmlStr = ''
      collectionCards.cards.forEach((card) => {
    // debugger
      htmlStr +=
      `<div class="individual-card" data-id="${card.id}">
        <div class="flip-box">
         <div class="flip-box-inner">
          <div class="flip-box-front">
           <img class="image-rendered" src="${card.image}" alt="fashion look image">
           </div>
           <div class="flip-box-back">
            <h2 class="card-collection-detail text-shadow-pop-bl">${card.details}</h2>
        </div>
      </div>
      </div>
        <h4 data-id="${card.id}" class="likes">LIKES: ${card.likes}</h4>
        <span data-id=${card.collection_id}></span>
        <div>
        <button type="button" name="comment-button" class="comment-button">COMMENT</button>
        </div>

      <div class="card-form-container">
        <form class="add-comment-form">
          <h3 class="add-a-comment-title">ADD A COMMENT!</h3>
          <input id="input_comment" type="text" name="comment" value="" placeholder="Enter a comment about this look..." class="input-text"  data-id="${card.id}">
          <br>
          <input type="submit" id="submit-comment" name="submit" value="Create New Comment" class="submit">
        </form>
      </div>

      <div class="comment-box">`

      card.comments.forEach((comment) => {
        htmlStr +=
        `<div>
        <div data-id="${comment.id}" class="comment_id">${comment.content}</div>
        <input type="submit" id="delete-comment" name="delete" value="Delete" class="submit" data-id=${comment.id}>
        </div>
        `
        })

      htmlStr += `</div></div>`


  })
cardContainer.innerHTML = htmlStr

   })
  }
})

  cardContainer.addEventListener('click', (event) => {
    let likeId = event.target.dataset.id
  if (event.target.className === 'likes'){
    let cardToUpdate = collectionCards.cards.find(card => (card.id == likeId))
    if (cardToUpdate.likes == null) {
      cardToUpdate.likes = 0
    }
    let postedLikes = cardToUpdate.likes + 1
    console.log(collectionCards)
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
        cardToUpdate.likes = postedLikes
    })
    } else if (event.target.className === 'comment-button'){
      commentForm = event.target.parentElement.parentElement.querySelector('.card-form-container')
      toggleCommentForm()
    } else if (event.target.id === 'delete-comment') {
      deleteCommentFromForm()
    }
 })

   function toggleCommentForm(){
   let clickedButton = event.target.className
   // console.log(addCommentForm)
   addCommentForm = !addCommentForm
   // console.log(addCommentForm)
  if (addCommentForm) {
   commentForm.style.display = 'block'

  commentForm.addEventListener('submit', (event) => {
    // debugger
    event.preventDefault()
    //variables//
  let commentCardId = event.target.querySelector('#input_comment').dataset.id
  let userInput = event.target.querySelector('#input_comment').value
  let submitCommentButton = commentForm.querySelector('#submit-comment')
  let cardDiv = event.target.parentElement.parentElement.querySelector('.comment-box')
   //end variables//
   fetch(commentUrl, {
     method: 'POST',
     headers:
       {
         "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          "content": userInput,
          "card_id": commentCardId,
          "user_id": userId
        })
   })
   .then(res => res.json())
   .then((parsedResponse) => {
      //just the single card comes back
     postComment = parsedResponse
      commentForm.style.display = 'none'
      addCommentForm = false
     // console.log(postComment)
     cardDiv.innerHTML +=
     `<div>  <div data-id="${postComment.id}" class="comment_id">${postComment.content}</div>
     <input type="submit" id="delete-comment" name="delete" value="Delete" class="submit" data-id=${postComment.id}>
     </div></div>`

   })
 })//end comment form event listener
} else {
   commentForm.style.display = 'none'
   }
 } // end of func


 function deleteCommentFromForm(){
   let createdCommentId = event.target.parentElement.querySelector('.comment_id').dataset.id
   let removedComment = event.target
     fetch(commentUrl + `/${createdCommentId}`, {
       method: 'DELETE',
       headers:
       {
         "Content-Type": "application/json; charset=utf-8"
        }
     })
     .then(res => res.json())
     .then((parsedResponse) => {
       removedComment.parentElement.remove()
       // console.log(parsedResponse)
    })
  }

signUpForm.addEventListener('submit', (event)=> {
  // debugger
  event.preventDefault()
  let signUp = event.target.id
  let userNameInput = event.target[0].value
  let submitUserInfoBtn = event.target.querySelector('#submit-user-info').id
  if (submitUserInfoBtn === 'submit-user-info'){
  // console.log(userNameInput)
  fetch(userNameUrl + `/${userNameInput}`,{
    })
  .then(res => res.json())
  .then((parsedResponse) => {
    if (parsedResponse){
      userId = parsedResponse.id
      signUpForm.remove()
      fetch(collectionUrl)
      .then(res => res.json())
      .then((parsedResponse) => {
        // console.log(parsedResponse)
        collections = parsedResponse
        addCollectionsToDom(collections)
      })
    } else {
      alert('Username does not exist!')
     }
   })
 } //end of first if statement
}) //end event listener










// spacing
