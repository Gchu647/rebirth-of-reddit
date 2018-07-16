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
    
    for (let j = 0; j < 2; j++) {
      if(counter < n){
        let grids = document.createElement("div");
        grids.className = "grids";
        gridPairs.appendChild(grids);
        counter++;
      }
    }

    gridsParent[0].appendChild(gridPairs);
  }
}

makeGrids(1);

function getRedditInfo() {
  let redObj = JSON.parse(this.responseText)
  console.log(redObj);
}

let oReq = new XMLHttpRequest();
oReq.addEventListener("load", getRedditInfo);
oReq.open("GET", "https://www.reddit.com/r/comics.json");
oReq.send();