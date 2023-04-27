// selezionare gli elementi del DOM
const eleHelp = document.querySelector('.help');
const eleGrid = document.querySelector('.grid');
const btnPlay = document.querySelector('#play');
const selectLevel = document.querySelector('#level');

let nCells;
let arrMines;
let score;


btnPlay.addEventListener('click', function() {
	// nascondere il messaggio
	eleHelp.classList.add('hidden');

	// mostrare la griglia
	eleGrid.classList.remove('hidden');

	// leggere il livello per determinare il numero di celle
	nCells = parseInt(selectLevel.value);

	// aggiustare lo style della griglia
	eleGrid.style.setProperty('--sideSquare', Math.sqrt(nCells));

	// generare array con le bombe
	arrMines = generateRandomArray(1, nCells, 16);
	console.log(arrMines);

	// inizializziamo il punteggio
	score = 0;

	// generare la griglia
	createGrid(nCells, eleGrid);
});





/* FUNCTION DEFINITIONS */
function createGrid(nCells, eleContainer) {
	console.log(nCells);

	const side = Math.sqrt(nCells);

	// pulisco il container dall'eventuale griglia precedente
	eleContainer.innerHTML = '';

	for (let i = 1; i <= nCells; i++) {
		// creaiamo la cella e la formattiamo
		const eleCell = document.createElement('div');
		eleCell.innerHTML = i;
		eleCell.classList.add('cell');
		arrMines.includes(i) ? eleCell.classList.add('mine-helper') : '';
		eleContainer.append(eleCell);
		// aggiungere l'event listener alla cella appena creata
		eleCell.addEventListener('click', cellClick);
	}
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateRandomArray(min, max, nElements) {
	let arr = [];
	for (let i = 0; i < nElements; i++) {

		let randomNum;
		do {
			randomNum = getRandomInteger(min, max);
		} while (arr.includes(randomNum))

		arr.push(randomNum);
	}

	return arr;
}

function cellClick() {
	const numCell = parseInt(this.innerHTML);
	this.removeEventListener('click', cellClick);
	if (arrMines.includes(numCell)) {
		this.classList.add('mine');
		endGame(true,  'Hai perso. Punteggio: ' + score);
	} else {
		this.classList.add('clicked');
		score++;
		if (nCells - score == 16) {
			endGame(false, 'Hai vinto. Punteggio: ' + score);
		}
	}
}

function endGame(isLost, message) {
	// togliere gli event listener ed illuminare tutte le bombe
	const cells = document.querySelectorAll('.cell');
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', cellClick);
		const numCell = parseInt(cells[i].innerHTML);
		isLost && arrMines.includes(numCell) ? cells[i].classList.add('mine') : '';
	}
	// dire il punteggio
	console.log(message);
}
