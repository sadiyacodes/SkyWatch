import React, { useState } from "react" ;
import Header from "./components/Header";
import Entry from "./components/Entry";
import OptionContainer from "./components/OptionContainer";
import WeatherContainer from "./components/WeatherContainer"
import LoadingScreen from "./components/LoadingScreen";
import SearchContainer from "./components/SearchContainer";
import Error from "./components/Error";

let weatherData = {};

function App() {
  
  let api_key = "55155086e050280319a1dd92a42ed7e3";
  const[accessFlag, setAccessFlag]=useState(true);
  const[loadingScreen, setLoadingScreen]=useState(false);
  const[weatherData, setWeatherData]=useState({});
  const[searchCity,setSearchCity]=useState(false);
  const[showWeatherBox,setWeatherBox]=useState(false);
  const[error,setError]=useState(false);

  function getLatLong()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else{
    console.error("Geolocation is not supported by this browser");
    }

    //callback to handle successful retrieval of geolocation
    function showPosition(position)
    { const userCoordinates=
            {
          lat :position.coords.latitude,
          lon:position.coords.longitude
          };
  
   //storing user coordinates in sessionStorage 
   sessionStorage.setItem(
    "user-coordinates",
    JSON.stringify(userCoordinates)
  );
   fetchUserWeatherInfo(userCoordinates);
}
   function showError(error)
   {
    let message="";
    switch(error.code)
       {
        case error.PERMISSION_DENIED:
          message="User denied the request for Geolocation";
          break;
          case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        message = "An unknown error occurred.";
        break;
       }

       console.error("Error occurred during geolocation:", message);
  }
}

function getFromSessionStorage()
{
  const localCoordinates= sessionStorage.getItem("user-coordinates");
  if(localCoordinates)
  {
    const coordinates=JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
  else{
    setAccessFlag(true);
  }
}
async function fetchUserWeatherInfo(coordinates)
{
  const{lat, lon}=coordinates;

  setAccessFlag(false);
  setLoadingScreen(true);

  //api call

  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );  
    const data= await response.json();
      if(data.cod==="404")
        {
           throw new Error(`Please check your location permissions!`);
         }
    
    setLoadingScreen(false);
    setWeatherBox(true); // display weather container
    setWeatherData(data);
  }
  catch(err){
    setLoadingScreen(false);
    setError(true);
    setWeatherBox(false);
    console.error(err);

  }
}

function showSearch(flag)
{
  setSearchCity(flag);
  setAccessFlag(!flag);
  setWeatherBox(false);
  setError(false);
  if(!flag)
  {
    getFromSessionStorage();
  }
}
function getCity(value)
{
  getCityWeather(value);
}

async function getCityWeather(city)
{
  setLoadingScreen(true);
  setError(false);
  
  try{
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);

        const data =await response.json();
        console.log(data);
        if(data.cod==="404")
        {
          throw new Error(`Sorry, Can't find your city`);
        }
        setLoadingScreen(false);
        //show weather container and set it to data obtained
        setWeatherBox(true);
        setWeatherData(data);
  }
  catch(err)
  {
    setLoadingScreen(false);
    setError(true);
    setWeatherBox(false);
  }
}


  return (
    <>
     <div class="main-container">
      <Header/>
      <div className="app-body">
         <OptionContainer showSearch={showSearch}/>
          {accessFlag && <Entry getLocation={getLatLong}/>}
          {searchCity && <SearchContainer setName={getCity}/>}
          {loadingScreen && <LoadingScreen/>}
          {error && <Error/>}
          {showWeatherBox && <WeatherContainer weatherInfo={weatherData}/>}
      </div>
     </div>
    </>
  )
}

export default App
