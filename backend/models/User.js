import mongoose from 'mongoose';

// {timestamps: true} ci permette di ottenere automaticamente i campi 'createAt' e 'updateAt'
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const User = mongoose.model('User', UserSchema);