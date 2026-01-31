window.onload = initAll;

var board;
var board_size = 3;
var num_players;
var first_player;
var second_player;

function initAll(){
    board = [5, 5, 5];
    printGameBoard();
    document.getElementById("twoplayer").onclick = getGameInfo;
    document.getElementById("easycomputer").onclick = getGameInfo;
    document.getElementById("mediumcomputer").onclick = getGameInfo;
    document.getElementById("difficultcomputer").onclick = getGameInfo;
}

function getName(whichPlayer){
    if(1 == whichPlayer){
        return first_player;
    }
    return second_player;
}

function userPlayerMove(whichPlayer, msg){
    var name = getName(whichPlayer);
    var newHTML = msg + "<p>" + whichPlayer + "'s turn --</p>";
    newHTML += "<form id='moveform'><p>Pick a row:</p><p>"
    newHTML += "<input type='hidden' value='" + whichPlayer + "' id='whichplayer' />";
    for(var i = 0; i < board_size; i++){
        if(board[i] > 0){
            newHTML += "<input type='button' value='  "+ i + "  ' id='" + i +"' />  ";
        }
    }
    newHTML += "</p></form>";
    document.getElementById("console").innerHTML = newHTML;
    for(var i = 0; i < board_size; i++){
        if(board[i] > 0){
            document.getElementById(i).onclick = userPlayerMovePieces;
        }
    }    
}

function userPlayerMovePieces(){
    var name = document.getElementById("whichplayer").value;    
    var newHTML = "<p>" + name + "'s turn --</p>";
    newHTML += "<form id='moveform'><p>How many pieces?</p><p>"
    newHTML += "<input type='hidden' value='" + document.getElementById("whichplayer").value + "' id='whichplayer' />";
    newHTML += "<input type='hidden' value='" + this.id + "' id='whichrow' />";
    for(var j = 1; j <= board[this.id]; j++){
        newHTML += "<input type='button' value='  "+ j + "  ' id='" + j +"' />  ";
    }
    newHTML += "</p></form>";
    document.getElementById("console").innerHTML = newHTML;
    for(var j = 1; j <= board[this.id]; j++){
        document.getElementById(j).onclick = userPlayerMovePiecesOnBoard;
    }
}

function userPlayerMovePiecesOnBoard(){
    var whichplayer = document.getElementById("whichplayer").value;
    var row = document.getElementById("whichrow").value;
    var nmatchsticks = this.id;
    return validateBoard(whichplayer, row, nmatchsticks);
}

function validateBoard(whichPlayer, row, nmatchsticks){
    board[row] -= nmatchsticks;
    var name = (whichPlayer);
    var newHTML = "<p>" + whichPlayer + " removed " + nmatchsticks + " matchsticks from row " + row + "</p>";
    var isGameOver = isBoardEmpty();
    var the_other_player;
    if(whichPlayer == first_player){
        the_other_player = second_player;
    }else{
        the_other_player = first_player;
    }
    if(isGameOver){
        newHTML += "<p>" + whichPlayer + " removed last matchstick from board.  ";
        newHTML += the_other_player + " wins!</p>";
    }
    document.getElementById("console").innerHTML = newHTML;
    printGameBoard();
    if(!isGameOver){
        return gameplay(the_other_player, newHTML);
    }
}

function expertComputerMove(){
    for(var i = 0; i < board_size; i++){
        var newboard = board.slice();
        newboard[i] = 0;
        var xor_sum = xor_array(newboard);
        for(var j = 1; j <= board_size[i]; j++){
            var matchsticks_left = board_size[i] - j;
            if(matchsticks_left ^ xor_sum == 0){
                return validateBoard(second_player, i, matchsticks_left);
            }
        }
    }
    var which_row = parseInt(Math.random() * board_size);
    while(board[which_row] <= 0){
        which_row = (which_row + 1) % board_size;
    }
    return validateBoard(second_player, which_row, 1);
}
function xor_array(the_array){
    var sofar = the_array[0];
    for(var i = 1; i < board_size; i++){
        sofar = sofar ^ the_array[i];
    }
    return sofar;
}
function randomComputerMove(){
    var which_row = parseInt(Math.random() * board_size);
    while(board[which_row] <= 0){
        which_row = (which_row+ 1) % board_size;
    }
    var nmatchsticks = parseInt(Math.random() * board[which_row] + 1)
    return validateBoard(second_player, which_row, nmatchsticks);
}

function simpleComputerMove(){
    var num = Math.random();
    var which_answer = parseInt(num * board_size);
    while(board[which_answer] <= 0){
        which_answer = (which_answer + 1) % board_size;
    }
    return validateBoard(second_player, which_answer, 1);
}

function isBoardEmpty(){
    for(var i = 0; i < board_size; i++){
        if(board[i] > 0){
            return false;
        }
    }
    return true;
}

function gameplay(which_player, msg){
    if("difficultcomputer" == which_player){
        return expertComputerMove();
    }else if("mediumcomputer" == which_player){
        return randomComputerMove();
    }else if("easycomputer" == which_player){
        return simpleComputerMove();
    }else{
        return userPlayerMove(which_player, msg);
    }
}

function printGameBoard(){
    var newHTML = "";
    for(var i = 0; i < board_size; i++){
        var row_string = "";
        for(var j = 0; j < board[i]; j++){
            row_string += "*";
        }
        s = "<p>row " + i + ": " +  row_string + "</p>";
        newHTML += s;
    }
    document.getElementById("gameboard").innerHTML = newHTML;
}

function getPlayerName(){
    first_player = document.forms["nameform"]["firstname"].value
    if(first_player == null || first_player == ""){
        alert("Name must be filled out");
        return askPlayerNames();
    }
    if(second_player == "twoplayer"){
        second_player = document.forms["nameform"]["secondname"].value
        if(second_player == null || second_player == ""){
            alert("Both names must be filled out");
            return askPlayerNames();
        }
    }
    if(first_player == second_player){
        alert("Player names must be different.");
        return askPlayerNames();
    }
    return gameplay(first_player, "");
}

function askPlayerNames(){
    var newHTML = 'blue';
    if(num_players == 1){
        newHTML = "<form id='nameform'>Your Name: <input type='text' value='Captain Awesome' name='firstname' />  <input type='button' value='Submit' id='names' /></form>";
    }else if(num_players == 2){
        newHTML = "<form id='nameform'>Player 1's Name: <input type='text' value='Player 1' name='firstname' />  Player 2's Name: <input type='text' value='Player 2' name='secondname' />  <input type='button' value='Submit' id='names' /></form>";
    }
    document.getElementById("console").innerHTML = newHTML;
    document.getElementById("names").onclick = getPlayerName;
}

function getGameInfo(){
    if(this.id == "easycomputer" || this.id == "mediumcomputer" || this.id == "difficultcomputer"){
        num_players = 1;
    }else if(this.id == "twoplayer"){
        num_players = 2;
    }
    second_player = this.id;
    return askPlayerNames();
}
