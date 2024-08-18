const { join } = require('path')
const { existsSync, copyFileSync } = require('fs')

const filesToCopy = ['.eslintrc.json', '.eslintignore']

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const checkFilesExist = async (files, timeout) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    if (files.every((file) => existsSync(join(__dirname, file)))) {
      return true
    }
    await wait(100) // Check every 100ms
  }
  return false
}

const copyFiles = () => {
  filesToCopy.forEach((file) => {
    const source = join(__dirname, file)
    const destination = join(process.cwd(), file)

    if (!existsSync(source)) {
      console.error(`Source file not found: ${source}`)
      process.exit(1)
    }
    if (existsSync(destination)) {
      console.error(`${file} already exists in project root.`)
      process.exit(1)
    }
    copyFileSync(source, destination)
  })
}

;(async () => {
  const filesExist = await checkFilesExist(filesToCopy, 3000) // Wait up to 3 seconds
  if (filesExist) {
    copyFiles()
  } else {
    console.error('Source files did not appear within the timeout period.')
    process.exit(1)
  }
})()
