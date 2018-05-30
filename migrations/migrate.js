#!/usr/bin/env node

const { spawn } = require('child_process')
const { env } = require('decentraland-commons')
const { loadEnv, resolvePath } = require('../scripts/utils')

module.exports = function migrate(commandArguments, migrationsDir = __dirname) {
  let CONNECTION_STRING = process.env.CONNECTION_STRING

  if (!CONNECTION_STRING) {
    loadEnv()

    CONNECTION_STRING = env.get('CONNECTION_STRING', () => {
      throw new Error(
        'Please set a CONNECTION_STRING env variable before running migrations'
      )
    })
  }

  const child = spawn(
    resolvePath(__dirname + '/node-pg-migrate'),
    [
      '--database-url-var',
      'CONNECTION_STRING',
      '--migrations-dir',
      migrationsDir,
      '--ignore-pattern',
      '\\..*|.*migrate',
      ...commandArguments
    ],
    {
      env: { ...process.env, CONNECTION_STRING }
    }
  )

  console.log('Running command:')
  console.log(child.spawnargs.join(' '))

  child.on('error', function(error) {
    console.log(error.message)
  })

  child.stdout.on('data', function(data) {
    process.stdout.write(data.toString())
  })

  child.stderr.on('data', function(data) {
    process.stdout.write(data.toString())
  })

  return child
}

if (require.main === module) {
  migrate(process.argv.slice(2))
}
