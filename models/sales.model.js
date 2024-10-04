const mongoose = require('mongoose');

// Sale Schema
const saleSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantitySold: {
        type: Number,
        required: true
    },
    dateOfPurchase: {
        type: Date,
        default: Date.now
    },
    totalsales : {
        type: Number,
        required: true
    }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = { Sale };
