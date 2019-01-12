/*
 * Create a list that holds all of your cards
 */
 const cardList = ["fa fa-diamond", "fa fa-diamond",
                  "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                  "fa fa-anchor", "fa fa-anchor",
                  "fa fa-bolt", "fa fa-bolt",
                  "fa fa-cube", "fa fa-cube",
                  "fa fa-leaf", "fa fa-leaf",
                  "fa fa-bicycle", "fa fa-bicycle",
                  "fa fa-bomb", "fa fa-bomb"
                ];

const ul = document.querySelector('.deck');
let openCards = [];
let matchedCards =[];
const restart = document.querySelector('.restart');
let cardMoves = 0;
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');
let timer = document.querySelector('.timer');
let totalSeconds = 0;


function startGame(){
  generateCards();
  // Start the timer when game loads
  timeInt = setInterval(countTimer, 1000);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Generating cards for the game dynamically
 */
function generateCards(){

  //Shuffle cards array
  shuffle(cardList);

  for (var i = 0; i < cardList.length; i++) {
        // Create DOM element
        const card = document.createElement('li');
        card.classList.add("card");
        card.innerHTML = `<i class = "${cardList[i]}"></i>`;
        // Append this element to its parent
        ul.appendChild(card);
        // Click event for cards
        clickCards(card);
    }
}


/*
 * Click event for cards
 */
function clickCards(card){
      card.addEventListener("click", function(){

          const currentCard = this;
          const previousCard = openCards[0];

          if(openCards.length === 1){

              card.classList.add("open", "show", "disable", "wiggle");
              openCards.push(this);
              //Compare two cards
              compareCards(currentCard, previousCard);
              //Add number of moves
              addMoves();

          } else {
              card.classList.add("open", "show", "disable", "wiggle");
              openCards.push(this);
          }
  });
}


/*
 * Compare cards
 */
 function compareCards(currentCard, previousCard){
        if(currentCard.innerHTML === previousCard.innerHTML){
              currentCard.classList.add("match");
              previousCard.classList.add("match");

              matchedCards.push(currentCard, previousCard);
              openCards = [];

              //Check if game is Over
              gameOver();

        } else {
              setTimeout(function(){
                  currentCard.classList.remove("open", "show", "disable");
                  previousCard.classList.remove("open", "show", "disable");
                }, 500);
                  openCards = [];
            }
 }


/*
 *Counting number of moves
 */
function addMoves(){
      cardMoves++;
      moves.innerHTML = cardMoves;
      starRating();
}


/*
 *Star rating system
 */
function starRating(){
      if(cardMoves <= 17){
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>`;
      } else if (cardMoves < 22 && cardMoves >= 18) {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>`;
      } else {
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }
}

/*
 * Timer functionality
 */
 function countTimer(){
   ++totalSeconds;
   let hour = Math.floor(totalSeconds/3600);
   let minute = Math.floor((totalSeconds - hour*3600)/60);
   let seconds = totalSeconds - (hour*3600 + minute*60);
   timer.innerHTML = ('0'  + minute).slice(-2)+':'+('0' + seconds).slice(-2);
 }

 // Reset the timer to default of 0 and the text on the webpage to 00:00
 function resetTimer(){
     clearInterval(timeInt);
     totalSeconds = 0;
     timer.innerHTML = `00:00`;
 }

 // Stop the timer
 function stopTimer(){
     clearInterval(timeInt);
 }


/*
 * Game Over functionality
 */
function gameOver(){
      if(cardList.length === matchedCards.length){
          stopTimer();
          //Display popup modal after 1sec delay so that all the card moves are completed
          setTimeout(function(){
            return displayPopup();
          }, 1000);
        }
}

/*
 * Reset functionality for Restart click and 'Play Again' button
 */
function reset(){
  ul.innerHTML = "";
  moves.innerHTML = 0;
  generateCards();
  openCards = [];
  matchedCards = [];
  cardMoves = 0;
  stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>
                    <li><i class="fa fa-star"></i></li>`;
  resetTimer();
  //Start timer
  timeInt = setInterval(countTimer, 1000);
  popupHide();
}

/*
 * Restart game functionality
 */
function restartGame(){
      restart.addEventListener("click", reset);
}
restartGame();

/*
 * Popup message functionality
 */
function buildPopup(){
  const container = document.querySelector('.container');
  let div =document.createElement('div');
  div.className = 'popupModal hide';
  div.innerHTML = '';
  container.appendChild(div);
}
buildPopup();

//Display popup after gameOver
function displayPopup(){
    const popup = document.querySelector('.popupModal');
    popup.className = 'popupModal';
    popup.innerHTML = `<h1 class="winMsg">Congratulations! You Won.</h1>
                    <p class="winMoves" > Moves taken: ${cardMoves}</p>
                    <p class="winTime" > Total time taken: ${timer.innerHTML} </p>
                    <p> Stars: <span class="stars">${stars.innerHTML}<span></p>
                    <button class="playAgain"> Play Again! </button>`;

    const play = document.querySelector('.playAgain');
        play.addEventListener('click', reset);
}

//Hide the popup modal
function popupHide() {
  let popupModal = document.querySelector('.popupModal');
    popupModal.className = ('popupModal hide');
    popupModal.innerHTML = '';
}



/*
 * Start the game for the first time
 */
startGame();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
