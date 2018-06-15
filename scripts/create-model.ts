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
    this.writeTypesFile()
    this.writeRouterFile()
    this.writeSpecFile()
    this.writeIndexFile()
  }

  writeModelFile() {
    const modelFile = `import { Model } from 'decentraland-server'
import { ${this.modelName}Attributes } from './${this.modelName}.types'

export class ${this.modelName} extends Model<${this.modelName}Attributes> {
  static tableName = '${this.tableName}'
}
`
    fs.writeFileSync(this.getPath('model'), modelFile, 'utf8')
  }

  writeTypesFile() {
    const typesFile = `export interface ${this.modelName}Attributes {
  id: number
  created_at?: Date
  updated_at?: Date
}
`
    fs.writeFileSync(this.getPath('types'), typesFile, 'utf8')
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
    // prettier-ignore
    const routerFile = `/* import { server } from 'decentraland-server' // used to handle requests */
/* import * as express from 'express' // used to type req variables */

import { Router /* , blacklist */ } from '../lib'
/* import { ${this.modelName} } from './${this.modelName}.model' */
/* import { ${this.modelName}Attributes } from './${this.modelName}.types' // used to type return values */

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
export * from './${this.modelName}.types'
`

    fs.writeFileSync(`${this.modelPath}/index.ts`, indexFile, 'utf8')
  }

  writeMigrationFile(migrationFileName: string, migrationsPath: string) {
    const migrationFile = `import { MigrationBuilder } from 'node-pg-migrate'
import { ${this.modelName} } from '../src/${this.modelName}'

const tableName = ${this.modelName}.tableName

export const up = (pgm: MigrationBuilder) => {
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

export const down = (pgm: MigrationBuilder) => {
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
