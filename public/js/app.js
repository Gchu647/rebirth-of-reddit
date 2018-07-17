// Grab info from comic sub Reddit
let redObj = {} //store info from reddit
let cardsNum = 0; //The amount of cards I need to print
let reqRed = new XMLHttpRequest();
reqRed.addEventListener("load", getSubReddit);
reqRed.open("GET", "https://www.reddit.com/r/comics/.json?raw_json=1"); //The link can be a changeable variable
reqRed.send();

function getSubReddit() {
  redObj = JSON.parse(this.responseText);
  console.log("Aloha ", redObj);
  cardsNum = redObj["data"]["children"].length;
  makeCards(cardsNum);
}

//Takes information form sub Reddit and makes cards
function makeCards(count) {
  let cardsParent = document.getElementById("cards-parent");

  for (let i = 0; i < count; i++) {
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
  let titleInfo = redObj["data"]["children"][count]["data"]["title"];
  let contentInfo = redObj["data"]["children"][count]["data"]["author"];

  //Testing time created
  let timeCreated = redObj["data"]["children"][count]["data"]["created_utc"];
  console.log( moment(`${timeCreated}`, "x").fromNow);

  if(imgInfo) {
    cardsImg.style.backgroundImage = `url(${imgInfo})`;
  } else {
    console.log("No Image!")
  }

  if(titleInfo.length > 58) { //Keep title length in check
    let shortTitle = titleInfo.split("").slice(0, 58).join("");
    title.innerHTML = `${shortTitle}...`;
  } else {
    title.innerHTML =  titleInfo;
  }

  content.innerHTML = `Submitted by ${contentInfo}`;
}