import Migros from "./stores/Migros";
import { getScoreLocal, displayScore } from "./NutriScore";
import Scraper from "./Scraper";
import { settings } from "../config";
import $ from "jquery";
import Storage from "../utils/storage";
import taskDesc from "./taskDesc";
import { RestartIcon } from "../Cart/icons";
import { toast } from "react-toastify";
import Rewe from "./stores/Rewe";
import { elementaryChargeDependencies } from "mathjs";
import Axios from "axios";
import {
  API
} from "../config";

class BetterFoodChoice {
  constructor(tracker) {
    this.tracker = tracker;

    // detect store
    this.getStore();

    // setup url change polling
    let oldUrl = window.location.href;
    setInterval(() => {
      if (oldUrl !== window.location.href) {
        oldUrl = window.location.href;
        this.tracker.stop();
        this.tracker.trackPage(
          this.store.getPageCategory(),
          window.location.href,
          $("title").text(),
          this.store.getGTIN()
        );
      }
    }, 1000);

    $(window).on("onbeforeunload", function () {
      this.tracker.stop();
    });
  }

  /**
   *
   *
   * @param {string} [group='A']  Group of the user to display correct badgs
   * @memberof BetterFoodChoice
   */
  async init(group = "A") {
    /* try { */
      // hide elements
      (
        document.getElementById("info") || { style: { opacity: 0 } }
      ).style.opacity = 0;

      console.log(await Axios.post(API.trackingEndPoint, {
        action: 'group',
        userID: await Storage.get('bfc:userID'),
        value: {}}));

      // set default region
      this.store.setDefaultRegion();
      group = await Storage.get('bfc:studyGroup');
      console.log(await Storage.get("test"));
      //console.log(await Storage.get("testGroup"));
      console.log(await Storage.get('bfc:studyGroup'));
      console.log(await Storage.get('bfc:id'));
      const helfer2 = new Date();
      const helfer = new Date(await Storage.get('qualityStartTime'))
      console.log(helfer);
      console.log(helfer2 - helfer);

      // delete ads
      this.store.clean();
      // prevent default action migros add to cart
      // this.store.blockAddToCart()
      this.store.changeLogoLink();

      // set default order
      this.store.setDefaultOrdering();

      // action based on page
      const pageType = this.store.getPageType();

      // track page
      this.trackPage();

      console.log("PAGE TYPE", pageType);

      const observer4 = new MutationObserver(() => {
        //var pricees;
        //var xyz = $('.rsss-product');
        //for (let i = 1; i <= xyz.length; i++){
        //  pricees = pricees + parseInt($($('.rsss-price__display')[i]).text().split(' ')[0])
        //}
        if ($(".rsss-search-input__input-field").length && $('.rsss-product').length && document.readyState === 'complete'){
          // configure observer
          const observer = new MutationObserver(this.store.adaptSearch);
          observer.observe($(".rsss-search-input__input-field")[0], {
            subtree: false,
            childList: true,
          });
          this.store.adaptSearch();
        }
      });

      observer4.observe(document.body, {
        subtree: true,
        childList: true,
      }); 

      var sortimentButton = this.store.getSortimentButton();
      sortimentButton.on("click", async (e) => {
        e.stopPropagation();
        e.preventDefault();


          let sortimentItems = $(".nav-secondary--item");
          for(let i = 13; i >= 7; i--) {
            $(sortimentItems[i]).remove();
          }
          console.log("jetzt wurde geklickt");


      });
      document.getElementById("sortiment-item").click();
      document.getElementById("sortiment-item").click();

      switch (pageType) {
        case this.store.pageTypes.SINGLEPRODUCTPAGE: // single product
          // show loader

          // retrieve GTIN
          const GTIN = this.store.getGTIN();

          // load product
          if (!settings.disableApi) await this.store.loadProductData(GTIN);

          // display score or from api or calculated locally
          const remoteNutriScore = this.store.products[GTIN].nutriScore;

          const nutri_score_final = remoteNutriScore;
        
          // display score
          displayScore(nutri_score_final, group, this.store.getBadgeParent());

          // currency converter
          this.store.changePrice(
            false,
            false,
            false,
            this.store.getProductCategory()
          );

          // listen to add to cart
          const addToCartButton = this.store.getAddToCartButton().off("click");
          addToCartButton.addClass("bfcAltered");
          addToCartButton.off("click"); // delete events

          // listen to click
          addToCartButton.on("click", async (e) => {
            e.stopPropagation();
            e.preventDefault();

            const productData = await this.store.getProductData();

            console.log(productData);
            // block if no price
            if (productData.price == "0.00" || productData.price == "") {
              toast.warn("Produkt derzeit nicht verfügbar!");
              return;
            }

            //Add to cart
            window.BetterFoodChoiceCart.addProduct({
              currency:
                (await Storage.get("bfc:country")) === "de" ? "eur" : "chf",
              gtin: GTIN,
              ...productData,
              nutriScore: nutri_score_final,
            });
          });

          // show elements
          document.getElementById("info").style.opacity = 1;

          break;

        case this.store.pageTypes.PRODUCTOVERVIEWPAGE: // overview page

          var currentproduct = $("inizialized");
          var currentpage = $(".search-service-paginationPageActive").text();
          console.log(currentpage);

          var kat = "";

          const reload = async (observeItem) => {

          kat = this.store.categoryString();

            console.log(observeItem.attr("class"));
            //var hided = [];
            switch(observeItem.attr("class")) {
              case "search-service-rsResultsText":
                currentproduct = observeItem.text();
                console.log("Listnderung" + observeItem.text());
                break;
              case "search-service-paginationPage search-service-paginationPageActive search-service-paginationPageLink":
                currentpage = observeItem.text();
                console.log("Pagenderung" + observeItem.text())
                console.log(currentpage);
                break;
            }
            
            var tileNumber = this.store.getListItemsNumber();
            console.log("Anzahl Produkte:" + tileNumber);
            var listelementTest = document.getElementsByClassName("search-service-product");
            /* for(let i = 0; i < tileNumber; i++){
              //let testvariable2 = document.getElementsByClassName("search-service-product");
              listelementTest[i].style.display = "block";
              console.log("Hey Hey");
            } */

            for(let i = 0; i <= tileNumber; i++) {
              //let hilfe = document.getElementsByClassName("search-service-product");
              //hilfe[i + 2].syle.display = "block";

              var queryelement = $(listelementTest[i]);
              queryelement.find(".bs_amount-minus, .bs_amount-input, .lrms-favorite-button-container").remove();
              console.log("Sachen von Element" + i + "removed");

              //let listelement = $(".search-service-rsTiles > .search-service-product:eq("+ i +")");
              //console.log(listelement);

              //listelement.find(".bs_amount-minus, .bs_amount-input, .lrms-favorite-button-container").remove();
              //try {
              console.log(queryelement)
              let GTIN = this.store.getGTINFromViewPage(queryelement);
              //}
              //catch (e) {
                //continue;
              //}

              if (!settings.disableApi) await this.store.loadProductData(GTIN);
    
              const nutri_score_final = this.store.products[GTIN].nutriScore;
    
              displayScore(nutri_score_final, group, this.store.getBadgeParentinOverview(queryelement));
    
              const addToCartButton = this.store.getAddToCartButtonInOverview(queryelement).off("click");
              addToCartButton.addClass("bfcAltered");
              addToCartButton.off("click");

              addToCartButton.on("click", async (e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log(e.target.closest('div[class="search-service-product"]'));
                const productData = await this.store.getProductDataFromOverview($(e.target.closest('div[class="search-service-product"]')));
  
                console.log(productData);
                // block if no price
               if (productData.price == "0.00" || productData.price == "") {
                toast.warn("Produkt derzeit nicht verfügbar!");
                return;
                }
  
              //Add to cart
                window.BetterFoodChoiceCart.addProduct({
                  currency:
                  (await Storage.get("bfc:country")) === "de" ? "eur" : "chf",
                  gtin: GTIN,
                 ...productData,
                  nutriScore: nutri_score_final,
                 });
              });
              
              if(nutri_score_final === "F"){
                let r = i;
                //let testvariable = document.getElementsByClassName("search-service-product");
                listelementTest[r].style.display = "none";
                //hided.push(r);
                //console.log(hided);
                //$(".search-service-product:eq("+ r +")").remove();
                //tileNumber--;
                continue;
              }

              if($(document.getElementsByClassName("search-service-product")[0]).find(".bs_amount-minus, .bs_amount-input, .lrms-favorite-button-container").length){
              $(document.getElementsByClassName("search-service-product")[0]).find(".bs_amount-minus, .bs_amount-input, .lrms-favorite-button-container").remove();     
              }
            }
            /* observer2.observe(document.body, {
              subtree: true,
              childList: true,
            }); */
          }

            const scraper = new Scraper();

            // bodies
            let bodiesDB = {};

            const $this = this;
            $("body").on("click", ".bfcAddToCartList", function (e) { //NO CHANGE FROM V1
              e.preventDefault();
              e.stopPropagation();

              const $el = $(this);

              (async () => {
                const body =
                  bodiesDB[$this.store.getClosestListItem($el).attr("bfcid")][0];

               const productData = await $this.store.getProductData(body);

                // block if no price
                console.log(productData);
                if (productData.price == "0.00" || productData.price == "") {
                  toast.warn("Produkt derzeit nicht verfügbar!");
                  return;
              }
                //Add to cart
                window.BetterFoodChoiceCart.addProduct({
                  currency:
                   (await Storage.get("bfc:country")) === "de" ? "eur" : "chf",
                 gtin: $this.store.getGTIN(body),
                  ...productData,
                  nutriScore:
                  bodiesDB[
                    $this.store.getClosestListItem($el).attr("bfcid")
                  ][1],
                });
              })();
            });
          

            let prevLength = 0;
           // iterate product tiles
           const iterateProducts = async () => {
              console.log("ITERATE");
            
             $(".sc-fzqNJr.hKwhXu").remove();
             $(".jphPpq").remove();
             $(".sc-fzoNJl.hthysd").remove();
            
            
            
        
             await new Promise((res) => setTimeout(res, 1500));
             // hide
             this.store.hideProducts();

             // get all urls from product list
             let allUrls = this.store.getUrlsFromOverview();
             if (prevLength === allUrls.length) return;

              prevLength = allUrls.length;
              this.store.editUrlsFromOverview();

             // scrape urls in small batches to improve performances and prevent abuse
              scraper.scrapeBatch(allUrls, (urlsSlice, bodies) => {
                // calculate score
               bodies.forEach(async (b, index) => {
                  if (
                   this.store
                     .listItemFromHref(urlsSlice[index])
                     .hasClass("dontTouch")
                 )
                   return;
                 this.store
                   .listItemFromHref(urlsSlice[index])
                   .addClass("dontTouch");

                 const remoteNutriScore = await this.store.loadProductData(
                   this.store.getGTIN(b)
                 );
                 const nutri_score_final = remoteNutriScore.nutriScore;

                 displayScore(
                   nutri_score_final,
                   group,
                   this.store.listItemTargetFromHref(urlsSlice[index]),
                  'small'
                 );

                  // store body
                  bodiesDB[
                   this.store.listItemFromHref(urlsSlice[index]).attr("bfcid")
                 ] = [b, nutri_score_final];

                 // lconvert price
                  this.store.changePriceList(
                    this.store.listItemFromHref(urlsSlice[index]),
                    this.store.getProductCategory(b)
                  );
                
                  // $(".sc-fzpjYC.jphPpq").remove();
                  // $(".sc-AxjAm.sc-AxiKw.bsvJGC").remove();
                  });

                // // listen to add to cart events
                // urlsSlice.forEach((e, i) => {

                //     // delete all events
                //     const addToCartButton = this.store.getAddToCartButton(this.store.listItemFromHref(e))
                //     addToCartButton.addClass("bfcAltered")
                //     addToCartButton.off('click');

               //     // listen to click
                //     addToCartButton.on("click", async (e) => {
                //         e.stopPropagation()
                //         e.preventDefault();

                //         const productData = await this.store.getProductData(bodies[i]);

               //         // block if no price
               //         if (productData.price == '') {
               //             alert("Product currently unavailable!")
               //             return
               //         }
               //         //Add to cart
               //         window.BetterFoodChoiceCart.addProduct({
                //             currency: await Storage.get("bfc:country") === 'de' ? 'eur' : 'chf',
                //             gtin: this.store.getGTIN(bodies[i]),
                //             ...productData,
                //             nutriScore: nutriscores[i]
                //         })
                //     })

                // })
              });
            };

          const observer1 = new MutationObserver(() => {
            if ($(".msrc-product-list").length) {
              // configure observer
              const observer = new MutationObserver(iterateProducts);
              observer.observe($(".msrc-product-list")[0], {
                subtree: false,
                childList: true,
              });

              iterateProducts();
            }
          });
          observer1.observe(document.body, {
            subtree: true,
            childList: true,
          });

          const observer2 = new MutationObserver(() => {
            if ($(".search-service-rsResultsText").length && !($(".search-service-rsResultsText").text() === currentproduct)) {
              // configure observer
              const observer = new MutationObserver(reload);
              observer.observe($(".search-service-rsResultsText")[0], {
                subtree: false,
                childList: true,
              });

              reload($(".search-service-rsResultsText"));
            }
          });

          observer2.observe(document.body, {
            subtree: true,
            childList: true,
          });

          const observer3 = new MutationObserver(() => {
            if ($(".search-service-paginationPageActive").length && (!($(".search-service-paginationPageActive").text() === currentpage) || !(this.store.categoryString() == kat))) {
              console.log("wir sind im observer:" + $(".search-service-paginationPageActive").text());
              // configure observer
              const observer = new MutationObserver(reload);
              observer.observe($(".search-service-paginationPageActive")[0], {
                subtree: false,
                childList: true,
              });

              reload($(".search-service-paginationPageActive"));
            }
          });

          observer3.observe(document.body, {
            subtree: true,
            childList: true,
          });

 

          // //page change
          // window.onhashchange = () => {
          //     urls = [];
          //     setTimeout(()=> {
          //         iterateProducts()
          //     },1000)

          // }

          break;
      }
    /* } catch (e) {
      // TOODO handler errors
      console.log(e);
    } */
  }

