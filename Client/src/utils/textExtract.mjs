export const extract = (text, count) => {
  const arrayOfWords = text.split(" ");
  const newAarrayOfWords = arrayOfWords.filter(
    (element, index) => index < count,
  );
  const mytext = newAarrayOfWords.join(" ");
  return mytext;
};
