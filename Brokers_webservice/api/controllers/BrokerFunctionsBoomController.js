/**
 * BrokerFunctionsBoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    formSubmissionBoom: function(req, res) {
        bcrypt.hash(req.param('Password'), saltRounds, function(err, hashedPassword) 
        {
        if(req.param('Name') && req.param('Email') && req.param('Password') && req.param('Address') && req.param('City') && req.param('Province') && req.param('Zip') &&  req.param('Phoneno') && req.param('Houseid') &&  req.param('Mortgagevalue') && req.param('CompanyName') ) 
        {
        var params = req.param('Name');
            Broker.create({
                emp_name : req.param('Name'),
                emp_address: req.param('Address'),
                emp_phone : req.param('Phoneno'),
                emp_email: req.param('Email'),
                emp_password: hashedPassword,
                emp_companyName : req.param('CompanyName'),
                applicationStatus: 'Submitted',
                emp_city: req.param('City'),
                emp_province: req.param('Province'),
                emp_zip : req.param('Zip'),
                house_id: req.param('Houseid'),
                mortgage_value: req.param('Mortgagevalue')
            }).then(Broker => {
                sails.log.info(req.body)
                res.send("Submitted")
            }).catch(err => res.serverError(err))
        }

        else{
            res.badRequest('The request wasnot successful - Bad Request.');
        }   
    });        
    },

      getApplicationStatus: function(req, res)
      {
        if(req.param('AppNo') && req.param('Password'))
        {
            var params = req.param('AppNo');

            Broker.find({ 'id' : params }).then(function (Broker)
            {
                    Broker = Broker[0];
                
                    console.log(Broker);
                    if(Broker == undefined) { return res.json({"Message": "Wrong Application Number" })}
                    bcrypt.compare(req.param('Password'), Broker.emp_password, function(err, valid) 
                    {
                        if(valid)
                        {
                            console.log("Inside Bcrypt")
                            var status =  Broker.applicationStatus;
                            console.log(status);
                            sails.log.info(status);
                            return res.send({appstatus:status});
                        }
                        else
                        {
                            res.json({"Message": "Wrong Password"})   
                        }

                    });
                    // else if(Broker.emp_password !== req.param('Password')){
                        
                    //     return res.json({"Message" : "Password is wrong"});

                    // }
                    // else if(!!Broker && !!Broker && !!Broker.emp_password && Broker.emp_password == req.param('Password')){
                    //     var status =  Broker.applicationStatus;
                    //     console.log(status);
                    //     sails.log.info(status);
                    //     return res.send({appstatus:status});

                    // }
                    
                    })
                    .catch({ name: 'UsageError' }, function (err) {
                    return res.json(err);
                    })
                    .catch(function (err) {
                    return res.json(err);
                    });
        } 
        else 
        {
          res.badRequest('The request wasnot successful - Bad Request.');
        }
    },
};

