var mongoose=  require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last: String,
    level: {type: Number, default: 0}
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)