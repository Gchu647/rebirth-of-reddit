function makeGrids(n) {
  let gridsParent = document.getElementsByClassName("grids-parent");
  let counter = 0;
  let column = 0;

  if(n%2 === 0) {
    column = n/2; // condition for odd grids
  } else {
    column = (n+1)/2; // conditon for even grids
  }

  for (let i = 0; i < column; i++) {
    let gridPairs = document.createElement("div");
    gridPairs.className = "grid-pairs";
    
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

        /*
        let gridAuthor = document.createElement("div");
        gridAuthor.className = "grid-author";
        grids.appendChild(gridAuthor);
        */
        
        let gridContent = document.createElement("div");
        gridContent.className = "grid-content";
        grids.appendChild(gridContent);

        //Call functions for XMR request
        redditInfo(gridTitle, gridContent);

        gridPairs.appendChild(grids);
        counter++;
      }
    }

    gridsParent[0].appendChild(gridPairs);
  }
}

makeGrids(1);

function redditInfo(title, content) {
  let reqComics = new XMLHttpRequest();
  reqComics.addEventListener("load", getComics);
  reqComics.open("GET", "https://www.reddit.com/r/comics.json");
  reqComics.send();

  function getComics() {
    let redObj = JSON.parse(this.responseText)
    let titleInfo = redObj["data"]["children"][5]["data"]["title"];
    let contentInfo = redObj["data"]["children"][5]["data"]["author"];
    console.log(redObj); //Max should be 67.

    if(titleInfo.length > 66) { //Keep title length in check
      let shortTitle = titleInfo.split("").slice(0, 66).join("");
      console.log(shortTitle);
      title.innerHTML = `${shortTitle} ...`;
    } else {
      title.innerHTML =  titleInfo;
    }

    content.innerHTML = `Created by ${contentInfo}`;
  }
}

/*
function getRedditInfo() {
  let redObj = JSON.parse(this.responseText)
  console.log(redObj);
}

let oReq = new XMLHttpRequest();
oReq.addEventListener("load", getRedditInfo);
oReq.open("GET", "https://www.reddit.com/r/comics.json");
oReq.send();
*/