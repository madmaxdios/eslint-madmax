import { existsSync, copyFileSync } from 'fs'
import { join } from 'path'

const filesToCopy = ['.eslintrc.json', '.eslintignore']

filesToCopy.forEach((file) => {
  const source = join(__dirname, file)
  const destination = join(process.cwd(), file)

  if (!existsSync(destination)) {
    copyFileSync(source, destination)
    console.log(`${file} file copied to project root`)
  } else {
    console.log(`${file} file already exists in project root`)
  }
})
