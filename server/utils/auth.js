export const isJwt = (string) => string.match(/\./g)?.length === 2
export const pgDate = (date) => new Date(date).toISOString()
