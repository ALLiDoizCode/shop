
var acceptedCurrencies = {BTC:'rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL', USD:'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'}
var anchorObject = {
    detail: {
        txNumber: "",
        txAmount: "",
        txAcceptedCurrency:acceptedCurrencies,
        txRecepiantName: "Zerp Shop",
        txDestination: "rfFXHU7Syn1zN62ooeqWDm12QjuErMA2Tp",
        txDestinationTag: "",
        txDescription: "",
        event:"AuthHarbor"
    }
}

//Sends a message to the extension with the object data
function openWallet(object) {
    console.log("boom");
    var evt = new CustomEvent("AuthHarbor", object);
    document.dispatchEvent(evt); 
}
//Listens for a response from the extension after the transaction was successfully submited to the ledger
window.addEventListener('message', function(ev) {
    console.log(ev);
}, true); // useCapture: true
