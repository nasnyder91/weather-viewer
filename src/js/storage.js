import uuidv4 from 'uuid/v4';

class Storage {
  constructor(){
    this.defaultWeatherLocs = [
      {
        key: 'default1',
        city: 'New York City',
        state: 'NY'
      },
      {
        key: 'default2',
        city: 'Austin',
        state: 'TX'
      },
      {
        key: 'default3',
        city: 'Denver',
        state: 'CO'
      }
    ]
  }

  // ---------------------------------------- LOCAL STORAGE -----------------------------------------------------

  // Returns weather locations from local storage or default locations
  getWeatherLocs(){
    let locs;

    if(localStorage.getItem('weatherLocs') === null){
      locs = this.defaultWeatherLocs;
    } else{
      locs = JSON.parse(localStorage.getItem('weatherLocs'));
    }

    return locs;
  }

  // Get single location from key, else returns false
  getLocation(key){
    let locs;
    let loc;

    if(key.includes('#')){
      key = key.slice(key.indexOf('#')+1);
    }

    if(localStorage.getItem('weatherLocs') === null){
      locs = this.defaultWeatherLocs;
      locs.forEach((l) => {
        if(l.key === key){
          loc = l;
        }
      });
    } else{
      locs = JSON.parse(localStorage.getItem('weatherLocs'));
      locs.forEach((l) => {
        if(l.key === key){
          loc = l;
        }
      });
    }

    if(!loc){
      return false;
    }

    return loc;
  }

  // Sets weather locations to local storage
  addWeatherLoc(loc){
    let locs;

    if(localStorage.getItem('weatherLocs') === null){
      locs = this.defaultWeatherLocs;
      locs.push(loc);
      localStorage.setItem('weatherLocs', JSON.stringify(locs));
    } else{
      locs = JSON.parse(localStorage.getItem('weatherLocs'));
      locs.push(loc);
      localStorage.setItem('weatherLocs', JSON.stringify(locs));
    }
  }

  // Delete weather location
  deleteWeatherLoc(key){
    let locs = JSON.parse(localStorage.getItem('weatherLocs'));
    if(key.includes('#')){
      key = key.slice(key.indexOf('#')+1);
    }

    if(!locs){
      return;
    } else{
      locs.forEach((loc, index) => {
        if(loc.key === key){
          locs.splice(index, 1);
        }
      });

      localStorage.setItem('weatherLocs', JSON.stringify(locs));
    }
  }

  // Set location as default (first)
  setDefault(key, index){
    let locs;

    if(localStorage.getItem('weatherLocs') === null){
      locs = this.defaultWeatherLocs;
    } else{
      locs = JSON.parse(localStorage.getItem('weatherLocs'));
    }

    let loc = locs[index];
    locs.splice(index, 1);
    locs.splice(0, 0, loc);

    localStorage.setItem('weatherLocs', JSON.stringify(locs));
  }

  // ---------------------------------------- SESSION STORAGE -----------------------------------------------------

  // Get weather data
  getWeatherData(){
    let data;

    if(sessionStorage.getItem('weatherData') === null){
      data = false;
    } else{
      data = JSON.parse(sessionStorage.getItem('weatherData'));
    }

    return data;
  }

  // Set weather data
  addWeatherData(key, weather, forecast){
    let data;
    if(key.includes('#')){
      key = key.slice(key.indexOf('#')+1);
    }

    if(sessionStorage.getItem('weatherData') === null){
      data = [];
      data.push({key, weather, forecast});
      sessionStorage.setItem('weatherData', JSON.stringify(data));
    } else{
      data = JSON.parse(sessionStorage.getItem('weatherData'));
      data.push({key, weather, forecast});
      sessionStorage.setItem('weatherData', JSON.stringify(data));
    }
  }

  // Delete weather data
  deleteWeatherData(key){
    let weatherData = JSON.parse(sessionStorage.getItem('weatherData'));
    if(key.includes('#')){
      key = key.slice(key.indexOf('#')+1);
    }

    weatherData.forEach((data, index) => {
      if(data.key === key){
        weatherData.splice(index, 1);
      }
    });

    sessionStorage.setItem('weatherData', JSON.stringify(weatherData));
  }
}

export const storage = new Storage();
