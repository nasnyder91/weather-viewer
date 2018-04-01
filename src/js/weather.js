class Weather {
  constructor(){
    this.apiKey = 'a99f3c5b11340a43';
  }

  // Fetch weather from api
  async getWeather(city, state){
    const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${state}/${city}.json`);
    const responseData = await response.json();

    return responseData.current_observation;
  }
}

export const weather = new Weather();
