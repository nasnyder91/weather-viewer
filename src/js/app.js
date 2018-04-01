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


// EVENT LISTENERS
// DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  loadWeatherTabs();

  initMaterialize();
});
// Weather tab clicked event listener
document.querySelector('#weatherTabs').addEventListener('click', tabClicked);
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
    // if(!storage.getWeatherData()){
    //   getWeather(loc.city, loc.state, '#' + loc.key);
    // } else{
    //   const weatherData = storage.getWeatherData();
    //   weatherData.forEach((data) => {
    //     if(loc.key === data.key){
    //       ui.fillTab(data.weather, '#' + data.key);
    //     }
    //   });
    // }
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
    //responsiveThreshold: The maximum width of the screen, in pixels, where the swipeable functionality initializes.,
    //onShow: Callback when new tab is shown
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

// Initialize floating action button
function initFAB(){
  const fab = document.querySelectorAll('.fixed-action-btn');
  var instance = M.FloatingActionButton.init(fab, {});
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
    const key = weatherTabs.$activeTabLink[0].attributes[1].value;
    const loc = storage.getLocation(key.substr(1));
    const city = loc.city;
    const state = loc.state;
    getWeather(city, state, key);
  }
}

// Delete current weather tab
function deleteWeatherTab(){
  const currentTabKey = weatherTabs.$activeTabLink[0].attributes[1].value;
  ui.removeWeatherTab(currentTabKey, () => {
    reinitTabs();
    weatherTabs.select(`${storage.getWeatherLocs()[0].key}`);
  });
  storage.deleteWeatherLoc(currentTabKey);
  storage.deleteWeatherData(currentTabKey);
}

// Weather tab clicked
function tabClicked(e){
  if(e.target.classList.contains('tabLink')){
    const key = e.target.attributes.href.value.substr(1);
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
}

// Get weather
function getWeather(city, state, targetTabID){
  weather.getWeather(city, state)
    .then(results => {
      storage.addWeatherData(targetTabID.substr(1), results);
      ui.fillTab(results, targetTabID);
    })
    .catch(err => console.log(err));
}
