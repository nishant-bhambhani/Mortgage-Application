/**
 * IncControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    addAppraisalInfo: async function(req, res) {
      
    
                var insurancePercentage = 40/100;
                var decPercentage = 10/100;
                var insVal = parseFloat(insurancePercentage) * req.body.appraisalinfo;
                var decVal = parseFloat(decPercentage) * insVal;

               var record = await Insurance.create({
                    customerName : req.body.firstname+' '+req.body.lastname,
                    mortid: req.body.mortid,
                    appraisalValue: req.body.appraisalinfo,
                    insuredValue: insVal,
                    deductableValue: decVal,
                    propertyId: req.body.msid,
                }).fetch();
                record["response"]="success";
                record["email"]=req.body.email;

                sails.log.info(" Insert Appraisal data ==> " + "Firstname: " + req.body.firstname + "," + "Lastname: " + req.body.lastname
                + "," + "Mortgage ID: " + req.body.mortid + "," + "Appraisal Amount: " + req.body.appraisalinfo + "," + "property ID: " + req.body.msid + "<br>");
                
                sails.log.info("Appraisal Successfully Inserted ==> " + record["response"]);

                res.json(record);

     
      },
    // addInsuranceDetails: async function(req, res){

    //    var updateVal = await Insurance.find({ 'id': req.body.mortid }).then( async function (result) {
    //        console.log(result);
    //        var insurancePercentage = 40/100;
    //        console.log(parseFloat(insurancePercentage));
         
    //        var decPercentage = 10/100;
    //        var insVal = parseFloat(insurancePercentage) * parseFloat(result[0]["appraisalinfo"]);
    //        var decVal = parseFloat(decPercentage) * insVal;
    //        console.log(decVal);
    //        console.log(insVal);

    //        var updatedRecord = await Insurance.update({
    //         where: {

    //             mortid: req.body.mortid
    //         }
    //     }).set({ 
    //         insuredValue : insVal,
    //         deductableValue: decVal

    //      }).fetch();

    //      if (updatedRecord.length == 0) {
    //         return res.badRequest('Mortgage Id isnot correct.');
           
    //     }
    //     else {
    //         return res.json("Added the insurance details.");
    //     }
    //     }).catch(function(err){
    //         return res.badRequest('Mortgage Id isnot correct.');
    //     })

    
       
        
    // }
  

};

