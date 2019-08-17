const baseSize = 32
let baseWidth = 750
function setRem (base) {
  baseWidth = base || baseWidth
  const scale = document.documentElement.clientWidth / baseWidth
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
setRem()
window.onresize = function () {
  setRem()
}

export const setRemAuto = baseWidth => setRem(baseWidth)
