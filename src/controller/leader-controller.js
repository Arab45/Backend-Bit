const { cloudinary } = require("../../service/cloudinary");
const { sendSuccess, sendError } = require("../middleware");
const Leader = require("../model/Leader");

const createLeader = async (req, res) => {
    try {
    const avatarImg = req.files["avatarImg"] ? req.files["avatarImg"][0].path : null;

    if (!avatarImg) return sendError(res, "avatar image is required");

        // Define file size limit (5MB in bytes)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

        // Check file size limit
        if (avatarImg.size > MAX_FILE_SIZE) {
          return sendError(res, "Student image size exceeds the 5MB limit");
        }

        const leaderUpload = await cloudinary.uploader.upload(avatarImg, {
            resource_type: "auto",
            upload_preset: "Bit-Exchange"
          });

    req.body.avatarImg = leaderUpload.secure_url;
    req.body.avatarImgId = leaderUpload.public_id;


        const newLeader = new Leader({ ...req.body });
       const leader = await newLeader.save()
        return sendSuccess(res, "leaderboard created successfully", leader)
    } catch (error) {
       console.error(error);
       return sendError(res, "Something went wrong", 500) 
    }
};

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

        const leader = await Leader.findById(id);
        if (!leader) {
            sendError(res, "cannot find user with id");
        };

        const updateData = {
            ... req.body
        }

    try {

        if (req.files) {
            if (req.files.avatarImg) {
                if (leader.avatarImgId) {
                    await cloudinary.uploader.destroy(leader.avatarImgId);
                }

                const directUpload = await cloudinary.uploader.upload(
                    req.files.avatarImg[0].path,
                    {
                        resource_type: "auto",
                        upload_preset: "Bit-Exchange",
                    }
                );
                
                updateData.avatarImg = directUpload.secure_url;
                updateData.avatarImgId = directUpload.public_id;
            }
        }

        const leaderboard = await Leader.findByIdAndUpdate(id, {$set: updateData}, {new: true});
        return sendSuccess(res, 'successfully update student profile', leaderboard);
    } catch (error) {
       console.log(error);
       return sendError(res, 'Unable to perform this action, something went wrong', 500); 
    }
};

module.exports = {
    createLeader,
    fetchAllLeaders,
    deleteLeader,
    updateLeader
}