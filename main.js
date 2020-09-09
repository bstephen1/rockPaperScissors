	console.log("Welcome to Xtreme RPS mega tournament grand PRIX 200X edition!")

	gameDiv = document.querySelector('#gameDiv');
	gameDiv.style.display = 'none';	
	initialSetup = document.querySelector('.initialSetup');
	const roundText = document.querySelector('#roundText');
	const btnR = document.querySelector('#btnR');
	const btnP = document.querySelector('#btnP');
	const btnS = document.querySelector('#btnS');
	const gameScores = document.querySelector('#gameScores');
	const eorMsg = document.querySelector('#eorMsg');
	const duringGameDiv = document.querySelector('#duringGameDiv');
	btnR.addEventListener('click', () => {gameRound(btnR.getAttribute('value'))});	
	btnP.addEventListener('click', () => {gameRound(btnP.getAttribute('value'))});	
	btnS.addEventListener('click', () => {gameRound(btnS.getAttribute('value'))});	


	const startbtn = document.querySelector('#gameStart');
	startbtn.addEventListener('click', () => {
		if(startbtn.textContent != "Restart?") {
			showGameButtons();
			startbtn.textContent = 'Restart?';
		}
		else {
			reset(); 
		}
	})

	function reset() {
		duringGameDiv.style.display = 'block';
		gameDiv.style.display = 'none';
		startbtn.textContent = 'Start game';
		initialSetup.style.display = 'block';
		gameScores.setAttribute('pScore', '0');
		gameScores.setAttribute('cpuScore', '0');
		eorMsg.textContent = '';
		
	}

	function showGameButtons() {
		gameDiv.style.display = 'block';
		initialSetup.style.display = 'none';
		const totalRounds = getChecked();
		console.log(totalRounds);
		roundText.textContent = `Playing best of ${totalRounds}`;
		roundText.setAttribute('totalRounds', totalRounds);
		//the problem was I wasn't calling .bind so it was CALLING
		//the function, not setting it
		updateScores(gameScores.getAttribute('pScore'),gameScores.getAttribute('cpuScore'));	
	}
		

	function updateScores(s1,s2) {
		gameScores.setAttribute('pScore', s1);
		gameScores.setAttribute('cpuScore', s2);
		gameScores.textContent = `You: ${s1} Cpu: ${s2}`;	
		if ((parseInt(s1)+parseInt(s2)) >= roundText.getAttribute('totalRounds')) {
			if (s1 > s2) {
					eorMsg.textContent = 'Game over! You win!';
			}
			else if (s2 > s1) {
					eorMsg.textContent = 'Game over! You lose :(';
			}	
			duringGameDiv.style.display = 'none';
		}
	}	

	//this seems sub optimal...
	function getChecked() {
		let radio = document.querySelectorAll('.numOfGames');
		for (let i = 0; i < radio.length; i++) {
			if(radio[i].checked) {
				return radio[i].getAttribute('value');
			}
		}
	}
	
	//1 beats 2 beats 0 beats 1
	function pickRoundWinner(p1, p2) {
		if ((p1 + 1) % 3 == p2) { return "p1"; }
		if ((p2 + 1) % 3 == p1) { return "p2"; }
		else return "tie";
	}

		
	//plays main game, against cpu
	function gameRound(pChoice) {
		const cpuChoice = Math.floor(Math.random()*3);
		const winner = pickRoundWinner(pChoice, cpuChoice);
		let winmsg;

		let pScore = gameScores.getAttribute('pScore');
		let cpuScore = gameScores.getAttribute('cpuScore');
		if (winner == "p1") {
			winmsg = "You win the round!";
			pScore++;
		}
		else if (winner == "p2") {
			winmsg = "You lose the round :("; 
			cpuScore++;
		}
		else { 
			winmsg = "It's a tie!";
		}
		eorMsg.textContent = winmsg;
		updateScores(pScore, cpuScore)	
		console.log('pChoice: ' + pChoice + ' cpuChoice: ' + cpuChoice);
		console.log('pScore: ' + pScore + ' cpuScore: ' + cpuScore);
	}
