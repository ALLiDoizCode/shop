var prod = "https://zerp-shop.herokuapp.com/";
var locol = "http://localhost:8080/";
var SERVER = locol;

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

function makeOrder(callback) {
    var order = {
        "allowPreOrder": false,
        "orderId": "testid",
        "products": [
          {
            "price": 0.71,
            "productId": "04a8137c-0de9-42d4-8959-f15ca2567862",
            "quantity": 1
          }
        ]
      }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            if(callback) callback(json);
        }else {
        }
    };
    xhttp.open("POST", SERVER+"products/orders", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(order));
}

/*makeOrder(function(obj){
    console.log(obj);
})*/

/*code: "BG403-GPBDR-J49XD"
codeId: "fac6b004-f2b8-4800-8d2c-6ed7a0dc5c93"
codeType: "CODE_TEXT"
orderId: "03ddd9ba-d78f-4b4a-b46b-0f38b0228923"
clientOrderId: "testid"
createdOn: "2018-10-14T14:34:12.854Z"
identifier: "892429112-1"*/