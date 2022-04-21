const testModel = require('./test.model')

module.exports = {
  Query: {
    test: () => {
      return testModel.getAllTests()
    }
  }
}