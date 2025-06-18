export function arrToObj(arr) {
  const obj = {}
  arr.forEach((el) => {
    obj[el.id] = el
  })
  return obj
}
