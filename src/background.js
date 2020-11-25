
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    console.log("xyz");
    chrome.cookies.set(
        {
        url: "http://www.rewe.de",
        name: "myReweCookie",
        domain: ".rewe.de",
        value: "%7B%22customerZip%22%3A%2276133%22%2C%22serviceType%22%3A%22PICKUP%22%2C%22pickupMarketId%22%3A%22840183%22%7D"

        });
    
    chrome.cookies.set(
        {
        url: "http://www.rewe.de",
        name: "marketsCookie",
        domain: ".rewe.de",
        value: "%7B%22online%22%3A%7B%22wwIdent%22%3A%22840183%22%2C%22marketZipCode%22%3A%2276131%22%2C%22serviceTypes%22%3A%5B%22PICKUP%22%5D%2C%22customerZipCode%22%3A%2276133%22%7D%2C%22stationary%22%3A%7B%7D%7D"
        });

});
