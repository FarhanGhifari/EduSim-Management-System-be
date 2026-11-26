const Joi = require("joi");
const bcrypt = require("bcryptjs");
const AppError = require("../../../frameworks/helpers/app-error");

module.exports = async (repositories, userId, payload) => {
  const { userRepository } = repositories;

  const schema = Joi.object({
    old_password: Joi.string()
      .required()
      .messages({
        "string.empty": "Password lama tidak boleh kosong",
        "any.required": "Password lama wajib diisi",
      }),
    new_password: Joi.string()
      .invalid(Joi.ref("old_password"))
      .min(8)
      .pattern(/^\S+$/, "no spaces")
      .pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "complexity"
      )
      .required()
      .messages({
        "any.invalid": "Password baru tidak boleh sama dengan password lama",
        "string.empty": "Password baru tidak boleh kosong",
        "any.required": "Password baru wajib diisi",
        "string.min": "Password baru minimal harus 8 karakter",
        "string.pattern.name":
          "Password tidak boleh mengandung spasi, dan harus memiliki huruf besar, huruf kecil, angka, dan simbol",
      }),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("new_password"))
      .messages({
        "any.only": "Konfirmasi password tidak cocok dengan password baru",
        "any.required": "Konfirmasi password wajib diisi",
        "string.empty": "Konfirmasi password tidak boleh kosong",
      }),
  });

  const { error, value } = schema.validate(payload, {
    errors: { wrap: { label: false } },
  });
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { old_password, new_password } = value;

  // Ambil data user dari database
  const user = await userRepository.show(userId);
  if (!user) {
    throw new AppError("Pengguna tidak ditemukan", 404);
  }

  // Verifikasi password lama
  const isOldPasswordValid = await bcrypt.compare(old_password, user.password);
  if (!isOldPasswordValid) {
    throw new AppError("Password lama tidak sesuai", 400);
  }

  // Hash password baru
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update password di database
  await userRepository.update(userId, { userPayload: { password: hashedPassword } });

  return {
    status: "success",
    message: "Password berhasil diperbarui. Silakan login ulang.",
  };
};
