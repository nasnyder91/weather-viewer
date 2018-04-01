import M from 'materialize-css';
import uuidv4 from 'uuid/v4';
import { ui } from './ui';
import { weather } from './weather';
import { storage } from './storage';

import 'materialize-css/dist/css/materialize.css';
import '../assets/css/style.css';
// import 'material-design-icons/iconfont/material-icons.css';

var weatherTabs;
var addModal;
var deleteModal;
var fabs;


// EVENT LISTENERS
// DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  loadWeatherTabs();
  initMaterialize();
});
// Weather tab clicked event listener
// document.querySelector('#weatherTabs').addEventListener('click', tabClicked);
document.querySelector('#weatherTabs').addEventListener('transitionend', tabSlideEnded);
// Add weather tab event listener
document.querySelector('#addTab').addEventListener('click', showAddModal);
// Weather cards event listener for delete and refresh
document.querySelector('#weatherCards').addEventListener('click', (e) => {
  showDeleteModal(e);
  refreshTab(e);
});
// Confirm add weather event listener
document.querySelector('#confirmWeatherBtn').addEventListener('click', addWeatherTab);
// Confirm delete tab event listener
document.querySelector('#confirmDeleteBtn').addEventListener('click', deleteWeatherTab);

// Load tabs on startup
function loadWeatherTabs(){
  const weatherLocs = storage.getWeatherLocs();
  weatherLocs.forEach((loc) => {
    ui.loadTab(loc.key, loc.city, loc.state);
  });
}

// Initialize Materialize elements
function initMaterialize(){
  initTabs();

  initModal();

  initFAB();
}

// Initialize tabs
function initTabs(){
  const tabs = document.querySelector('.tabs');

  weatherTabs = M.Tabs.init(tabs, {
    swipeable: true,
    duration: 300,
    // responsiveThreshold: '1200px',
    // onShow: () => {
    //   if(weatherTabs){
    //     handleTab(weatherTabs.$activeTabLink[0].attributes[1].value.substr(1))
    //   }
    // }
  });
  weatherTabs.select(weatherTabs.$tabLinks[0].attributes[1].value.substr(1));
}

// Reinitialize tabs after any changes
function reinitTabs(){
  weatherTabs.destroy();
  initTabs();
}

// Initialize Modal
function initModal(){
  var addTab = document.querySelector('#addModal');
  var deleteTab = document.querySelector('#deleteModal');
  addModal = M.Modal.init(addTab, {});
  deleteModal = M.Modal.init(deleteTab, {});
}

// Initialize floating action buttons
function initFAB(){
  const fab = document.querySelectorAll('.fixed-action-btn');
  fabs = M.FloatingActionButton.init(fab, {});
}

// Reinitialize floating action buttons
function reinitFAB(){
  fabs.forEach((fab) => {
    fab.destroy();
  });
  initFAB();
}

// Show add tab modal
function showAddModal(){
  addModal.open();
}

// Add new weather tab to tabs
function addWeatherTab(){
  ui.addNewWeatherTab((key, city, state) => {
    storage.addWeatherLoc({key, city, state});
    reinitTabs();
    weatherTabs.select(`${key}`);
    reinitFAB();
  });
}

// Show delete tab modal
function showDeleteModal(e){
  if(e.target.classList.contains('deleteTab')){
    deleteModal.open();
  }
}

// Refresh current tab
function refreshTab(e){
  if(e.target.classList.contains('refreshTab')){
    let key = weatherTabs.$activeTabLink[0].attributes[1].value;
    if(key.includes('#')){
      key = key.slice(key.indexOf('#') + 1);
    }
    const loc = storage.getLocation(key);
    const city = loc.city;
    const state = loc.state;
    getWeather(city, state, '#' + key);
  }
}

// Delete current weather tab
function deleteWeatherTab(){
  const currentTabKey = weatherTabs.$activeTabLink[0].attributes[1].value;
  ui.removeWeatherTab(currentTabKey, () => {
    storage.deleteWeatherLoc(currentTabKey);
    storage.deleteWeatherData(currentTabKey);
    reinitTabs();
    weatherTabs.select(`${storage.getWeatherLocs()[0].key}`);
  });

}

// Weather tab clicked
// function tabClicked(e){
//   if(e.target.classList.contains('tabLink')){
//     let key = e.target.attributes.href.value;
//     if(key.includes('#')){
//       key = key.slice(key.indexOf('#') + 1);
//     }
//     handleTab(key);
//   }
// }

// End weather tab slide
function tabSlideEnded(e){
  if(e.target.classList.contains('active')){
    let key = weatherTabs.$activeTabLink[0].attributes[1].value;
    if(key.includes('#')){
      key = key.slice(key.indexOf('#') + 1);
    }
    handleTab(key);
  }
}

// Handle loading weather tab data
function handleTab(key){
  const locs = storage.getWeatherLocs();
  let city;
  let state;
  locs.forEach((loc) => {
    if(loc.key === key){
      city = loc.city;
      state = loc.state;
    }
  });
  let weatherData;
  let locationData;
  let contains;
  if(storage.getWeatherData()){
    weatherData = storage.getWeatherData();
    weatherData.forEach((data) => {
      if(data.key === key){
        contains = true;
        locationData = data.weather;
      }
    });
    if(contains){
      ui.fillTab(locationData, '#' + key);
    } else{
      getWeather(city, state, '#' + key);
    }
  } else{
    getWeather(city, state, '#' + key);
  }
}

// Get weather
function getWeather(city, state, targetTabID){
  weather.getWeather(city, state)
    .then(results => {
      storage.addWeatherData(targetTabID, results);
      ui.fillTab(results, targetTabID);
    })
    .catch(err => console.log(err));
}
