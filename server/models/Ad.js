import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    topics: [{
        type: String,
    }],
    slug: {
        type: String,
        required: true,
    },
    booked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    interested: [{
        type: String,
    }],
},{ timestamps: true }
);

adSchema.methods.toggleInterest = async function(id) {
    const index = this.interested.indexOf(id);
    if (index === -1) {
        this.interested.push(id);
    } else {
        this.interested.splice(index, 1);
    }
    await this.save();
} 

const Ad = mongoose.model('Ad', adSchema);


export default Ad;