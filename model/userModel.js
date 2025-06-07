const mongoose=require("mongoose");
const Counter=require("./counterModel")
const bcrypt=require("bcrypt");


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
    },
    password:{type:String},
    gamesPlayed:{
        type:Number,
        default:0,
    },
    W:{
        type:Number,
        default:0,
    },
    L:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        overwriteImmutable:true,
        default: ()=> Date.now(),
    },
    updatedAt:{
        type:Date,
        default: ()=> Date.now(),
    }
});

//middleware pre save che permette di impostare il nome di un nuovo utente a guest + indice contenuto nel modello counter
//ogni volta che viene modificato un utente chiaramente viene aggiornato updateAt
userSchema.pre('save',async function (next){
    if(this.isNew){
        let i=await Counter.findOneAndUpdate({name: "guest_counter"}, {$inc: {value: 1}}, {new:true, upsert:true});
        if(!this.userName){this.userName="Guest"+i.value;}
    }
    this.updateAt=()=> Date.now();
    next();
    throw new Error("Saving failed");
})

//middleware per hashare la password, 10 non so cosa significhi
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // evita doppio hashing
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//funzione del documento singolo (utente) per comparare la password con quella trovata nella richiesta (da vedere)
userSchema.methods.passwordCompare=function(inputPassword){
    console.log(inputPassword);
    console.log(this.password)
    return bcrypt.compare(inputPassword,this.password)
}

module.exports=mongoose.model("Utenti",userSchema);