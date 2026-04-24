//BORING dom stuff
let log = [];
const allPaths = document.getElementsByClassName('menuC');
const allChoices = document.getElementsByClassName('path');
const textBox = document.getElementById('currentSection');
const hiddenText = document.getElementById('ancientNews');
const healthBar = document.getElementsByClassName('healthBar');
const energyBar = document.getElementsByClassName('energyBar');
const healthCount = document.getElementsByClassName('health');
const energyCount = document.getElementsByClassName('energy');
const talonCount = document.getElementsByClassName('talons');
const everySingleDamnButton = document.querySelectorAll('button');
const enterName = document.getElementsByClassName('path start')[0];
const atkBtn = document.getElementsByClassName('attack')[0];
const defBtn = document.getElementsByClassName('defend')[0];
const healBtn = document.getElementsByClassName('heal')[0];
//button structure: button.path.OTHERCLASSNAME

//EPIC AND AWESOME stats
let maxhp = 100;
let hp = 100;
let maxE = 80;
let E = 80;
let atk = 1;
let def = 5;
let talons = 0;
let defending = false;
const inv = [];
let name = "Guy";
let elic = "pizza";

//list of STATS for COOL AND INTIMIDATING ENEMIES
let currentEnemy = {}



const encounterList = [
    {
        name: 'Robber',
        image: '#',
        alt: 'An enemy robber!',
        maxHp:
    }, 

]


function updateBars(HP, H, EP, E, T) {
    healthCount.innerHTML = `${H} / ${HP}`;
    energyCount.innerHTML = `${E} / ${EP}`;
    healthBar.max = HP;
    healthBar.value = H;
    energyBar.max = EP;
    energyBar.value = E;
    talons.innerHTML = `${T}`;
}


let currentPath = 'start';
console.log(allChoices);
console.log(allPaths);

function start() {
    if (!document.getElementsByClassName('active')[0]) {
        nameEntry = document.getElementById('enterName');
        nameEntry.classList.add('active');
        nameEntry.classList.remove('menuC');
        textBox.appendChild(nameEntry);
    }
    
}

function savename() {
    box = document.getElementById('nameEnterer').value || 'Guy';
    console.log(box);
    name = `${box}`;
}

function choiceMade(c) {
    console.log(c);
    oldNews = document.getElementsByClassName('active')[0];
    console.log(oldNews);
    oldNews.classList.add('menuC');
    oldNews.classList.remove('active');
    hiddenText.appendChild(oldNews);
    pathClass = `${c.classList[1]}`;
    currentPath = pathClass;
    console.log(pathClass);
    newPath = document.getElementById(pathClass);
    console.log(newPath);
    newPath.classList.add('active');
    newPath.classList.remove('menuC');
    textBox.appendChild(newPath);
}

function attack(atkStat, defStat, enemyDef, Hp, oppHp, defendingStatus, status, name, luckStat, enemyLuck) {
    if (!defendingStatus) {
        const multiplier = Math.round((Math.random() * luckStat) + 1);
        const damage = (atkStat * multiplier) - enemyDef;
        if (damage < 0) {damage=0} //falback if defense is higher than attack
        const remaining = oppHp - damage;
        status.innerHTML = `${name} Attacks! ${damage} damage dealt!`
        return remaining;
    }
    else if (defendingStatus) {
        const multiplier = Math.round(Math.random() * enemyLuck + 1);
        const damage = (enemyDef * multiplier) - defStat;
        if (damage < 0) {damage=0};
        const remaining = Hp - damage;
        status.innerHTML = `${name} is countered! ${damage} damage reflected!`
        return remaining;
    }
}

function defend(defStatus, status, name) {
    defStatus = !defStatus //sets from true to false and vice versa
    status.innerHTML = `${name} is on guard.`
}

function heal(energy, healCost, status, Hp, name, luck) {
    if (energy < healCost) {
        status.innerHTML = `${name} tried to heal. But it failed!`;
    }
    else if (energy >= healCost) {
        healAmount = (Math.round(Math.random() * 5 * luck));
        Hp += healAmount;
        status.innerHTML = `${name} tried to heal. ${healCost} health healed!`;
    };
}



start();
// event listeners
for (let index = 0; index < allChoices.length; index++) {
    const choice = allChoices[index];
    choice.addEventListener('click', function () {
        choiceMade(choice);
    });
};
enterName.addEventListener('click', function () {
    savename();
})
