const rps = ['rock', 'paper', 'scissors']; // 0, 1, and 2
let you = 0;
let opp = 0;
let numOfRounds = 5;
let tiesAllowed = true; // Not used yet
let gameActive = false;

let tick = new Audio('https://orteil.dashnet.org/cookieclicker/snd/tick.mp3');

function bgChange(x) {
    if (x == 0) {
        document.documentElement.style.setProperty('--bg', '#593322');
        document.documentElement.style.setProperty('--bgImg', "url('../images/checker2.png')");
    } else {
        document.documentElement.style.setProperty('--bg', '#363644');
        document.documentElement.style.setProperty('--bgImg', "url('../images/checker1.png')");
    }
}

function again() {
    you = 0;
    opp = 0;
    gameActive = false;

    document.getElementById('you').innerHTML = you;
    document.getElementById('opp').innerHTML = opp;
    document.getElementById('action').innerHTML = 
    `<div id= 'arena'>
        <div id= 'yourMove'>
        </div>
        <div id= 'oppsMove'>
        </div>
    </div>`;
}

// ±Point, Tie, and Game Over screens
function score(x, y) {
    if (opp == numOfRounds) {
        document.getElementById('action').innerHTML = 
        `<div id= 'arenaALT'>
            <div id= 'yourMove'>
            </div>
            <div id= 'oppsMove'>
            </div>
            <div id= 'text'>
                <h1 class='gameOver' style='color:red;'>YOU LOSE!</h1>
                <h5 class='retry' onclick="again()">Try again?</h5>
            </div>
        </div>`;

    } else if (you == numOfRounds) {
        document.getElementById('action').innerHTML = 
        `<div id= 'arenaALT'> 
            <div id= 'yourMove'>
            </div>
            <div id= 'oppsMove'>
            </div>
            <div id= 'text'>
                <h1 class='gameOver' style='color:cyan;'>YOU WIN!</h1>
                <h5 class='retry' onclick="again()">Try again?</h5>
            </div>
        </div>`;

    } else {

        if (x == 'rock' && y == 'scissors') {
            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>Rock beats scissors!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;

        } else if (x == 'scissors' && y == 'rock') {
            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>Rock beats scissors!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;

        } else if (rps.indexOf(x) < rps.indexOf(y)) {
            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>${y.charAt(0).toUpperCase() + y.slice(1)} beats ${x}!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;

        } else if (rps.indexOf(x) > rps.indexOf(y)) {
            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>${x.charAt(0).toUpperCase() + x.slice(1)} beats ${y}!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;
            // The .charAt code makes a string's first letter uppercase
        }
    }
}



// Animations for possible 'non-tie' interactions --------------------------------------------------------------------------------------------------------------------
// Rock and scissors
function action_rs(x, y) {
    if (x == 'rock') {
        rock = x;
        sci = y;
        sideW = 'yourMove';
        sideL = 'oppsMove';
        facing = 'r';
        victor = 'You earn';
    } else {
        rock = y;
        sci = x;
        sideW = 'oppsMove';
        sideL = 'yourMove';
        facing = '';
        victor = 'Your opponent earns';
    }
    setTimeout(function(){
        sc1.play();
        document.getElementById(sideL).innerHTML = `<img src="./images/${sci+'2'+facing}.png" id="${'scissors_loseto_rock'+facing}">`;
        document.getElementById(sideW).innerHTML = `<img src="./images/${rock}.png" id="rock_attack_scissors">`;
        setTimeout(function(){
            sc2.play();
            document.getElementById(sideL).innerHTML = `<img src="./images/${'scissors'+facing}.png" id=${"brokenscissors"+facing}>`;
        }, 0800);
        setTimeout(function(){
            crush.play();
            document.getElementById(sideL).innerHTML = `<img src="./images/${'scissors3'+facing}.png" id=${"brokenscissors"+facing}>`;
        }, 1100);
        setTimeout(function(){
            document.getElementById(sideW).innerHTML = `<img src="./images/${rock}.png" style="position: relative; z-index: 10;">`;
            gameActive = false;
            console.log(gameActive);

            if (facing != 'r') {
                opp++;
                document.getElementById('opp').innerHTML = opp;
            } else {
                you++;
                document.getElementById('you').innerHTML = you;
            }
            score(x,y);/*
            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>Rock beats scissors!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;*/
        }, 2000);
    }, 0500);
}



// Paper and scissors
function action_ps(x, y) {
    if (x == 'paper') {
        paper = x;
        sci = y;
        sideW = 'yourMove';
        sideL = 'oppsMove';
        victor = 'Your opponent earns';
        facing = 'r';
    } else {
        paper = y;
        sci = x;
        sideW = 'oppsMove';
        sideL = 'yourMove';
        victor = 'You earn';
        facing = '';
    }
    document.getElementById(sideW).innerHTML = 
    `<img src="./images/paper3.png" class='${'paperdivide'+facing}'>
    <img src="./images/paper2.png" class='${'paperdivide2'+facing}'>`;
    setTimeout(function(){
        document.getElementById(sideL).innerHTML = `<img src="./images/${sci+'2'+facing}.png" id="${'scissors_winto_paper'+facing}">`;
        sc1.play();
		
        setTimeout(function(){
            sc2.play();
            document.getElementById(sideL).innerHTML = `<img src="./images/${'scissors'+facing}.png" id=${"scissorsrest"+facing}>`;
            document.getElementById(sideW).innerHTML = 
            `<img src="./images/paper2.png">`;
        }, 0800);
		
        setTimeout(function(){
            gameActive = false;
            console.log(gameActive);

            if (facing == 'r') {
                opp++;
                document.getElementById('opp').innerHTML = opp;
            } else {
                you++;
                document.getElementById('you').innerHTML = you;
            }
            score(x,y);/*

            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>Scissors beats paper!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;*/
        }, 2000);
    }, 0500);
}



