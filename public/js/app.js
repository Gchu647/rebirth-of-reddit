// Grab info from comic sub Reddit
let redObj = {} //store info from reddit
let cardsNum = 0; //The amount of cards I need to print
let reqRed = new XMLHttpRequest();
reqRed.addEventListener("load", getSubReddit);
reqRed.open("GET", "https://www.reddit.com/r/ramen/.json?raw_json=1"); //The link can be a changeable variable
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

    // Images
    let cardsImg = document.createElement("div");
    cardsImg.className = "cards-img";
    cards.appendChild(cardsImg);
    
    // Title
    let cardsTitle = document.createElement("div");
    cardsTitle.className = "cards-title";
    cards.appendChild(cardsTitle);
    
    // Author, created time, and upvotes
    let cardsInfo = document.createElement("div");
    cardsInfo.className = "cards-info";
    
    let cardsAuthor = document.createElement("div");
    cardsAuthor.className = "cards-author";
    cardsInfo.appendChild(cardsAuthor);

    let cardsTime = document.createElement("div");
    cardsTime.className = "cards-time";
    cardsInfo.appendChild(cardsTime);

    let cardsUpvotes = document.createElement("div");
    cardsUpvotes.className = "cards-upvotes";
    cardsInfo.appendChild(cardsUpvotes);

    // Assemble a function to assemble information
    assembleCardInfo(cardsImg, cardsTitle, cardsAuthor, cardsTime, cardsUpvotes, i);

    cards.appendChild(cardsInfo);
    cardsParent.appendChild(cards);
  }
}

// Puts reddit info into the the cards
function assembleCardInfo(cardsImg, cardsTitle, cardsAuthor, cardsTime, cardsUpvotes, count) {
  //Images
  if(redObj["data"]["children"][count]["data"]["thumbnail_height"] === null) {
    cardsImg.style.backgroundImage = `url(http://via.placeholder.com/320x200)`;
    console.log("No Image!");
  } else {
    let imgInfo = redObj["data"]["children"][count]["data"]["preview"]["images"][0]["resolutions"][2]["url"];
    cardsImg.style.backgroundImage = `url(${imgInfo})`;
  }

  //Titles
  let titleInfo = redObj["data"]["children"][count]["data"]["title"];

  if(titleInfo.length > 58) { //Keep title length in check
    let shortTitle = titleInfo.split("").slice(0, 58).join("");
    cardsTitle.innerHTML = `${shortTitle}...`;
  } else {
    cardsTitle.innerHTML =  titleInfo;
  }

  //Author
  let authorInfo = redObj["data"]["children"][count]["data"]["author"];
  cardsAuthor.innerHTML = `• Submitted by ${authorInfo} `;

  //Time
  let createdUTC = redObj["data"]["children"][count]["data"]["created_utc"];
  let createdTime = moment(`${createdUTC}`, "X").fromNow();
  cardsTime.innerHTML = `• ${createdTime} `;

  //Upvotes
  let scoreInfo = redObj["data"]["children"][count]["data"]["score"];
  cardsUpvotes.innerHTML = `• ${scoreInfo} upvotes `;
}