/**
 * BrokerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    consent: async function(req, res) {

        var empName = req.body.emp_name;
        var empEmail = req.body.emp_email;
        var empSalary = req.body.emp_salary;
        var empDuration = req.body.emp_duration;
        var mortageNumber = req.body.mortgage_no;
        var updatedRecord = await Broker.update({where: {  
       
           
            emp_email:mortageNumber
           
       
        }}).set({
            
            applicationStatus:"Employee Data Submitted To Broker",
            emp_salary:empSalary,
            emp_duration:empDuration
    
    }).fetch();

        if(updatedRecord.length==0)
        {
            return res.json({"response":"Invalid Employee Email"});
        }
        else if(updatedRecord.length>0 && updatedRecord[0]["id"]==mortageNumber)
        {
            return res.json({"response":"success"});
        }
        else
        {
            return res.json({"response":"Invalid Mortage Number"});
        }
    
    

    },

    
};

