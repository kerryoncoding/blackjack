let player = {
    name: "Player Chips",
    chips: 200
}

let cards = []
let playerSum = 0
let currentBet = 0
let pot = 0
let buttons = ""
let message = "Want to Play?"
let dealerCardsEl = document.querySelector(".dealerCards-el")
let playerCardsEl = document.querySelector(".playerCards-el")
let infoMessageEl = document.querySelector(".infoMessage-el")
let statInfoEl = document.querySelector(".statInfo-el")

let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let showButtons = document.querySelector(".ActiveButtons")

playerEl.textContent = player.name + ": $" + player.chips

/// new below

function renderDealerCards() {
    dealerCardsEl.innerHTML =
    `<div class="playerBox">
          <p id="dealer-el">Dealer's cards here</p>
    </div>`
}

function renderPlayerCards() {
    playerCardsEl.innerHTML = 
    `<div class="playerBox">
          <p id="player-el"> players cards here</p>
          <p id="sum-el">player sum here</p>
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
    `<p>Player Chips: ${player.chips}</p><p>Current Bet: $ ${currentBet}</p>`
}

renderInfoMessage()


//// new above

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
    playerSum = firstCard + secondCard
    renderBets()
    renderStatInfo()
}

function renderGame() {
    renderDealerCards()
    renderPlayerCards()
   // playerEl.textContent = player.name + ": $" + player.chips
  //  cardsEl.textContent = "Player's Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent = cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Total this Hand: " + playerSum
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
          <button onclick="renderBets()">PLAY AGAIN</button>
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
    //restart game
    cardsEl.textContent = ""
    sumEl.textContent = ""
    cards = []
    playerSum = 0;
}


function newCard() {
        let hitCard = getRandomCard();
        playerSum += hitCard;
        cards.push(hitCard);
        renderGame();       
}
