import fs from 'fs'
import path from 'path'
import { getAllData } from '../.vitepress/lib/icons'

import createCodeExamples from "../.vitepress/lib/createCodeExamples";

export default {
  async load() {
    const result = await createCodeExamples('activity')

    console.log(result);

    return {
      test: true,
    }
  }
}
