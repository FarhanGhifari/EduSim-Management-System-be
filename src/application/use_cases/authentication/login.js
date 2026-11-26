const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const AppError = require('../../../frameworks/helpers/app-error');
const moment = require("moment");

const validate = (payload) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            "string.empty": "Username tidak boleh kosong",
            "any.required": "Username wajib diisi",
        }),
        password: Joi.string().required().messages({
            "string.empty": "Password tidak boleh kosong",
            "any.required": "Password wajib diisi",
        }),
    });

    const { error } = schema.validate(payload);
    if (error) {
        throw new AppError(error.details[0].message, 422);
    }
};

module.exports = async (repositories, payload) => {
    const { userRepository } = repositories;
    const { username, password } = payload || {};

    validate(payload);

    // 2. Cari user berdasarkan username
    const user = await userRepository.findByUsername(username);
    if (!user) {
        throw new AppError("User tidak ditemukan", 404);
    }

    // 3. Cek apakah user memiliki role
    if (!user.role) {
        throw new AppError("User tidak memiliki role", 400);
    }

    // 4. Compare password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Username atau password salah", 400);
    }

    // 5. Cek status approval
    if (user.confirmed === false || user.blocked === true || user.status === "Not Active" || user.status === "Belum Aktif") {
        throw new AppError(
            "Akun anda belum aktif. Silakan hubungi administrator.",
            403,
        );
    }

    // 6. Update login_date
    const loginDate = moment().format("YYYY-MM-DD HH:mm:ss");
    await userRepository.updateLoginDate(user.id, loginDate);

    // 7. Generate JWT token
    const token = jwt.sign({ id: user.id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });

    // 8. Return success response
    return {
        data: {
            id: user.id,
            username: user.username,
            name: user.name,
            login_date: loginDate,
            role: user.role,
            jwt: token,
        },
    };
};
