var prod = "https://zerp-shop.herokuapp.com/";
var locol = "http://localhost:8080/";
var SERVER = prod;

function products(callback,platform,marker) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            //var myJsonString = JSON.stringify(json);
            if(callback) callback(json.items);
        }else {
        }
    };
    xhttp.open("GET", SERVER+"products/"+platform+"/"+marker, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function description(callback,id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            //var myJsonString = JSON.stringify(json);
            if(callback) callback(json);
        }else {
        }
    };
    xhttp.open("GET", SERVER+"products/description/"+id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function platforms(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            //var myJsonString = JSON.stringify(json);
            if(callback) callback(json.platforms);
        }else {
        }
    };
    xhttp.open("GET", SERVER+"products/platforms", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function eurToXRP(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            //var myJsonString = JSON.stringify(json);
            if(callback) callback(json);
        }else {
        }
    };
    xhttp.open("GET", "https://www.bitstamp.net/api/v2/ticker/xrpeur", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

