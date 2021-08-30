import './css/styles.css';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import countryCardsTpl from './templates/countryCardsTpl.hbs';



fetch(`https://restcountries.eu/rest/v2/name/Switzerland`)
    .then(response => {
        return (response.json());
    })
    .then(name => {
        console.log(name);
        const markup = countryCardsTpl(name);
        console.log(markup);
    })
    .catch(error => {
        console.log(error);
    });



// alert({
//     text: 'Notice me, senpai!'
//   });