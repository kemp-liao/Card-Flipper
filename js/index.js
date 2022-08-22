//Card number
var n;

//Random images array
var images;

//Lives number
const defaultLives = 6;
var lives;

//Observation time (ms)
const obTime = 3000;

//Score
var score = 0;

//Images data
var cardImg = [
    {imgSrc: "../img/emoji (1).png", id: 1},
    {imgSrc: "../img/emoji (2).png", id: 2},
    {imgSrc: "../img/emoji (3).png", id: 3},
    {imgSrc: "../img/emoji (4).png", id: 4},
    {imgSrc: "../img/emoji (5).png", id: 5},
    {imgSrc: "../img/emoji (6).png", id: 6},
    {imgSrc: "../img/emoji (7).png", id: 7},
    {imgSrc: "../img/emoji (8).png", id: 8},
    {imgSrc: "../img/emoji (9).png", id: 9},
    {imgSrc: "../img/emoji (10).png", id: 10},
    {imgSrc: "../img/emoji (11).png", id: 11},
    {imgSrc: "../img/emoji (12).png", id: 12},
    {imgSrc: "../img/emoji (13).png", id: 13},
    {imgSrc: "../img/emoji (14).png", id: 14},
    {imgSrc: "../img/emoji (15).png", id: 15},
    {imgSrc: "../img/emoji (16).png", id: 16},
    {imgSrc: "../img/emoji (17).png", id: 17},
    {imgSrc: "../img/emoji (18).png", id: 18},
    {imgSrc: "../img/emoji (19).png", id: 19},
    {imgSrc: "../img/emoji (20).png", id: 20},
    {imgSrc: "../img/emoji (21).png", id: 21},
    {imgSrc: "../img/emoji (22).png", id: 22},
    {imgSrc: "../img/emoji (23).png", id: 23},
    {imgSrc: "../img/emoji (24).png", id: 24},
    {imgSrc: "../img/emoji.png", id: 25}
];

demo();

//Start menu demo flipping
var abort;
function demo() {
        abort = setInterval(()=>{
        let random = Math.floor(Math.random() * 16);
        document.querySelector("#c"+random).classList.toggle("flipcard");
    }, 700);
}

//Start the game
function createPanel(n){
    //Stop demo
    clearInterval(abort);
    //Hide start menu
    document.querySelector("#start").classList.toggle("display-none");
    //Show lives
    lives = defaultLives;
    document.querySelector("#lives-count").innerHTML = lives;

    //Create game area
    document.querySelector(".game-container").innerHTML = "";
    let container = document.createElement("div");
    container.setAttribute("class", "game-area" + n);
    document.querySelector(".game-container").appendChild(container);
    gameGenerator(n);
    for(let i = 0; i < n; i++){
        //Card container
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("id", "c" + i);
        //Card Front
        let cardFront = document.createElement("div");
        cardFront.setAttribute("class", "card-front");
        card.appendChild(cardFront);
        let cardPic = document.createElement("img");
        cardPic.setAttribute("class", "game-pics");
        cardPic.setAttribute("src", images[i].imgSrc);
        cardPic.setAttribute("id", images[i].id);
        cardFront.appendChild(cardPic);
        //Card Back
        let cardBack = document.createElement("div");
        cardBack.setAttribute("class", "card-back");
        cardBack.setAttribute("id", "b" + images[i].id);
        card.appendChild(cardBack);

        document.querySelector(".game-area" + n).appendChild(card);
    }
    flipcards(n);
    gameLogic(n, lives);
};

//Pick random pictures
function gameGenerator(n) {
    cardImg.sort(() => Math.random() - 0.5);
    let selected = cardImg.slice(0, (n/2));
    images = selected.reduce((selected, i) => selected.concat(i, i), []);
    images.sort(() => Math.random() - 0.5);
};

//Flip cards
function flipcards(n) {
    setTimeout(()=>{
        for(let i = 0; i < n; i++){
            setTimeout(()=>{
                document.querySelector("#c"+i).classList.toggle("flipcard"); 
            },(100 * i));
        }
    }, obTime);
};

//Game running logic
var lastFlipCorrect = 0;
function gameLogic(n, lives) {
    var firstFlip = null;
    var secondFlip = null;
    var flip1, flip2;
    var cardLeft = n;
    //Click to flip the cards
    for(let i = 0; i < n; i++){
        let card = document.querySelector("#c"+i);
        // let cardID = document.querySelector()
        card.addEventListener("click", ()=> {
            //console.log(e);
            card.classList.toggle("flipcard");
            if (firstFlip == null){
                firstFlip = Array.prototype.slice.call(document.getElementById("c"+i).getElementsByTagName("img"))[0].id;
                flip1 = i;
            }else{
                secondFlip = Array.prototype.slice.call(document.getElementById("c"+i).getElementsByTagName("img"))[0].id;
                flip2 = i;
            }
            //If do not match
            if(secondFlip != null && firstFlip != secondFlip){
                lives--;
                //Check if lose
                if(lives == 0){
                    document.querySelector("#end-score-lose").innerHTML = score;
                    document.querySelector("#lose").classList.toggle("display-none");
                }
                setTimeout(()=>{
                    document.querySelector("#c"+flip1).classList.toggle("flipcard");
                    document.querySelector("#c"+flip2).classList.toggle("flipcard");
                    document.querySelector("#lives-count").innerHTML = lives;
                }, 1000);
                firstFlip = null;
                secondFlip = null;
                lastFlipCorrect = 0;
            }
            //If match
            if(firstFlip != null && secondFlip != null && firstFlip == secondFlip){
                document.querySelector("#c"+flip1).classList.toggle("disable-click");
                document.querySelector("#c"+flip2).classList.toggle("disable-click");
                firstFlip = null;
                secondFlip = null;
                cardLeft -= 2;
                console.log(cardLeft);
                score += (5 + (10 * (++lastFlipCorrect)));
                document.querySelector("#current-score").innerHTML = score;
                //Check if win
                if(cardLeft == 0){
                    document.querySelector("#end-score-win").innerHTML = score;
                    document.querySelector("#win").classList.toggle("display-none");
                }
            }
        });
    }
};

