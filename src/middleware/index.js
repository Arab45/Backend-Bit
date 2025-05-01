const sendError = (res, message, statuCode=404) =>{
    return res.status(statuCode).json({
        success: false,
        message: message,
        statuCode: statuCode  
    })
};

const sendSuccess = (res, message, token, data) => {
    return res.json({
        success: true,
        message: message,
        token: token,
        data: data
    })
};



module.exports = {
    sendError,
    sendSuccess,
}