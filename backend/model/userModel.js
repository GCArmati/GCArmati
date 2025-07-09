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
    role:{
        type:String,
        enum:["Utente","Admin"],
        default:"Utente",
        required:true,
    },
    myCart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Cart,
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    const user=this;
    if(user.myCart){
        next();
    }
    try{
        const newCart=await Cart.create({
            list:[]
        })
        user.myCart=newCart._id;
        next();
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