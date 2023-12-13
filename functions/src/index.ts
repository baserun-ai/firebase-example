// process.env.DEBUG = 'baserun:*'
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import { baserun } from 'baserun'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

import { OpenAI } from 'langchain/llms/openai'

export const helloWorld = onRequest(async (request, response) => {
  await baserun.init()

  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  const res = await llm.call('Tell me a funny joke')

  // alternatively
  // const res = await baserun.trace(async () => {
  //   return llm.call('Tell me a funny joke')
  // })()

  logger.info('Hello logs!', { structuredData: true })
  response.send(res)
})
