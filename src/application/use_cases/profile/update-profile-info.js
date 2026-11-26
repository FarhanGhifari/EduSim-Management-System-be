const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

module.exports = async (repositories, userId, payload) => {
  const { userRepository } = repositories;

  const schema = Joi.object({
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]+$/)
      .min(8)
      .max(30)
      .lowercase()
      .required()
      .messages({
        "string.base": "Username harus berupa string",
        "string.empty": "Username tidak boleh kosong",
        "any.required": "Username wajib diisi",
        "string.pattern.base":
          "Username hanya boleh mengandung huruf, angka, underscore (_), dan hyphen (-)",
        "string.min": "Username minimal 8 karakter",
        "string.max": "Username maksimal 30 karakter",
      }),
    name: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .pattern(/^[a-zA-Z\s'.]+$/)
      .required()
      .messages({
        "string.base": "Nama harus berupa string",
        "string.empty": "Nama tidak boleh kosong",
        "any.required": "Nama wajib diisi",
        "string.min": "Nama minimal harus 3 karakter",
        "string.max": "Nama maksimal harus 100 karakter",
        "string.pattern.base":
          "Nama tidak boleh mengandung angka atau karakter khusus",
      }),
  });

  const { role, ...safePayload } = payload;

  const { error, value } = schema.validate(safePayload, {
    errors: { wrap: { label: false } },
    stripUnknown: true,
    convert: false,
  });
  if (error) {
    throw new AppError(error.details[0].message, 422);
  }

  const { username, name } = value;

  const currentUser = await userRepository.show(userId);
  if (!currentUser) {
    throw new AppError("Pengguna tidak ditemukan", 404);
  }

  const currentName = currentUser.userDetails ? currentUser.userDetails.name : currentUser.name;
  if (currentUser.username === username && currentName === name) {
    throw new AppError("Informasi profil baru tidak boleh sama dengan informasi saat ini", 400);
  }

  const existingUser = await userRepository.findByUsername(username);
  if (existingUser && Number(existingUser.id) !== Number(userId)) {
    throw new AppError("Username sudah digunakan oleh pengguna lain", 409);
  }

  await userRepository.update(userId, {
    userPayload: { username },
    userDetails: { name },
  });

  return {
    status: "success",
    message: "Informasi profil berhasil diperbarui",
  };
};
