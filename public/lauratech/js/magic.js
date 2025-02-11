window.onload = initAll;

var num_answers = 20;
var which_answer;
var answers;

function initAll(){
    answers = new Array();
    answers[0] = "No";
    answers[1] = "No Doubt";
    answers[2] = "Possibly";
    answers[3] = "Very Likely";
    answers[4] = "Count On It";
    answers[5] = "Absolutely";
    answers[6] = "Stars Say No";
    answers[7] = "Yes";
    answers[8] = "Can't Say";
    answers[9] = "Ask Again";
    answers[10] = "Odds Aren't Good";
    answers[11] = "Bet On It";
    answers[12] = "Act Now";
    answers[13] = "It's O.K.";
    answers[14] = "Cannot Tell Now";
    answers[15] = "Go For It";
    answers[16] = "Not Now";
    answers[17] = "May Be";
    answers[18] = "It Will Pass";
    answers[19] = "You're Hot";

    document.getElementById("calculator").onclick = whichAnswer;
}


function whichAnswer(){
  num = Math.random();
  which_answer = parseInt(num * num_answers);
  document.getElementById("answer").innerHTML = answers[which_answer];
}
