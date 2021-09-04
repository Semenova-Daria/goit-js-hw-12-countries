import './css/styles.css';
import { notice, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';
import countryCardsTpl from './templates/countryCardsTpl.hbs';
import countryListTpl from './templates/countryListTpl.hbs';


refs.inputForm.addEventListener('input', debounce(onInputForm, 500));

function onInputForm() {
    reset();
    const input = refs.inputForm.value.trim();
    
    fetchCountries(input)
        .then(name => {
            if (name.length === 1) {
                renderCountryCard(name)
            }
            else if (name.length <= 10) {
                renderCountryList(name)
            }
            else { onFetchError(name) }
        })
        .catch((error)=>console.log(error))    
};

function renderCountryList(name) {
    const listMarkup = countryListTpl(name);
    refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
};

function renderCountryCard(name) {
    const markup = countryCardsTpl(name);
    
    refs.countryCard.insertAdjacentHTML('beforeend', markup);
    
    console.log(markup);
};

function onFetchError(name) {
    if (name.length === '') {
        error({
            text: 'No search input!'
        });
    }
    if (name.length > 10) {
        notice({
    text: 'Too many matches found. Please enter a more specific query!'
  });
    }
    if (name.status === 404) {
        error({
            text: 'Сountry not found!'
        });
    }
    
};

function reset() {
  refs.countryCard.innerHTML = "";
  refs.countryList.innerHTML = "";
}