/**
 * AppraisalRequestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    requestAppraisal: async function(req, res) {

        var msid = req.body.msid;
        var mortid = req.body.mortid;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var status = 'Requested';

        AppraisalRequest.create({
            msid : msid,
            mortid : mortid,
            firstname : firstname,
            lastname : lastname,
            status : status
           
        }).then(AppraisalRequest => {
            return res.json({ "response": "success" });
        }).catch(err => {
            return res.json({ "response": "error" });
        })


    },
    listRequestAppraisal: async function(req, res) {
  
        AppraisalRequest.find({'status':'Requested'}).exec(function(err, items) {            
            return (res.json(items));
        });
    },
    AppraisalStatus: async function(req, res) {
  
        AppraisalRequest.find().exec(function(err, items) {            
            return (res.json(items));
        });
    },
    listEvaluatedAppraisal: async function(req, res) {
  
        AppraisalRequest.find({'status':'Evaluated'}).exec(function(err, items) {            
            return (res.json(items));
        });
    },
    evaluate: async function(req, res) {

        var mortid = req.body.mortid;
        var appraisalinfo = req.body.appraisalinfo;
        var status = 'Evaluated';

        var updatedRecord = await AppraisalRequest.update({
            where: {
                mortid: mortid
            }
        }).set({ status: status,appraisalinfo:appraisalinfo,evaluatedBy:'adam'}).fetch();
        
        if(updatedRecord.length == 0)
        {
            return res.json({ "response": "error" });
        }
        else{
            return res.json({ "response": "success" });
        }

    },
};

