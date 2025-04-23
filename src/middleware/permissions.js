const Branch = require('../database/branchModel')
const Item = require('../database/itemModel')

// Check user is able to access branch
exports.check_branch_ownership = async (req, res, next) => {
    try {
        const branchId = Number(req.query.branchId)

        if(!branchId){
            res.status(400).send("No item ID provided!")
        }

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

// check user is able to access item
exports.check_item_ownership = async (req, res, next) => {
    try {
        const itemId = Number(req.query.itemId) ? Number(req.query.itemId) : Number(req.body.itemId)

        if(!itemId){
            return res.status(400).send("No item ID provided!")
        }

        const itemBranch = await Item.getBranchIdByItemId({itemId: itemId})
        const branches = await Branch.getAllBranchesForUser({userId: req.userId})
        
        let found = false
        for (const x of branches) {
            if(x.id == itemBranch.branchId){
                found = true
            }
        }

        if(found){
            next()
        } else {
            return res.status(400).send("Item not associated with user")
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send("Internal server error")
    }
};

// authenticate user role
exports.require_role = (requiredRole) => {
    return (req, res, next) => {
        if(!req.userId || req.role != requiredRole){
            return res.status(403).send("Access denied: you do not have the permissions to carry out this action")
        }
        next();
    }
}