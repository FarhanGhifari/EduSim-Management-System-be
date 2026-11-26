module.exports = (page, perPage, total, data) => {
  const totalPages = Math.ceil(total / perPage)

  return {
    page,
    perPage,
    total,
    totalPages,
    data,
  }
}
