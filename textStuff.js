//STUFF THAT YOU HAVE TO DO
//GET BATTLES TO WORK
//ADD MORE ITEMS
//USE CSS TO STYLE BETTER
//CHANGE BACKGROUNDS USING SOME SORT OF VARIABLE IN CERTAIN OBJECTS
//ADD A 'MEMORY' THING IN CERTAIN OBJECTS AND THEN STORE THEM IN AN ARRAY TO SHOW IN THE RESULTS SCREEN

import { story } from "./story.js";
import { shop } from "./shopitems.js";
import { enemy } from "./enemylist.js";

//DOM stuff
const nameEntry = document.getElementById('nameEnterer');
const submitName = document.getElementById('enterName');
const textBox = document.getElementById('story');
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a' ]
//Variables
let log = [];
let name = "Guy";
let talons = 300;
let healCount = 2;
let maxHP = 100;
let HP = 100;
let energy = 50;
let maxEnergy = 50;
let luck = 3;
let atk = 5;
let defense = 5;
let healCost = 20;
let shardCount = 0;
let elic = 'pizza';
let defendingStatus = false;
let agressive = false;
let bjCount = 0;
let textLog = document.getElementById('textLog');
let currentBlackjackBranch = 'dunno';
// konami code 
let konamiPosition = 0;

document.addEventListener('keyup', function(e) {
console.log (e.key)
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;
    
 
    if (konamiPosition === konamiCode.length) {
      activateComicSans();
      konamiPosition = 0;
    }
  } else {

    konamiPosition = 0;
  }
});

