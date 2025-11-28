/* eslint-disable */
import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import { XMLParser } from 'fast-xml-parser'

const DOCX_CN = '/Users/bytedance/Documents/personal/choir/public/Konzert Singers - 咏歌堂 _CN.docx'
const OUT_DIR = path.join(process.cwd(), 'public')
const MEDIA_DIR = path.join(OUT_DIR, 'docx-media')

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function unzipDocx(docxPath) {
  const zip = new AdmZip(docxPath)
  const docXmlEntry = zip.getEntry('word/document.xml')
  if (!docXmlEntry) throw new Error('document.xml not found in docx')
  const xml = docXmlEntry.getData().toString('utf-8')
  const mediaEntries = zip.getEntries().filter((e) => e.entryName.startsWith('word/media/'))
  ensureDir(MEDIA_DIR)
  const images = []
  mediaEntries.forEach((e) => {
    const fileName = e.entryName.replace('word/media/', '')
    const outPath = path.join(MEDIA_DIR, fileName)
    fs.writeFileSync(outPath, e.getData())
    images.push({ file: `/docx-media/${fileName}` })
  })
  return { xml, images }
}

function extractTextFromXml(xml) {
  const parser = new XMLParser({ ignoreAttributes: false })
  const doc = parser.parse(xml)
  const body = doc['w:document']?.['w:body']
  const paras = []

  const pNodes = body?.['w:p']
  const pArray = Array.isArray(pNodes) ? pNodes : (pNodes ? [pNodes] : [])
  pArray.forEach((p) => {
    const runs = p['w:r']
    let text = ''
    const runsArr = Array.isArray(runs) ? runs : (runs ? [runs] : [])
    runsArr.forEach((r) => {
      const t = r['w:t']
      if (typeof t === 'string') text += t
      else if (t && t['#text']) text += t['#text']
    })
    text = text.trim()
    if (text) paras.push(text)
  })

  return paras
}

function buildSummary(paras) {
  const text = paras.join('\n')
  let choirName = paras.find((p) => /合唱团|Konzert\s*Singers|咏歌堂/i.test(p)) || paras[0] || 'Konzert Singers / 咏歌堂'
  let conductorLine = paras.find((p) => /指挥|音乐总监|Conductor|Music\s*Director/i.test(p)) || ''
  let intro = ''
  for (let i = 0; i < Math.min(20, paras.length); i++) {
    const t = paras[i]
    if (/指挥|团员|成员|成员名单|作品|演出|联系方式/i.test(t)) break
    intro += (intro ? '\n' : '') + t
  }
  const membersStart = paras.findIndex((p) => /团员|成员|Members/i.test(p))
  const members = []
  if (membersStart >= 0) {
    for (let i = membersStart + 1; i < paras.length; i++) {
      const t = paras[i]
      if (/作品|演出|联系方式|联系|指挥/i.test(t)) break
      if (t.length <= 40 && /[\u4e00-\u9fa5A-Za-z]/.test(t) && !/：|:/.test(t)) members.push(t)
    }
  }
  return { choirName, conductorLine, intro, members }
}

function saveOutputs(summary, images) {
  const json = {
    choirName: summary.choirName,
    conductor: { raw: summary.conductorLine },
    intro: summary.intro,
    members: summary.members,
    images
  }
  fs.writeFileSync(path.join(OUT_DIR, 'choir-doc.json'), JSON.stringify(json, null, 2), 'utf-8')

  const md = `# ${summary.choirName}\n\n## 简介\n\n${summary.intro}\n\n## 指挥\n\n${summary.conductorLine || '（待补充）'}\n\n## 团员\n\n${summary.members.length ? summary.members.map((m) => `- ${m}`).join('\n') : '（待补充）'}\n\n## 图片\n\n${images.map((img) => `![](${img.file})`).join('\n')}`
  fs.writeFileSync(path.join(OUT_DIR, 'choir-intro-doc.md'), md, 'utf-8')
}

function run() {
  try {
    const { xml, images } = unzipDocx(DOCX_CN)
    const paras = extractTextFromXml(xml)
    const summary = buildSummary(paras)
    saveOutputs(summary, images)
    console.log('Extracted and saved: public/choir-doc.json, public/choir-intro-doc.md, public/docx-media/*')
  } catch (e) {
    console.error('Docx extraction failed', e)
    process.exitCode = 1
  }
}

run()
