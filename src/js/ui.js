import uuidv4 from 'uuid/v4';
import { backgrounds } from './backgrounds';

class UI {
  constructor(){
    this.tabsList = document.querySelector('#weatherTabs');
    this.weatherCards = document.querySelector('#weatherCards');
  }

  // Load tabs
  loadTab(key, city, state){
    const newTab = document.createElement('li');
    newTab.className = 'tab';
    newTab.innerHTML = `
      <a class="tabLink" href="#${key}">${city}, ${state}</a>
    `;
    this.tabsList.appendChild(newTab);

    const newCard = document.createElement('div');
    newCard.className = 'card blue-grey darken-1';
    newCard.id = `${key}`;
    newCard.innerHTML = `
      <div class="card-content white-text center-align">
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large yellow darken-4"><i class="material-icons" id="deleteTab">mode_edit</i></a>
          <ul>
            <li><a class="btn-floating btn waves-effect waves-light red"><i class="material-icons deleteTab">delete</i></a></li>
            <li><a class="btn-floating btn waves-effect waves-light green"><i class="material-icons refreshTab">refresh</i></a></li>
          </ul>
        </div>
        <h1 class="red-text location">LOCATION</h1>
        <p class="red-text time">Observation Time</p>
        <h4 class="red-text w-overview">Weather Overview</h4>
        <p class="red-text">TEMP: <span class="temp">F/C</span></p>
        <a class="waves-effect activator btn"><i class="material-icons">menu</i></a>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4"><span class="reveal-location">LOCATION</span><i class="material-icons right">close</i></span>
        <ul class="collection">
          <li class="collection-item">WEATHER: <span class="reveal-w-overview">WEATHER OVERVIEW</span></li>
          <li class="collection-item">TEMP: <span class="reveal-temp">F/C</span></li>
          <li class="collection-item">FEELS LIKE: <span class="feels-like">F/C</span></li>
          <li class="collection-item">WIND: <span class="wind">Wind</span></li>
          <li class="collection-item">HUMIDITY: <span class="humidity">Humidity</span></li>
          <li class="collection-item">PRESSURE: <span class="pressure">Pressure</span></li>
        </ul>
      </div>
    `;
    this.weatherCards.appendChild(newCard);
  }

  // Fill weather tab data
  fillTab(weather, targetTabID){
    console.log(weather);
    const targetTab = this.weatherCards.querySelector(targetTabID);
    const cardBG = backgrounds.getBackground(weather.weather);
    targetTab.style.backgroundImage = `url(${cardBG})`;
    targetTab.querySelector('.location').textContent = weather.display_location.full;
    targetTab.querySelector('.time').textContent = weather.observation_time;
    targetTab.querySelector('.w-overview').textContent = weather.weather;
    targetTab.querySelector('.temp').textContent = weather.temperature_string;
    targetTab.querySelector('.reveal-location').textContent = weather.display_location.full;
    targetTab.querySelector('.reveal-w-overview').textContent = weather.weather;
    targetTab.querySelector('.reveal-temp').textContent = weather.temperature_string;
    targetTab.querySelector('.feels-like').textContent = weather.feelslike_string;
    targetTab.querySelector('.wind').textContent = weather.wind_string;
    targetTab.querySelector('.humidity').textContent = weather.relative_humidity;
    targetTab.querySelector('.pressure').textContent = weather.pressure_in + ' ' + weather.pressure_trend;
    targetTab.querySelector('.reveal-temp').textContent = weather.temperature_string;
    targetTab.querySelector('.reveal-temp').textContent = weather.temperature_string;

  }

  // Add new weather tab
  addNewWeatherTab(callback){
    const key = 'w' + uuidv4();
    const city = document.querySelector('#newCity').value;
    const state = document.querySelector('#newState').value;

    this.loadTab(key, city, state);
    this.clearAddFields();

    callback(key, city, state);
  }

  // Remove weather tab
  removeWeatherTab(id, callback){
    const tabs = Array.from(this.tabsList.children);
    for(let i = 1; i < tabs.length; i++){
      if(tabs[i].children[0].attributes[1].value === id){
        this.tabsList.removeChild(tabs[i]);
        break;
      }
    }
    const card = this.weatherCards.querySelector(id);
    card.parentNode.removeChild(card);

    callback();
  }

  // Clear add modal inputs
  clearAddFields(){
    document.querySelector('#newCity').value = '';
    document.querySelector('#newState').value = '';
  }
}

export const ui = new UI();
