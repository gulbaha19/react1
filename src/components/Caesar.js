import { useState } from "react";

export function Caesar() {
  const [word, setWord] = useState();
  const [num, setNum] = useState();
  const alp = "abcdefghijklmnopqrstuvwxyz";
  let newword = "";
  function transform() {
    for (let i = 0; i < word.length; i++) {
      // console.log(word[i]);
      const ind = alp.indexOf(word[i]) + parseInt(num);
      console.log(ind);
      newword = newword + alp[ind];
    }
    console.log(newword);
  }

  return (
    <div>
      <input
        placeholder=" Enter a word"
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        placeholder=" Enter a number"
        type="text"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <button onClick={transform}>Transform</button>
      <div>output: {newword}</div>
    </div>
  );
}
