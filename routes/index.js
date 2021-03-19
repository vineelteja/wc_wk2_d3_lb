const express = require("express");
const mg = require("mongoose")
const {check, validationResult} = require("express-validator");
const Registration = require("../models/Registration");
const path = require("path")
const auth = require("http-auth")

const router = express.Router();
const Rg= mg.model("Registration")

router.get("/", function (req, res) {
    // res.send("It works!")
    // res.render('form')
    res.render("form", {title: "Registration form"});
});

router.post(
    "/",
    [
        check("name").isLength({min: 1}).withMessage("Please enter a name"),
        check("email").isLength({min: 1}).withMessage("please enter an email"),
    ],

    function (req, res) {
        // console.log(req.body)
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            // res.send("thank you for registering ");
            const registration = new Registration(req.body)
            registration.save()
            .then(()=>{
                res.send("Thank you for your registration!")
            })
            .catch(err=>{
                console.log(err);
                res.send("Sorry! Something went wrong.")
            })
        } else {
            res.render("form", {
                title: "Registration form",
                errors: errors.array(),
                data: req.body,
            });
        }
        // res.render("form", {title: 'Registration form'})
    }
);

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
})


router.get("/registrations", basic.check((req, res) => {
    Registration.find()
    .then(registrations => {
        res.render('index', {title: 'listing registrations', registrations})
    })
    .catch(()=>{ res.send("sorry! something went wrong.")})
    res.render('index', {title: "Listing registrations"})

}))


module.exports = router;
