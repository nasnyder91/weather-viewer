import uuidv4 from 'uuid/v4';

class Storage {
  constructor(){
    this.defaultWeatherLocs = [
      {
        key: 'w' + uuidv4(),
        city: 'Flemington',
        state: 'NJ'
      },
      {
        key: 'w' + uuidv4(),
        city: 'Pasadena',
        state: 'MD'
      },
      {
        key: 'w' + uuidv4(),
        city: 'Denver',
        state: 'CO'
      }
    ]
  }

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

    locs.forEach((loc, index) => {
      if(loc.key === key.substr(1)){
        locs.splice(index, 1);
      }
    });

    localStorage.setItem('weatherLocs', JSON.stringify(locs));
  }
}

export const storage = new Storage();
