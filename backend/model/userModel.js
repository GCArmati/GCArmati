const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const {isEmail} =require("validator");
const Cart=require('./cartModel')


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        lowercase:true,
        required:[true,"Inserire un username"],
        trim:true

    },
    password:{
        type:String,
        minLength:[8,"La password deve contenere almeno 8 caratteri"],
        require:[true,"Inserire una password"],
    },
    email:{
        type:String,
        validate:[isEmail,"Inserire un'E-mail valida"],
        required:[true,"Inserire un'E-mail"],
        unique:[true,"Esiste un account associato a questa E-mail"]
    },
    createdAt:{
        type:Date,
        overwriteImmutable:true,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:"Utente"
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Cart,
        required:true,
    }
});

userSchema.pre('save', async function(next){
    if(this.cart){
        return next();
    }
    try{
        const newCart=await Cart.create({
            list:[]
        })
        this.cart=newCart._id;
    }catch(e){
        next(e);
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(e){
        next(e);
    }
})



userSchema.methods.comparePassword=async function(candidatePw){
    return await bcrypt.compare(candidatePw,this.password);
}
module.exports=mongoose.model("Utenti",userSchema);