const priceSorting = (a, b) => {
    
    if (a.currentDiscountedPrice && b.currentDiscountedPrice) return a.currentDiscountedPrice - b.currentDiscountedPrice;
    else if (a.currentDiscountedPrice) return a.currentDiscountedPrice - b.basePrice;
    else if (b.currentDiscountedPrice) return a.basePrice - b.currentDiscountedPrice;
    else return a.basePrice - b.basePrice;
}

export default priceSorting;