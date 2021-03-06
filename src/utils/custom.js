export const required = (val) => val && val.length;
export const maxLength = (len) => (val) => !val || val.length <= len;
export const minLength = (len) => (val) => val && val.length >= len;
export const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
export const ImageURL =
  "https://dev73.myprojectstaging.com/AwtbAppareal/public/documents/";
export const OwnImageURL = window.location.origin;
