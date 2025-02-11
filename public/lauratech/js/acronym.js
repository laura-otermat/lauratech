window.onload = initAll;

function initAll(){
    document.getElementById("generator").onclick = runAcronymGenerator;
}

function runAcronymGenerator(){
    randExample = Math.random()
    if(randExample >.8){
        example = "Grand Old Party";
    }else if(randExample > .6){
        example = "Self Contained Underwater Breathing Apparatus"
    }else if(randExample > .4){
        example = "Laughing Out Loud"
    }else if(randExample > .2){
        example = "Laughing Out Loud, Rolling On The Floor, And Scaring the Cat"
    }else{
        example = "In My Humble Opinion"
    }

    var longPhrase = prompt("What would you like acronymized?", example);
    var words = longPhrase.split(" ");
    var acronym = "";
    for(var i = 0; i < words.length; i++){
        acronym += words[i].charAt(0);
    }
    alert(acronym);
}
