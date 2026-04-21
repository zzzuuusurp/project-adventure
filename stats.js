let maxhp = 100;
let hp = 100;
let maxE = 80;
let E = 80;
let atk = 1;
let def = 5;
let talons = 0;
const inv = [];
const healthBar = document.getElementsByClassName('healthBar');
const energyBar = document.getElementsByClassName('energyBar');
const healthCount = document.getElementsByClassName('health');
const energyCount = document.getElementsByClassName('energy');
const talonCount = document.getElementsByClassName('talons');
const everySingleDamnButton = document.querySelectorAll('button')

function updateBars(HP, H, EP, E, T) {
    healthCount.innerHTML = `${H} / ${HP}`;
    energyCount.innerHTML = `${E} / ${EP}`
    healthBar.max = HP;
    healthBar.value = H;
    energyBar.max = EP;
    energyBar.value = E;
    talons.innerHTML = `${talonCount}`;
}

everySingleDamnButton.addEventListener('click', updateBars(maxhp, hp, maxE, E, talons))