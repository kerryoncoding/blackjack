let player = {
    name: "Player Chips",
    chips: 200
}

let cards = []
let sum = 0
let pot = 0
let message = ""
let messageEl = document.getElementById("message-el")
//let playerCards = document.querrySelector(".playerCards-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let showButtons = document.querySelector(".ActiveButtons")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderBets()
}

function renderGame() {
    playerEl.textContent = player.name + ": $" + player.chips
    cardsEl.textContent = "Player's Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent = cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Total this Hand: " + sum
    if (sum <= 20) {
        console.log(sum);
        message = "Do you want to draw a new card?"
        renderPlayerMove();
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.chips += pot;
        showButtons.innerHTML =
        `<div class="bets">
          <button onclick="playAgain()">PLAY AGAIN</button>
        </div>`
    } else {
        message = "You're out of the game!"
        showButtons.innerHTML =
        `<div class="bets">
          <button onclick="renderBets()">PLAY AGAIN</button>
        </div>`
    }
    messageEl.innerHTML = message   
}

function renderBets() {
    message = "Place your bet"
    messageEl.innerHTML = message
    showButtons.innerHTML =
        `<div class="bets">
          <button onclick="betFive()">$5</button>
          <button onclick="betTen()">$10</button>
          <button onclick="betFifteen()">$15</button>
        </div>`
}

function betFive() {
    player.chips -= 5;
    pot = 10;
    renderGame();
}


function renderPlayerMove() {
    showButtons.innerHTML =
       `<div class="playerMove">
          <button onclick="stay()">STAY</button>
          <button onclick="newCard()">NEW CARD</button>
        </div>`
}

function stay() {
    //compare your hand with dealer's hand
    alert("show all cards")
    //if house wins
    if (sum > 1) {
        message = "You win!"
        player.chips += pot;
        playerEl.textContent = player.name + ": $" + player.chips
        showButtons.innerHTML =
            `<div class="bets">
            <button onclick="playAgain()">PLAY AGAIN</button>
            </div>` 
    } else {
         message = "The house wins"
        player.chips -= pot;
        playerEl.textContent = player.name + ": $" + player.chips
        showButtons.innerHTML =
            `<div class="bets">
            <button onclick="playAgain()">PLAY AGAIN</button>
            </div>`
    }
    messageEl.innerHTML = message  
}

function playAgain() {
    //restart game
    alert("play again")
    sum = 0;
}


function newCard() {
        let hitCard = getRandomCard();
        sum += hitCard;
        cards.push(hitCard);
        renderGame();       
}
