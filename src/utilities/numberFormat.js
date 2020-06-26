export default function (data) {
  if (typeof data !== "number") return 0;
  if (data > 999999999) {
    let num = data / 1000000000;
    return num.toFixed(2).toString() + "B";
  }
  if (data > 999999) {
    let num = data / 1000000;
    return num.toFixed(2).toString() + "M";
  }
  if (data > 999) {
    let num = data / 1000;
    return num.toFixed(2).toString() + "K";
  } else return data;
}
