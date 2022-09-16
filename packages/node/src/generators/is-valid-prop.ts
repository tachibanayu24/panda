import { readFile } from 'fs-extra'
import type { Context } from '../create-context'
import { getEntrypoint } from './__utils'

export async function generateisValidProp(ctx: Context) {
  const filePath = getEntrypoint('@css-panda/is-valid-prop', { dev: 'index.ts', prod: 'index.mjs' })

  let content = await readFile(filePath, 'utf8')
  content = content.replace(
    'var userGenerated = []',
    `var userGenerated = [${ctx.cssPropKeys.map((key) => JSON.stringify(key)).join(',')}]`,
  )

  return {
    js: content,
  }
}