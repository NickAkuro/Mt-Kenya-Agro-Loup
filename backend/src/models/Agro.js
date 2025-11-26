const mongoose = require('mongoose');

const agroSchema = new mongoose.Schema(
    {
        userId: { type: String, index: true },
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        cropType: { type: String, required: true },
        quantity: { type: Number, required: true },
        location: { type: String, required: true },
        harvestDate: { type: Date, required: true }
    }, 
    
    { timestamps: true }
);

agroSchema.index({ userId: 1, harvestDate: -1 });

const Agro = mongoose.model('Agro', agroSchema);

module.exports = Agro;