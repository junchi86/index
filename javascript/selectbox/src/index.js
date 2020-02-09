// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const country = document.querySelector("select");
const countryOpt = document.querySelectorAll("option");

const SELECTED_COUNTRY = "selectedCountry";

const getCountry = () => localStorage.getItem(SELECTED_COUNTRY);

const setCountry = selCountry => {
  localStorage.setItem(SELECTED_COUNTRY, selCountry);
};

const loadCountry = () => {
  if (getCountry()) {
    for (let i = 0; i < countryOpt.length; i++) {
      if (getCountry() === countryOpt[i].value) {
        countryOpt[i].setAttribute("selected", true);
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
    console.log(getCountry());
  } else {
    return;
  }
});