function activateComicSans() {
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: "Comic Sans MS", "Comic Sans", cursive !important;
    }
  `;
  document.head.appendChild(style);
}




const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = [
    { name: '2',  value: 2,  file: '02' },
    { name: '3',  value: 3,  file: '03' },
    { name: '4',  value: 4,  file: '04' },
    { name: '5',  value: 5,  file: '05' },
    { name: '6',  value: 6,  file: '06' },
    { name: '7',  value: 7,  file: '07' },
    { name: '8',  value: 8,  file: '08' },
    { name: '9',  value: 9,  file: '09' },
    { name: '10', value: 10, file: '10' },
    { name: 'jack',  value: 10, file: 'J' },
    { name: 'queen', value: 10, file: 'Q' },
    { name: 'king',  value: 10, file: 'K' },
    { name: 'ace',   value: 11, file: 'A' },
];

function buildDeck() {
    let deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                value: rank.value,
                img: `stupidimages/card_${suit}_${rank.file}.png`
            });
        }
    }
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

let deck = [];
let playerHand = [];
let dealerHand = [];

// Pops one card off the deck (removes it so it can't be dealt again)
function dealCard() {
    if (deck.length === 0) deck = buildDeck(); // reshuffle if somehow empty
    return deck.pop();
}


function calculateScore(hand) {
    let score = hand.reduce((sum, card) => sum + card.value, 0);
    let aces = hand.filter(card => card.value === 11).length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}


function renderBlackjack(showDealer, bjBranch) {
    textBox.innerHTML = '';

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);

    const container = document.createElement('div');

    // Helper: render a row of card images
    function cardRow(hand, hideSecond = false) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '6px';
        row.style.marginBottom = '8px';
        hand.forEach((card, i) => {
            const img = document.createElement('img');
        if (hideSecond && i === 1) {
                img.src = 'stupidimages/card_back.png'; // your card back image
            } else {
                img.src = card.img;
            }
            img.style.height = '100px';
            row.appendChild(img);
        });
        return row;
        }

    const title = document.createElement('strong');
    title.textContent = 'Blackjack';
    container.appendChild(title);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

    const yourLabel = document.createElement('p');
    yourLabel.textContent = `Your Hand (Score: ${playerScore})`;
    container.appendChild(yourLabel);
    container.appendChild(cardRow(playerHand));

    const dealerLabel = document.createElement('p');
    dealerLabel.textContent = showDealer
        ? `Dealer Hand (Score: ${dealerScore})`
        : `Dealer Hand`;
    container.appendChild(dealerLabel);
    container.appendChild(cardRow(dealerHand, !showDealer)); // hide dealer's second card

    textBox.appendChild(container);

    // Buttons
    const btnWrap = document.createElement('div');
    const hitBtn = document.createElement('button');
    hitBtn.innerText = 'Hit';
    hitBtn.classList.add('Hit');
    const standBtn = document.createElement('button');
    standBtn.innerText = 'Stand';
    standBtn.classList.add('Stand');
    btnWrap.appendChild(hitBtn);
    btnWrap.appendChild(standBtn);
    textBox.appendChild(btnWrap);

    hitBtn.onclick = blackjackHit(bjBranch);
    standBtn.onclick = blackjackStand(bjBranch);
}

// === START ===
function startBlackjack(branch) {
    currentBlackjackBranch = branch;
    deck = buildDeck(); // fresh shuffled deck each game
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(), dealCard()];
    renderBlackjack(false, currentBlackjackBranch);
}

// === HIT ===
function blackjackHit() {
    playerHand.push(dealCard());
    const score = calculateScore(playerHand);
    if (score > 21) {
        renderBlackjack(true);
        setTimeout(() => transition(currentBlackjackBranch.lose), 1000);
        return;
    }
    renderBlackjack(false);
}

// === STAND ===
function blackjackStand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    renderBlackjack(true);
    setTimeout(() => {
        if (dealerScore > 21 || playerScore > dealerScore) {
            transition(currentBlackjackBranch.win);
        } else {
            transition(currentBlackjackBranch.lose);
        }
    }, 1000);
}

// === START ===



function updateTalons() {
    const talonElements = document.getElementsByClassName('talons');
    for (let i = 0; i < talonElements.length; i++) {
        talonElements[i].textContent = talons;
    }
}

// === UPDATE STATS DISPLAY (Health and Energy) ===
function updateStats() {
    // Update health display and progress bar
    const healthElements = document.getElementsByClassName('health');
    const healthBars = document.getElementsByClassName('healthBar');
    for (let i = 0; i < healthElements.length; i++) {
        healthElements[i].textContent = HP;
    }
    for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].value = HP;
        healthBars[i].max = maxHP;
    }
    
    // Update energy display and progress bar
    const energyElements = document.getElementsByClassName('energy');
    const energyBars = document.getElementsByClassName('energyBar');
    for (let i = 0; i < energyElements.length; i++) {
        energyElements[i].textContent = energy;
    }
    for (let i = 0; i < energyBars.length; i++) {
        energyBars[i].value = energy;
        energyBars[i].max = maxEnergy;
    }
}

//functions



//functions
//branch logic
function transition(t) {
    // Update stats display
    updateStats();
    const branch = story[`${t}`];
    console.log(branch);
    console.log(branch.text);
    textBox.innerHTML = '';
    //basic story
    if (branch.trait) {
        if (trait == 'agressive') {
            agressive = true;
        }
    };
    if (branch.text) {
        let p = document.createElement('p');
        p.innerHTML = `${branch.text}`;
        textBox.appendChild(p);
        console.log(p);
        log.push(branch.text);
    }
    if (branch.img) {
        let img = document.createElement('img');
        img.src = `url(${branch.img})`;
        if (branch.alt) {
            img.alt = `${branch.alt}`
        }
        textBox.appendChild(img);
        console.log(p);
    }
    if (branch.choice) {
        let btnArr = document.createElement('div');
        btnArr.classList.add('choices');
        for (let index = 0; index < branch.choice.length; index++) {
            const btnText = branch.choice[index];
            const path = branch.choiceId[index];
            console.log(btnText);
            console.log(path);
            if (path === 'results') {
                shardCount++;
            }
            if (path === 'dimensionSwordEnd') {
                if (shardCount > 6) {
                    const button = document.createElement('button');
                    button.classList.add('SWORD')
                    button.addEventListener('click', function() {
                        transition(path);
                    });
                    button.innerHTML =  btnText;
                    btnArr.appendChild(button);
                    console.log(btnArr);
                };
            }
        if (path === 'unquotaAggro') {
            if (agressive) {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition(path);
                });
                button.innerHTML =  btnText;
                btnArr.appendChild(button);
                console.log(btnArr);
            }
        }
        if (path === 'unquotaNice') {
            if (!agressive) {
                const button = document.createElement('button');
                button.addEventListener('click', function() {
                    transition(path);
                });
                button.innerHTML =  btnText;
                btnArr.appendChild(button);
                console.log(btnArr);
            }
        }
        else {
            const button = document.createElement('button');
            button.addEventListener('click', function() {
                transition(path);
            });
            button.innerHTML =  btnText;
            button.classList.add('choice')
            btnArr.appendChild(button);
            console.log(btnArr);
        };
        }
        textBox.appendChild(btnArr);
    };
    // Update talons if the branch has a talons property
    if (branch.talons !== undefined) {
        talons += branch.talons;
        updateTalons();
    }
    
    // Update maxHP if the branch has a maxHP property
    if (branch.maxHP !== undefined) {
        maxHP += branch.maxHP;
    }
    
    // Update maxEnergy if the branch has a maxEnergy property
    if (branch.maxEnergy !== undefined) {
        maxEnergy += branch.maxEnergy;
    }
    if (branch.type == 'battle') {
        const winPath = branch.win;
        const losePath = branch.lose;
        createBattle(t, winPath, losePath);
    };
    if (branch.type == 'blackjack') {
            startBlackjack(branch);
    };    
    if (branch.type == 'heal') {
        HP = maxHP;
        energy = maxEnergy;
    }
    if (branch.type == 'shop') {
        createShop(branch.inventory, branch.leave);
    }
}
//same thing but for the name since you only need it once
submitName.addEventListener('click', function() {
    name = nameEntry.value || 'Guy';
    console.log(name);
    transition('start');
})

function createShop(i, leaving) {
    //use the key function to create a shop here.
    textBox.innerHTML = '<h2>Shop</h2>';
    const things = shop[i];
    const stock = Object.keys(things);
    console.log(things);
    console.log(stock);
    const shopItems = document.createElement('div');
    shopItems.classList.add('itemList');
    for (const item of stock) {
        console.log(item);
        const itemBox = document.createElement('section');
        const textStuff = document.createElement('section');
        const buyButton = document.createElement('button');
        const itemTitle = document.createElement('h3');
        const itemDesc = document.createElement('p');
        itemTitle.innerHTML = item.name;
        itemDesc.innerHTML = item.desc;
        textStuff.appendChild(itemTitle);
        textStuff.appendChild(itemDesc);
        textStuff.classList.add('itemText');
        for (const thingy of stock) {
            if (thingy === item) {
                itemBox.classList.add('bought');
                buyButton.innerHTML = 'Bought!';
                return;
            }
            else {
                itemBox.classList.add('unbought');
                buyButton.innerHTML = `${item.price} Talons`;
            }
            itemBox.addEventListener('click', function() {
                if (talons >= item.price) {
                    buyItem(item);
                    createShop(i, leaving);
                };
            })
        }
        itemBox.appendChild(textStuff);
        itemBox.appendChild(buyButton);
        shopItems.appendChild(itemBox);
        shopItems.appendChild(buyButton);
        console.log(shopItems)
    }
    const leavebutton = document.createElement('button');
    leavebutton.innerHTML = 'Leave';
    leavebutton.classList.add = 'leavebtn';
    textBox.appendChild(shopItems);
    leavebutton.addEventListener('click', function() {
        transition(leaving);
    });
}


function createBattle(idName, winpath, losepath) {
    console.log(`Battling ${idName}`)
    //boring
    textBox.innerHTML = `<section id="commBox"><span id="comm">What will ${name} do?</span></section>`;
    textBox.innerHTML += '<div id="mve"><div id="human"><div id="hhp"><p>Health: <span class="health"></span><progress class="healthBar"></progress></p></div><div id="he"><p>Energy: <span class="energy"></span><progress class="energyBar"></progress></p></div><img src="stupidimages/THESWORD.png" alt="You"><span class="name"></span></div>';
    textBox.innerHTML += '<div id="fiend"><div id="ehp"><p>Health: <span class="ehealth"></span><progress class="ehealthBar"></progress></p></div><div id="ee"><p>Energy: <span class="eenergy"></span><progress class="eenergyBar"></progress></p></div><img src="#" alt="The enemy!"><span class="ename"></span></div></div>';
    textBox.innerHTML += '<div id="buttonlist"></div>';

    const commentary = document.getElementById('comm');
    const butonDiv = document.getElementById('buttonlist');

        //stats
        let foe = enemy[`${idName}`];
        console.log(foe);
        const enName = foe.name;
        const enAtk = foe.attack;
        const enDef = foe.defense;
        const enLuck = foe.luck;
        const enMaxhp = foe.maxhp;
        const enHealCost = foe.healCost;
        const enMaxe = foe.maxenergy;
        const enWaste = foe.waste;
        let enDefending = foe.defending;
        let enhp = enMaxhp;
        let ene = enMaxe;
        const actions = foe.actions;

    

        //attack, defend, heal, and waste turn (enemy only)
        function defend(d, n) {
            d = true;
            commentary.innerHTML = `${n} is on guard.`
        }
        function heal(e, c, h, m, l, n, d) {
            console.log(e, c, h, m, l, n, d);
            d = false;
            if (c >= e) {
                const healt = (Math.round(Math.random() * 10 * l));
                h =+ healt;
                e -= c;
                if (h > m) {
                    h = m;
                    commentary.innerHTML = `${n} fully restores thier HP!`
                }
                else {
                    commentary.innerHTML = `${n} heals for ${healt} health!`
                }
            }
            else {
                commentary.innerHTML = `${n} tries to heal. But it failed!`
            }
        }
        function waste(w) {
            commentary.innerHTML = `${w}`
        }
        //A = attacker stat, B = defender stat
        function attack(aA, dA, dB, dsA, dsB, lA, lB, nA, nB, hA, hB) {
            dsA = false;
            if (dsB) {
                damage = (math.round(math.random() * lB * dB/2) - dA/2)
                if (damage < 0) {
                    damage = 0;
                }
                hA = hA - damage;
                if (hA < 0) {
                    hA = 0;
                };
                dsB = false;
                commentary.innerHTML = `${nA} attacks! But ${nB} counters and attacks for ${damage} health!`;
            }
            else {
                damage = (math.round(math.random() * lA * aA/2) - dB/2);
                if (damage < 0) {
                    damage = 0;
                }
                hB -= damage;
                if (hB < 0) {
                    hB = 0;
                };
                commentary.innerHTML = `${nA} attacks! ${damage} damage dealt to opposing ${nB}!`
            }
        }
        function enemyMove() {
            const move = actions[(Math.round(Math.random() * actions.length))]
            if (move == 'attack') {
                attack(enAtk, attack, defense, enDefending, defendingStatus, enLuck, luck, enName, name, enhp, HP);
            }
            else if (move == 'defend') {
                defend(enDefending, enName);
            }
            else if (move == 'heal') {
                heal(ene, enHealCost, enhp, enMaxhp, enLuck, enName, enDefending);
            }
            else {
                waste(enWaste);
            }
        }
        function createTransitionButton() {
            const stuff = document.createElement('button');
            stuff.classList.add('choice');
            stuff.innerHTML = 'Next -->';
            butonDiv.innerHTML = '';
            butonDiv.appendChild(stuff);
            
            if (enhp != 0 && HP != 0) {
                enemyMove();
                stuff.addEventListener('click', function() {
                    guyTurn();
                })
            }
            else if (enhp == 0) {
                commentary.innerHTML = `You beat ${enName}!`
                stuff.addEventListener('click', function() {
                    transition(winpath);
                })
            }
            else if (HP == 0) {
                    commentary.innerHTML = `You lost to ${enName}!`
                    stuff.addEventListener('click', function() {
                        transition(losepath);
                    })
            }
            else {
                
            }
        }


        function guyTurn() {
            butonDiv.innerHTML='';
            const attackButton = document.createElement('button');
            attackButton.classList.add('attack');
            attackButton.innerHTML = 'Attack!';
            attackButton.addEventListener('click', function() {
                attack(atk, enAtk, enDef, defendingStatus, enDefending, luck, enLuck, name, enName, HP, enhp);
            })
            const defendButton = document.createElement('button');
            defendButton.classList.add('defend');
            defendButton.innerHTML = 'Defend';
            defendButton.addEventListener('click', function() {
                defend(defendingStatus, name);
                createTransitionButton();
            })
            const healButton = document.createElement('button');
            healButton.classList.add('Heal');
            healButton.innerHTML = `Heal (${healCost} Energy)`;
            healButton.addEventListener('click', function() {
                heal(energy, healCost, HP, maxHP, luck, name, defendingStatus);
                createTransitionButton();
            })
            butonDiv.appendChild(attackButton);
            butonDiv.appendChild(defendButton);
            butonDiv.appendChild(healButton);

            //DEBUG ONLY - REMOVE WHEN THE BATTLE FUNCTION IS ACTUALLY FIXED
            const winbtn = document.createElement('button');
            const losebtn = document.createElement('button');
            winbtn.innerHTML = "Win Match (Debug option until battles are fully fleshed out)";
            losebtn.innerHTML = "Lose Match (Debug option until battles are fully fleshed out)";
            winbtn.addEventListener('click', function() {
                transition(winpath);
            })
            losebtn.addEventListener('click', function() {
                transition(losepath);
            })
            butonDiv.appendChild(winbtn);
            butonDiv.appendChild(losebtn);
        }
        guyTurn();
}

//shoppingList
