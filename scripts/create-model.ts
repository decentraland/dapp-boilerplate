#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import * as pluralize from 'pluralize'
import { migrate } from './migrate'

function main() {
  const modelName = process.argv[2]
  if (!modelName) {
    throw new Error('Please supply a model name as the first argument')
  }

  const modelStructure = new ModelStructure(modelName)

  modelStructure.runMigrate()
  modelStructure.generateFolderStructure()
  modelStructure.writeFiles()
}

export class ModelStructure {
  modelName: string
  modelPath: string
  tableName: string

  constructor(modelName: string) {
    this.modelName = modelName[0].toUpperCase() + modelName.slice(1)
    this.modelPath = path.resolve(__dirname, `../src/${this.modelName}`)
    this.tableName = pluralize(modelName.toLowerCase())
  }

  runMigrate() {
    const migrationsPath = path.resolve(__dirname, `../migrations`)
    const migrationFileName = `${this.tableName}-create`
    const child = migrate(['create', migrationFileName], migrationsPath)

    child.on('close', () =>
      this.writeMigrationFile(migrationFileName, migrationsPath)
    )
  }

  generateFolderStructure() {
    try {
      fs.mkdirSync(this.modelPath)
    } catch (err) {
      // Skip existing folders
      if (err.code !== 'EEXIST') throw err
    }
  }

  writeFiles() {
    this.writeModelFile()
    this.writeRouterFile()
    this.writeSpecFile()
    this.writeIndexFile()
  }

  writeModelFile() {
    const classFile = `import { Model } from 'decentraland-server'

export interface ${this.modelName}Attributes {}

export class ${this.modelName} extends Model {
  static tableName = '${this.tableName}'
  static columnNames = ['id', 'created_at', 'updated_at']
}
`
    fs.writeFileSync(this.getPath('model'), classFile, 'utf8')
  }

  writeSpecFile() {
    const specFile = `import { expect } from 'chai'
import { ${this.modelName} } from './${this.modelName}.model'

describe('${this.modelName}', function() {
  it('should set the correct table name', function() {
    expect(${this.modelName}.tableName).to.equal('${this.tableName}')
  })
})
`

    fs.writeFileSync(this.getPath('spec'), specFile, 'utf8')
  }

  writeRouterFile() {
    const routerFile = `/* import { server } from 'decentraland-server' // used to handle requests */
/* import * as express from 'express' // used to type req variables */

/* import {
  ${this.modelName},
  ${this.modelName}Attributes // used to type return values
} from './${this.modelName}.model' */
import { Router } from '../lib'

export class ${this.modelName}Router extends Router {
  mount() {
    return undefined
  }
}
`
    fs.writeFileSync(this.getPath('router'), routerFile, 'utf8')
  }

  writeIndexFile() {
    const indexFile = `export * from './${this.modelName}.model'
export * from './${this.modelName}.router'
`

    fs.writeFileSync(`${this.modelPath}/index.ts`, indexFile, 'utf8')
  }

  writeMigrationFile(migrationFileName: string, migrationsPath: string) {
    const migrationFile = `import { MigrationBuilder } from 'node-pg-migrate'
import { ${this.modelName} } from '../src/${this.modelName}'

const tableName = ${this.modelName}.tableName

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    tableName,
    {
      id: { type: 'INT', primaryKey: true, notNull: true, comment: null },
      created_at: { type: 'TIMESTAMP', notNull: true, comment: null },
      updated_at: { type: 'TIMESTAMP', comment: null }
    },
    { ifNotExists: true, comment: null }
  )
}

exports.down = (pgm: MigrationBuilder) => {
  pgm.dropTable(tableName, {})
}`

    const files = fs
      .readdirSync(migrationsPath)
      .sort()
      .reverse()

    for (const file of files) {
      if (file.search(migrationFileName) !== -1) {
        fs.writeFileSync(`${migrationsPath}/${file}`, migrationFile, 'utf8')
        return
      }
    }
  }

  getPath(type) {
    return `${this.modelPath}/${this.modelName}.${type}.ts`
  }
}

if (require.main === module) {
  main()
}
