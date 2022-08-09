/* Global Variables */
const apiKey = "1cb2224e743cc8f6ec55e752b8477ceb&units=imperial";
// Create a new date instance dynamically with JS
const baseUrl = "api.openweathermap.org/data/2.5/weather?zip=";
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

const button = document.querySelector("button");

//Promise function to retrieve the last entry
const retrieveData = async () => {
  const request = await fetch("/lastEntry");
  try {
    // Transform into JSON
    const allData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      "Temperature: " + Math.round(allData.temp) + " ℉";
    document.getElementById("content").innerHTML =
      "Feeling: " + allData.content;
    document.getElementById("date").innerHTML =
      "Date (mm.dd.yyyy): " + allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//Promise function to get the weather info from the openweathermap API
const getTemp = async (url = "") => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData.main.temp;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//Promise function to post the user's entry to the server
const postLog = async (url = "", data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

function addEntry() {
  let zip = document.getElementById("zip").value;
  url = `https://${baseUrl}${zip}&appid=${apiKey}`;
  getTemp(url).then(function (temp) {
    let data = {
      temp: temp,
      date: newDate,
      content: document.getElementById("feelings").value,
    };
    postLog("addLog", data).then(retrieveData);
  });
}
let data = {
  temp: 52,
  date: "newDate",
  content: "ddd",
};
button.addEventListener("click", addEntry);
