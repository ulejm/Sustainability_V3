import $ from "jquery";
import Generic from "./Generic";
import { unit, multiply } from "mathjs";
import { convertPrice } from "../CurrencyConverter/index";
import { settings } from "../../config";
import { getCookie, setCookie, eraseCookie } from "../../utils/cookies";
import { indexOfMany } from "../../utils";
import pageCategoriesJSON from "./data/pageCategoriesRewe.json";
import Storage from "../../utils/storage";
import shortid from "shortid";
import { getScoreLocal, displayScore } from "../NutriScore";
import { app } from "firebase";


/**
 * 
 * 
 * @class Rewe
 * @extends {Generic}
 */

class Rewe extends Generic {
 /**
   * Creates an instance of Rewe.
   * Override default pagetypes classes to be detected
   * @memberof Rewe
   */
    constructor() {
        super();
        this.pageTypes = {
          SINGLEPRODUCTPAGE: "rewe.singleproduct",
          PRODUCTOVERVIEWPAGE: "rewe.productoverview",
          UNKNOWN: "rewe.unknown",
        };
        console.log("ein rewe wurde erstellt");
      }

      getPageType() {
        if ($(".search-service-rsProductListContent").length > 0) 
          return this.pageTypes.PRODUCTOVERVIEWPAGE;
    
        if ($(".lr-breadcrumbs__link--active").length > 0) {
            console.log("Singleproductpage"); 
          return this.pageTypes.SINGLEPRODUCTPAGE;
        }
        
        return this.pageTypes.UNKNOWN;
      }

      getPageCategory() {
        const type = this.getPageType();
        switch (type) {
          case this.pageTypes.PRODUCTOVERVIEWPAGE:
            for (let [key, value] of Object.entries(pageCategoriesJSON)) {
              for (let u of value) {
                if (window.location.href.indexOf(u) > -1) return key;
              }
            }
            return "other";
          case this.pageTypes.SINGLEPRODUCTPAGE:
            return this.getProductCategory();
        }
      }

      getGTIN(customBody = false) {
        // get gtin from more info panel
        const GTIN = parseInt(
          $(customBody || "meso-data")
            .attr("data-listingid")
            .split("-")[1]
        );
    
        if (!this.products[GTIN]) this.products[GTIN] = {};
    
        return GTIN;
      }

     changePrice(customPriceEl = false,
        customUsualPriceEl = false,
        customDiscountContainer = false,
        category){

     }

     getBadgeParent() {
        $('.pdr-CallToAction__box').append('<div class = "newWrapper">' + "</div>");
        $(".pdr-ProductActionsContainer--Details").css({height: 50})
        return $(".newWrapper");//$(".bs_add2cart_container");
      }

     clean(){
        console.log("Pagewirdgecleaed")
        $(".pdr-PaybackInfo, .reco-slider, .bs_amount-minus, .sto-format, .basket-input, .ths-shopping-navigation, .lrms-favorite-button-container, .ths-mobile-header__menu, .home-page-theme, .home-page-teasers-two-cols, .home-page-teasers-three-cols, .home-page-steps, .newsletterTeaser, .ths-user-navigation, .pdr-QuickInfo__dropdownWrapper").remove();
        let sortiment = document.getElementsByClassName("home-page-category-tile");
        for(let i = 14; i >= 8; i--) {
          $(sortiment[i]).remove();
        }
        $(sortiment[0]).remove();
        $(".svelte-e20f0r[data-cy='Meine_Produkte']").remove();
        $(".svelte-e20f0r[data-cy='Angebote']").remove();
        $(".svelte-e20f0r[data-cy='Inspirationswelten']").remove();
        $(".ths-funnel-tab")[0].remove();
        $(".ths-funnel-tab")[1].remove();


     }

    categoryString() {
      var arr = $('.search-service-BreadcrumbLinkWrapper');
      var kat = ""
        for (let i=0; i<arr.length; i++){
          kat = kat + $(arr[i]).text();
        }
      return kat
    }

    async adaptSearch(){
      //console.log("adapted Values");
      //var productlist = $(".rsss-product")
      //var cartprice = 0;
      //if(document.readyState === 'complete'){
      //for(let i = 0; i <= productlist.length; i++) {

/*         if($(productlist[i]).find('.nutriscore').length){
          $(productlist[i]).find('.nutriscore').remove();
        } */

        $(".rs-qa-search-suggestions").remove();

        //var product = $(productlist[i]);
        //product.find(".lrms-addToFavMesoContainer").remove();

        //get GTIN
        //let GTIN = product.find('meso-data').attr("data-listingid").split("-")[1];
        //if (!settings.disableApi) await this.loadProductData(GTIN);
        //const nutri_score_final = this.products[GTIN].nutriScore;

        //const group = await Storage.get("bfc:studyGroup"); 

        //displayScore(nutri_score_final, group, $('.lrms-favorite-button-container'));

        //cartprice = cartprice + parseInt($($('.rsss-price__display')[i]).text().split(' ')[0])
        //console.log(cartprice);

        //}
        //return true;
      } 
      //await Storage.set('cartPrice', cartprice);


     changeLogoLink(){

     }

