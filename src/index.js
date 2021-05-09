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
  nextValue, prevValue, isClickedNumberBtn, clickedOperation,
}) {
  const handleResult = () => {
    if (clickedOperation === '+') {
      render({
        nextValue: nextValue + prevValue,
        prevValue,
        isClickedNumberBtn: false,
        clickedOperation,
      });
    } else if (clickedOperation === '-') {
      render({
        nextValue: prevValue - nextValue,
        prevValue,
        isClickedNumberBtn: false,
        clickedOperation,
      });
    } else if (clickedOperation === '*') {
      render({
        nextValue: parseFloat((prevValue * nextValue).toFixed(6)),
        prevValue,
        isClickedNumberBtn: false,
        clickedOperation,

      });
    } else if (clickedOperation === '/') {
      render({
        nextValue: parseFloat((prevValue / nextValue).toFixed(6)),
        prevValue,
        isClickedNumberBtn: false,
        clickedOperation,
      });
    }
  };

  const handleNumberBtn = (e) => {
    if (isClickedNumberBtn) {
      render({
        nextValue: parseInt(`${nextValue}${e.target.textContent.trim()}`, 10),
        prevValue,
        isClickedNumberBtn: true,
        clickedOperation,
      });
    } else {
      render({
        nextValue: parseInt(e.target.textContent.trim(), 10),
        prevValue: nextValue,
        isClickedNumberBtn: true,
        clickedOperation,
      });
    }
  };

  const handleOperatorBtn = (operator) => {
    if (clickedOperation && isClickedNumberBtn) {
      handleResult();
    } else {
      render({
        nextValue,
        prevValue: nextValue,
        isClickedNumberBtn: false,
        clickedOperation: operator,
      });
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      {nextValue}
      <br />
      <br />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
        <button
          type="button"
          onClick={(e) => handleNumberBtn(e)}
        >
          {number}
        </button>
      ))}
      <br />
      <br />
      <button
        type="button"
        onClick={() => handleOperatorBtn('+')}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => handleOperatorBtn('-')}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => handleOperatorBtn('*')}
      >
        *
      </button>
      <button
        type="button"
        onClick={() => handleOperatorBtn('/')}
      >
        /
      </button>
      <button
        type="button"
        onClick={handleResult}
      >
        =
      </button>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  nextValue: 0,
  prevValue: 0,
  clickedOperation: '',
  isClickedNumberBtn: false,
});
