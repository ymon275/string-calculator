import React from "react";
import _ from "lodash";
import { useState } from "react";

export const Add = (input) => {
  let defaultDelimiters = [",", "\n"];
  let delimiters = [];
  const inputCopy = input;
  if (_.startsWith(input, "//")) {
    let delimiter = "";
    let readingDelimiter = false;
    for (let i = 2; i < input.length; i++) {
      if (input.charAt(i - 1) === "[") {
        readingDelimiter = true;
      } else if (input.charAt(i) === "]") {
        readingDelimiter = false;
        delimiters.push(delimiter);
        delimiter = "";
      }
      if (readingDelimiter) {
        delimiter += input.charAt(i);
      }
    }
  }
  input = _.trim(input, `//[${_.join(delimiters, "][")}]\n`);
  //input => "1,2\n3&4##5"
  /*
    0. input == "1,2\n3&4##5"
    input = _.split(input, delimiters[0]) =>
    1. input == ["1", "2\n3&4##5"]
    input = _.flatMap(input, (num) => _.split(num, delimiters[1]))
    2. input == ["1", "2", "3&4##5"]
    input = _.flatMap(input, (num) => _.split(num, delimiters[2]))
    3. input == ["1", "2", "3", "4##5"]
    input = _.flatMap(input, (num) => _.split(num, delimiters[3]))
    4. input == ["1", "2", "3", "4", "5"]
  */
  delimiters = _.concat(delimiters, defaultDelimiters);
  input = [input];
  _.forEach(delimiters, (delimiter) => {
    input = _.flatMap(input, (s) => {
      return _.split(s, delimiter);
    });
  });

  let numbers = _.map(input, (n) => {
    return parseInt(n);
  });

  try {
    let negatives = _.filter(numbers, (i) => i < 0);
    if (negatives[0] < 0) throw new Error(`negatives not allowed ${negatives}`);
  } finally {
  }
  _.remove(numbers, (n) => n > 1000);
  let sum = _.sum(numbers);
  if (inputCopy === "") sum = 0;
  return sum;
};

function Calculator() {
  const [sum, setSum] = useState();
  const handleInput = (event) => {
    setSum(Add(event.target.value));
  };
  const logValue = () => {
    console.log(sum);
  };
  return (
    <div>
      {sum}
      <br></br>
      <input
        className="form-control mb-3 w-50 m-auto"
        id="string"
        onChange={handleInput}
      ></input>
      <button className="btn btn-primary" onClick={logValue}>
        Log Value
      </button>
    </div>
  );
}

export default Calculator;
