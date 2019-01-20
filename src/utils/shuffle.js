
/**
 * 随机洗牌算法
 * https://ashan.org/archives/925
 * 
 * @param {Array} arr 
 */
export function shuffle(arr) {
  let randomIndex = 0;
  for (var i = 0; i < arr.length; i++) {
    randomIndex = Math.floor(Math.random() * (arr.length - i));
    console.log(randomIndex)
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
}