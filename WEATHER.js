const weatherform = document.querySelector(".weatherform");
const weatherSearch = document.querySelector(".weathersearch");
const card= document.querySelector(".card");
const apiKey= "e5394f4a8c35ee0198c0d8fbbeab4f05";

weatherform.addEventListener("submit",async event =>{
  
    event.preventDefault();
   const city = weatherSearch.value;
    if(city){
       try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData)
       }
       catch(error){
        console.error(error);
        displayError(error);
       }
    }
    else{
       displayError("please enter a city"); 
    }
})
async function getWeatherData(city){

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json()
}
function displayWeatherInfo(data){
   const {name: city,
          main: {temp,humidity},
          weather:[{description,id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
     const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
       const descripDisplay = document.createElement("p");
        const weatherEmoji= document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`
        descripDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

       tempDisplay.classList.add("tempDisplay");
       humidityDisplay.classList.add("humidityDisplay");
       descripDisplay.classList.add("descDisplay");
       weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
          card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
             card.appendChild(descripDisplay);
             card.appendChild(weatherEmoji);
           



}
function getWeatherEmoji(weatherId){
 switch(true){

    case(weatherId >= 200 && weatherId < 300):
    return "⛈️"
    
    case(weatherId >= 300 && weatherId < 400):
    return "🌧️"
    
    case(weatherId >= 500 && weatherId < 600):
    return "☔"

    case(weatherId >= 600 && weatherId < 700):
    return "❄️"
    
    case(weatherId >= 700 && weatherId < 800):
    return "🌫️"
   
    case(weatherId=== 800):
    return "😎"
    
    case(weatherId >= 801 && weatherId < 809):
    return "☁️"

    default:
        return " ?";

 }

}
function displayError(message){
 
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}