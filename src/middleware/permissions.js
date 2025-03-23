const Branch = require('../database/branchModel')
// Check user is able to access branch
exports.check_branch_ownership = async (req, res, next) => {
    try {
        const branchId = Number(req.query.branchId)
        const branches = await Branch.getAllBranchesForUser({userId: req.userId})
        
        let found = false
        for (const x of branches) {
            console.log(x.id)
            if(x.id == branchId){
                found = true
            }
        }

        if(found){
            next()
        } else {
            res.status(400).send("Branch not associated with user")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send("Internal server error")
    }
};