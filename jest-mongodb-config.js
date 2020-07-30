module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '5.9.25', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
}
