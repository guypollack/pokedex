// change to add color and pass in the id directly

export function addOutline(elementId) {
  const elem = document.getElementById(elementId); 
  const canvas =  document.createElement("canvas"); // document.getElementById("canvas");
  canvas.setAttribute("id","canvas");
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.display = "none";
  const ctx = canvas.getContext("2d");

  const image = new Image();
  // image.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";
  image.src = elem.src;
  image.crossOrigin = "Anonymous";

  const color = {
    r: "",
    g: "",
    b: "",
    a: ""
  }

  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const {red, green, blue, alpha} = findMainColor(canvas, ctx, 16);  
    
    elem.style.filter=(`drop-shadow(5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(5px -5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px -5px 1.5px rgba(${red},${green},${blue},${alpha}))`);
  };
}

function findMainColor(canvas, ctx, tolerance) {
  const colors = {};
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // startTime = Date.now();

  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] !== 0) {
      const color = [roundNumber(data[i],tolerance), roundNumber(data[i+1],tolerance), roundNumber(data[i+2],tolerance), roundNumber(data[i+3],tolerance)].join(",");
      if (colors[color]) {
        colors[color]++;
      } else {
        colors[color] = 1;
      }
    }
  }

  // alert((Date.now() - startTime)/1000);

  // startTime = Date.now();

  let mainColor;
  let maxCount = 0;

  for (let color of Object.keys(colors)) {
    if (colors[color] > maxCount) {
      mainColor = color;
      maxCount = colors[color];
    }
  }

  // alert((Date.now() - startTime)/1000);

  mainColor = mainColor.split(",");

  // alert(mainColor);

  return ({
    red: mainColor[0],
    green: mainColor[1],
    blue: mainColor[2],
    alpha: mainColor[3]
  });

}

function numberToString(num) {
  if (num >= 100) {
    return num.toString();
  } else if (num >= 10) {
    return "0" + num.toString();
  } else {
    return "00" + num.toString();
  }
}

function roundNumber(num,toNum) {
  return Math.round(num/toNum)*toNum;
}

export function removeOutline(elementId) {
  const elem = document.getElementById(elementId);
  elem.style.filter=("");
}