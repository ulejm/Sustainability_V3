


export const API = {

    baseEndPoint: `https://us-central1-ecommercewidget-265813.cloudfunctions.net/bfc`,
    trackingEndPoint: `https://us-central1-ecommercewidget-265813.cloudfunctions.net/bfc/track`,
    // trackingEndPoint: `http://localhost:5001/better-food-choices/us-central1/bfc/track`,

    endpoint: gtin => `https://scorethical-5fa1d.firebaseio.com/0/${gtin}.json`,

}

export const settings = {
    overviewBatchSize: 3,

    showDifferentNutriAlert: false,

    disableApi: false,

    defaultGroup: 'C',
    maxBudget: {de: 55, ch: 100},
    showDiscount: false
}
