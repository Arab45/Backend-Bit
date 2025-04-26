const sendError = (res, message, statuCode=404) =>{
    return res.status(statuCode).json({
        success: false,
        message: message,
        statuCode: statuCode  
    })
};

const sendSuccess = (res, message, data) => {
    return res.json({
        success: true,
        message: message,
        data: data
    })
};



module.exports = {
    sendError,
    sendSuccess,
}