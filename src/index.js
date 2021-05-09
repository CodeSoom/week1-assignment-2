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

const render = (calculator, calculatorResult) => {
  const calculate = (value1, operator, value2) => {
    if (operator === '+') return value1 + value2;
    if (operator === '-') return value1 - value2;
    if (operator === '*') return value1 * value2;
    if (operator === '/') return value1 / value2;
  };

  const handleCalculator = (value) => {
    if (Number.isNaN(Number(value))) {
      if (calculator.length === 0) return;

      if (calculator.length === 3) {
        const result = calculate(...calculator);
        if (value === '=') {
          render([], result);
        } else {
          render([result, value], result);
        }
      }

      if (Number.isNaN(Number(calculator.slice(-1)))) {
        calculator.pop();
        calculator.push(value);
        return;
      }
    }

    if (!Number.isNaN(Number(value)) && calculator.length % 2 === 1) {
      calculator.push(Number(`${calculator.pop()}${value}`));
      return;
    }

    calculator.push(value);
  };

  const onNumberClick = ({ target: { value } }) => {
    handleCalculator(Number(value));
    render(calculator, calculator.slice(-1));
  };

  const onNumberOperator = ({ target: { value } }) => {
    handleCalculator(value);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{calculatorResult}</p>
      <p>
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            type="button"
            onClick={onNumberClick}
            value={(index + 1) % 10}
          >
            {(index + 1) % 10}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={onNumberOperator} value={operator}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};

render([], '');
