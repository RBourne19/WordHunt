let letters = [];
let idList = [];
let wordList = [];
let word = "";
let score = 0;
var timer = 0;
var myInterval;

function startGame()
{
    clearInterval(myInterval)
    score = 0
    showWord()
    timer = 60
    randomizeGrid()
    myInterval = setInterval(showTimer, 1000)
    
}
function randomizeGrid()
{ 
    for(let i = 1; i <= 25;i++)
    {
        var letter = randomLetter()
        document.getElementById(i).style.background = 'grey';
        document.getElementById(i).innerHTML = letter
        letters[i] = letter
    }
}
function defaultGrid()
{
    
    for(let i = 1; i <= 25;i++)
    {
        document.getElementById(i).style.background = 'grey'
        document.getElementById(i).innerHTML = '?'
        letters[i] = null
    }
    clearInterval(myInterval)
}
function showTimer()
{
    if (timer > 0)
    {
    timer -= 1
    document.getElementById('timer').innerHTML = timer
    }
    else
    {
        defaultGrid()
    }
    
}

function randomLetter()
{
    var alpha = "ABCDEFGHIJLMNOPQRSTUVWXYZ";
    var select = Math.floor(Math.random()*25);
    var character = (alpha.charAt(select));
    return character
}





function resetLetters(){
    for(let i = 0; i < idList.length;i++){
        var z = idList[i]
        document.getElementById(z).style.background = 'grey'
    }
    idList = []
    }
function printWord()
    {
        console.log(word)
    }

function showWord(){
        const display = document.getElementById('word')
        display.innerHTML = word
        const show = document.getElementById('score')
        show.innerHTML = score
    }
function checkWord()
    { 
        var length = word.length - 2
        if(length >= 0 && !(wordList.includes(word)) && !(word.includes('?')))
        {
            check_if_word_exists()
        }
        word = ""
        showWord()      
    }

function check_if_word_exists() {

var guess = word.toLowerCase()
var length = word.length - 2
const url = "http://localhost:3002/wordguess?word=" + guess

$.ajax({
    type: "GET",
    url: url,
    contentType: 'application/json',
}).done(function (result) {
    if(result){
        score += (Math.pow(2,length) * 100);
        wordList.push(word.toUpperCase());
    }
    showWord()
}).fail(function () {
    word = "";
});
        
    
        
}


function gameLoop()
{
    $(document).ready(function(){

        var isDown = false;   
      
        $(document).mousedown(function() {
          isDown = true;      
        })
        $(document).mouseup(function() {
          isDown = false;    
          checkWord();
          resetLetters();
          idList = [];
        });
        
        $(".game-item").mousedown(function(){
    
            makeWord($(this))
            showWord()
        });
        $(".game-item").mouseover(function(){
          if(isDown) {        
             makeWord($(this))
             showWord()
          }
        });
      });
}
function makeWord(div)
{
    curId = $(div).attr('id');
    
    touching = true;
    if(idList.length > 0){
        prevId = idList[idList.length - 1];
        difference = Math.abs(curId - prevId);

        //makes sure letters are next to each other
        if(difference == 1 || difference == 5 || difference == 4 || difference == 6){
                touching = true;
            }
            else{
                touching = false;
            }
    }

    if(!(idList.includes(curId)) && touching && (div).text() != "" && (div).text() != "?")
    {
        document.getElementById(curId).style.background = 'yellow';
        word = word + letters[(div).attr('id')];
        idList.push(curId);
    }
}
