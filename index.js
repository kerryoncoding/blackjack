let player = {
    name: "Player Chips",
    chips: 200
}

let firstCard = 0
let secondCard = 0
let dealerFirstCard = 0
let dealerSecondCard = 0
let playerCards = []
let dealerCards = []
let playerSum = 0
let currentBet = 0
let pot = 0
let buttons = ""
let message = "Want to Play?"
let dealerCardsEl = document.querySelector(".dealerCards-el")
let playerCardsEl = document.querySelector(".playerCards-el")
let infoMessageEl = document.querySelector(".infoMessage-el")
let statInfoEl = document.querySelector(".statInfo-el")

let cardsEl = document.getElementById("cards-el")
let showButtons = document.querySelector(".ActiveButtons")

// playerEl.textContent = player.name + ": $" + player.chips

/// new below

function renderDealerCards() {
    dealerCardsEl.innerHTML =
    `<div class="playerBox">
          <p id="dealer-el">Dealer's Hand: X ${dealerCards[1]}</p>
    </div>`
}

function renderPlayerCards() {
    let hand = ""
    for (let i = 0; i < playerCards.length; i++) {
        hand += playerCards[i] + " "
    }
    playerCardsEl.innerHTML = 
    `<div class="playerBox">
          <p>Your's Hand: ${hand}</p>
          <p>Sum of Hand: ${playerSum}</p>
    </div>`
}

function renderInfoMessage() {
    infoMessageEl.innerHTML = 
    `<p>${message}</p>`
}

function renderButtons() {
    showButtons.innerHTML = `${buttons}`
}

function renderStatInfo() {
    statInfoEl.innerHTML = 
    `<p>Your Chips: $ ${player.chips}</p><p>Current Bet: $ ${currentBet}</p>`
}

renderInfoMessage()


//// new above


function startGame() {
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    playerCards = [firstCard, secondCard]
    playerSum = firstCard + secondCard
    dealerFirstCard = getRandomCard()
    dealerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard, dealerSecondCard]
    dealerSum = dealerFirstCard + dealerSecondCard
    renderBets()
    renderStatInfo()
}

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

function renderGame() {
    renderDealerCards()
    renderPlayerCards()
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
        buttons =
        `<div class="playerMove">
            <button onclick="stay()">STAY</button>
            <button onclick="newCard()">NEW CARD</button>
        </div>`
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        player.chips += pot;
        buttons =
        `<div class="bets">
          <button onclick="playAgain()">PLAY AGAIN</button>
        </div>`        
    } else {
        message = "House Wins!"
        buttons =
        `<div class="bets">
          <button onclick="playAgain()">PLAY AGAIN</button>
        </div>`
    }
   renderButtons()
   renderInfoMessage()  
}

function renderBets() {
    message = "Place your bet"
    buttons =
        `<div class="bets">
          <button onclick="betFive()">$5</button>
          <button onclick="betTen()">$10</button>
          <button onclick="betFifteen()">$15</button>
        </div>`
    renderInfoMessage()
    renderButtons()
}

function betFive() {
    currentBet = 5;
    player.chips -= 5;
    pot = 10;
    renderStatInfo();
    renderGame();
}

function stay() {
    //compare your hand with dealer's hand
    alert("show all cards")
    //if house wins
    if (playerSum > 1) {
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
    //messageEl.innerHTML = message
    renderInfoMessage()  
}

function playAgain() {
    currentBet = 0
    playerCards = []
    dealerCards = []
    startGame()
}


function newCard() {
        let hitCard = getRandomCard();
        playerSum += hitCard;
        playerCards.push(hitCard);
        renderGame();       
}
