const cells = document.querySelectorAll(".cell");
const status_text = document.querySelector("#status_text");
const restart_button = document.querySelector("#restart_button");
const winconditions = [
    [0, 1, 2],
    [3, 5, 8],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let current_player = "X";
let running = false;

initialize_game();

function initialize_game(){
    cells.forEach(cell => cell.addEventListener("click", cell_clicked));
    restart_button.addEventListener("click", restart_game);
    status_text.textContent = `${current_player}'s turn`;
    running = true;
}

function cell_clicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    update_cell(this, cellIndex);
    check_winner();
}

function update_cell(cell, index){
    options[index] = current_player;
    cell.textContent = current_player;
}

function change_player(){
    current_player = (current_player == "X") ? "O" : "X";
    status_text.textContent = `${current_player}'s turn`;
}

function check_winner(){
    let round_won = false;

    for(let i = 0; i < winconditions.length; i++){
        const condition = winconditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            round_won = true;
            break;
        }
    }

    if(round_won){
        status_text.textContent = `${current_player} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        status_text.textContent = `Draw!`;
    }
    else{
        change_player();
    }
}

function restart_game(){
    current_player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    status_text.textContent = `${current_player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}