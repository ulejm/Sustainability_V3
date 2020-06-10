


export const API = {

    baseEndPoint: `https://us-central1-scorethical-5fa1d.cloudfunctions.net/bfc`,
    trackingEndPoint: `https://us-central1-scorethical-5fa1d.cloudfunctions.net/bfc/track`,

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
