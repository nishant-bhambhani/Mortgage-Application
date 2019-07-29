/**
 * BrokerFunctionsBoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  formSubmissionBoom: async function(req, res) {
    bcrypt.hash(req.param("Password"), saltRounds, function(err,hashedPassword) 
    {
      if (req.param("Name") && req.param("Email") && req.param("Password") && req.param("Address") && req.param("City") &&
        req.param("Province") && req.param("Zip") && req.param("Phoneno") && req.param("Houseid") &&
        req.param("Mortgagevalue") && req.param("CompanyName")) 
        {
          var params = {
            emp_name: req.param("Name"),
            emp_address: req.param("Address"),
            emp_phone: req.param("Phoneno"),
            emp_email: req.param("Email"),
            emp_password: hashedPassword,
            emp_companyName: req.param("CompanyName"),
            applicationStatus: "Submitted",
            emp_city: req.param("City"),
            emp_province: req.param("Province"),
            emp_zip: req.param("Zip"),
            house_id: req.param("Houseid"),
            mortgage_value: req.param("Mortgagevalue")
          };
          Broker.create(params)
          .then(Broker =>{ 
            return  res.json({"response": "success" , id : Broker.id });
          })
          .catch(err => res.serverError(err));
      } else {
        res.badRequest("The request wasnot successful - Bad Request.");
      }
    });
  },

  getApplicationStatus: function(req, res) {
    if (req.param("AppNo")) {
      var appno = req.param("AppNo");
      Broker.find({ id: appno })
        .then(function(Broker) 
        {
          Broker = Broker[0];

          if (Broker == undefined) 
          {
            return res.json({ Message: "Wrong Application Number" });
          }
          else
          {
            return res.send(Broker);
          }
        })
        .catch({ name: "UsageError" }, function(err) {
          return res.json(err);
        })
        .catch(function(err) {
          return res.json(err);
        });
    } else {
      res.badRequest("The request wasnot successful - Bad Request.");
    }
  }
};
