const findAllWithPaginate = require("./find-all-with-paginate");
const createOne = require("./create-one");
const updateOne = require("./update-one");
const findOneById = require("./find-one-by-id");
const deleteOne = require("./delete-one");
const uploadFile = require("./upload-file");

module.exports = (repositories) => {
    return {
        findAllWithPaginate: findAllWithPaginate.bind(null, repositories),
        createOne: createOne.bind(null, repositories),
        updateOne: updateOne.bind(null, repositories),
        findOneById: findOneById.bind(null, repositories),
        deleteOne: deleteOne.bind(null, repositories),
        uploadFile: uploadFile.bind(null, repositories)
    }
}
