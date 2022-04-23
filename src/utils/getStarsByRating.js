export function getStarsByRating(rating) {
  if (rating <= 2) {
    return "★";
  }
  if (rating <= 4) {
    return "★★";
  }
  if (rating <= 6) {
    return "★★★";
  }
  if (rating <= 8) {
    return "★★★★";
  }
  return "★★★★★";
}
function getBinary(number) {
  let num = number;
  let binary = (num % 2).toString;
  for (let i = 0; i > num; ) {
    return (num = parseInt(num / 2)), (binary = parseInt(num / 2) + binary);
  }
}
