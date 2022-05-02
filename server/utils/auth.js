exports.isJwt = (string) => string.match(/\./g)?.length === 2
exports.pgDate = (date) => new Date(date).toISOString()
