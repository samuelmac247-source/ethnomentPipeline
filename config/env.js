function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getPmsCredentials() {
  return {
    username: getRequiredEnv('PMS_USERNAME').trim(),
    password: getRequiredEnv('PMS_PASSWORD'),
  };
}

module.exports = {
  getPmsCredentials,
  getRequiredEnv,
};
