let log = [];
let allPaths = document.getElementsByClassName('menuC');
let allChoices = document.getElementsByClassName('path');


function movePaths(choice) {
    const currentPathId = document.getElementsByClassName("active")[0].id;
    const currentPath = document.getElementById(currentPathId);
    currentPath.classList.remove('active');
    console.log(currentPath);
    //saving the text and images for the log
    const newLog = document.createElement('section');
    if (currentPath.querySelectorAll('p')[0]) {
        const pee = currentPath.querySelectorAll('p') || false;
    }
    if (currentPath.querySelectorAll('img')) {
        const imgee = currentPath.querySelectorAll('img') || false;
    }
    if (pee != false) {
        for (p in pee) {
            newLog.appendChild(p);
        };
    };
    if (imgee != false) {
        for (img in imgee) {
            newLog.appendChild(imgee);
        };
    };
    log.push(newLog);
    console.log(log);
    const path = choice.className;
    console.log(path);
    const newPath = document.getElementById(path);
    newPath.classList.add("active");
};

for (let index = 0; index < allChoices.length; index++) {
    const choice = allChoices[index];
    choice.addEventListener('click', movePaths(choice));
};