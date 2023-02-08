import { findMainColor } from "./findMainColor";

export async function addOutline(elementId) {
  // let startTime = Date.now();
  const elem = document.getElementById(elementId); 
  const {r, g, b, a} = await findMainColor(elem.src, 20, 20);
  elem.style.filter=(`drop-shadow(5px 5px 1.5px rgba(${r},${g},${b},${a})) drop-shadow(5px -5px 1.5px rgba(${r},${g},${b},${a})) drop-shadow(-5px 5px 1.5px rgba(${r},${g},${b},${a})) drop-shadow(-5px -5px 1.5px rgba(${r},${g},${b},${a}))`);
}

export function removeOutline(elementId) {
  const elem = document.getElementById(elementId);
  elem.style.filter=("");
}