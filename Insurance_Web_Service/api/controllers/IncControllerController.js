/**
 * IncControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    addAppraisalInfo: function(req, res) {
        if(req.body){
            var statusBoolean = req.body.customerName && req.body.mortid && req.body.appraisalValue && req.body.propertyId;
            if(!!statusBoolean){

                Insurance.create({
                    customerName : req.body.customerName,
                    mortid: req.body.mortid,
                    appraisalValue: req.body.appraisalValue,
                    insuranceStatus: "Pending",
                    insuredValue: 0,
                    deductableValue: 0,
                    propertyId: req.body.propertyId,
                }).then(Insurance => {
                 
                    return res.ok("Appraisal details successfully submitted.");
                }).catch(err => res.serverError(err));

            } 
            else {
                res.badRequest('The request wasnot successful - Bad Request.');
              }
        }

       
     
      },
    addInsuranceDetails: async function(req, res){

       var updateVal = await Insurance.find({ 'id': req.body.mortid }).then( async function (result) {
           console.log(result);
           var insurancePercentage = 40/100;
           console.log(parseFloat(insurancePercentage));
         
           var decPercentage = 10/100;
           var insVal = parseFloat(insurancePercentage) * parseFloat(result[0]["appraisalValue"]);
           var decVal = parseFloat(decPercentage) * insVal;
           console.log(decVal);
           console.log(insVal);

           var updatedRecord = await Insurance.update({
            where: {

                mortid: req.body.mortid
            }
        }).set({ 
            insuredValue : insVal,
            deductableValue: decVal

         }).fetch();

         if (updatedRecord.length == 0) {
            return res.badRequest('Mortgage Id isnot correct.');
           
        }
        else {
            return res.json("Added the insurance details.");
        }
        }).catch(function(err){
            return res.badRequest('Mortgage Id isnot correct.');
        })

    
       
        
    }
  

};

