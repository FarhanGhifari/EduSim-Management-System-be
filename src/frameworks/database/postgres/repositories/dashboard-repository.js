module.exports = (models) => {
  const { module: Module } = models;

  async function getCounting() {
    const [totalModules, totalSubModules, totalContents] = await Promise.all([
      Module.count({
        where: { type: "module" },
      }),
      Module.count({
        where: { type: "sub_module" },
      }),
      Module.count({
        where: { type: "content" },
      }),
    ]);

    return {
      totalModules,
      totalSubModules,
      totalContents,
    };
  }

  return {
    getCounting,
  };
};
