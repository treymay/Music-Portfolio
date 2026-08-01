import PDFDocument from 'pdfkit'
import fs from 'node:fs'

const doc = new PDFDocument({
  size: 'LETTER',
  margin: 0,
  info: {
    Title: 'Trey May — Music & Creative Résumé',
    Author: 'Trey May',
  },
})

doc.pipe(fs.createWriteStream('public/trey-creative-resume.pdf'))

const W = 612
const H = 792
const ink = '#0a0b0e'
const gray = '#666c76'
const light = '#eef0f3'
const blue = '#ef6426'

doc.rect(0, 0, W, H).fill(light)
doc.rect(0, 0, W, 10).fill(blue)
doc.rect(42, 58, 2, 676).fill(blue)

doc.fillColor(ink).font('Helvetica').fontSize(42).text('TREY MAY', 70, 62, { characterSpacing: 2 })
doc.fillColor(gray).font('Helvetica').fontSize(10).text('ELECTRONIC MUSIC PRODUCER  /  SONGWRITER  /  CREATIVE', 72, 116, {
  characterSpacing: 1,
})
doc.fillColor(gray).fontSize(8).text('Savannah · Atlanta · Remote', 408, 72, { align: 'right', width: 150 })
doc.text('hello@yourdomain.com', 408, 88, { align: 'right', width: 150 })
doc.text('yourportfolio.com', 408, 104, { align: 'right', width: 150 })

doc.moveTo(70, 147).lineTo(558, 147).lineWidth(.6).strokeColor('#b8bcc4').stroke()

const label = (text, x, y) => {
  doc.fillColor(blue).font('Helvetica-Bold').fontSize(7).text(text.toUpperCase(), x, y, {
    characterSpacing: 1.4,
  })
}

label('Profile', 70, 174)
doc.fillColor(ink).font('Helvetica').fontSize(12).text(
  'Progressive house and hyperpop producer and songwriter studying Advertising & Branding at SCAD. I pair precise, emotive production with campaign-minded creative thinking to build music and content for artists, brands, games, and immersive experiences.',
  70,
  193,
  { width: 488, lineGap: 5 },
)

label('Core capabilities', 70, 276)
const skills = [
  ['MUSIC', 'Songwriting · Production · Arrangement · Vocal production'],
  ['AUDIO', 'Mixing · Editing · Sound design · Synthesis · Sampling'],
  ['CREATIVE', 'Brand strategy · Content concepts · Art direction · Campaign thinking'],
  ['WORKFLOW', 'Session organization · Asset delivery · Collaboration · Detail'],
]
skills.forEach(([name, detail], index) => {
  const y = 298 + index * 31
  doc.fillColor(ink).font('Helvetica-Bold').fontSize(8).text(name, 70, y, { width: 78 })
  doc.fillColor(gray).font('Helvetica').fontSize(9).text(detail, 155, y, { width: 403 })
  doc.moveTo(70, y + 20).lineTo(558, y + 20).lineWidth(.35).strokeColor('#c7cad0').stroke()
})

label('Tools', 70, 445)
doc.fillColor(ink).font('Helvetica').fontSize(10).text('FL Studio  ·  Serum  ·  Vital  ·  Adobe Creative Cloud', 70, 465)

label('Genre range', 70, 508)
doc.fillColor(ink).font('Helvetica').fontSize(10).text(
  'Progressive House  /  Hyperpop',
  70,
  528,
)

label('Target opportunities', 70, 572)
doc.fillColor(gray).font('Helvetica').fontSize(9).text(
  'Artist Marketing Assistant  ·  Creative Coordinator  ·  Music Marketing Coordinator\nLabel / A&R Assistant  ·  Social Media Coordinator  ·  Artist Relations  ·  Studio / Production Assistant',
  70,
  592,
  { width: 488, lineGap: 6 },
)

doc.roundedRect(70, 670, 488, 54, 2).fill(ink)
doc.fillColor('#ffffff').font('Helvetica').fontSize(9).text(
  'OPEN TO COLLABORATION, INTERNSHIPS & EARLY-CAREER OPPORTUNITIES',
  91,
  689,
  { characterSpacing: .8 },
)

doc.fillColor(gray).font('Helvetica').fontSize(6).text(
  'Update contact details and tool proficiency before sending.',
  70,
  750,
  { characterSpacing: .4 },
)

doc.end()
