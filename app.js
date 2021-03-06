var  express=require("express"),
     app=express(),
     bodyPareser=require("body-parser"),
     mongoose=require("mongoose"),
     Campground=require("./models/campgrounds"),
     Comment =require("./models/comment"),
     flash=require("connect-flash"),
     passport=require("passport"),
     localStrategy=require("passport-local"),
     methodOverrid=  require("method-override");
     User=require("./models/user"),
     seedDB    =require("./seeds");
     


//requiring Routes    
var commentsRoute=require("./routes/comments"),
     campgroundsRoute=require("./routes/campgrounds"),
     authRoute=require("./routes/auth");
 


mongoose.set('useNewUrlParser', true);

mongoose.connect("mongodb+srv://nivnaory:nivniv@niv-emfg7.mongodb.net/nivnaory?retryWrites=true&w=majority",{
 useNewUrlParser:true,
 useCreateIndex:true,
 }).then(()=>{
  console.log("Connect to DB");
 }).catch(err =>{
  console.log("Eror",err.message);
 }); 

app.use(bodyPareser.urlencoded({extended :true}));
app.set("view engine","ejs");
app.use(express.static(__dirname  + "/public"));  
app.use(methodOverrid("_method"));
app.use(flash());


//PASSPORT CUNFIGORATION
app.use(require("express-session")({
  secret:"niv naory the best",
  resave:false,
  saveUninitialized:false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use( new  localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
res.locals.currentUser=req.user
res.locals.error=req.flash("error");
res.locals.success=req.flash("success");
next();
});

app.use("/campgrounds/:id/comments",commentsRoute);
app.use("/campgrounds", campgroundsRoute);
app.use(authRoute);


//open server!
var port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log("Server Has Started!");
});