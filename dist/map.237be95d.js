//initiera kartan, centrerad på stockholm
var map = L.map("map").setView([
    59.3293,
    18.0686
], 13);
//tilelayer från openstreetmap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
//lägg till markör vid stockholm
var marker = L.marker([
    59.3293,
    18.0686
]).addTo(map);
//definiera popup vid klick
var popup = L.popup();
//funktion för hantering av klick
function onMapClick(e) {
    popup.setLatLng(e.latlng).setContent("Du klickade p\xe5 kartan vid " + e.latlng.toString()).openOn(map);
}
//bifoga onMapClick funktionen till klick händelsen på kartan
map.on("click", onMapClick);
//lägg till sökkontroll för platser
var searchControl = L.Control.geocoder({
    defaultMarkGeocode: false,
    placeholder: "S\xf6k efter plats...",
    position: "topright",
    geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            acceptLanguage: "en"
        }
    })
}).on("markgeocode", function(e) {
    //anpassa kartan till begränsningsrutan för sökresultatet
    map.fitBounds(e.geocode.bbox);
    // ta bort tidigare markör om finns
    if (marker) map.removeLayer(marker);
    // hämta mitten av begränsningsrutan för att lägga till markören
    var center = e.geocode.center;
    // lägg till markör vid bestämd plats
    marker = L.marker(center).addTo(map);
}).addTo(map);
//anpassa stilarna i sökrutan
var searchBox = document.querySelector(".leaflet-control-geocoder-form input");
searchBox.style.width = "200px";
searchBox.style.padding = "8px";
searchBox.style.borderRadius = "4px";
searchBox.style.fontSize = "14px";

//# sourceMappingURL=map.237be95d.js.map
