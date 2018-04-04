class Weather {
  constructor(){
    this.apiKey = 'a99f3c5b11340a43';
  }

  // Fetch weather from api
  async getWeather(city, state){
    console.log('Pulling weather from api');
    const response = await fetch(`https://api.wunderground.com/api/${this.apiKey}/conditions/forecast/q/${state}/${city}.json`);
    const responseData = await response.json();

    if(responseData.response.error){
      throw responseData.response.error;
    } else{
      return responseData;
    }

  }
}

export const weather = new Weather();
