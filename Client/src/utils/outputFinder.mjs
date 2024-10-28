export const outputFinder = (myAnchor, selection) => {
  // console.log("selection: ", selection.length);
  if (selection.length < 3) {
    return null;
  }
  const selectedWords = selection
    .split(" ")
    .map((element, index, array) => {
      if (element.length < 3 && (index === 0 || index === array.length - 1))
        return null;
      else return element;
    })
    .filter((element) => !(element == null));

  // console.log(selectedWords);

  let succession = selectedWords.length;
  const trueWords = myAnchor
    .split(" ")
    .map((word, index) => {
      let status = false;
      let tr = [];
      for (let i = 0; i < succession; i++) {
        if (word.includes(selectedWords[i])) {
          status = true;
          tr[i] = true;
        } else {
          tr[i] = false;
        }
      }
      if (status) {
        return { word, index, tr: tr };
      } else return null;
    })
    .filter((element) => !(element == null));

  let successionTable = [];
  let counter = 0;
  for (let i = 0; i < trueWords.length; i++) {
    const tr = trueWords[i].tr;
    if (tr[counter]) {
      successionTable[counter] = i;
      counter++;
    }
  }
  // console.log(successionTable);
  const output = [];
  for (let i = 0; i < successionTable.length; i++) {
    output.push(trueWords[successionTable[i]].word);
  }
  if (output.length) return output;
  else return null;
};
