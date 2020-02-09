const firstNumberInput = document.getElementById('number-input');
const secondNumberInput = document.getElementById('slider');
const secondNumberInputAfterSpan = document.getElementById('slider-after');
const form = document.querySelector('form');
const thirdNumberInput = document.getElementById('number-mind');
const subHeadline = document.getElementById('subheadline');
const contents1 = document.getElementById('contents1');
const contents2 = document.getElementById('contents2');
const contents3 = document.getElementById('contents3');
const h3part = document.createElement('h3');

subHeadline.style.visibility = 'hidden';
contents1.style.visibility = 'hidden';
contents2.style.visibility = 'hidden';
contents3.style.visibility = 'hidden';

firstNumberInput.addEventListener('change', function(e) {
  e.preventDefault();
  document.getElementById(
    'subheadline'
  ).innerText = `0부터 ${e.target.value}까지의 수를 고를 수 있습니다.`;
  subHeadline.style.visibility = 'visible';
  contents1.style.visibility = 'visible';
  secondNumberInput.setAttribute('max', e.target.value);
});

secondNumberInput.addEventListener('change', function(e) {
  e.preventDefault();
  secondNumberInputAfterSpan.innerText = `고르신 숫자는 ${e.target.value}입니다.`;
  contents1.appendChild(h3part);
  h3part.innerText = `0-${e.target.value}사이의 숫자 중 마음 속 숫자를 아래에 써주세요!`;
  contents2.style.visibility = 'visible';
  thirdNumberInput.style.width = '300px';
  thirdNumberInput.setAttribute('min', '0');
  thirdNumberInput.setAttribute('max', e.target.value);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  contents3.style.visibility = 'visible';
  const mathNumber = parseInt(secondNumberInput.value) + 1;
  const humanValue = thirdNumberInput.value;
  const machineValue = Math.floor(Math.random() * mathNumber);
  document.getElementById('chosen-number').innerText = humanValue;
  document.getElementById('machine-chosen-number').innerText = machineValue;
  if (humanValue == machineValue) {
    document.getElementById(
      'contents4'
    ).innerText = `당신이 이겼어요!! 맞춰버렸군요 ㅎㅎ`;
    document.getElementById('contents4').style.color = 'red';
  } else {
    document.getElementById(
      'contents4'
    ).innerText = `당신이 졌군요! 다시하세요!`;
    document.getElementById('contents4').style.color = 'black';
  }
});
