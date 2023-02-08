export async function findMainColor(source) {
  const canvas =  document.createElement("canvas");
  canvas.setAttribute("id","canvas");
  canvas.width = 300;
  canvas.height = 300;
  canvas.style.display = "none";
  const ctx = canvas.getContext("2d");

  await loadImage(source, canvas, ctx);

  const {red, green, blue, alpha} = mainColor(canvas, ctx, 16);

  const outlineColor = {
    "r": red,
    "g": green,
    "b": blue,
    "a": alpha
  }
  // console.log(outlineColor);
  return outlineColor;
}

function loadImage(source, canvas, ctx) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = source;
    img.crossOrigin = "Anonymous";
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(); // could use resolve(img) if needed to return img to findMainColor function, e.g. const img = loadImage(source, canvas, ctx))
    });
    img.addEventListener('error', reject);
  });
}

export function mainColor(canvas, ctx, tolerance) {
  const colors = {};
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // alert(data.length);

  // let startTime = Date.now();

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

  alert(mainColor);

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