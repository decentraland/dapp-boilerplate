#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import { unflatten } from 'flat'
import { env, Log, utils } from 'decentraland-commons'

import { loadEnv } from './utils'
import {
  Translation,
  TranslationData,
  TranslationCache
} from '../src/Translation'

interface RemoteTranslation {
  locale: string
  key: string
  text: string
  replacedKeys: TranslationData
  defaultText: string
}

let BATCH_SIZE = 10
const log = new Log('translate')

const nonTranslatable = ['Decentraland', 'LAND', 'MANA']

const TRANSLATION_KEY = 'tk'
const NON_TRANSLATABLE_KEY = 'nt'

async function main() {
  const DEFAULT_LOCALE = Translation.DEFAULT_LOCALE
  const translation = new Translation()

  const mainTranslations = await translation.fetch(DEFAULT_LOCALE)
  const availableLocales = await translation.getAvailableLocales()

  const mainKeys = Object.keys(mainTranslations)
  let missingTranslations = {}
  for (const locale of availableLocales) {
    if (locale === DEFAULT_LOCALE) continue

    const translations = await translation.fetch(locale)
    let requests: Promise<RemoteTranslation>[] = []

    for (const key of mainKeys) {
      if (key in translations) continue

      const defaultText = mainTranslations[key]
      const { textToTranslate, replacedKeys } = replaceTextKeys(defaultText)

      requests.push(
        translate(locale, textToTranslate).then(text => {
          const remoteTranslation: RemoteTranslation = {
            locale,
            key,
            text,
            replacedKeys,
            defaultText
          }
          return remoteTranslation
        })
      )

      if (requests.length > BATCH_SIZE) {
        await processBatch(requests, missingTranslations)
        requests = []
      }
    }

    await processBatch(requests, missingTranslations)
  }

  missingTranslations = unflatten(missingTranslations)
  log.info(
    'Added the following translations:\n\n',
    JSON.stringify(missingTranslations, null, 2),
    '\n'
  )

  await writeTranslations(availableLocales, missingTranslations)
  log.info('Done!')
}

async function processBatch(
  requests: Promise<RemoteTranslation>[],
  missingTranslations: TranslationCache
) {
  const translated = await Promise.all(requests)

  for (let { locale, key, text, replacedKeys, defaultText } of translated) {
    text = restoreTextKeys(text, replacedKeys)

    if (isCapitalized(defaultText) && !isCapitalized(text)) {
      text = capitalize(text)
    }

    if (!missingTranslations[locale]) {
      missingTranslations[locale] = {}
    }
    missingTranslations[locale][key] = text
    log.info(`${locale}(${key}): ${defaultText} -> ${text}`)
  }
}

function replaceTextKeys(
  defaultText: string
): { textToTranslate: string; replacedKeys: TranslationData } {
  const replacedKeys = {}

  // replace real keys to placeholders
  let textToTranslate = defaultText.replace(/{(.+?)}/g, str => {
    const key = `${TRANSLATION_KEY}${Object.keys(replacedKeys).length}`
    replacedKeys[key] = str
    return key
  })

  // replace non-translatable words to placeholders
  for (const [index, word] of nonTranslatable.entries()) {
    textToTranslate = textToTranslate.replace(
      new RegExp(word, 'g'),
      `${NON_TRANSLATABLE_KEY}${index}`
    )
  }

  return { textToTranslate, replacedKeys }
}

function restoreTextKeys(text: string, replacedKeys: TranslationData): string {
  // restore real keys
  Object.keys(replacedKeys).forEach(key => {
    text = text.replace(key, replacedKeys[key])
  })

  // restore non-translatable words
  for (const [index] of nonTranslatable.entries()) {
    text = text.replace(
      new RegExp(`${NON_TRANSLATABLE_KEY}${index}`, 'g'),
      nonTranslatable[index]
    )
  }

  return text
}

async function writeTranslations(
  availableLocales: string[],
  missingTranslations: TranslationCache,
  basePath: string = '../src/Translation/locales'
) {
  for (const locale of availableLocales) {
    const localePath = path.resolve(__dirname, `${basePath}/${locale}.json`)
    const currentTranslations = require(localePath)
    const updatedTranslations = Object.assign(
      {},
      currentTranslations,
      missingTranslations[locale]
    )
    await utils.promisify(fs.writeFile)(
      localePath,
      JSON.stringify(updatedTranslations, null, 2),
      'utf8'
    )
  }
}

function isCapitalized(text = '') {
  return text[0] === text[0].toUpperCase()
}

function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1)
}

async function translate(lang: string, text: string): Promise<string> {
  /* Result example:
  [
    [
      [ "Debes {sign_in_link} para acceder a esta página", "You need to {sign_in_link} to access this page", null, null, 3 ]
    ],
    null,
    "en"
  ] */

  const result = await axios.get(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(
      text
    )}`
  )
  const tranlsation: string = result.data[0][0][0]
  return tranlsation
}

if (require.main === module) {
  loadEnv()

  BATCH_SIZE = parseInt(env.get('BATCH_SIZE', '10'), 10)
  log.info(`Using ${BATCH_SIZE} as batch size, configurable via BATCH_SIZE`)

  main()
}
