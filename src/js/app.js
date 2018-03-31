import M from 'materialize-css';
import { ui } from './ui';
import { weather } from './weather';


import 'materialize-css/dist/css/materialize.css';
import '../assets/css/style.css';
// import 'material-design-icons/iconfont/material-icons.css';

var weatherTabs;
var addModal;


// EVENT LISTENERS
// DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  initMaterialize();
  getWeather(document.querySelector('#weatherTabs').children[0].children[0].attributes.href.value);
});
// Weather tab clicked event listener
document.querySelector('#weatherTabs').addEventListener('click', tabClicked);
// Add weather tab event listener
document.querySelector('#addTab').addEventListener('click', showAddModal);
// Confirm add weather
document.querySelector('#confirmWeatherBtn').addEventListener('click', addWeatherTab);



// Initialize Materialize elements
function initMaterialize(){
  initTabs();

  initModal();
}

// Initialize tabs
function initTabs(){
  const tabs = document.querySelector('.tabs');

  weatherTabs = M.Tabs.init(tabs, {
    swipeable: true,
    duration: 300,
    //responsiveThreshold: The maximum width of the screen, in pixels, where the swipeable functionality initializes.,
    //onShow: Callback when new tab is shown
  });
}

// Initialize Modal
function initModal(){
  var modal = document.querySelector('.modal');
  addModal = M.Modal.init(modal, {});
}

// Show add tab modal
function showAddModal(){
  addModal.open();
}

// Add new weather tab to tabs
function addWeatherTab(){
  ui.addNewWeatherTab((city, state) => {
    weatherTabs.destroy();
    initTabs();
    weatherTabs.select(`${city}_${state}`);
  });
}

// Weather tab clicked
function tabClicked(e){
  if(e.target.classList.contains('tabLink')){
    getWeather(e.target.attributes.href.value);
  }
}

// Get weather
function getWeather(targetTabID){
  weather.getWeather('Flemington', 'NJ')
    .then(results => {
      ui.fillTab(results, targetTabID);
    })
    .catch(err => console.log(err));
}
