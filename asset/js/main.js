// bottone di inizio
let start = document.getElementById("btn_play");

// bottone di reset
let reset = document.getElementById("btn_refresh");

// dichiarazione input select
let difficulty = document.getElementById("difficulty");

// dichiarazione counter clicks
let counterClicks = document.getElementById('counter');

// numero di click
let clicks = 0;

// contenitore principale HTML
let containerOutput = document.getElementById('containerOutput');

// griglia e celle
let grid;
let cell;

// numero di celle da stampare nella griglia
let boxNumber = 0;

// array vuoto per numeri già stampati una volta
let shuffledNumbers =[];

// array vuoto che contiene le 16 bombe casuali
let sediciBombe = [];

// ANCHOR evento al click del btn PLAY (inizia il gioco)
start.addEventListener('click', function(){

    play();    
    // viene impostata la difficoltà e di conseguenza il numero delle celle per lato
    // checkDifficulty();
    
    // viene generata la griglia con le rispettive celle per ogni difficoltà
    // generateGrid();

    // generare le 16 bombe
    // generateBombs ();

    // clickCell();

}, {once:true}
)

// evento al click del btn RESET (si ricarica la pagina)
reset.addEventListener('click', function(){
    location.reload()
})


// funzione che fa partire il gioco (quando si clicca PLAY)
function play(){
    console.log("game started")

    // numero di tentativi
    const attempts = [];

    const cellNumber = checkDifficulty();
    console.log(cellNumber);

    // funzione per impostare la difficoltà e di conseguenza le dimensioni della griglia
    function checkDifficulty(){
        if ( difficulty.value === 'Easy' ) {
            boxNumber = 100;
            return boxNumber
        } else if ( difficulty.value === 'Medium' ) {
            boxNumber = 81;
            // viene modificato lo stile dell'intero documento
            document.documentElement.style.setProperty('--row-col-number', '9');
            return boxNumber
        } else if ( difficulty.value === 'Hard' ) {
            boxNumber = 49;
            // viene modificato lo stile dell'intero documento
            document.documentElement.style.setProperty('--row-col-number', '7');
            return boxNumber
        }
    }

    generateGrid();

    // funzione per generare le griglie e le celle al suo interno (con ciclo FOR)
    function generateGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';
        containerOutput.appendChild(grid);
        
        for (let i = 1; i <= boxNumber; i++) {
                    
            const cell = document.createElement('div');
            cell.className = 'box';
            grid.appendChild(cell);

            // array con numeri da 1 a boxNumber
            shuffledNumbers.push(i);
            
            // stampare i numeri all'interno delle celle in HTML
            cell.innerHTML += `${i}`;

            cell.addEventListener('click', clickCell); 
        }
        
        shuffledNumbers = shuffle(shuffledNumbers);
        return cell;
    }

    const bombs = generateBombs();
    console.log(bombs);
    
    // funzione per generare le 16 bombe
    function generateBombs () {
        // array per estrarre i primi 16 valori (bombe)
        sediciBombe = shuffledNumbers.slice(0,16);

        // riordinare le bombe in ordine crescente nell'array
        sediciBombe = sediciBombe.sort( function compare(a,b){
            return a - b;
        })

        return sediciBombe;
    }

    // funzione all'evento click sulle celle --> condizione per verificare se è o non è una bomba
    function clickCell () {

        // selezione del numero contenuto nella singola cella sulla quale si clicca
        const cellNumber = parseInt(this.innerHTML);

        if (sediciBombe.includes(cellNumber)) {
            // fine del gioco se si clicca su una bomba
            endGame()
            
            // aggiunta classe alla cella (NO BOMBA)
        } else if (!attempts.includes(cellNumber)) {
            this.classList.add('clicked');
            
            // numero pushato all'interno dell'array "attempts"
            attempts.push(cellNumber);

            // si rimuove l'evento al click per le celle già cliccate
            this.removeEventListener('click', clickCell);

            // contatore di click sulle celle che non sono bombe
            clicks += 1;
            counterClicks.innerHTML = clicks;
        } 
    }

    // funzione per far terminare il gioco 
    function endGame () {

        // quando si una il "querySelectorAll" bisogna ciclare la variabile (che in questo caso è 
        // un array di dei div con classe "box") perchè si deve definire cosa fare su ogni singolo elemento        
        const boxes = document.querySelectorAll('.box');

        for (let i = 1, boxValue = boxes.length; i <= boxValue; i++) {
            
            // nuova variabile per ogni singolo elemento dell'array
            const box = boxes[i - 1];

            if (sediciBombe.includes(i)) {
                box.classList.add('boom');
            }
            
            box.removeEventListener('click', clickCell)
        }

    }
}

// funzione per generare numeri random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

// algoritmo Fisher-Yates shuffle --> funzione per ordinare in modo casuale gli elementi di un'array
function shuffle(array) {
    for (let a = array.length - 1; a > 0; a--) {
      let j = Math.floor(Math.random() * (a + 1));
      [array[a], array[j]] = [array[j], array[a]];
    }
    return array
}