function getEnv(env_vars) {
  return env_vars.map(
    (variable) => process.env[variable]
  )
}

module.exports = {
  getEnv
}