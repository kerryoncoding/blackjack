let player = {
    name: "Player Name TBD",
    chips: 100
}

let firstCard = 0
let secondCard = 0
let dealerFirstCard = 0
let dealerSecondCard = 0
let playerHasAce = false;
let hitDealer = 0
let playerCards = []
let dealerCards = []
let playerSum = 0
let currentBet = 0
let value = 0
let pot = 0
let buttons = ""
let message = "Want to Play?"
let dealerCardsEl = document.querySelector(".dealerCards-el")
let playerCardsEl = document.querySelector(".playerCards-el")
let infoMessageEl = document.querySelector(".infoMessage-el")
let statInfoEl = document.querySelector(".statInfo-el")
let showButtons = document.querySelector(".ActiveButtons")


function renderDealerCards() {
    dealerCardsEl.innerHTML =
    `<div class="playerBox">
          <p>Dealer's Hand: X ${dealerCards[1]}</p>
    </div>`
}

function renderAllDealerCards() {
    let dealerHand = ""
    for (let i = 0; i < dealerCards.length; i++) {
        dealerHand += dealerCards[i] + " "
    }
    dealerCardsEl.innerHTML =
    `<div class="playerBox">
          <p>Dealer's Hand: ${dealerHand}</p>
          <p>Sum of Hand: ${dealerSum}</p>
    </div>`
}

function renderPlayerCards() {
    let hand = ""
    for (let i = 0; i < playerCards.length; i++) {
        hand += playerCards[i] + " "
    }
    playerCardsEl.innerHTML = 
    `<div class="playerBox">
          <p>Your Hand: ${hand}</p>
          <p>Sum of Hand: ${playerSum}</p>
    </div>`
}

function clearTable() {
    dealerCardsEl.innerHTML = `<div></div>`
    playerCardsEl.innerHTML = `<div></div>`
}

function renderInfoMessage() {
    infoMessageEl.innerHTML = 
    `<h3>${message}</h3>`
}

function renderButtons() {
    showButtons.innerHTML = `${buttons}`
}

function renderStatInfo() {
    statInfoEl.innerHTML = 
    `<p>Your Chips: $ ${player.chips}</p><p>Pot Value: $ ${pot}</p>`
}

renderInfoMessage()

///////////////

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

function renderBets() {
    message = "Place your bet"
    if (player.chips >= 15) {
        buttons =
        `<div class="bets">
          <button onclick="betFive()">$5</button>
          <button onclick="betTen()">$10</button>
          <button onclick="betFifteen()">$15</button>
        </div>`
    } else if (player.chips >= 10) {
        buttons =
        `<div class="bets">
          <button onclick="betFive()">$5</button>
          <button onclick="betTen()">$10</button>
        </div>`
    } else {
        buttons =
        `<div class="bets">
          <button onclick="betFive()">$5</button>
        </div>`
    }
    renderInfoMessage()
    renderButtons()
}

function betFive() {
    value = 5
    logBet()
}

function betTen() {
    value = 10
    logBet()
}

function betFifteen() {
    value = 15
    logBet()
}

function logBet() {
    currentBet = value;
    player.chips -= value;
    pot = value*2;
    renderStatInfo();
    ///  renderGame();
    checkforBlackjack()
}

function checkforBlackjack() {
    renderDealerCards();
    renderPlayerCards();
    if  ((firstCard + secondCard === 21)) {
        message = "You've got Blackjack!"
        player.chips += pot;
        playAgainButton();
        renderInfoMessage(); 
    } else {
        renderGame();
    }
}

function renderGame() {
    renderDealerCards()
    renderPlayerCards()
    message = "Do you want to draw a new card?"
    buttons =
    `<div class="playerMove">
        <button onclick="stay()">STAY</button>
        <button onclick="newCard()">NEW CARD</button>
    </div>`      
   renderButtons()
   renderInfoMessage()  
}

function newCard() {
        let hitCard = getRandomCard();
        playerSum += hitCard;
        playerCards.push(hitCard);
        renderPlayerCards()
        checkBust();    
}

function checkBust() {
    if (playerSum < 22) {
        renderGame();
    } else {
        playerAceCheck()
        if (playerSum > 22 && playerHasAce === true) {
            swapAce();
            playerHasAce = false;
        } else {
            message = "House Wins!"
            renderPlayerCards();
            renderInfoMessage();
            playAgainButton()
            renderButtons(); 
        }        
    }
}

function playerAceCheck() {
    for (let i = 0; i < playerCards.length; i++) {
        if (playerCards[i]=== 11) {
            playerHasAce = true;
        } 
    }
}

function swapAce() {
    for (let i = 0; i < playerCards.length; i++) {
        if (playerCards[i]=== 11) {
            alert("ace found");
            playerCards[i] = 1;
            playerSum -= 10;
            renderPlayerCards();
            checkBust();
    }
}
}












function playAgainButton() {
    buttons =
            `<div class="bets">
            <button onclick="playAgain()">PLAY AGAIN</button>
            </div>`
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





function stay() {
    dealerPlay()
    if (playerSum > dealerSum || dealerSum > 21) {
        message = "You win!"
        player.chips += pot;
        renderAllDealerCards()
        playAgainButton() 
    } else if(playerSum === dealerSum) {
        message = "It's a Tie!"
        player.chips += currentBet;
        renderAllDealerCards()
        playAgainButton() 
    }else {
        message = "House wins!"
        renderAllDealerCards();
        playAgainButton();
    }
    renderInfoMessage()
    renderButtons()  
}








function dealerPlay() {
    if (dealerSum < 17) {
        hitDealer = getRandomCard();
        dealerSum += hitDealer;
        dealerCards.push(hitDealer);
        dealerPlay();
    }     
}

function playAgain() {
    if(player.chips > 0) {
        pot = 0
        currentBet = 0
        playerCards = []
        dealerCards = []
        playerHasAce = false
        clearTable()
        startGame()
    } else {
        message = "You are out of Chips!"
        renderInfoMessage();
    }
}


