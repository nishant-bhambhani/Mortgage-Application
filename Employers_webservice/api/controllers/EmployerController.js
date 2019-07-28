/**
 * EmployerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    consent: async function (req, res) {
        var employeeId = req.body.EmployeeId;
        var companyName = req.body.CompanyName;
        var mortageNumber = req.body.MortageNumber;
        var callBackURL = req.body.CallBackURL;
        var salary = req.body.Salary;
        var employmentYears = req.body.EmploymentYears;
        var token = req.body.token;
        const jwt=require("jsonwebtoken");
        console.log("fin token");
        var decoded;
        try {
            console.log("fin token1");
            decoded = jwt.verify(token, "private_key");
          } catch(err) {
            console.log("fin token2");
            return res.json({ "response": "The user is not verified" });
          }

       
        
        console.log(token);
       
        var compVer = eval(decoded.companyName);
        var empVerId = decoded.employeeId;
        console.log("decoded company ver");
        console.log(compVer);
        console.log("decoded emp id");
        console.log(empVerId);

       

        return await compVer.find({ 'id': empVerId }).then( async function (result) {
            console.log("result");
            console.log(result);
            if (!result.length) {
                return res.json({ "response": "The user is not verified" });
            }
            else {
                console.log(companyName);
    
                if (companyName == "Amazon") {
                    var updatedRecord = await Amazon.update({
                        where: {
        
                            emp_id: employeeId
                        }
                    }).set({ broker_permission: true }).fetch();
        
        
                    if (updatedRecord.length == 0) {
                        return res.json({ "response": "Employee does not Exist, Please enter correct employee ID" });
                    }
                    else {
                        updatedRecord[0]["callback_url"] = callBackURL;
                        updatedRecord[0]["emp_duration"] = employmentYears;
                        updatedRecord[0]["emp_salary"] = salary;
                        updatedRecord[0]["mortgage_no"] = mortageNumber;
                        updatedRecord[0]["response"] = "success";
                        return res.json(updatedRecord[0]);
                    }
                }
                else if (companyName == "Apple") {
                    var updatedRecord = await Apple.update({
                        where: {
        
                            emp_id: employeeId
                        }
                    }).set({ broker_permission: true }).fetch();
        
                    if (updatedRecord.length == 0) {
                        return res.json({ "response": "Employee does not Exist, Please enter correct employee ID" });
                    }
                    else {
                        updatedRecord[0]["callback_url"] = callBackURL;
                        updatedRecord[0]["emp_duration"] = employmentYears;
                        updatedRecord[0]["emp_salary"] = salary;
                        updatedRecord[0]["mortgage_no"] = mortageNumber;
                        updatedRecord[0]["response"] = "success";
                        return res.json(updatedRecord[0]);
                    }
                }
                else if (companyName == "Hp") {
                    var updatedRecord = await Hp.update({
                        where: {
        
                            emp_id: employeeId
                        }
                    }).set({ broker_permission: true }).fetch();
        
                    if (updatedRecord.length == 0) {
                        return res.json({ "response": "Employee does not Exist, Please enter correct employee ID" });
                    }
                    else {
                        updatedRecord[0]["callback_url"] = callBackURL;
                        updatedRecord[0]["emp_duration"] = employmentYears;
                        updatedRecord[0]["emp_salary"] = salary;
                        updatedRecord[0]["mortgage_no"] = mortageNumber;
                        updatedRecord[0]["response"] = "success";
                        return res.json(updatedRecord[0]);
                    }
                }
                else {
        
                    return res.json({ "response": "error" })
                }
    
            }
              
        }).catch(function (err) {
            return res.json({ "response": "The user is not verified" });
        });
               

       
     
      
    },

    loginAuthorization: async function (req, res) {
        debugger;

        var employeeId = req.body.EmployeeId;
        var companyName = req.body.CompanyName;
        var password = req.body.Password;
        console.log(employeeId);
        console.log(companyName);
        console.log(password);

        var words = ['Apple', 'Hp', 'Amazon'];
        const result = words.filter(word => word == companyName);
        if (!result || !result.length) {
            return res.json({ "Message": "Wrong Company Name." });
        }
        else {
            var A = eval(result[0]);
            return await A.find({ 'id': employeeId }).then(function (result) {
                console.log(result);

                if (!result.length) {
                    return res.json({ "Message": "Invalid Employee ID" });
                }

                if (!!result[0] && result[0].emp_pass == password) {
                    var status = { "Application Status": "Authoriztion approved" };
                    debugger;
                    console.log("shehzeen");
                    console.log(req.body.EmployeeId)
                   
                        const jwt=require("jsonwebtoken");
                        console.log(result[0]);
                        const token=jwt.sign(
                            {employeeId: req.body.EmployeeId,
                            companyName: req.body.CompanyName
                            },
                            "private_key",
                            {expiresIn:"1h"}
                            );

                            var status = { "Application Status": "Authoriztion approved" ,  token:token};
                   return res.send(status);
                  
                }

                else if (!!result[0] && result[0].emp_pass !== password) {
                    console.log(result.emp_pass);
                    console.log(password);
                    return res.json({ "Message": "Given Credintials are wrong." });
                }
            }).catch(function (err) {
                return res.json({ "Message": "Bad Request." });
            });
        }
    }
};
