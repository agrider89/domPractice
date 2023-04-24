/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container by ID that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const body = document.querySelector('body')
const container = body.children[1]
const cards = document.querySelectorAll('.card')

// EventListeners on each card...
// for(let card of cards) {
//     card.addEventListener('click', (e) => {
//        if(!card.className.includes('red')){
//         card.classList.add('red')
//         addToFavs(card.id)
//        } else {
//         card.classList.remove('red')
//         removeFavs(card.id);
//        }
//     })
// }


const callBack = (e) => {
   const item = e.target;
   const arr = Array.from(item.classList).includes('card')
   if (arr){
      if(!item.className.includes('red')){
         item.classList.add('red')
         addToFavs(item.id)
      } else {
         item.classList.remove('red')
         removeFavs(item.id)
      } 
   }
}


container.addEventListener('click',callBack)

const setFavs = () => {
    if(localStorage.getItem('favs')) {
       const idArr = JSON.parse(localStorage.getItem('favs')).items;
       for(let id of idArr) {
          for(let child of cards) {
             if(child.id === id) {
                child.classList.add('red');
            }
         }
      }
   }
}


const addToFavs = (id) => {
    if(localStorage.getItem('favs')) {
        const curVal = JSON.parse(localStorage.getItem('favs'))
        curVal.items.push(id);
        localStorage.setItem('favs', JSON.stringify(curVal));
     } else {
        localStorage.setItem('favs', JSON.stringify({items:[id]}));
     }
}

const removeFavs = (id) => {
  let curVal = JSON.parse(localStorage.getItem('favs'));
  const index = curVal.items.indexOf(id);
  if(index > -1) {curVal.items.splice(index,1)};
  localStorage.setItem('favs', JSON.stringify(curVal)); 
  localStorage.getItem('favs');
}

setFavs();