/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-console: "off" */
/* @jsx createElement */

// 1-2 과제 제출 2차
function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}
const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operatorKeys = ['+', '-', '*', '/', '='];

function render({
  displayNumber, operation, tmpResult, lastInput,
}) {
  const props = {
    displayNumber, operation, tmpResult, lastInput,
  };
  // console.log(props);

  const operatorFunctions = {
    '+': (x, y) => x + parseInt(y, 10),
    '-': (x, y) => x - parseInt(y, 10),
    '*': (x, y) => x * parseInt(y, 10),
    '/': (x, y) => x / parseInt(y, 10),
    // '=': (x, y) => x,
    // '':(x,y) => y,
  };
  function calculation(operator, x, y) {
    // todo : 연산로직 변경및 리팩토링 더 필요함. (중간계산 부분 처리가 너무 복잡함)
    const result = operatorFunctions[operation || operator](x, y);
    console.log(operation, '값확인 :', result);
    render({
      displayNumber: result,
      tmpResult: operator === '=' ? 0 : result,
      operation: operator === '=' ? '' : operator,
      lastInput: operator,
    });
  }

  function handleClickNumber(value) {
    // todo : 연산로직 변경및 리팩토링 더 필요함. (lastInput을 제거하는 방법을 찾아볼 것)
    if (lastInput === '=') { // 새로운 계산을 시작한 경우
      render({ displayNumber: value, tmpResult: parseInt(value, 10), lastInput: value });
      return;
    }
    if (operatorKeys.some((key) => key === lastInput)) { // 이전에 눌린 키가 연산관련키라면,
      render({ ...props, displayNumber: value, lastInput: value });
      return;
    }
    render({ ...props, displayNumber: displayNumber + value, lastInput: value });
  }
  function handleClickOperator(value) {
    if (operation == null) {
      render({
        ...props, operation: value, tmpResult: parseInt(displayNumber, 10), lastInput: value,
      });
      return;
    }
    calculation(value, tmpResult, displayNumber);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber || 0}</p>
      <div>
        {numberKeys.map((number) => (
          <button
            type="button"
            id={number}
            onClick={() => { handleClickNumber(number); }}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {operatorKeys.map((operator) => (
          <button
            type="button"
            id={operator}
            onClick={() => { handleClickOperator(operator); }}
          >
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ displayNumber: '', tmpResult: 0 });

// 1-2 과제 풀이 : 따라하기

// const initialState = { accumalator: 0, number: null, operator: '' };

// const operatorFuncions = { // 객체 인스턴스에 함수 저장한 방식
//   '+': (x, y) => x + y,
//   '-': (x, y) => x - y,
//   '*': (x, y) => x * y,
//   '/': (x, y) => x / y,
// };
// function or(x, y) {
//   return x === null ? y : x;
// }
// function defaultFuncion(x, y) {
//   return or(y, x);
// }

// function calculate(accumalator, number, operator) {
//   console.log(accumalator, number, operator);
//   return (operatorFuncions[operator] || defaultFuncion)(accumalator, number);
// }
// function render({ accumalator, number, operator }) {
//   function handleClickNumber(value) {
//     render({
//       accumalator,
//       number: (number || 0) * 10 + value,
//       operator,
//     });
//   }
//   function handleClickOperator(value) {
//     render({
//       accumalator: calculate(accumalator, number, operator),
//       number: null,
//       operator: value,
//     });
//   }
//   function handleClickReset() {
//     render(initialState);
//   }
//   const element = (
//     <div id="hello" className="greeting">
//       <p>{or(number, accumalator)}</p>
//       <p>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => (
//           <button
//             type="button"
//             onClick={() => { handleClickNumber(value); }}
//           >
//             {value}
//           </button>
//         ))}
//       </p>
//       <p>
//         {['+', '-', '*', '/', '='].map((value) => (
//           <button type="button" onClick={() => { handleClickOperator(value); }}>{value}</button>
//         ))}
//         <button type="button" onClick={handleClickReset}>reset</button>
//       </p>
//     </div>
//   );

//   document.getElementById('app').textContent = '';
//   document.getElementById('app').appendChild(element);
// }

// render(initialState);
