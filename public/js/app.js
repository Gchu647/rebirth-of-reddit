// Grab info from comic sub Reddit
let redObj = {} //store info from reddit
let reqRed = new XMLHttpRequest();
reqRed.addEventListener("load", getSubReddit);
reqRed.open("GET", "https://www.reddit.com/r/comics.json"); //The link can be a changeable variable
reqRed.send();

function getSubReddit() {
  redObj = JSON.parse(this.responseText);
  console.log("Aloha ", redObj);
  makeCards(3);
}

//Takes information form sub Reddit and makes cards
function makeCards(cardCount) {
  let cardsParent = document.getElementById("cards-parent");

  for (let i = 0; i < cardCount; i++) {
    let cards = document.createElement("div");
    cards.className = "cards";
    console.log(cardsParent);
    console.log(cards);

    let cardsImg = document.createElement("div");
    cardsImg.className = "cards-img";
    cards.appendChild(cardsImg);
    
    let cardsTitle = document.createElement("div");
    cardsTitle.className = "cards-title";
    cards.appendChild(cardsTitle);
    
    let cardsAuthor = document.createElement("div");
    cardsAuthor.className = "cards-author";
    cards.appendChild(cardsAuthor);

    // Assemble a function to assemble information
    assembleCardInfo(cardsTitle, cardsAuthor, i);

    cardsParent.appendChild(cards);
  }
}

// Puts reddit info into the the cards
function assembleCardInfo(title, content, count) {
  let titleInfo = redObj["data"]["children"][count]["data"]["title"];
  let contentInfo = redObj["data"]["children"][count]["data"]["author"];

  if(titleInfo.length > 58) { //Keep title length in check
    let shortTitle = titleInfo.split("").slice(0, 58).join("");
    console.log(shortTitle);
    title.innerHTML = `${shortTitle}...`;
  } else {
    title.innerHTML =  titleInfo;
  }

  content.innerHTML = `Posted by ${contentInfo}`;
}