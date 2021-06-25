var iconImg = L.icon({
    iconUrl: 'icon.png',
    iconSize: [60, 75],
    iconAnchor: [25, 16]
});

var mymap = L.map('issMap').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09], {icon: iconImg}).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXN0ZXJhMTIzIiwiYSI6ImNrcWNmNjN4ZzB2cmsydm92OXgzeHM1MHoifQ.BlWqQ0Yc4fqR4mF_p1rcgg'
}).addTo(mymap);

async function getApiUrl(ipAddress) {
    let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_tdu908rqI4OBlxCEVWNgbWcnMLbnt&ipAddress=${ipAddress}`)
    let data = await response.json()
    return data
}

async function injectingHtml() {
    let input = document.querySelector(".form-control").value;
    let data = await getApiUrl(input)
    let latitude =  data.location.lat
    let longitude =  data.location.lng
    marker.setLatLng([latitude, longitude])
    mymap.setView([latitude, longitude])
    const source = document.querySelector('#dataTemplate').innerHTML
    const template = Handlebars.compile(source)
    const temp = document.querySelector('#temp')
    const mainContent = document.querySelector('.main-content')
    if(temp) {
        temp.remove()
    } else if(mainContent){
        mainContent.remove()
    }
    const target = document.querySelector('#content')
    target.innerHTML += template(data)
}

document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault()
    injectingHtml()
})