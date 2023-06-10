import { getInfo, displayWeatherInfo } from "./app"

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl).then(res => res.json()).then(data => {
        console.log(data.city);
        const cityName = data.city;

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
    })

}

const error = (err) => {
    console.log(err)
}

navigator.geolocation.getCurrentPosition(success, error);