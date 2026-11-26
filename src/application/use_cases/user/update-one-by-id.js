const Joi = require("joi");
const AppError = require("../../../frameworks/helpers/app-error");

const validate = (payload) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]+$/)
      .min(3)
      .max(30)
      .lowercase()
      .required()
      .messages({
        "string.empty": "Username tidak boleh kosong",
        "any.required": "Username wajib diisi",
        "string.pattern.base":
          "Username hanya boleh mengandung huruf, angka, underscore (_), dan hyphen (-)",
        "string.min": "Username minimal 3 karakter",
        "string.max": "Username maksimal 30 karakter",
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^\S+$/, "no spaces")
      .pattern(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "complexity",
      )
      .messages({
        "string.min": "Password minimal harus 8 karakter",
        "string.pattern.name":
          "Password tidak boleh mengandung spasi, dan harus memiliki huruf besar, huruf kecil, angka, dan simbol",
      }),
    confirm_password: Joi.string()
      .when("password", {
        is: Joi.exist(),
        then: Joi.required().valid(Joi.ref("password"))
          .messages({
            "any.only": "Konfirmasi password tidak cocok",
            "any.required": "Konfirmasi password wajib diisi",
            "string.empty": "Konfirmasi password tidak boleh kosong",
          })
      }),
    name: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .pattern(/^[a-zA-Z\s'.]+$/)
      .required()
      .messages({
        "string.empty": "Name tidak boleh kosong",
        "any.required": "Name wajib diisi",
        "string.min": "Nama minimal harus 3 karakter",
        "string.max": "Nama maksimal harus 100 karakter",
        "string.pattern.base":
          "Nama tidak boleh mengandung angka atau karakter khusus",
      }),
    registration_number: Joi.string()
      .trim()
      .max(20)
      .optional()
      .allow(null, "")
      .messages({
        "string.max": "Nomor registrasi maksimal harus 20 karakter",
      }),
    status: Joi.string()
      .valid("Active", "Not Active")
      .default("Active")
      .messages({
        "any.only": "Status tidak valid",
      }),
    roleId: Joi.number().required(),
    class_id: Joi.number().integer().allow(null).optional(),
  });
  
  const validator = schema.validate(payload);
  
  if (validator.error) throw new AppError(validator.error.message, 400);
};

module.exports = async (repositories, id, payload) => {
  const { userRepository, roleRepository, classRepository } = repositories;
  
  validate({ id, ...payload });

  await checkUserId(userRepository, id);

  await checkRoleId(roleRepository, payload.roleId);

  await checkClassId(classRepository, payload.class_id);

  await checkUsername(userRepository, id, payload.username);

  return await userRepository.update(id, reconstPayload(payload));
};

const checkUsername = async (repository, id, username) => {
  const user = await repository.findByUsername(username);

  if (user && Number(user.id) !== Number(id)) {
    throw new AppError("Username sudah digunakan", 400);
  }

  return;
};

const reconstPayload = (payload) => {
  return {
    userPayload: {
      username: payload.username,
      password: payload.password,
      confirmed: payload.status == "Active" ? true : false,
      blocked: payload.status == "Active" ? false : true,
    },
    userDetails: {
      name: payload.name,
      registration_number: payload.registration_number,
      ...(payload.class_id !== undefined && { class_id: payload.class_id }),
    },
    roleLinks: [
      {
        role_id: payload.roleId,
      },
    ],
  };
};

const checkRoleId = async (repository, roleId) => {
  const role = await repository.show(roleId);

  if(!role) throw new AppError("Role tidak ditemukan", 404);

  return
}

const checkClassId = async (repository, classId) => {
  if (classId === undefined || classId === null) return;

  const foundClass = await repository.findById(classId);

  if (!foundClass) throw new AppError("Kelas tidak ditemukan", 404);

  return;
}

const checkUserId = async (repository, id) => {
  const user = await repository.show(id)

  if (!user) throw new AppError("User tidak ditemukan", 404);

  return;
}
