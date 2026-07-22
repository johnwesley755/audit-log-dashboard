const errorHandler = (err, req, res, next) => {

    console.error(err);

    // Mongoose Validation Error
    if (err.name === "ValidationError") {

        return res.status(400).json({
            success: false,
            message: err.message
        });

    }

    // Invalid Mongo ObjectId
    if (err.name === "CastError") {

        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });

    }

    // Duplicate Key
    if (err.code === 11000) {

        return res.status(400).json({
            success: false,
            message: "Duplicate value found."
        });

    }

    res.status(500).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

};

module.exports = errorHandler;