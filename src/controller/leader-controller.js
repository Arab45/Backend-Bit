const createLeader = async (req, res) => {
    try {
    const newLeader = new Leader(...req.body);
    if (!newLeader) {
        return sendError(res, 'Leader does not exist', 401);
    }

        await newLeader.save();
        return sendSuccess(res, 'Leader created successfully', newLeader);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something went wrong', 500);
    }
}

const fetchAllLeaders = async (req, res) => {
    try {
        const allLeaders = await Leader.find();
        if (!allLeaders) {
            return sendError(res, 'No data detected', 401);
        };
        return sendSuccess(res, 'Successfully fetched all leaders', allLeaders);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something went wrong', 500);
    }
}

const deleteLeader = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteLeader = await Leader.findByIdAndDelete(id);
        if (!deleteLeader) {
            return sendError(res, 'Leader does not exist', 401);
        }
        return sendSuccess(res, 'Successfully deleted leader');
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something went wrong', 500);
    }
}

const updateLeader = async (req, res) => {
    const { id } = req.params;
    try {
        const updateLeader = await Leader.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updateLeader) {
            return sendError(res, 'Leader does not exist', 401);
        }
        return sendSuccess(res, 'Successfully updated leader', updateLeader);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something went wrong', 500);
    }
}

module.exports = {
    createLeader,
    fetchAllLeaders,
    deleteLeader,
    updateLeader
}