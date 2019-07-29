/**
 * BrokerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    updateBroker: async function(req, res) {

        var empName = req.body.customerName;
        var insuredValue = req.body.insuredValue;
        var deductableValue = req.body.deductableValue;
        var mortageNumber = req.body.mortid;
        var updatedRecord = await Broker.update({where: {  
       
           
            id:mortageNumber
           
       
        }}).set({
            
            applicationStatus:"Appraisal Received",
            insured_amount:insuredValue,
            deductible_amount:deductableValue
    
    }).fetch();

      
        if(updatedRecord.length>0)
        {
            return res.json({"response":"success"});
        }
        else
        {
            return res.json({"response":"Invalid Mortage Number"});
        }
    },   
};

