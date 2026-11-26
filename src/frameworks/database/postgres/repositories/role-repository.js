const AppError = require("../../../helpers/app-error")

module.exports = (models) => {
    const { role } = models;

    const show = async (id) => {
        try {
            return await role.findByPk(id);
        } catch (error) {
            throw new AppError(error)
        }
    }

    return {
        show
    }
}