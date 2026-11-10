"""Create the editable sample for grade 4, lesson 8 (requires python-docx).

Render the DOCX with the documents skill's render_docx.py, then crop only the
empty bottom of page-1.png for the matching projector preview.
"""

from pathlib import Path

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor


output = Path(__file__).resolve().parents[1] / "assets/documents"
output.mkdir(parents=True, exist_ok=True)
document = Document()
section = document.sections[0]
section.page_width, section.page_height = Cm(21), Cm(29.7)
section.top_margin = section.bottom_margin = Cm(2)
section.left_margin = section.right_margin = Cm(2)

for name, size in [("Normal", 16), ("Title", 20)]:
    style = document.styles[name]
    style.font.name = "Arial"
    style.font.size = Pt(size)
    style.font.color.rgb = RGBColor(0, 0, 0)
    style.font.bold = name == "Title"
    style.paragraph_format.space_after = Pt(12)
    style.paragraph_format.line_spacing = 1
    for border in style.element.xpath(".//w:pBdr"):
        border.getparent().remove(border)
    language = OxmlElement("w:lang")
    language.set(qn("w:val"), "uk-UA")
    style.element.get_or_add_rPr().append(language)

document.add_paragraph("Про мене", "Title")
for text in [
    "Мене звати Максим Коваленко. Мені 9 років.",
    "Я навчаюся у 4 класі. Люблю малювати й грати у футбол.",
    "Мрію створити власну комп’ютерну гру.",
]:
    document.add_paragraph(text)

document.core_properties.author = "StepBy School"
document.core_properties.title = "Про мене"
document.core_properties.subject = "Інформатика · 4 клас · урок 8"
document.core_properties.comments = ""
document.save(output / "info4-lesson8-about-me.docx")
