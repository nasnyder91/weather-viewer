import M from 'materialize-css';
import { ui } from './ui';
import { weather } from './weather';


import 'materialize-css/dist/css/materialize.css';
import '../assets/css/style.css';
// import 'material-design-icons/iconfont/material-icons.css';

let weatherTabs;


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initMaterialize);
document.addEventListener('DOMContentLoaded', getWeather('Flemington', 'NJ'));

// Initialize Materialize elements
function initMaterialize(){
  const tabs = document.querySelector('#weatherTabs');
  weatherTabs = M.Tabs.init(tabs, {
    swipeable: true,
    duration: 300,
    //responsiveThreshold: The maximum width of the screen, in pixels, where the swipeable functionality initializes.,
    //onShow: Callback when new tab is shown
  });
}

function getWeather(city, state){
  weather.getWeather(city, state)
    .then(results => {
      console.log(weatherTabs);
      ui.fillTab(results);
    })
    .catch(err => console.log(err));
}
