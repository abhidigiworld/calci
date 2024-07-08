import React, { useState, useEffect } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [memory, setMemory] = useState(0);
  const [secondFunction, setSecondFunction] = useState(false);
  const [angleMode, setAngleMode] = useState('deg');

  useEffect(() => {
    const handleKeyUp = (event) => {
      const { key } = event;
      if (/\d/.test(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        setInput(input.slice(0, -1));
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [input]);

  const handleClick = (value) => {
    if (value === '÷') value = '/';
    setInput((prevInput) => prevInput + value);
  };


  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput('Error');
    }
  };

  const handleMemory = (action) => {
    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'M+':
        setMemory(memory + parseFloat(input || '0'));
        break;
      case 'M-':
        setMemory(memory - parseFloat(input || '0'));
        break;
      case 'MR':
        setInput(memory.toString());
        break;
      case 'AC':
        setInput('');
      default:
        break;
    }
  };

  const handleScientific = (func) => {
    try {
      let value = parseFloat(input || '0');
      switch (func) {
        case 'x²':
          setInput((value ** 2).toString());
          break;
        case 'x³':
          setInput((value ** 3).toString());
          break;
        case 'xy':
          setInput((prev) => prev + '**');
          break;
        case 'ex':
          setInput((Math.exp(value)).toString());
          break;
        case '10x':
          setInput((10 ** value).toString());
          break;
        case '1/x':
          setInput((1 / value).toString());
          break;
        case '2√x':
          setInput((Math.sqrt(value)).toString());
          break;
        case '3√x':
          setInput((Math.cbrt(value)).toString());
          break;
        case 'y√x':
          setInput((prev) => prev + '**(1/');
          break;
        case 'ln':
          setInput((Math.log(value)).toString());
          break;
        case 'log10':
          setInput((Math.log10(value)).toString());
          break;
        case 'x!':
          const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
          setInput(factorial(value).toString());
          break;
        case 'sin':
          setInput((angleMode === 'deg' ? Math.sin(value * (Math.PI / 180)) : Math.sin(value)).toString());
          break;
        case 'cos':
          setInput((angleMode === 'deg' ? Math.cos(value * (Math.PI / 180)) : Math.cos(value)).toString());
          break;
        case 'tan':
          setInput((angleMode === 'deg' ? Math.tan(value * (Math.PI / 180)) : Math.tan(value)).toString());
          break;
        case 'e':
          setInput(Math.E.toString());
          break;
        case 'π':
          setInput(Math.PI.toString());
          break;
        case 'Rand':
          setInput(Math.random().toString());
          break;
        case '2nd':
          setSecondFunction(!secondFunction);
          break;
        case 'Rad':
          setAngleMode(angleMode === 'deg' ? 'rad' : 'deg');
          break;
        default:
          break;
      }
    } catch {
      setInput('Error');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          <div className="pb-1">
            <input
              type="text"
              value={input}
              className="w-full h-32 bg-gray-800 px-4 text-white text-right text-3xl"
              readOnly
            />
          </div>
          <table className="w-full">
            <tbody>
              <tr>
                {['(', ')', 'MC', 'M+', 'M-', 'MR', 'AC', '+/-', '%', '÷'].map((item, index) => (
                  <td key={item}>
                    <button
                      className={`w-16 h-16 text-2xl text-white ${index === 9 ? 'bg-yellow-500' : 'bg-gray-700'}`}
                      onClick={() => {
                        if (['C', 'MC', 'M+', 'M-', 'MR'].includes(item)) {
                          handleMemory(item);
                        } else if (item === '+/-') {
                          setInput((parseFloat(input) * -1).toString());
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {['2nd', 'x²', 'x³', 'xy', 'ex', '10x', '7', '8', '9', '*'].map((item, index) => (
                  <td key={item}>
                    <button
                      className={`w-16 h-16 text-2xl text-white ${['7', '8', '9'].includes(item) ? 'bg-gray-800' : index === 9 ? 'bg-yellow-500' : 'bg-gray-700'}`}
                      onClick={() => {
                        if (secondFunction && ['sin', 'cos', 'tan'].includes(item)) {
                          handleScientific(item);
                          setSecondFunction(false);
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {['1/x', '²√x', '³√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-'].map((item, index) => (
                  <td key={item}>
                    <button
                      className={`w-16 h-16 text-2xl text-white ${['4', '5', '6'].includes(item) ? 'bg-gray-800' : index === 9 ? 'bg-yellow-500' : 'bg-gray-700'}`}
                      onClick={() => {
                        if (secondFunction && ['2√x', '3√x', 'ln', 'log10'].includes(item)) {
                          handleScientific(item);
                          setSecondFunction(false);
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'].map((item, index) => (
                  <td key={item}>
                    <button
                      className={`w-16 h-16 text-2xl text-white ${['1', '2', '3'].includes(item) ? 'bg-gray-800' : index === 9 ? 'bg-yellow-500' : 'bg-gray-700'}`}
                      onClick={() => {
                        if (secondFunction && ['x2', 'x3', 'xy', 'ex', '10x'].includes(item)) {
                          handleScientific(item);
                          setSecondFunction(false);
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
              <tr>
                {['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'].map((item, index) => (
                  <td key={item}>
                    <button
                      className="w-16 h-16 bg-gray-700 text-2xl text-white"
                      onClick={() => {
                        if (['π', 'Rad'].includes(item)) {
                          handleScientific(item);
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
                <td colSpan="2">
                  <button
                    className="w-full h-16 bg-gray-800 text-2xl text-white"
                    onClick={() => handleClick('0')}
                  >
                    0
                  </button>
                </td>
                {['.', '='].map((item, index) => (
                  <td key={item}>
                    <button
                      className={`w-16 h-16 text-2xl text-white ${item === '.' ? 'bg-gray-800' : index === 1 ? 'bg-yellow-500' : 'bg-gray-700'}`}
                      onClick={() => {
                        if (item === '=') {
                          handleCalculate();
                        } else {
                          handleClick(item);
                        }
                      }}
                    >
                      {item}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
