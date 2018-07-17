// Grab info from comic sub Reddit
let redObj = {} //store info from reddit
let reqRed = new XMLHttpRequest();
reqRed.addEventListener("load", getSubReddit);
reqRed.open("GET", "https://www.reddit.com/r/comics.json"); //The link can be a changeable variable
reqRed.send();

function getSubReddit() {
  redObj = JSON.parse(this.responseText)
  makeGrids(3);
  console.log("Aloha ", redObj);
}

function makeGrids(n) {
  let gridsParent = document.getElementById("grids-parent");
  let counter = 0;
  let column = 0;

  if(n%2 === 0) {
    column = n/2; // condition for odd grids
  } else {
    column = (n+1)/2; // conditon for even grids
  }

  for (let i = 0; i < column; i++) {
    let rows = document.createElement("div");
    rows.className = "rows";
    
    //Make grids and elements inside the grids.
    for (let j = 0; j < 2; j++) {
      if(counter < n){
        let grids = document.createElement("div");
        grids.className = "grids";

        let gridImg = document.createElement("div");
        gridImg.className = "grid-img";
        grids.appendChild(gridImg);
        
        let gridTitle = document.createElement("div");
        gridTitle.className = "grid-title";
        grids.appendChild(gridTitle);
        
        let gridContent = document.createElement("div");
        gridContent.className = "grid-content";
        grids.appendChild(gridContent);

        // Assemble information here.
        assembleCardInfo(gridTitle, gridContent, counter);

        rows.appendChild(grids);
        counter++;
      }
    }

    gridsParent.appendChild(rows); // Redo gridsParent as id
  }
}

function assembleCardInfo(title, content, count) {
  let titleInfo = redObj["data"]["children"][count]["data"]["title"];
  let contentInfo = redObj["data"]["children"][count]["data"]["author"];

  if(titleInfo.length > 66) { //Keep title length in check
    let shortTitle = titleInfo.split("").slice(0, 66).join("");
    console.log(shortTitle);
    title.innerHTML = `${shortTitle} ...`;
  } else {
    title.innerHTML =  titleInfo;
  }

  content.innerHTML = `Created by ${contentInfo}`;
}

/*
let gridAuthor = document.createElement("div");
gridAuthor.className = "grid-author";
grids.appendChild(gridAuthor);
*/