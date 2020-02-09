const calculator = {
  plus: function(array) {
    const numberOfArgs = array.length;
    let result = array[0];
    if (numberOfArgs === 0) {
      return (result = 0);
    } else {
      for (let i = 1; i < array.length; i++) {
        result += array[i];
      }
      return result;
    }
  },
  minus: function(array) {
    const numberOfArgs = array.length;
    let result = array[0];
    if (numberOfArgs === 0) {
      return (result = 0);
    } else {
      for (let i = 1; i < array.length; i++) {
        result -= array[i];
      }
      return result;
    }
  },
  multiply: function(array) {
    const numberOfArgs = array.length;
    let result = array[0];
    if (numberOfArgs === 0) {
      return (result = 0);
    } else {
      for (let i = 1; i < array.length; i++) {
        result *= array[i];
      }
      return result;
    }
  },
  division: function(array) {
    const numberOfArgs = array.length;
    let result = array[0];
    if (numberOfArgs === 0) {
      return (result = 0);
    } else {
      for (let i = 1; i < array.length; i++) {
        result /= array[i];
      }
      return result;
    }
  }
};

const result = document.querySelector('.main-result');
const subResult = document.querySelector('.sub-result');
const form = document.querySelector('form');
let nums = [];
const equelization = () => {
  switch (nums[0]) {
    case '+':
      nums.shift();
      nums.push(parseInt(result.innerHTML));
      result.innerHTML = calculator.plus(nums);
      subResult.innerHTML = '0';
      nums = [];
      break;
    case '-':
      nums.shift();
      nums.push(parseInt(result.innerHTML));
      result.innerHTML = calculator.minus(nums);
      subResult.innerHTML = '0';
      nums = [];
      break;
    case 'x':
      nums.shift();
      nums.push(parseInt(result.innerHTML));
      result.innerHTML = calculator.multiply(nums);
      subResult.innerHTML = '0';
      nums = [];
      break;
    case '/':
      nums.shift();
      nums.push(parseInt(result.innerHTML));
      result.innerHTML = calculator.division(nums);
      subResult.innerHTML = '0';
      nums = [];
      break;
    case '=':
      nums.shift();
      subResult.innerHTML = '0';
    default:
      break;
  }
};

form.addEventListener('click', function(e) {
  e.preventDefault();
  switch (e.target.value) {
    case undefined:
      break;
    case 'reset':
      nums = [];
      result.innerHTML = 0;
      subResult.innerHTML = 0;
      break;
    case 'plus':
      equelization();
      nums.push(parseInt(result.innerHTML));
      subResult.innerHTML = `+=>${calculator.plus(nums)}`;
      nums = [calculator.plus(nums)];
      nums.unshift('+');
      result.innerHTML = '';
      break;
    case 'minus':
      equelization();
      nums.push(parseInt(result.innerHTML));
      subResult.innerHTML = `-=>${calculator.minus(nums)}`;
      nums = [calculator.minus(nums)];
      nums.unshift('-');
      result.innerHTML = '';
      break;
    case 'multiply':
      equelization();
      nums.push(parseInt(result.innerHTML));
      subResult.innerHTML = `x=>${calculator.multiply(nums)}`;
      nums = [calculator.multiply(nums)];
      nums.unshift('x');
      result.innerHTML = '';
      break;
    case 'division':
      equelization();
      nums.push(parseInt(result.innerHTML));
      subResult.innerHTML = `/=>${calculator.division(nums)}`;
      nums = [calculator.division(nums)];
      nums.unshift('/');
      result.innerHTML = '';
      break;
    case 'equel':
      equelization();
      nums.unshift('=');
      subResult.innerHTML = 'result';
      break;
    default:
      if (result.innerHTML === '0') {
        return (result.innerHTML = e.target.value);
      } else {
        if (nums[0] === '=') {
          nums.shift();
          subResult.innerHTML = '0';
          return (result.innerHTML = e.target.value);
        }
        return result.append(e.target.value);
      }
      break;
  }
});
