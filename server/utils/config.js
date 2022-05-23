export const getEnv = (env_vars) => {
  if (Array.isArray(env_vars))
    return env_vars.map((variable) => process.env[variable])
  else return process.env[env_vars]
}
