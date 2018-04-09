import M from 'materialize-css';
import uuidv4 from 'uuid/v4';
import { ui } from './ui';
import { weather } from './weather';
import { storage } from './storage';
import { formSubmit } from './formsubmit';

import 'materialize-css/dist/css/materialize.css';
import '../assets/css/style.css';
// import 'material-design-icons/iconfont/material-icons.css';

var weatherTabs;
var addModal;
var deleteModal;
var contactModal;
var fabs;
var toolTips;


// EVENT LISTENERS
// DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  loadWeatherTabs();
  initMaterialize();
});
// Weather tab transition end event listener
document.querySelector('#weatherTabs').addEventListener('transitionend', tabSlideEnded);
// Add weather tab event listener
document.querySelector('#addTab').addEventListener('click', showAddModal);
// Weather cards event listener for delete, refresh, and arrows
document.querySelector('#weatherCards').addEventListener('click', (e) => {
  showDeleteModal(e);
  refreshTab(e);
  arrowClicked(e);
  setDefault(e);
});
// Confirm add weather event listener
document.querySelector('#confirmWeatherBtn').addEventListener('click', addWeatherTab);
// Confirm add weather with enter key event listener
document.addEventListener('keyup', (e) => {
  if(((e.target.id === 'newCity') || (e.target.id === 'newState')) && (e.key === 'Enter')){
    addWeatherTab();
  }
});
// Confirm delete tab event listener
document.querySelector('#confirmDeleteBtn').addEventListener('click', () => deleteWeatherTab());
// Submit form
document.querySelector('#contactForm').addEventListener('submit', submitForm);

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

  initToolTips();
}

// Initialize tabs
function initTabs(){
  const tabs = document.querySelector('.tabs');

  weatherTabs = M.Tabs.init(tabs, {
    swipeable: true,
    duration: 300
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
  var openContact = document.querySelector('#contactModal');
  addModal = M.Modal.init(addTab, {
    onCloseStart: () => ui.hideAddErr()
  });
  deleteModal = M.Modal.init(deleteTab, {});
  contactModal = M.Modal.init(openContact, {});
}

// Initialize floating action buttons
function initFAB(){
  const fab = document.querySelectorAll('.fixed-action-btn');
  fabs = M.FloatingActionButton.init(fab, {
    direction: 'top'
  });
}

// Reinitialize floating action buttons
function reinitFAB(){
  fabs.forEach((fab) => {
    fab.destroy();
  });
  initFAB();
}

// Initialize Tooltips
function initToolTips(){
  const tt = document.querySelectorAll('.tooltipped');
  toolTips = M.Tooltip.init(tt, {});
}

// Reinitialize Tooltips
function reinitToolTips(){
  toolTips.forEach(tt => {
    tt.destroy();
  });
  initToolTips();
}

// Show add tab modal
function showAddModal(){
  addModal.open();
}

// Add new weather tab to tabs
function addWeatherTab(){
  if((document.querySelector('#newCity').value === '') || (document.querySelector('#newState').value === '')){
    ui.showAddErr('Please enter both city and state/country');
    return;
  }
  addModal.close();
  ui.addNewWeatherTab((key, city, state) => {
    storage.addWeatherLoc({key, city, state});
    reinitTabs();
    weatherTabs.select(`${key}`);
    reinitFAB();
    reinitToolTips();
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
function deleteWeatherTab(key){
  let currentTabKey;

  if(!key){
    currentTabKey = weatherTabs.$activeTabLink[0].attributes[1].value;
  } else{
    currentTabKey = key;
  }

  ui.removeWeatherTab(currentTabKey, () => {
    storage.deleteWeatherLoc(currentTabKey);
    storage.deleteWeatherData(currentTabKey);
    reinitTabs();
    weatherTabs.select(`${storage.getWeatherLocs()[0].key}`);
  });
}

// Left or right arrow clicked
function arrowClicked(e){
  let newTab;
  if((e.target.classList.contains('leftArrow')) && (weatherTabs.index !== 0)){
    newTab = weatherTabs.$tabLinks[weatherTabs.index - 1].attributes[1].value.substr(1);
    weatherTabs.select(newTab);
  }
  if((e.target.classList.contains('rightArrow')) && (weatherTabs.index !== weatherTabs.$tabLinks.length - 1)){
    newTab = weatherTabs.$tabLinks[weatherTabs.index + 1].attributes[1].value.substr(1);
    weatherTabs.select(newTab);
  }
}

// Set tab as default
function setDefault(e){
  if(e.target.classList.contains('setDefaultBtn')){
    if((weatherTabs.index === 0) || (weatherTabs.$tabLinks.length < 2)){
      return;
    }
    const key = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    storage.setDefault(key, weatherTabs.index);
    ui.setDefault(weatherTabs.index, () => {
      reinitTabs();
    });
  }
}

// End weather tab slide
function tabSlideEnded(e){
  if(e.target.classList.contains('active')){
    let key = weatherTabs.$activeTabLink[0].attributes[1].value;
    if(key.includes('#')){
      key = key.slice(key.indexOf('#') + 1);
    }
    ui.hideShowArrows(key, weatherTabs.index, weatherTabs.$tabLinks.length-1);

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
  let forecastData;
  let contains;
  if(storage.getWeatherData()){
    weatherData = storage.getWeatherData();
    weatherData.forEach((data) => {
      if(data.key === key){
        contains = true;
        locationData = data.weather;
        forecastData = data.forecast;
      }
    });
    if(contains){
      ui.fillTab(locationData, forecastData, '#' + key);
      ui.hideSpinner('#' + key);
    } else{
      getWeather(city, state, '#' + key);
    }
  } else{
    getWeather(city, state, '#' + key);
  }
}

// Get weather
function getWeather(city, state, targetTabID){
  let weatherConditions;
  let forecast;
  ui.showSpinner(targetTabID);
  weather.getWeather(city, state)
    .then(results => {
      weatherConditions = results.current_observation;
      forecast = results.forecast.simpleforecast.forecastday;
      storage.addWeatherData(targetTabID, weatherConditions, forecast);
      ui.fillTab(weatherConditions, forecast, targetTabID);
      ui.hideSpinner(targetTabID);
    })
    .catch(err => {
      console.log(`ERROR: ${err.type} -- ${err.description}`);
      if(err.type === 'querynotfound'){
        showAddModal();
        ui.showAddErr('The location you entered does not exist.  Please check your spelling and try again.');
        deleteWeatherTab(targetTabID);
      } else{
        showAddModal();
        ui.showAddErr('Something went wrong.  Please try again.');
      }
    });
}

// Submit contact form
function submitForm(e){
  e.preventDefault();

  formSubmit.submitForm();
}
