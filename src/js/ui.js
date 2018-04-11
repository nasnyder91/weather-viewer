import uuidv4 from 'uuid/v4';
import { backgrounds } from './backgrounds';
import { storage } from './storage';
import windIcon from '../assets/img/windIcon.png';
import humidityIcon from '../assets/img/humidityIcon.png';
import pressureIcon from '../assets/img/pressureIcon.png';
import tempIcon from '../assets/img/tempIcon.png';
import weatherIcon from '../assets/img/weatherIcon.png';

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
    newCard.className = 'card cityCard blue-grey darken-1 bgCover center-align';
    newCard.id = `${key}`;
    newCard.innerHTML = `
      <div class="half-opaque center-align">
        <small class="blue-grey-text text-lighten-2 time"></small>
        <br />
        <span class="card-title grey-text text-darken-3 location heavyText"></span>
        <br />
        <img class="icon" src="" alt="" />
        <br />
        <span class=" grey-text text-darken-2 w-overview"></span>
        <p class=" grey-text text-darken-2">TEMP: <span class="temp"></span></p>
      </div>
      <a class="waves-effect activator btn-floating detailsBtn red darken-4"><i class="material-icons">menu</i></a>
      <div class="card-content white-text center-align">
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large yellow darken-4"><i class="material-icons" id="deleteTab">mode_edit</i></a>
          <ul>
            <li><a class="btn-floating btn waves-effect waves-light red"><i class="material-icons deleteTab tooltipped" data-position="left" data-tooltip="Delete this location">delete</i></a></li>
            <li><a class="btn-floating btn waves-effect waves-light green"><i class="material-icons refreshTab tooltipped" data-position="left" data-tooltip="Refresh weather">refresh</i></a></li>
            <li><a class="btn-floating btn waves-effect waves-light blue"><i class="material-icons setDefaultBtn tooltipped" data-position="left" data-tooltip="Set as default">star</i></a></li>
          </ul>
        </div>

        <div class="row">
          <div class="col s12 l10 offset-l1 xl8 offset-xl2">
            <div class="col s12 m8 offset-m2 l4">
              <div class="card forecastCard half-opaque z-depth-5">
                <div class="card-content black-text">
                  <span class="card-title date1">DATE</span>
                  <img class="icon1" src="" alt="" />
                  <p class="high1"></p>
                  <p class="low1"></p>
                  <br />
                  <p class="wind1"></p>
                </div>
              </div>
            </div>
            <div class="col s12 m8 offset-m2 l4">
              <div class="card forecastCard half-opaque z-depth-5">
                <div class="card-content black-text">
                  <span class="card-title date2">DATE</span>
                  <img class="icon2" src="" alt="" />
                  <p class="high2"></p>
                  <p class="low2"></p>
                  <br />
                  <p class="wind2"></p>
                </div>
              </div>
            </div>
            <div class="col s12 m8 offset-m2 l4">
              <div class="card forecastCard half-opaque z-depth-5">
                <div class="card-content black-text">
                  <span class="card-title date3">DATE</span>
                  <img class="icon3" src="" alt="" />
                  <p class="high3"></p>
                  <p class="low3"></p>
                  <br />
                  <p class="wind3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title red-text text-lighten-1 heavyText"><span class="reveal-location">LOCATION</span><i class="material-icons right">close</i></span>
        <hr />
        <div class="container">
          <div class="row detailsGrid">
             <div class="col s12 l4">
                <div class="col s12 m6 l12">
                  <img src="${weatherIcon}" alt="" />
                  <p class="heavyText blue-text text-darken-2">WEATHER</p>
                  <span class="reveal-w-overview">WEATHER OVERVIEW</span>
                </div>
                <div class="col s12 m6 l12">
                  <img src="${humidityIcon}" alt="" />
                  <p class="heavyText blue-text text-darken-2">HUMIDITY</p>
                  <span class="humidity">Humidity</span>
                </div>
               </div>
               <div class="col s12 l4">
                <img src="${tempIcon}" alt="" />
                <p class="heavyText blue-text text-darken-2">TEMP</p>
                <span class="reveal-temp">F/C</span>
                <p class="heavyText blue-text text-darken-2">FEELS LIKE</p>
                <span class="feels-like">F/C</span>
               </div>
               <div class="col s12 s12 l4">
                <div class="col m6 l12">
                  <img src="${windIcon}" alt="" />
                  <p class="heavyText blue-text text-darken-2">WIND</p>
                  <span class="wind">Wind</span>
                </div>
                <div class="col s12 m6 l12">
                  <img src="${pressureIcon}" alt="" />
                  <p class="heavyText blue-text text-darken-2">PRESSURE</p>
                  <span class="pressure">Pressure</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    `;
    //
    // <ul class="collection">
    //   <li class="collection-item">WEATHER: <span class="reveal-w-overview">WEATHER OVERVIEW</span></li>
    //   <li class="collection-item">TEMP: <span class="reveal-temp">F/C</span></li>
    //   <li class="collection-item">FEELS LIKE: <span class="feels-like">F/C</span></li>
    //   <li class="collection-item">WIND: <span class="wind">Wind</span></li>
    //   <li class="collection-item">HUMIDITY: <span class="humidity">Humidity</span></li>
    //   <li class="collection-item">PRESSURE: <span class="pressure">Pressure</span></li>
    // </ul>
    const spinner = document.createElement('div');
    spinner.className = 'spinner cover valign-wrapper bgDarkTransparent';
    spinner.innerHTML = `
      <div class="preloader-wrapper big active centered">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    `;

    const leftArrow = document.createElement('a');
    leftArrow.className = 'leftArrow arrow valign-wrapper hide-on-med-and-down';
    leftArrow.innerHTML = `
      <i class="medium material-icons leftArrow">keyboard_arrow_left</i>
    `;

    const rightArrow = document.createElement('a');
    rightArrow.className = 'rightArrow arrow valign-wrapper hide-on-med-and-down';
    rightArrow.innerHTML = `
      <i class="medium material-icons rightArrow">keyboard_arrow_right</i>
    `;

    newCard.appendChild(spinner);
    newCard.appendChild(leftArrow);
    newCard.appendChild(rightArrow);

    this.weatherCards.appendChild(newCard);
  }

  // Fill weather tab data
  fillTab(weather, forecast, targetTabID){
    // console.log(weather, forecast);
    const targetTab = this.weatherCards.querySelector(targetTabID);
    const cardBG = backgrounds.getBackground(weather.weather);
    targetTab.style.backgroundImage = `url(${cardBG})`;
    targetTab.querySelector('.location').textContent = weather.display_location.full;
    targetTab.querySelector('.time').textContent = weather.observation_time;
    targetTab.querySelector('.icon').src = `https://icons.wxug.com/i/c/k/${weather.icon}.gif`;
    targetTab.querySelector('.icon').alt = `${weather.icon}`;
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
    // FORECAST
    targetTab.querySelector('.date1').textContent = `${forecast[1].date.weekday_short} ${forecast[1].date.month}/${forecast[1].date.day}`;
    targetTab.querySelector('.date2').textContent = `${forecast[2].date.weekday_short} ${forecast[2].date.month}/${forecast[2].date.day}`;
    targetTab.querySelector('.date3').textContent = `${forecast[3].date.weekday_short} ${forecast[3].date.month}/${forecast[3].date.day}`;
    targetTab.querySelector('.icon1').src = `https://icons.wxug.com/i/c/k/${forecast[1].icon}.gif`;
    targetTab.querySelector('.icon1').alt = `${forecast[1].icon}`;
    targetTab.querySelector('.icon2').src = `https://icons.wxug.com/i/c/k/${forecast[2].icon}.gif`;
    targetTab.querySelector('.icon2').alt = `${forecast[2].icon}`;
    targetTab.querySelector('.icon3').src = `https://icons.wxug.com/i/c/k/${forecast[3].icon}.gif`;
    targetTab.querySelector('.icon3').alt = `${forecast[3].icon}`;
    targetTab.querySelector('.high1').textContent = `High: ${forecast[1].high.fahrenheit} F (${forecast[1].high.celsius} C)`;
    targetTab.querySelector('.low1').textContent = `Low: ${forecast[1].low.fahrenheit} F (${forecast[1].low.celsius} C)`;
    targetTab.querySelector('.high2').textContent = `High: ${forecast[2].high.fahrenheit} F (${forecast[2].high.celsius} C)`;
    targetTab.querySelector('.low2').textContent = `Low: ${forecast[2].low.fahrenheit} F (${forecast[2].low.celsius} C)`;
    targetTab.querySelector('.high3').textContent = `High: ${forecast[3].high.fahrenheit} F (${forecast[3].high.celsius} C)`;
    targetTab.querySelector('.low3').textContent = `Low: ${forecast[3].low.fahrenheit} F (${forecast[3].low.celsius} C)`;
    targetTab.querySelector('.wind1').textContent = `Wind: ${forecast[1].avewind.dir} at ${forecast[1].avewind.mph} to ${forecast[1].maxwind.mph} mph`;
    targetTab.querySelector('.wind2').textContent = `Wind: ${forecast[2].avewind.dir} at ${forecast[2].avewind.mph} to ${forecast[2].maxwind.mph} mph`;
    targetTab.querySelector('.wind3').textContent = `Wind: ${forecast[3].avewind.dir} at ${forecast[3].avewind.mph} to ${forecast[3].maxwind.mph} mph`;
  }

  // Hide or show arrows
  hideShowArrows(key, currIndex, lastIndex){
    const card = this.weatherCards.querySelector(`#${key}`);
    const leftArrow = card.querySelector('.leftArrow');
    const rightArrow = card.querySelector('.rightArrow');

    if(currIndex === 0){
      leftArrow.style.display = 'none';
    } else{
      leftArrow.removeAttribute('style');
    }
    if(currIndex === lastIndex){
      rightArrow.style.display = 'none';
    } else{
      rightArrow.removeAttribute('style');
    }
  }

  // Show loading spinner
  showSpinner(targetTabID){
    const targetTab = this.weatherCards.querySelector(targetTabID);
    targetTab.querySelector('.spinner').style.display = 'flex';
  }

  // Hide loading spinner
  hideSpinner(targetTabID){
    const targetTab = this.weatherCards.querySelector(targetTabID);
    targetTab.querySelector('.spinner').style.display = 'none';
  }

  // Show error on add modal
  showAddErr(msg){
    const error = document.querySelector('.addErr');
    error.textContent = msg;
    error.style.display = 'block';
  }

  // Hide error on add modal
  hideAddErr(){
    document.querySelector('.addErr').style.display = 'none';
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
    if(!storage.getLocation(id)){
      return;
    };
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

  // Set tab as default
  setDefault(index, callback){
    const tabs = this.tabsList.querySelectorAll('.tab');
    const cards = this.weatherCards.querySelectorAll('.carousel-item');

    tabs[index].parentNode.insertBefore(tabs[index], tabs[0]);
    cards[index].parentNode.insertBefore(cards[index], cards[0]);

    callback();
  }

  // Clear add modal inputs
  clearAddFields(){
    document.querySelector('#newCity').value = '';
    document.querySelector('#newState').value = '';
  }
}

export const ui = new UI();
