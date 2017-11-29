const API_KEY = "AIzaSyBXMfb_64i8JnGquOcYTi9hid2j83l4UQ4";

var parseResponse = function() {
    var response = JSON.parse(this.response);
    var items=response.items;
    console.log(response); 
    for (var i=0;i<items.length;i++){
        var info=items[i].volumeInfo
        console.log(info.title);
        processresponce(info);
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

var doSearch = function() {
    var search_term = encodeURIComponent(document.getElementById('search_term').value);
    console.log(search_term);
    var e = document.getElementById("sss");
    var op =e.options[e.selectedIndex].value;
    var a=search_term+'+'+op+':'+search_term;
    parameters = {
        key: API_KEY,
        q: a,
        maxResults: 40,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', parseResponse);
    var url = 'https://www.googleapis.com/books/v1/volumes?' + encodeParameters(parameters);
    console.log(url);
    xhttp.open('GET', url);
    xhttp.send();
    var bb=document.getElementsByTagName("img");
    var cc=document.getElementsByTagName("p");
    Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
    bb.remove();
    cc.remove();

}

var processresponce=function(info){

    // document.getElementsByTagName("p").remove();
    var item=document.createTextNode(info.title);
    var para=document.createElement("p");
    var body=document.getElementsByTagName("body")[0];
    para.appendChild(item);
    para.id=item;  
    para.addEventListener('click',function(){
        console.log('this is the'+info.title+"by d!!!!!")
    })
    
    body.appendChild(para);
    if (info.imageLinks!=undefined){
        var img=document.createElement("img");
        img.src = info.imageLinks.smallThumbnail;
        body.appendChild(img);

    }
 
    
    // var link=document.createElement("a")
    // a.href = info.
   

}

var search_button = document.getElementById('search_button');
search_button.addEventListener('click', doSearch);


var mymap = L.map('map').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(mymap);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid3R0dHR0dDEyMyIsImEiOiJjamE5cWYwancwbDZzMndxZWpkNzRldHNxIn0.90ZN7qBm2mgV7ciNymNJZg',
}).addTo(mymap);

var football = function() {
    var team_search = encodeURIComponent(document.getElementById('team_search').value);
    console.log(team_search);
    var f=team_search;
    parameters = {
        key: API_KEY,
        q: f,
        maxResults: 40,
    };

    var xhttp2 = new XMLHttpRequest();
    xhttp2.addEventListener('load', parseResponse);
    var url2 = 'http://api.football-data.org/v1/competitions/\?season\=2015'//+ encodeParameters(parameters);
    console.log(url2);
    xhttp2.open('GET', url2);
    xhttp2.setRequestHeader('X-Auth-Token', 'b76a0e98452d434184e2250adb5fb121');
    xhttp2.send();

};

var team_button = document.getElementById('team_button');
team_button.addEventListener('click', football);
