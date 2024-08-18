import { existsSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filesToCopy = ['.eslintrc.json', '.eslintignore']

filesToCopy.forEach((file) => {
  const source = join(__dirname, file)
  const destination = join(process.cwd(), file)

  if (!existsSync(destination)) {
    copyFileSync(source, destination)
  }
})