     setDefaultRegion(){
      chrome.runtime.sendMessage("x");
      let url =  "" + window.location.href;
      if (!url.includes("shop")){
        window.location = "https://shop.rewe.de/";
      }

      /* const puppeteer = require("puppeteer");
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://shop.rewe.de/");
        
        await Promise.all([
          page.waitForNavigation(),
          page.click(".gbmc-header-link")
        ]);

        await page.screeshot({path: "example.png"});

      })(); */
      //document.cookie = "marketsCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
/*       if (getCookie("marketsCookie") !== "%7B%22customerZip%22%3A%2276133%22%2C%22serviceType%22%3A%22PICKUP%22%2C%22pickupMarketId%22%3A%22861769%22%7D") {
        var express = require("express");
        var cookieParser = require("cookie-parser");
        var app = express();
        app.use(cookieParser());

        app.get("/", function(req, resp) {
          resp.clearCookie("marketsCookie");
          resp.cookie("marketsCookie","marketsCookie=%7B%22customerZip%22%3A%2276133%22%2C%22serviceType%22%3A%22PICKUP%22%2C%22pickupMarketId%22%3A%22861769%22%7D");
        }); */
        
        //console.log(getCookie("marketsCookie"));
        //eraseCookie("marketsCookie")
        //document.cookie = "marketsCookie=%7B%22customerZip%22%3A%2276133%22%2C%22serviceType%22%3A%22PICKUP%22%2C%22pickupMarketId%22%3A%22861769%22%7D";
        //setCookie("marketsCookie", "%7B%22customerZip%22%3A%2276133%22%2C%22serviceType%22%3A%22PICKUP%22%2C%22pickupMarketId%22%3A%22861769%22%7D", 365);
        //console.log(getCookie("marketsCookie"));
        //window.location.reload();
      //}
     }

     getSortimentButton(){
        return $("#sortiment-item");
    }

     setDefaultOrdering(){

     }

     getProductCategory(){
      $()
     }

     getAddToCartButton() {
          return $(".basket-button");
      }
    
    async getProductData(customBody = false) {
        const $body = $(customBody || document);
    
        const category = this.getProductCategory(customBody); //getProductCategory empty


        let price = $body
          .find(".pdr-PriceInformation__Price")
          .text()
          .replace("€", "")
          .replace(".-", "")
          .replace("-", "")
          .replace("chf", "")
          .replace("CHF", "")
          .replace("EUR", "")
          .replace("eur", "")
          .replace(" ", "")
          .replace(",",".");
        // convert price
        
        $(".current-price").addClass("updated");
    
        const regex = /(([\d]+)[xX])?([\d.?]+)\s?(l|ml|g|kg|gr|G|GR|ML|L|KG)([\s?.?,?;?])/;
        const sizeMatch =
          regex.exec($body.find(".rs-qa-price-base").text()) ||
          regex.exec($body.find(".pdr-QuickInfo__heading").text());
        return {
          category,
          name: $body
            .find(".pdr-QuickInfo__heading")
            .text()
            .replace(regex, ""),
          price,
          nutritionTable: this.getFoodValues(customBody),
          size: sizeMatch
            ? unit((sizeMatch[2] || 1) * sizeMatch[3], sizeMatch[4].toLowerCase())
            : false,
          img: $body.find(".pdr-ProductMedia img").attr("src"),
        };
    }

    getProductDataFromOverview(element) {

        const category = this.getProductCategory();

        if (element.find(".search-service-productPrice").length){
        var price = element.find(".search-service-productPrice")
          .text().split('€')[0]
          .replace("€", "")
          .replace(".-", "")
          .replace("-", "")
          .replace("chf", "")
          .replace("CHF", "")
          .replace("EUR", "")
          .replace("eur", "")
          .replace(" ", "")
          .replace(",",".");
        } else {
        var price = element.find(".search-service-productOfferPrice")
          .text().split('€')[0]
          .replace("€", "")
          .replace(".-", "")
          .replace("-", "")
          .replace("chf", "")
          .replace("CHF", "")
          .replace("EUR", "")
          .replace("eur", "")
          .replace(" ", "")
          .replace(",",".");
        }
          const regex = /(([\d]+)[xX])?([\d.?]+)\s?(l|ml|g|kg|gr|G|GR|ML|L|KG)([\s?.?,?;?])/;
          const sizeMatch =
            regex.exec(element.find(".search-service-productGrammage").text()) ||
            regex.exec(element.find(".LinesEllipsis").text());
        
          return {
            category,
            name: element
              .find(".LinesEllipsis")
              .text()
              .replace(regex, ""),
            price,
            nutritionTable: this.getFoodValues(),
            size: sizeMatch
              ? unit((sizeMatch[2] || 1) * sizeMatch[3], sizeMatch[4].toLowerCase())
              : false,
            img: element.find(".search-service-rsProductsMedia picture img").attr("src"),
          };

    }

    getFoodValues(customBody = false) {

    }

    getListItemsNumber(){
        let tiles = $(".search-service-rsTiles .search-service-product").length - 1;

        return tiles

    }

    getGTINFromViewPage(element){
        let GTIN = parseInt(element.find('div').first().find("input:eq(1)").attr("value").split("-")[1]);
        return GTIN;
    }

    getBadgeParentinOverview(element){
        let newelement = element.find(".search-service-productDetailsFill");
        newelement.css({
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
        });

        //element.find('a').append('<div class = "newWrapper">' + "</div>");
        //element.find(".search-service-productDetailsFill").remove();
        //element.find(".search-service-productDetails").css({
          //height: 115,
        //});

        return newelement;//element.find(".newWrapper")
    }

    getAddToCartButtonInOverview(element){
        return element.find(".bs_add2cart");

    }

    isRewe() {
       return true
    }

}

export default Rewe;
