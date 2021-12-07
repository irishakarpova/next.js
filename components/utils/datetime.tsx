export const datetime = `${new Date().getFullYear()}-${`${
  new Date().getMonth() + 1
}`.padStart(2, "0")}-${`${new Date().getDate() + 1}`.padStart(
  2,
  "0"
)}T${`${new Date().getHours()}`.padStart(
  2,
  "0"
)}:${`${new Date().getMinutes()}`.padStart(2, "0")}`;
