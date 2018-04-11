import rain from '../assets/img/rain.jpg';
import snow from '../assets/img/snow.jpg';
import mist from '../assets/img/mist.jpg';
import fog from '../assets/img/fog.jpg';
import haze from '../assets/img/haze.jpg';
import sandstorm from '../assets/img/sandstorm.jpg';
import storm from '../assets/img/storm.jpg';
import clear from '../assets/img/clear.jpg';
import partlycloudy from '../assets/img/partlycloudy.jpg';
import cloudy from '../assets/img/cloudy.jpg';
import ice from '../assets/img/ice.jpg';
import dust from '../assets/img/dust.jpg';
import smoke from '../assets/img/smoke.jpg';
import tornado from '../assets/img/funnelCloud.jpg';





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
      case 'hail':bg = ice;break;
      case 'mist':bg = mist;break;
      case 'fog':bg = fog;break;
      case 'fog patches':bg = fog;break;
      case 'smoke':bg = smoke;break;
      case 'volcanic ash':bg = smoke;break;
      case 'widespread dust':bg = dust;break;
      case 'sand':bg = sandstorm;break;
      case 'haze':bg = haze;break;
      case 'spray':bg = mist;break;
      case 'dust whirls':bg = dust;break;
      case 'sandstorm':bg = sandstorm;break;
      case 'low drifting snow':bg = snow;break;
      case 'low drifting widespread dust':bg = dust;break;
      case 'low drifting sand':bg = sandstorm;break;
      case 'blowing snow':bg = snow;break;
      case 'blowing widespread dust':bg = dust;break;
      case 'blowing sand':bg = sandstorm;break;
      case 'rain mist':bg = mist;break;
      case 'rain showers':bg = rain;break;
      case 'snow showers':bg = snow;break;
      case 'snow blowing snow mist':bg = snow;break;
      case 'ice pellet showers':bg = ice;break;
      case 'hail showers':bg = 'ice';break;
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
      case 'small hail':bg = ice;break;
      case 'squalls':bg = storm;break;
      case 'funnel cloud':bg = tornado;break;
      case 'unknown precipitation':bg = '';break;
      case 'unknown':bg = '';break;
      default: bg = clear;
    }

    return bg;
  }
}

export const backgrounds = new Backgrounds();
