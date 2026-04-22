let log = [];
let allPaths = document.getElementsByClassName('menuC');
let allChoices = document.getElementsByClassName('path');
let textBox = document.getElementById('currentSection');
let hiddenText = document.getElementById('ancientNews')
//button structure: button.path.OTHERCLASSNAME
let currentPath = 'start';
console.log(allChoices);
console.log(allPaths)

function start() {
    if (!document.getElementsByClassName('active')[0]) {
        nameEntry = document.getElementById('enterName');
        nameEntry.classList.add('active');
        nameEntry.classList.remove('menuC');
        textBox.appendChild(nameEntry);
    }
    
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

start();



for (let index = 0; index < allChoices.length; index++) {
    const choice = allChoices[index];
    choice.addEventListener('click', function () {
        choiceMade(choice);
    });
};


