const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    UserID: String,
    UserName: String,
    UserSurname: String,
    UserYears: Number,
    UserCitizenship: String,
    UserHair: String,
    UserEyes: String,
    UserSigns: String,
    UserHeight: Number,
    UserWeight: String,
    UserStatus: String,
    UserIDPS4: String,
    WeaponsLicense: Boolean,
    Level: String,
    Weapons: String,
    DrivingLicense: Boolean,
    Type: String,
    Vehicles: String,
    Property: String,
    Job: String,
    Hobby: String,
    Fines: Number,
    Complaints: Number,
    Prejudiced: Boolean,
    Wanted: Boolean
})

module.exports = mongoose.model("schedati", Schema);