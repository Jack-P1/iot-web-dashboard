const asyncHandler = require("express-async-handler")
const Branch = require("../database/branchModel")

/*
    Get all branches under a company
*/
exports.get_branches_for_company = asyncHandler(async (req, res) => {

    if(!req.query.companyId){
        res.status(400).send("No company id given")
    }

    let branches = await Branch.getAllBranchesByCompanyId({companyId: req.query.companyId})
    console.log(branches)
    if (branches?.length){
        return res.status(200).json(branches)
    } else{
        return res.status(404).send("No branches exist for company provided")
    }

});

/*
    Get all branches linked to user account
*/
exports.get_branches_for_user = asyncHandler(async (req, res) => {
    
    // this should be caught by middleware
    if(!req.userId){
        res.status(400).send("No user id given")
    }

    let branches = await Branch.getAllBranchesForUser({userId: req.userId})

    if (branches?.length){
        return res.status(200).json(branches)
    } else{
        return res.status(404).send("No branches exist for user")
    }
})

