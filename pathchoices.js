let log = [];
let allPaths = document.getElementsByClassName('menuC');
let allChoices = document.getElementsByClassName('path');
//button structure: button.path.OTHERCLASSNAME

console.log(allChoices);
console.log(allPaths)

function start() {
    if (!document.getElementsByClassName('active')[0]) {
        document.getElementById('enterName').classList.add('active');
        document.getElementById('enterName').classList.remove('menuC');
    }
    
}

function choiceMade(C) {

}

start();



for (let index = 0; index < allChoices.length; index++) {
    const choice = allChoices[index];
    choice.addEventListener('click', function () {
        choiceMade(choice);
    });
};


