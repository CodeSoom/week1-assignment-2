/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

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

function render({
  input, result = 0, isCalculated = true, prevOperator = '=',
}) {
  function handleNumberClick(value) {
    if (isCalculated) {
      render({
        input: value, result, isCalculated: false, prevOperator,
      });
    } else {
      render({
        input: input * 10 + value, result, isCalculated: false, prevOperator,
      });
    }
  }

  function handleOperatorClick(operator) {
    let calNum = 0;
    switch (prevOperator) {
    case '+':
      calNum = result + input;
      break;
    case '-':
      calNum = result - input;
      break;
    case '*':
      calNum = result * input;
      break;
    case '/':
      calNum = result / input;
      break;
    case '=':
      calNum = result + input;
      break;
    default:
      throw new Error(`input Error: ${operator}`);
    }

    render({
      input: 0, result: calNum, isCalculated: true, prevOperator: operator,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{isCalculated ? result : input}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleNumberClick(i)}>{i}</button>
        ))}
      </p>

      <p>
        {['+', '-', '*', '/', '='].map((str) => (
          <button type="button" onClick={() => handleOperatorClick(str)}>
            {str}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ input: 0 });
