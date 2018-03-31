class UI {
  constructor(){
    this.tabsList = document.querySelector('#weatherTabs');
    this.weatherCards = document.querySelector('#weatherCards');
  }

  // Fill weather tab
  fillTab(weather, targetTabID){
    console.log(weather);
    const targetTab = document.querySelector(targetTabID);
    targetTab.querySelector('.location').textContent = weather.display_location.full;
    targetTab.querySelector('.w-overview').textContent = weather.icon;
    targetTab.querySelector('.temp').textContent = weather.temperature_string;
  }

  // Add new weather tab
  addNewWeatherTab(callback){
    const city = document.querySelector('#newCity').value;
    const state = document.querySelector('#newState').value;
    const newTab = document.createElement('li');
    newTab.className = 'tab col s3';
    newTab.innerHTML = `
      <a class="tabLink" href="#${city}_${state}">${city}, ${state}</a>
    `;
    this.tabsList.appendChild(newTab);

    const newCard = document.createElement('div');
    newCard.className = 'card blue-grey darken-1';
    newCard.id = `${city}_${state}`;
    newCard.innerHTML = `
      <div class="card-content white-text center-align" style="background-image: url(https://cdn.shopify.com/s/files/1/1205/5946/products/Epic_Rain_Thunder_1024x1024.jpg?v=1497034556);">
        <h1 class="red-text"><span class="location">LOCATION</span></h1>
        <h4 class="red-text wOverview"><span class="w-overview">Weather Overview</span></h4>
        <p class="red-text wTemp">TEMP: <span class="temp">F/C</span></p>
        <a class="waves-effect activator btn">More...</a>
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
    callback(city, state);
  }

  // Clear add modal inputs
  clearAddFields(){
    document.querySelector('#newCity').value = '';
    document.querySelector('#newState').value = '';
  }
}

export const ui = new UI();
