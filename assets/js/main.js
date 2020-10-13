const documentStyle = document.documentElement.style;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const title = main.querySelector('.game__title');

documentStyle.setProperty('--nav-spacer', `${header.clientHeight + 30}px`);

//console.log(title);

let initialDropbox;
let finalDropbox;
let score = 0;

function allowDrop(event) {
    event.preventDefault();
    console.log(getComputedStyle(event.target).getPropertyValue(`--color-${event.target.id.split('-')[1]}`));
    
    if(getComputedStyle(event.target).getPropertyValue(`--color-${event.target.id.split('-')[1]}`) === 'red' 
    || getComputedStyle(event.target).getPropertyValue(`--color-${event.target.id.split('-')[1]}`) === 'green'){

    }else{
        documentStyle.setProperty(`--color-${event.target.id.split('-')[1]}`, `blue`);
    }
}

function leaveDrop(event) {
    event.preventDefault();
    if(getComputedStyle(event.target).getPropertyValue(`--color-${event.target.id.split('-')[1]}`) === 'red' 
    || getComputedStyle(event.target).getPropertyValue(`--color-${event.target.id.split('-')[1]}`) === 'green'){

    }else{
        documentStyle.setProperty(`--color-${event.target.id.split('-')[1]}`, `#aaaaaa`);
    }
}
  
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    initialDropbox = event.target.parentNode.id; 
}
  
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    finalDropbox = event.target.id;
    if(finalDropbox.split('-')[1] === 'general'){
        documentStyle.setProperty(`--color-${initialDropbox.split('-')[1]}`, `#aaaaaa`);
        score -= 1;
        title.firstChild.nodeValue = `Matching Game - ${score}`;
    }else{ 
        isMatch(data);
    }
}

function isMatch(element){
    let dropboxType = finalDropbox.split('-')[1]
    if(element === dropboxType){
        documentStyle.setProperty(`--color-${element}`, `green`);
        score += 1;
        title.firstChild.nodeValue = `Matching Game - ${score}`;
    }else{
        documentStyle.setProperty(`--color-${dropboxType}`, `red`);
    }
    console.log(initialDropbox, element, finalDropbox);
}