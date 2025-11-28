/* eslint-disable */
import fs from 'fs'
import path from 'path'
import mammoth from 'mammoth'

const root = process.cwd()
const inputs = [
  {
    src: path.resolve('/Users/bytedance/Documents/personal/choir/public/Konzert Singers - 咏歌堂 _CN.docx'),
    outHtml: path.join(root, 'public', 'intro-cn.html'),
    label: '中文'
  },
  {
    src: path.resolve('/Users/bytedance/Documents/personal/choir/public/Konzert Singers _EN.docx'),
    outHtml: path.join(root, 'public', 'intro-en.html'),
    label: 'English'
  }
]

async function convertDocxToHtml(srcPath, outPath) {
  try {
    const { value: html } = await mammoth.convertToHtml({ path: srcPath }, {
      convertImage: mammoth.images.inline
    })
    const wrapped = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>img{max-width:100%;height:auto;border-radius:8px}</style></head><body>${html}</body></html>`
    fs.writeFileSync(outPath, wrapped, 'utf-8')
    return html
  } catch (e) {
    console.error('Failed to convert', srcPath, e)
    return ''
  }
}

function htmlToPlain(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function run() {
  const summaries = []
  for (const item of inputs) {
    const html = await convertDocxToHtml(item.src, item.outHtml)
    const text = htmlToPlain(html)
    const excerpt = text.slice(0, 1200)
    summaries.push({ label: item.label, excerpt, file: path.basename(item.outHtml) })
  }

  const mdParts = summaries.map(s => {
    return `### ${s.label}\n\n${s.excerpt}\n\n更多详情请参阅: /${s.file}`
  })

  const md = `# Konzert Singers / 咏歌堂 简介摘要\n\n${mdParts.join('\n\n---\n\n')}\n`
  fs.writeFileSync(path.join(root, 'public', 'choir-intro.md'), md, 'utf-8')
  console.log('Generated: public/intro-cn.html, public/intro-en.html, public/choir-intro.md')
}

run()

