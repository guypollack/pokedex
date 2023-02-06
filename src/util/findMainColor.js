export function findMainColor(source) {
  const canvas =  document.createElement("canvas");
  canvas.setAttribute("id","canvas");
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.display = "none";
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = source;
  image.crossOrigin = "Anonymous";

  const outlineColor = {
    r: "",
    g: "",
    b: "",
    a: ""
  }

  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const {red, green, blue, alpha} = mainColor(canvas, ctx, 16);

    outlineColor["r"] = red;
    outlineColor["g"] = green;
    outlineColor["b"] = blue;
    outlineColor["a"] = alpha;
  }

  return outlineColor;

}

export function mainColor(canvas, ctx, tolerance) {
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


function roundNumber(num,toNum) {
  return Math.round(num/toNum)*toNum;
}