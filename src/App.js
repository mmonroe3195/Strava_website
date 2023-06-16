//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
const [isLoading, setIsLoading] = useState(true);
const [activities, setActivities] = useState({});


//Strava Credentials
let clientID = "76571";
let clientSecret = "0f94a401bc48a0309db35e1bfcabf48e8638b416";


// refresh token and call address
const refreshToken = "5fee084a3a6f508226832571c6a0a6fdcbd63278";
const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
// endpoint for read-all activities. temporary token is added in getActivities()
const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`


// Use refresh token to get current access token
useEffect(() => {
console.log("test");
fetch(callRefresh, {
method: 'POST'
})
.then(res => res.json())
.then(result => getActivities(result.access_token))
}, [callRefresh])


// use current access token to call all activities
function getActivities(access){
console.log(callActivities + access + "&per_page=200")
fetch(callActivities + access + "&per_page=200")
.then(res => res.json())
.then(data => setActivities(data), setIsLoading(prev => !prev))
.catch(e => console.log(e))
}


function showActivities(){
if(isLoading) {
  console.log(activities)
  return <>LOADING</>
}
if(!isLoading) {
  console.log(activities);
  return activities.length
}
}


return (
<div className="App">
{showActivities()}
</div>
);
}


export default App;





