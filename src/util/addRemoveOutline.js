import { findMainColor } from "./findMainColor";

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

  const outlineColor = {
    r: "",
    g: "",
    b: "",
    a: ""
  }

  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const {red, green, blue, alpha} = findMainColor(canvas, ctx, 16);

    outlineColor["r"] = red;
    outlineColor["g"] = green;
    outlineColor["b"] = blue;
    outlineColor["a"] = alpha;

    elem.style.filter=(`drop-shadow(5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(5px -5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px 5px 1.5px rgba(${red},${green},${blue},${alpha})) drop-shadow(-5px -5px 1.5px rgba(${red},${green},${blue},${alpha}))`);
  }

  console.log(outlineColor);

}

export function removeOutline(elementId) {
  const elem = document.getElementById(elementId);
  elem.style.filter=("");
}