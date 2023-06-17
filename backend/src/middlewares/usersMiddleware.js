const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.name === undefined) {
        return res.status(400).send("User name undefined");
    }

    next();
}

module.exports = {
    validateBody
}