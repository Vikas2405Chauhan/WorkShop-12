const path = require('path');
const UserModel = require('../model/user.model');

let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}

class UserController {
    checkApi = (req, res, next) => {
        try{
            responseObj = {
                "status": "Success",
                "msg": "Node Rest Api is working",
                "body": {}
            }
            res.status(200).send(responseObj);
        } catch(error) {
            console.log('error', error);
        }
    }

    getRecord = (req, res, next) => {
        try {
            UserModel.find({}, (err, docs) => {
                if(err) {
                    responseObj = {
                        "status": "error",
                        "msg": "Error Occured!",
                        "body": err
                    }
                    res.status(500).send(responseObj);
                } else {
                    responseObj = {
                        "status": "Success",
                        "msg": "Fetch Record",
                        "body": docs
                    }
                    res.status(200).send(responseObj);
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    }

    addRecord = (req, res, next) => {
        try {
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "No input found",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else {
                const userRecord = new UserModel(req.body);
                userRecord.save((err, docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured while adding record into DB",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    } else {
                        responseObj = {
                            "status": "Success",
                            "msg": "successfully added the record",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    updateRecord = (req, res, next) => {
        try {
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "No input found",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else if(!req.params.id){
                responseObj = {
                    "status": "error",
                    "msg": "Send ID to update the records",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else {
                UserModel.findByIdAndUpdate(req.params.id, req.body, (err,docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "Error occured while updating record into DB",
                            "body": err
                        }
                        res.status(500).send(responseObj);
                    } else {
                        responseObj = {
                            "status": "Success",
                            "msg": "successfully updated the record",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    searchRecord = (req, res, next) => {
        try {
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "input is missing",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else {
                
                // Exact Match (searchKeys)
               // UserModel.find({name:req.body.search.name.trim()}, (err, docs) => {

               // searchValues
                UserModel.find({name:{$regex:`^${req.body.search.name.trim()}`, $options: 'i'}}, (err, docs) => {
                    
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "input is missing",
                            "body": {}
                        }
                        res.status(500).send(responseObj);
                    } else {
                        responseObj = {
                            "status": "Success",
                            "msg": "Record found successfully",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })

            }  
        } catch (error) {
            console.log('Error::', error);
        }
    }

    pagiRecord = (req, res, next) => {
        try {
            if(!req.body) {
                responseObj = {
                    "status": "error",
                    "msg": "input is missing",
                    "body": {}
                }
                res.status(500).send(responseObj);
            } else {
                
                // Pagination
                // page number
                // no. of records
                
                const currentPage = req.body.currentPage;
                const pageSize = req.body.pageSize;

                const skip = pageSize * (currentPage-1);
                const limit = pageSize;

                UserModel.find({}).skip(skip).limit(limit).exec((err,docs) => {
                    if(err) {
                        responseObj = {
                            "status": "error",
                            "msg": "input is missing",
                            "body": {}
                        }
                        res.status(500).send(responseObj);
                    } else {
                        responseObj = {
                            "status": "Success",
                            "msg": "Record found successfully",
                            "body": docs
                        }
                        res.status(200).send(responseObj);
                    }
                })
            }  
        } catch (error) {
            console.log('Error::', error);
        }
    }

    sortRecord = (req, res, next) => {
        try {
            //for descending -1 and for ascending 1
            UserModel.find({}).sort({name: 1}).exec((err, docs) => {
                if(err) {
                    responseObj = {
                        "status": "error",
                        "msg": "Error Occured!",
                        "body": err
                    }
                    res.status(500).send(responseObj);
                } else {
                    responseObj = {
                        "status": "Success",
                        "msg": "Fetch Record",
                        "body": docs
                    }
                    res.status(200).send(responseObj);
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

module.exports = new UserController();