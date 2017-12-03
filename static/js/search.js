const API_KEY = "AIzaSyBXMfb_64i8JnGquOcYTi9hid2j83l4UQ4";


const is="ad33a867c92741239eb71fcccb511f35"
const iss="mz0jAgao0wxKi7ZL4y1HpHw0zJ61RVhBVoFK4mOw0bZuOEYoUTIyx2VK3ARa"



var parseResponse = function() {
    var response = JSON.parse(this.response);
    var items=response._embedded.events;
    console.log(response); 
    for (var i=0;i<items.length;i++){
        var info=items[i]
        console.log(info.name);
        processresponce(info);
        var loc=info._embedded.venues[0].location
        console.log(loc)
        var marker1 = L.marker([loc.latitude, loc.longitude]).addTo(mymap);
    }  

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

    // document.getElementsByTagName("p").remove();
    var item=document.createTextNode(info.name);
    var para=document.createElement("p");
    var body=document.querySelector('#ppp');
    para.appendChild(item);
    para.id=item;  
    body.appendChild(para);
    if (info.imageLinks!=undefined){
        var img=document.createElement("img");
        img.src = info.imageLinks.smallThumbnail;
        body.appendChild(img);
    }
 
    
    // var link=document.createElement("a")
    // a.href = info.
}

var mymap = L.map('mappp').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();


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

    var searchh=parameters['search'];
    console.log(searchh)    

var event = function() {
    // var event_search = encodeURIComponent(document.getElementById('event_search').value);
    // console.log(event_search);
    

    parameters = {
        
        keyword: searchh,
        size: 20,
        apikey:'LYlkrschyiZZg7173JDdovwvgBllKXBP'
    };

    var xhttp2 = new XMLHttpRequest();
    xhttp2.addEventListener('load', parseResponse);
    var url2 = 'https://app.ticketmaster.com/discovery/v2/events.json?'+ encodeParameters(parameters);    
    console.log(url2);
    xhttp2.open('GET', url2);
    //xhttp2.setRequestHeader('Authorization','Bearer' +'');
    xhttp2.send();

};



window.onload = event;

// var event_button = document.getElementById('event_button');
// event_button.addEventListener('click', event);




