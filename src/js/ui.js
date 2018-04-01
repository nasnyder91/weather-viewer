import uuidv4 from 'uuid/v4';

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
      <div class="card-content white-text center-align" style="background-image: url(https://cdn.shopify.com/s/files/1/1205/5946/products/Epic_Rain_Thunder_1024x1024.jpg?v=1497034556);">
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large yellow darken-4"><i class="material-icons" id="deleteTab">mode_edit</i></a>
          <ul>
            <li><a class="btn-floating btn waves-effect waves-light red"><i class="material-icons deleteTab">delete</i></a></li>
            <li><a class="btn-floating btn waves-effect waves-light green"><i class="material-icons">refresh</i></a></li>
          </ul>
        </div>
        <h1 class="red-text"><span class="location">LOCATION</span></h1>
        <h4 class="red-text wOverview"><span class="w-overview">Weather Overview</span></h4>
        <p class="red-text wTemp">TEMP: <span class="temp">F/C</span></p>
        <a class="waves-effect activator btn"><i class="material-icons">menu</i></a>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4"><span class="reveal-location">LOCATION</span><i class="material-icons right">close</i></span>
        <ul class="collection">
          <li class="collection-item">TEMP: <span class="reveal-temp">F/C</span></li>
          <li class="collection-item"><span class="wind">Wind</span></li>
          <li class="collection-item"><span class="humidity">Humidity</span></li>
          <li class="collection-item"><span class="pressure">Pressure</span></li>
          <li class="collection-item"><span class="wind-chill">Wind Chill</span></li>
        </ul>
      </div>
    `;
    this.weatherCards.appendChild(newCard);
  }

  // Fill weather tab data
  fillTab(weather, targetTabID){
    const targetTab = this.weatherCards.querySelector(targetTabID);
    targetTab.querySelector('.location').textContent = weather.display_location.full;
    targetTab.querySelector('.w-overview').textContent = weather.weather;
    targetTab.querySelector('.temp').textContent = weather.temperature_string;
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
    for(let i = 0; i < tabs.length; i++){
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
