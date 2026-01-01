import defaultImg from "../assets/default.jpeg"

export function getImagePath(filename) {
  // Assumes images are in public/content/images/catalogue/
  return `/content/images/catalogue/${filename}`;
}


export function getDefaultImage() {
  return defaultImg;
}