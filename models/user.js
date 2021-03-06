mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");



//define User Entity
var UserSchema=new mongoose.Schema({
  userName:String,
  password:String,
  isAdmin:{type:Boolean,default:false}
});

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);