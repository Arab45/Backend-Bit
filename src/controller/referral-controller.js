const { cloudinary } = require("../../service/cloudinary");
const { sendError } = require("../middleware");
const Referral = require("../model/Referral");

const createReferral = async (req, res) => {
    try {
    const avatarImg = req.files["avatarImg"] ? req.files["avatarImg"][0].path : null;

    if (!avatarImg) return sendError(res, "avatar image is required");

        // Define file size limit (5MB in bytes)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

        // Check file size limit
        if (avatarImg.size > MAX_FILE_SIZE) {
          return sendError(res, "avatar image size exceeds the 5MB limit");
        }

        const referralUpload = await cloudinary.uploader.upload(avatarImg, {
            resource_type: "auto",
            upload_preset: "Bit-Exchange"
          });

    req.body.avatarImg = referralUpload.secure_url;
    req.body.avatarImgId = referralUpload.public_id;


        const newReferral = new Referral({ ...req.body });
       const referral = await newReferral.save()
        return sendSuccess(res, "leaderboard created successfully", referral)
    } catch (error) {
       console.error(error);
       return sendError(res, "Something went wrong", 500) 
    }
};


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

        const referral = await Referral.findById(id);
        if (!referral) {
            sendError(res, "cannot find data with id");
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

        const referral = await Leader.findByIdAndUpdate(id, {$set: updateData}, {new: true});
        return sendSuccess(res, 'successfully update student profile', referral);
    } catch (error) {
       console.log(error);
       return sendError(res, 'Unable to perform this action, something went wrong', 500); 
    }
};


module.exports = {
    createReferral,
    fetchAllReferral,
    deleteReferral,
    updateReferral
}