module.exports = async (repositories) => {
  const { dashboardRepository } = repositories;

  const { totalModules, totalSubModules, totalContents } =
    await dashboardRepository.getCounting();

  return {
    TotalOfContents: [
      {
        title: "Module",
        title_id: "Modul",
        total: totalModules,
      },
      {
        title: "Sub Module",
        title_id: "Sub Modul",
        total: totalSubModules,
      },
      {
        title: "Content",
        title_id: "Konten",
        total: totalContents,
      },
    ],
  };
};
