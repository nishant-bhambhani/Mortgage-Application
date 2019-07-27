/**
 * AppraisalRequestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
   
    login: async function(req, res) {
  
        
        User.find({username:req.body.username}).exec(function(err, item) {            
            
            if(item[0].password == req.body.password)
            {
                item[0]["response"]="success";
                return res.json(item);
            }
            else
            {
                return res.json({ "response": "Invalid Password" });
            }
        });
    },
    
};

