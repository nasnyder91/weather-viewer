import rain from '../assets/img/rain.jpeg';
import snow from '../assets/img/snow.jpeg';
import mist from '../assets/img/mist.jpeg';
import fog from '../assets/img/fog.jpeg';
import haze from '../assets/img/haze.jpeg';
import sandstorm from '../assets/img/sandstorm.jpeg';
import storm from '../assets/img/storm.jpeg';
import clear from '../assets/img/clear.jpeg';
import partlycloudy from '../assets/img/partlycloudy.jpeg';
import cloudy from '../assets/img/cloudy.jpeg';
import ice from '../assets/img/ice.jpeg';





class Backgrounds {
  getBackground(weather){
    let bg;

    weather = weather.toLowerCase();
    if(weather.includes('light') || weather.includes('heavy')){
      weather = weather.slice(weather.indexOf(' ')+1);
    }


    switch(weather) {
      case 'rain':bg = rain;break;
      case 'snow':bg = snow;break;
      case 'snow grains':bg = snow;break;
      case 'ice crystals':bg = ice;break;
      case 'ice pellets':bg = ice;break;
      case 'hail':bg = '';break;
      case 'mist':bg = mist;break;
      case 'fog':bg = fog;break;
      case 'fog patches':bg = fog;break;
      case 'smoke':bg = '';break;
      case 'volcanic ash':bg = '';break;
      case 'widespread dust':bg = '';break;
      case 'sand':bg = '';break;
      case 'haze':bg = haze;break;
      case 'spray':bg = '';break;
      case 'dust whirls':bg = '';break;
      case 'sandstorm':bg = sandstorm;break;
      case 'low drifting snow':bg = snow;break;
      case 'low drifting widespread dust':bg = '';break;
      case 'low drifting sand':bg = sandstorm;break;
      case 'blowing snow':bg = snow;break;
      case 'blowing widespread dust':bg = '';break;
      case 'blowing sand':bg = sandstorm;break;
      case 'rain mist':bg = mist;break;
      case 'rain showers':bg = rain;break;
      case 'snow showers':bg = snow;break;
      case 'snow blowing snow mist':bg = snow;break;
      case 'ice pellet showers':bg = ice;break;
      case 'hail showers':bg = '';break;
      case 'thunderstorm':bg = storm;break;
      case 'thunderstorms and rain':bg = storm;break;
      case 'thunderstorms and snow':bg = storm;break;
      case 'thunderstorms and ice pellets':bg = storm;break;
      case 'thunderstorms with hail':bg = storm;break;
      case 'thunderstorms with small hail':bg = storm;break;
      case 'freezing drizzle':bg = ice;break;
      case 'freezing rain':bg = ice;break;
      case 'freezing fog':bg = fog;break;
      case 'patches of fog':bg = fog;break;
      case 'shallow fog':bg = fog;break;
      case 'partial fog':bg = fog;break;
      case 'overcast':bg = cloudy;break;
      case 'clear':bg = clear;break;
      case 'partly cloudy':bg = partlycloudy;break;
      case 'mostly cloudy':bg = cloudy;break;
      case 'scattered clouds':bg = partlycloudy;break;
      case 'small hail':bg = '';break;
      case 'squalls':bg = storm;break;
      case 'funnel cloud':bg = '';break;
      case 'unknown precipitation':bg = '';break;
      case 'unknown':bg = '';break;
      default: bg = '';
    }

    return bg;
  }
}

export const backgrounds = new Backgrounds();
