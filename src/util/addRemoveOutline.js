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
    
    const {red, green, blue, alpha} = findMainColor(canvas, ctx);
      
    color["r"] = red;
    color["g"] = green;
    color["b"] = blue;
    color["a"] = alpha;

    // alert(`${color["r"]} ${color["g"]} ${color["b"]} ${color["a"]}`);

    // test.style.filter=(`drop-shadow(10px 10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(10px -10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-10px 10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-10px -10px 2.5px rgba(${red},${green},${blue},${alpha}))`);
    elem.style.filter=(`drop-shadow(5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(5px -5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px -5px 1.5px rgba(${red},${green},${blue},${alpha}))`);
    // canvas.style.filter=(`drop-shadow(10px 10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(10px -10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-10px 10px 2.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-10px -10px 2.5px rgba(${red},${green},${blue},${alpha}))`);
  };
}

function findMainColor(canvas, ctx) {
  const colors = {};
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  // data.filter();

  // color finding method 1

  // for (let i = 0; i < data.length; i += 4) {
  //   const rgba = numberToString(data[i]) + numberToString(data[i+1]) + numberToString(data[i+2]) + numberToString(data[i+3]);
  //   if (colors[rgba]) {
  //     colors[rgba]++;
  //   } else {
  //     colors[rgba] = 1;
  //   }
  // }

  // let mainColor;
  // let maxCount = 0;

  // for (let color of Object.keys(colors)) {
  //   if (color.slice(0,9) !== "000000000") {
  //     if (colors[color] > maxCount) {
  //       console.log(color);
  //       mainColor = color;
  //       maxCount = colors[color];
  //     }
  //   }
  // }
  // return ({
  //   red: mainColor.slice(0,3),
  //   green: mainColor.slice(3,6),
  //   blue: mainColor.slice(6,9),
  //   alpha: mainColor.slice(9,12)
  // });

  // color finding method 2

  // let colorsArray = []

  // for (let i = 0; i < data.length; i += 4) {
  //   colorsArray.push(numberToString(data[i]) + numberToString(data[i+1]) + numberToString(data[i+2]) + numberToString(data[i+3]));
  // }

  // colorsArray = colorsArray.filter(color => color !== "000000000000");

  // let mainColor;
  // let maxCount = 0;


  // colorsArray.forEach((color, index, self) => {
  //   const count = self.filter(elem => elem === color).length;
  //   if (count > maxCount) {
  //     mainColor = color;
  //     maxCount = count;
  //   }
  // });

  // return ({
  //   red: mainColor.slice(0,3),
  //   green: mainColor.slice(3,6),
  //   blue: mainColor.slice(6,9),
  //   alpha: mainColor.slice(9,12)
  // });
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

export function removeOutline(elementId) {
  const elem = document.getElementById(elementId);
  elem.style.filter=("");
}