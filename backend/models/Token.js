import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // I refresh token di solito scadono, ma per semplicità non implementiamo l'auto-eliminazione qui
        // In produzione, potresti volerli far scadere (es. expiresIn: '7d')
    },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshToken;