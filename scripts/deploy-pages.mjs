import { execFileSync } from 'node:child_process'

const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim()

if (branch !== 'main') {
  console.error(`GitHub Pages deploys from main; current branch is ${branch || '(detached HEAD)'}.`)
  process.exit(1)
}

const changes = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()

if (changes) {
  console.error('Commit your source changes and the generated docs build before deploying.')
  process.exit(1)
}

execFileSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' })