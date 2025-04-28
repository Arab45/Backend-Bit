const createNotification = async (req, res) => {
    try {
        const newNitification = new Notification({ ...req.body });
        if(!newNitification) {
            return sendError(res, 'data does not exist', 401);
        }
        await newNitification.save();
        return sendSuccess(res, 'successfully create notification', newNitification);
    } catch (error) {
        return sendError(res, 'Something when wrong', 500);
    }
}


const fetchAllNotification = async (req, res) => {
    try {
        const allNotification = await Notification.find();
        if (!allNotification) {
            return sendError(res, 'No data detected', 401);
        };
        return sendSuccess(res, 'successfully fetch all data', allNotification);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
}

const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteNotification = await Notification.findByIdAndDelete(id);
        if (!deleteNotification) {
            return sendError(res, 'data does not exist', 401);
        }
        return sendSuccess(res, 'successfully delete data');
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
}

const updateNotification = async (req, res) => {
    const { id } = req.params;
    try {
        const updateNotification = await Notification.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updateNotification) {
            return sendError(res, 'data does not exist', 401);
        }
        return sendSuccess(res, 'successfully update data', updateNotification);
    } catch (error) {
        console.log(error);
        return sendError(res, 'Something when wrong', 500);
    }
};

module.exports = {
    createNotification,
    fetchAllNotification,
    deleteNotification,
    updateNotification
}