// Paper and rock
function action_pr(x, y) {
    if (x == 'paper') {
        pap = x;
        roc = y;
        sideW = 'yourMove';
        sideL = 'oppsMove';
        facing = 'r';
        victor = 'You earn';
    } else {
        roc = y;
        pap = x;
        sideW = 'oppsMove';
        sideL = 'yourMove';
        facing = '';
        victor = 'Your opponent earns';
    }

    document.getElementById(sideL).innerHTML = 
    `<img src="./images/rock.png"  style="position: relative; z-index: 10;">`;

    document.getElementById(sideW).innerHTML = 
    `<img src="./images/paper.png" id='${'paper_win'+facing}'>`;
    setTimeout(function(){
        setTimeout(function(){
            document.getElementById(sideW).innerHTML = 
            `<img src="./images/paper4.png" id='paperclosein'>`;
            crumble.play();
        }, 0750);
        setTimeout(function(){
            document.getElementById(sideW).innerHTML = 
            ``;
            document.getElementById(sideL).innerHTML = 
            `<img src="./images/${'paper5' + facing + '.png'}">`;
        }, 0775);
        setTimeout(function(){
            document.getElementById(sideL).innerHTML = 
            `<img src="./images/paper6.png">`;
        }, 0900);
        setTimeout(function(){
            document.getElementById(sideL).innerHTML = 
            `<img src="./images/paper7.png">`;
        }, 1000);
        setTimeout(function(){
            document.getElementById(sideL).innerHTML = 
            `<img src="./images/paper8.png">`;
        }, 1100);
        setTimeout(function(){
            gameActive = false;
            console.log(gameActive);

            if (facing != 'r') {
                opp++;
                document.getElementById('opp').innerHTML = opp;
            } else {
                you++;
                document.getElementById('you').innerHTML = you;
            }
            score(x,y);/*

            document.getElementById('arena').innerHTML += 
            `<div id= 'text'>
                <h1>Paper beats rock!</h1>
                <h5>${victor +' one point.'}</h5>
            </div>`;*/
        }, 2000);
    }, 0500);
}


// Determine which animation to play
function animateRPS(i, j) {
    console.log('animation goes here');
    document.getElementById("arena").innerHTML = 
    `<div id= 'yourMove'>
        <img src="./images/${i}.png" id="${i+'Img'}"> 
    </div>
    <div id= 'oppsMove'>
        <img src="./images/${j}.png" id="${j+'Img'}">
    </div>`;
    
    if (i == 'rock' && j == 'scissors') {
        action_rs(i,j);
    } else if (i == 'scissors' && j == 'rock') {
        action_rs(i,j);
    } else if (i == 'paper' && j == 'scissors') {
        action_ps(i,j);
    } else if (i =='scissors' && j =='paper') {
        action_ps(i,j);
    } else {
        action_pr(i,j);
    }
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// When a hand is selected. Animation for a tie is put here.
function round(x) {
    if (gameActive != true) {
        tick.play();
        console.log(gameActive);
        gameActive = true;
        console.log(gameActive);
        oppChoice = rps[Math.floor(Math.random()*rps.length)];

        if (x === 'rand') {
            x = rps[Math.floor(Math.random()*rps.length)];
        }
        
        if (you < numOfRounds && opp < numOfRounds) {
            if (x === oppChoice){
                console.log('TIE! No points given.')
                if (x == 'scissors') {
                    flip = 'r';
                } else {
                    flip = '';
                }
                document.getElementById("arena").innerHTML = 
                `<div id= 'shiftL'>
                    <img src="./images/${x}.png" id="${x+'Img'}"> 
                </div>
                <div id= 'text'>
                </div>
                <div id= 'shiftR'>
                    <img src="./images/${x+flip}.png" id="${x+'Img'}">
                </div>`;
                setTimeout(function(){
                    document.getElementById('text').innerHTML = `
                    <h1>TIE!</h1>
                    <h5>No points given.</h5>`;
                }, 0400);
                setTimeout(function(){
                    gameActive = false;
                    console.log(gameActive);
                }, 1000);
                
            } else if (x === 'scissors' && oppChoice === 'rock') {
                console.log('rock (opp) beats scissors (you), +1 for opponent')
                animateRPS(x,oppChoice);

            } else if (x === 'rock' && oppChoice === 'scissors') {
                console.log('rock (you) beats scissors (opp), +1 for you')
                animateRPS(x,oppChoice);

            } else if (rps.indexOf(x) < rps.indexOf(oppChoice)) {
                console.log(`${oppChoice} (opp) beats ${x} (you), +1 for opponent`)
                animateRPS(x,oppChoice);
                
            } else if (rps.indexOf(x) > rps.indexOf(oppChoice)) {
                console.log(`${x} (you) beats ${oppChoice} (opp), +1 for you`)
                animateRPS(x,oppChoice);
            }
        } else {
            console.log('Hm, *sigh* it-it seems like the game has... already... been won, so, yea.')
        }
    }
}