// Grab info from comic sub Reddit
let redObj = {} //store info from reddit
let reqRed = new XMLHttpRequest();
reqRed.addEventListener("load", getSubReddit);
reqRed.open("GET", "https://www.reddit.com/r/comics.json?raw_json=1"); //The link can be a changeable variable
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
    assembleCardInfo(cardsImg, cardsTitle, cardsAuthor, i);

    cardsParent.appendChild(cards);
  }
}

// Puts reddit info into the the cards
function assembleCardInfo(cardsImg, title, content, count) {
  let imgInfo = redObj["data"]["children"][count]["data"]["preview"]["images"][0]["resolutions"][2]["url"];
  console.log(redObj["data"]["children"][count]["data"]["preview"]["images"][0]["resolutions"]);
  let titleInfo = redObj["data"]["children"][count]["data"]["title"];
  let contentInfo = redObj["data"]["children"][count]["data"]["author"];

  cardsImg.style.backgroundImage = `url(${imgInfo})`;

  if(titleInfo.length > 58) { //Keep title length in check
    let shortTitle = titleInfo.split("").slice(0, 58).join("");
    title.innerHTML = `${shortTitle}...`;
  } else {
    title.innerHTML =  titleInfo;
  }

  content.innerHTML = `Posted by ${contentInfo}`;
}