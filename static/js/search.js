var markers={}; 
var searchh;
var markerArray = [];




var etos=function(){
        var parameters=extract();
        var etos=parameters['search'];
        window.location.href = "login.html?search="+etos;
    
};


var parseResponse = function() {
    var response = JSON.parse(this.response);
    var items=response._embedded.events;
    console.log(response);
    for (var i=0;i<items.length;i++){
        console.log(items[i].name);
        processresponce(items[i]);
        var loc=items[i]._embedded.venues[0].location
        console.log(loc)
        markers[items[i].id]=(L.marker([loc.latitude, loc.longitude]))
        if (items[i].priceRanges!=undefined){
        markers[items[i].id].bindPopup("<b>"+"<a href="+items[i].url+" target=_blank>"+(i+1)+"."+items[i].name+"</a>"+"</b><br>"
            +items[i].dates.start.localDate+"<br>"+items[i]._embedded.venues[0].country.name+"<br>"
            +items[i]._embedded.venues[0].city.name+"<br>"+"$"+items[i].priceRanges[0].min+"--$"+items[i].priceRanges[0].max)
        }

        else {
            markers[items[i].id].bindPopup("<b>"+"<a href="+items[i].url+" target=_blank>"+(i+1)+"."+items[i].name+"</a>"+"</b><br>"
            +items[i].dates.start.localDate+"<br>"+items[i]._embedded.venues[0].country.name+"<br>"
            +items[i]._embedded.venues[0].city.name)
        }
        markerArray.push(markers[items[i].id]);
        markers[items[i].id].on('click', function(){
        this.openPopup();
    })
    }
    var featureGroup = L.featureGroup(markerArray).addTo(mymap);  
    mymap.fitBounds(featureGroup.getBounds());
}

// Function to ensure parameters used in request are encoded correctly
var encodeParameters = function(params) {
    // join all key value pairs and store in an array
    var strArray = [];
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var paramString = key + "=" + params[key];
            strArray.push(paramString);
        }
    }
    // join everything in the array together
    return strArray.join("&");
}



var processresponce=function(info){
    var item=document.createTextNode(info.name+'('+info.dates.start.localDate+')');
    var para=document.createElement("li");
    var body=document.querySelector('#ppp');
    para.appendChild(item);
    para.id=info.id;  
    body.appendChild(para);
    if (info.imageLinks!=undefined){
        var img=document.createElement("img");
        img.src = info.imageLinks.smallThumbnail;
        body.appendChild(img);
    }
    
    para.addEventListener('click', function(){
        markers[para.id].openPopup();
        var latLngs = [ markers[para.id].getLatLng() ];
        var markerBounds = L.latLngBounds(latLngs);
        mymap.fitBounds(markerBounds);        
    })

}

var mymap = L.map('mappp').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(mymap);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid3R0dHR0dDEyMyIsImEiOiJjamE5cWYwancwbDZzMndxZWpkNzRldHNxIn0.90ZN7qBm2mgV7ciNymNJZg',
}).addTo(mymap);



var extract=function(){
        var query=window.location.search.substring(1);
        var params=query.split("&"); 
        var return_data={};
        for (var i=0;i<params.length;i++){
            var keyvalue=params[i].split('=');
            console.log(keyvalue);
            return_data[keyvalue[0]]=keyvalue[1]
        }
        return return_data;
    }
var parameters=extract();

searchh=parameters['search'];
console.log(searchh)    

var event1 = function() {
    parameters = {
        
        keyword: searchh,
        size: 10,
        apikey:'LYlkrschyiZZg7173JDdovwvgBllKXBP'
    };
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', parseResponse);
    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?'+ encodeParameters(parameters);    
    console.log(url);
    xhttp.open('GET', url);
    xhttp.send();
};

event1();






