// dichiarazione btn play
let btnPlay = document.getElementById("btn_play");

// dichiarazione btn reset
let reset = document.getElementById("btn_refresh");

// dichiarazione input select
let difficulty = document.getElementById("difficulty");

// dichiarazione container output
let containerOutput = document.getElementById("containerOutput");

// dichiarazione contenitore celle (griglia)
let containerGrid = document.createElement('div');

// dichiarazione celle 
let cell = document.createElement('div');

// numero di celle da stampare nella griglia
let numeroBox = 0;

// array vuoto che dovrà contenere i numeri da 1 a "numeroBox" da stampare per ogni cella
let numberCell = [];

// array vuoto per le 16 "bombe"
var sediciBombe = [];



//------------------------------------ funzione al click ------------------------------------//
btnPlay.addEventListener("click", function(){
    
    // condizioni in base alla difficoltà
    if ( difficulty.value === 'Easy' ) {
        numeroBox = 100;
    } else if ( difficulty.value === 'Medium' ) {
        numeroBox = 81;
        // viene modificato lo stile dell'intero documento
        document.documentElement.style.setProperty('--row-col-number', '9');
    } else if ( difficulty.value === 'Hard' ) {
        numeroBox = 49;
        // viene modificato lo stile dell'intero documento
        document.documentElement.style.setProperty('--row-col-number', '7');
    }

    // dichiarazione contenitore celle (griglia)
    let containerGrid = document.createElement('div');
    containerGrid.classList.add('grid');
    containerOutput.appendChild(containerGrid);

    // ciclo per pushare in ordine i numeri nell'array "numberCell"
    for (let k = 1; k <= numeroBox; k++) {
        numberCell.push(k);
    }
    // dichiarazione variabile contenente ordine casuale dei valori da 1 a "numeroBox"
    numberCell = shuffle(numberCell);

    // array per estrarre i primi 16 valori (bombe)
    sediciBombe = numberCell.slice(0,16);
    console.log(sediciBombe)

    // celle e numeri da stampare
    for (let i = 1; i <= numeroBox; i++) {
        let cell = document.createElement('div');
        cell.classList.add('box');
        containerGrid.appendChild(cell);

        cell.innerHTML += `${i}`;
    
        cell.addEventListener('click', clickCell);
        // console.log(clickCell)
    }
    
},{once:true}
) 

// evento al click refresh pagina (reset)
reset.addEventListener('click', function(){
    location.reload();
}
)

// algoritmo Fisher-Yates shuffle --> funzione per ordinare in modo casuale gli elementi di un'array
function shuffle(array) {
    for (let a = array.length - 1; a > 0; a--) {
      let j = Math.floor(Math.random() * (a + 1));
      [array[a], array[j]] = [array[j], array[a]];
    }
    return array
}

// funzione all'evento click sulle celle --> condizione per verificare se è o non è una bomba
function clickCell () {
    if (sediciBombe.includes(parseInt(this.innerHTML))) {
        cell.removeEventListener("click", clickCell);
        this.classList.add('boom');
    } else {
        this.classList.add('clicked');
    }
}