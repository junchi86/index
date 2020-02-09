
const country = document.querySelector("select");
const countryOpt = document.querySelectorAll("option");
const body = document.querySelector('body')

const SELECTED_COUNTRY = "selectedCountry";

const getCountry = () => localStorage.getItem(SELECTED_COUNTRY);
const getBackground = () => {
  switch (getCountry()) {
    case 'Korea':
      body.style.backgroundImage = `url("src/korea.jpg")`
      break;
    case 'Greece':
      body.style.backgroundImage = `url("src/greece.jpg")`
      break;
    case 'Turkey':
      body.style.backgroundImage = `url("src/turkey.jpg")`
      break;
    case 'Finland':
      body.style.backgroundImage = `url("src/finland.jpg")`
      break;
    default: body.style.backgroundImage = 'deeppink'
      break;
  }
}
const setCountry = selCountry => {
  localStorage.setItem(SELECTED_COUNTRY, selCountry);
};

const loadCountry = () => {
  if (getCountry()) {
    for (let i = 0; i < countryOpt.length; i++) {
      if (getCountry() === countryOpt[i].value) {
        countryOpt[i].setAttribute("selected", true);
        getBackground()
      }
    }
  } else {
    countryOpt[0].setAttribute("selected", true);
  }
};

window.onload = loadCountry();
country.addEventListener("change", event => {
  if (event.target.value) {
    setCountry(event.target.value);
    getBackground()
  } else {
    return;
  }
});
