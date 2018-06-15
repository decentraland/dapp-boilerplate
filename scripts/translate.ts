#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import * as flat from 'flat'
import axios from 'axios'
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
const DEFAULT_LOCALE = Translation.DEFAULT_LOCALE

async function main() {
  const translation = new Translation()

  const mainTranslations = await translation.fetch(DEFAULT_LOCALE)
  const availableLocales = await getAvailableLocales()

  const mainKeys = Object.keys(mainTranslations)
  let flatMissingTranslations = {}

  for (const locale of availableLocales) {
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
        await updateMissingTranslations(flatMissingTranslations, requests)
        requests = []
      }
    }

    await updateMissingTranslations(flatMissingTranslations, requests)
  }

  await writeTranslations(flatMissingTranslations)
  log.info('Done!')
}

async function updateMissingTranslations(
  flatMissingTranslations: TranslationCache,
  requests: Promise<RemoteTranslation>[]
) {
  const translated = await Promise.all(requests)

  for (let { locale, key, text, replacedKeys, defaultText } of translated) {
    text = restoreTextKeys(text, replacedKeys)

    if (isCapitalized(defaultText) && !isCapitalized(text)) {
      text = capitalize(text)
    }

    if (!flatMissingTranslations[locale]) {
      flatMissingTranslations[locale] = {}
    }
    flatMissingTranslations[locale][key] = text
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
  flatMissingTranslations: TranslationCache,
  basePath: string = '../src/Translation/locales'
) {
  const mainTranslations = await new Translation().fetch(DEFAULT_LOCALE)
  const availableLocales = await getAvailableLocales()

  const flatMainTranslations = flat.flatten<TranslationData, TranslationData>(
    mainTranslations
  )

  for (const locale of availableLocales) {
    const localePath = path.resolve(__dirname, `${basePath}/${locale}.json`)
    const flatCurrentTranslations = flatAndRemoveObsoleteKeys(
      require(localePath),
      flatMainTranslations
    )

    let updatedTranslations = Object.assign(
      {},
      flatCurrentTranslations,
      flatMissingTranslations[locale]
    )
    updatedTranslations = flat.unflatten(updatedTranslations)

    await utils.promisify(fs.writeFile)(
      localePath,
      JSON.stringify(updatedTranslations, null, 2),
      'utf8'
    )
  }
}

function flatAndRemoveObsoleteKeys(
  translations: TranslationData,
  flatBaseTranslations: TranslationData
): TranslationData {
  const currentTranslations = flat.flatten(translations)

  const cleanedTranslations = Object.keys(currentTranslations)
    .filter(key => key in flatBaseTranslations)
    .reduce((clean, key) => ({ ...clean, [key]: currentTranslations[key] }), {})

  return cleanedTranslations
}

async function getAvailableLocales() {
  const availableLocales = await new Translation().getAvailableLocales()
  return availableLocales.filter(locale => locale !== DEFAULT_LOCALE)
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
  const translation: string = result.data[0][0][0]
  return translation
}

if (require.main === module) {
  loadEnv()

  BATCH_SIZE = parseInt(env.get('BATCH_SIZE', '10'), 10)
  log.info(`Using ${BATCH_SIZE} as batch size, configurable via BATCH_SIZE`)

  main()
}