  getStore() {
    if (!this.store) {
      // get score from url to instantiate correct classe
      const url = window.location.hostname;
      if (url.indexOf("migros") > -1) this.store = new Migros();
      if (url.indexOf("rewe") > -1) this.store = new Rewe();
    }

    return this.store;
  }

  static showAlert(
    title,
    text,
    actionHandler,
    actionHandlerLabel = "close",
    alternativeAction = false,
    alternativeActionLabel = "Yes"
  ) {
    const $alertWrapper = $("<div />").css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 99999999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,.3)",
    });
    const $alert = $("<div />").css({
      width: "500px",
      padding: 30,
      background: "white",
      borderRadius: 5,
      boxShadow: "0 5px 10px rgba(0,0,0,.2)",
    });
    const $h1 = $("<h1/>")
      .css({
        color: "rgba(0,0,0,.6)",
        fontSize: 30,
        margin: "0 0 10px 0",
        fontFamily: "Roboto",
      })
      .text(title);
    const $p = $("<p/>")
      .css({
        fontSize: 14,
        color: "rgba(0,0,0,.4)",
        lineHeight: "1.5",
        margin: 0,
      })
      .text(text);
    const $action = $("<button />")
      .css({
        background: "rgba(0,0,0,.4)",
        color: "white",
        padding: "10px 20px",
        borderRadius: 4,
        marginTop: 20,
      })
      .text(actionHandlerLabel)
      .on("click", (e) => {
        e.preventDefault();
        $alertWrapper.remove();
        actionHandler();
      });
    const $alternativeAction = alternativeAction
      ? $("<button />")
          .css({
            background: "#00d1b2",
            color: "white",
            padding: "10px 20px",
            borderRadius: 4,
            marginTop: 20,
          })
          .text(alternativeActionLabel)
          .on("click", (e) => {
            e.preventDefault();
            $alertWrapper.remove();
            alternativeAction();
          })
      : $("<p>");

    $("body").append(
      $alertWrapper.append($alert.append($h1, $p, $action, $alternativeAction))
    );
  }

  static async showRestartButton() {
    const button = $("<div />")
      .attr("id", "bfcRestartBtn")
      .on("click", async () => {
        await Storage.clear();
        window.location.reload();
      })
      .html(RestartIcon);
    $("body").prepend(button);
  }

  static async showTaskDesc(index, actionHandler) {
    const $alertWrapper = $("<div id='bfcTask' />").css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 99999999,
      textAlign: "center",
      padding: 40,
      justifyContent: "center",
      overflow: "scroll",
      background: "rgba(0,0,0,.3)",
    });
    $alertWrapper.append(
      $("<style>").html("#bfcTask img{max-width: 100%; max-height: 400px}")
    );
    const $alert = $("<div />").css({
      width: "800px",
      padding: 30,
      textAlign: "left",
      display: "inline-block",
      background: "white",
      borderRadius: 5,
      boxShadow: "0 5px 10px rgba(0,0,0,.2)",
    });
    const $p = $("<div/>")
      .css({})
      .html(
        taskDesc[index](
          await Storage.get("bfc:studyGroup"),
          await Storage.get("bfc:country")
        )
      );
    const $action = $("<button />")
      .css({
        background: "rgba(0,0,0,.4)",
        color: "white",
        padding: "10px 20px",
        borderRadius: 4,
        marginTop: 20,
      })
      .text(index == 2 ? "Schließen" : "Weiter")
      .on("click", (e) => {
        e.preventDefault();
        $alertWrapper.remove();
        actionHandler();
      });

    $("body").append($alertWrapper.append($alert.append($p, $action)));
  }

  async trackPage() {
    const GTIN = this.store.getGTIN();
    await this.store.loadProductData(GTIN);

    const remoteNutriScore = this.store.products[GTIN];
    const nutri_score_final = remoteNutriScore.nutriScore;

    this.tracker.trackPage(
      this.store.getPageCategory(),
      window.location.href,
      $("title").text(),
      GTIN,
      nutri_score_final,
      this.store.getFoodValues()
    );
    window.onhashchange = function () {
      this.tracker.stop();
      this.tracker.trackPage(
        this.store.getPageCategory(),
        window.location.href,
        $("title").text(),
        GTIN,
        nutri_score_final,
        this.store.getFoodValues()
      );
    };
  }
}

export default BetterFoodChoice;
