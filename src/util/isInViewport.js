function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const inViewport = (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
  alert(inViewport);
  return inViewport;
}