const body = document.body;
const form = document.querySelector("form");
const display = document.querySelector(".details");
const img = document.querySelector("img.time");

export const displayWeatherInfo = (data) => {
  const { cityInfo, weatherInfo } = data;

  let html = `
        <h5 class="my-3">${cityInfo.EnglishName}</h5>
        <div class="my-3" id="displayWeather">${weatherInfo.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weatherInfo.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
  `;
  display.innerHTML = html;

  // updating img and background color
  if (weatherInfo.IsDayTime) {
    img.setAttribute("src", "./img/day.svg");
    body.style.backgroundColor = "#fafafa";
  } else {
    img.setAttribute("src", "./img/night.svg");
    body.style.backgroundColor = "#121212";
  }
};

export const getInfo = async (cityName) => {
  const cityInfo = await getCity(cityName);
  const weatherInfo = await getWeather(cityInfo.Key);
  return { cityInfo, weatherInfo };
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityName = form.city.value.trim();

  getInfo(cityName)
    .then((data) => displayWeatherInfo(data))
    .catch((error) => {
      console.log(error.status);
      img.style.display = "none";
      body.style.backgroundColor = "crimson";
      let html = `
      <strong style="font-size:80px">404!</strong>
        <h1 style="font-size:70px">Location Not Found.</h5>
        <strong> Try some another location!<strong>
      `;
      display.innerHTML = html;
    });

  localStorage.setItem("city", cityName);

  form.reset();
});

let cityName = localStorage.getItem("city");
if (cityName) {
  getInfo(cityName)
    .then((data) => displayWeatherInfo(data))
    .catch((error) => console.log(error));
}
