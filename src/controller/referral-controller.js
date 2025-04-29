const { sendError } = require("../middleware");
const Referral = require("../model/Referral");

const createReferral = async (req, res) => {
    try {
        const newReferral = new Referral({ ...req.body });
        if(!newReferral) {
            return sendError(res, 'No data detected', 401);
        }
        await newReferral.save();
    } catch (error) {
        return sendError(res, 'Something when wrong', 500);
    }
}


const fetchAllReferral = async (req, res) => {
    try {
        const allReferral = await Referral.find();
        if (!allReferral) {
            return sendError(res, 'No data detected', 401);
        };
        return sendSuccess(res, 'successfully fetch all data', allReferral);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
}

const deleteReferral = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteReferral = await Referral.findByIdAndDelete(id);
        if (!deleteReferral) {
            return sendError(res, 'data does not exist', 401);
        }
        return sendSuccess(res, 'successfully delete data');
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
}

const updateReferral = async (req, res) => {
    const { id } = req.params;
    try {
        const updateReferral = await Referral.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updateReferral) {
            return sendError(res, 'data does not exist', 401);
        }
        return sendSuccess(res, 'successfully update data', updateReferral);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
};


module.exports = {
    createReferral,
    fetchAllReferral,
    deleteReferral,
    updateReferral
}