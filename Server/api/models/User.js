var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

// var cartSchema = mongoose.Schema({
//     products: {
//         type: [Product.Schema],
//         required: true
//     },
//     totalPrice: {
//         type: Number,
//         required: true
//     }
// });

// var orderSchema = mongoose.Schema({
//     products: {
//         type: [Product.Schema],
//         required: true
//     },
//     totalPrice: {
//         type: Number,
//         required: true
//     },
//     purchaseDate: {
//         type: Date,
//         default: Date.now
//     },
//     shippingAddress: {
//         type: String,
//         trim: true,
//         required: true
//     }
// });

var userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('User', userSchema);
