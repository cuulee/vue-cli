jest.setTimeout(20000)

const create = require('@vue/cli-test-utils/createTestProject')

test('mocha', async () => {
  const project = await create('ts-unit-mocha', {
    plugins: {
      '@vue/cli-plugin-typescript': {},
      '@vue/cli-plugin-unit-mocha': {}
    }
  })
  await project.run(`vue-cli-service test`)
})

test('jest', async () => {
  const project = await create('ts-unit-jest', {
    plugins: {
      '@vue/cli-plugin-typescript': {},
      '@vue/cli-plugin-unit-jest': {}
    }
  })
  await project.run(`vue-cli-service test`)
})