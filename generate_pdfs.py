import os
import re
from xml.sax.saxutils import escape
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages after page 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "Government of Assam • Dept. of Agriculture & ASSAC (Science & Tech) • NESFIC-D-11")
            self.drawRightString(letter[0] - 54, letter[1] - 36, "SasyaSwasthya — Rajib Dutta (Luitporiya Labs)")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "NESFIC 2026 Proposal • Problem NESFIC-D-11 • Lead Applicant: Rajib Dutta | Luitporiya Labs")
        self.drawRightString(letter[0] - 54, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def clean_inline_markdown(text):
    if not text:
        return ""
    t = str(text).strip()
    
    # 1. Clean Unicode characters not supported by standard PDF Helvetica
    t = t.replace('₹', 'Rs. ')
    t = t.replace('শস্য স্বাস্থ্য', 'SasyaSwasthya')
    t = t.replace('অসমীয়া', 'Assamese')
    t = t.replace('বড়ো', 'Bodo').replace('बड़ो', 'Bodo')
    t = t.replace('বাংলা', 'Bengali')
    t = t.replace('–', '-').replace('—', ' - ')
    t = t.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    
    # 2. LaTeX Math Cleanup to clean plain readable English
    t = re.sub(r'\\left\s*\(', '(', t)
    t = re.sub(r'\\right\s*\)', ')', t)
    t = re.sub(r'\\left\s*\[', '[', t)
    t = re.sub(r'\\right\s*\]', ']', t)
    t = t.replace('\\left', '').replace('\\right', '')
    t = t.replace('\\%', '%').replace('\\_', '_').replace('\\&', ' and ')
    t = re.sub(r'\\text\{([^}]+)\}', r'\1', t)
    t = re.sub(r'\\le', 'Smaller than or equal to ', t)
    t = re.sub(r'\\ge', 'Greater than or equal to ', t)
    t = re.sub(r'\\rightarrow', ' -> ', t)
    t = re.sub(r'\\times', ' x ', t)
    t = re.sub(r'\\cdot', ' . ', t)
    t = re.sub(r'\\approx', ' ~ ', t)
    t = t.replace('$', '')
    
    # 3. Replace comparison symbols
    t = t.replace('<=', 'Smaller than or equal to ')
    t = t.replace('>=', 'Greater than or equal to ')
    
    # 4. Convert markdown bold/italic/code to ReportLab tags
    # Markdown bold: **text** -> <b>text</b>
    t = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', t)
    # Markdown italic: *text* -> <i>text</i> (avoiding double asterisks)
    t = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', t)
    # Code snippet: `code` -> Courier font
    t = re.sub(r'`([^`]+)`', r'<font face="Courier" color="#0369a1">\1</font>', t)
    
    # 5. Tokenize and protect valid ReportLab XML tags:
    # <b>, </b>, <i>, </i>, <u>, </u>, <sup>, </sup>, <sub>, </sub>, <font...>, </font>
    valid_tags = []
    def save_tag(m):
        idx = len(valid_tags)
        valid_tags.append(m.group(0))
        return f"___VALID_TAG_{idx}___"
    
    t = re.sub(r'</?(?:b|i|u|sup|sub|font(?:\s+[^>]+)?)/?>', save_tag, t, flags=re.IGNORECASE)
    
    # 6. Any remaining '<' or '>' characters are unparsed comparisons -> convert them safely
    t = t.replace('<', 'Smaller than ').replace('>', 'Greater than ')
    
    # 7. Escape standalone ampersands so ReportLab XML parser does not fail
    t = re.sub(r'&(?!(?:amp|lt|gt|quot|apos|deg);)', '&amp;', t)
    
    # 8. Restore the protected valid tags for ReportLab to style natively
    for idx, tag in enumerate(valid_tags):
        t = t.replace(f"___VALID_TAG_{idx}___", tag)
        
    return t

def safe_paragraph(text, style):
    return Paragraph(clean_inline_markdown(text), style)

def create_styled_table(data, col_widths=None, available_width=490):
    styles = getSampleStyleSheet()
    header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#ffffff'),
        alignment=0
    )
    cell_style = ParagraphStyle(
        'TD',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#1e293b'),
        alignment=0
    )
    cell_bold_style = ParagraphStyle(
        'TDBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor('#064e3b'),
        alignment=0
    )

    num_cols = len(data[0]) if data else 1
    if not col_widths:
        w = available_width / num_cols
        col_widths = [w] * num_cols

    flowable_data = []
    for r_idx, row in enumerate(data):
        flowable_row = []
        for c_idx, cell in enumerate(row):
            cell_str = str(cell).strip()
            if r_idx == 0:
                p = Paragraph(clean_inline_markdown(cell_str), header_style)
            elif c_idx == 0:
                p = Paragraph(clean_inline_markdown(cell_str), cell_bold_style)
            else:
                p = Paragraph(clean_inline_markdown(cell_str), cell_style)
            flowable_row.append(p)
        flowable_data.append(flowable_row)

    t = Table(flowable_data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#064e3b')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ]))
    return t

def parse_markdown_content(raw_lines, available_width=490):
    styles = getSampleStyleSheet()
    
    h3_style = ParagraphStyle('H3', parent=styles['Heading3'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0f766e'), spaceBefore=6, spaceAfter=2, keepWithNext=True)
    body_style = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'), spaceAfter=4)
    bullet_style = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'), leftIndent=12, spaceAfter=2)
    
    flowables = []
    i = 0
    while i < len(raw_lines):
        line = raw_lines[i].strip()
        if not line or line.startswith('*(Word Count') or line.startswith('---'):
            i += 1
            continue
            
        if line.startswith('### '):
            flowables.append(safe_paragraph(line[4:].strip(), h3_style))
            i += 1
            continue

        if line.startswith('|') and '|' in line[1:]:
            table_lines = []
            while i < len(raw_lines) and raw_lines[i].strip().startswith('|'):
                table_lines.append(raw_lines[i].strip())
                i += 1
            
            t_data = []
            for t_idx, tl in enumerate(table_lines):
                if t_idx == 1 and re.match(r'^\|?[\s\-:|]+\|?$', tl):
                    continue
                cells = [c.strip() for c in tl.split('|')[1:-1]]
                if cells:
                    t_data.append(cells)
            
            if t_data:
                flowables.append(Spacer(1, 4))
                flowables.append(create_styled_table(t_data, available_width=available_width))
                flowables.append(Spacer(1, 6))
            continue

        if line.startswith('- ') or line.startswith('* '):
            flowables.append(Paragraph(f"• {clean_inline_markdown(line[2:].strip())}", bullet_style))
            i += 1
            continue

        if line[0].isdigit() and len(line) > 2 and line[1:3] in ['. ', ') ']:
            flowables.append(Paragraph(clean_inline_markdown(line), bullet_style))
            i += 1
            continue

        flowables.append(Paragraph(clean_inline_markdown(line), body_style))
        i += 1

    return flowables

# -----------------------------------------------------------------------------
# 1. BUILD FULL PROPOSAL PDF (ALL 12 SECTIONS)
# -----------------------------------------------------------------------------
def build_proposal_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=colors.HexColor('#0f766e'), spaceAfter=8)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'))
    field_title_style = ParagraphStyle('FieldTitle', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("SASYASWASTHYA (Crop Health Assurance)", title_style))
    story.append(safe_paragraph("Space-to-Ground Agro-Climatic Intelligence & Hyper-Local Advisory System", subtitle_style))
    story.append(safe_paragraph("<b>NESFIC 2026 Official Government Track Proposal Submission</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Problem Statement ID:</b> NESFIC-D-11 (Govt Track)", meta_style), safe_paragraph("<b>Challenge Owner:</b> Dept of Agriculture & ASSAC", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Rajib Dutta (Luitporiya Labs)", meta_style), safe_paragraph("<b>Knowledge Partner:</b> AAU Jorhat", meta_style)],
        [safe_paragraph("<b>Live Demo:</b> https://sasya-swasthya.pages.dev/", meta_style), safe_paragraph("<b>Status:</b> Working Prototype Verified", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    proposal_path = os.path.join(workspace_dir, 'proposal_contents.md')
    with open(proposal_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('## Field ')
    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_header = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#059669'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(f"Field {sec_header}", field_title_style))

        # Embed matching 16:9 widescreen diagrams
        if '1: Problem understanding' in sec_header:
            for img_name in ['gemini_framework_infographic_2.jpg', 'diagram_1_before_after_workflow.jpg']:
                img = os.path.join(img_dir, img_name)
                if os.path.exists(img):
                    story.append(Spacer(1, 4))
                    story.append(Image(img, width=490, height=275))
                    story.append(Spacer(1, 6))
                    break
        elif '2: Proposed solution' in sec_header:
            for img_name in ['gemini_monsoon_radar_paddy.jpg', 'diagram_2_dual_system_reconciliation.jpg']:
                img = os.path.join(img_dir, img_name)
                if os.path.exists(img):
                    story.append(Spacer(1, 4))
                    story.append(Image(img, width=490, height=275))
                    story.append(Spacer(1, 6))
                    break
        elif '3: Describe User Journey' in sec_header:
            for img_name in ['gemini_sensor_hierarchy.jpg', 'wireframe_1_executive_dashboard.jpg']:
                img = os.path.join(img_dir, img_name)
                if os.path.exists(img):
                    story.append(Spacer(1, 4))
                    story.append(Image(img, width=490, height=275))
                    story.append(Spacer(1, 6))
        elif '4: Technology & solution' in sec_header:
            for img_name in ['gemini_enterprise_architecture.jpg', 'diagram_7_enterprise_system_architecture.jpg']:
                img = os.path.join(img_dir, img_name)
                if os.path.exists(img):
                    story.append(Spacer(1, 4))
                    story.append(Image(img, width=490, height=275))
                    story.append(Spacer(1, 6))
                    break
        elif '5: Development methodology' in sec_header:
            img = os.path.join(img_dir, 'gemini_agronomic_cce_sampling.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275))
                story.append(Spacer(1, 6))
        elif '6: Development timeline' in sec_header:
            img = os.path.join(img_dir, 'gemini_development_roadmap.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275))
                story.append(Spacer(1, 6))
        elif '9: Testing, validation' in sec_header:
            img = os.path.join(img_dir, 'diagram_4_land_health_score_hierarchy.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275))
                story.append(Spacer(1, 6))
        elif '10: Security, privacy' in sec_header:
            img = os.path.join(img_dir, 'gemini_crop_yield_certificate.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275))
                story.append(Spacer(1, 6))
        elif '11: Innovation & differentiation' in sec_header:
            img = os.path.join(img_dir, 'diagram_3_cadastral_anomaly_catalog.jpg')
            if os.path.exists(img):
                story.append(Spacer(1, 4))
                story.append(Image(img, width=490, height=275))
                story.append(Spacer(1, 6))
        elif '12: Resources, risks' in sec_header:
            budget_data = [
                [safe_paragraph("<b>Budget Head / Component</b>", meta_style), safe_paragraph("<b>Allocation</b>", meta_style), safe_paragraph("<b>Share</b>", meta_style), safe_paragraph("<b>Scope & Deliverable Description</b>", meta_style)],
                [safe_paragraph("Software Stack Dev Team Cost", meta_style), safe_paragraph("₹20.00 Lakh", meta_style), safe_paragraph("50.0%", meta_style), safe_paragraph("Lead Architect, 2 Geospatial Devs, Edge AI Engineer across 6 phases", meta_style)],
                [safe_paragraph("Geospatial & Radar Pipeline", meta_style), safe_paragraph("₹4.50 Lakh", meta_style), safe_paragraph("11.25%", meta_style), safe_paragraph("Automated Sentinel-1 SAR & Sentinel-2 ingestion, PostGIS database", meta_style)],
                [safe_paragraph("Epidemiological AI Models (AAU)", meta_style), safe_paragraph("₹5.00 Lakh", meta_style), safe_paragraph("12.50%", meta_style), safe_paragraph("Microclimate pathogen rules, thermal GDD, AAU field correlation", meta_style)],
                [safe_paragraph("Offline PWA & Edge Diagnostics", meta_style), safe_paragraph("₹3.50 Lakh", meta_style), safe_paragraph("8.75%", meta_style), safe_paragraph("MobileNetV3 INT8 edge AI, SQLite offline caching, RTK GPS lock", meta_style)],
                [safe_paragraph("Multilingual Advisory Gateway", meta_style), safe_paragraph("₹3.00 Lakh", meta_style), safe_paragraph("7.50%", meta_style), safe_paragraph("Assamese, Bodo, Bengali, English automated SMS & WhatsApp APIs", meta_style)],
                [safe_paragraph("Field Ground-Truthing & Training", meta_style), safe_paragraph("₹4.00 Lakh", meta_style), safe_paragraph("10.00%", meta_style), safe_paragraph("15,000 farmers, 100+ ADOs/Krishi Sakhis trained, 3 pilot districts", meta_style)],
                [safe_paragraph("<b>Total Problem Statement Budget</b>", meta_style), safe_paragraph("<b>₹40.00 Lakh</b>", meta_style), safe_paragraph("<b>100.0%</b>", meta_style), safe_paragraph("<b>Full 9-Month Software Stack & 3-District MVP Validation</b>", meta_style)],
            ]
            t_budget = Table(budget_data, colWidths=[140, 75, 50, 225])
            t_budget.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f0fdf4')),
                ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor('#e0f2fe')),
                ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#059669')),
                ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
                ('PADDING', (0,0), (-1,-1), 3.5),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ]))
            story.append(Spacer(1, 4))
            story.append(t_budget)
            story.append(Spacer(1, 6))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proposal PDF: {output_path}")

# -----------------------------------------------------------------------------
# 2. BUILD PROOF OF WORK PDF (ALL 11 INFOGRAPHICS EMBEDDED)
# -----------------------------------------------------------------------------
def build_proof_of_work_pdf(output_path, workspace_dir):
    doc = SimpleDocTemplate(output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('DocTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=colors.HexColor('#064e3b'), spaceAfter=4)
    subtitle_style = ParagraphStyle('DocSubTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0284c7'), spaceAfter=8)
    meta_style = ParagraphStyle('MetaStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=colors.HexColor('#334155'))
    h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=colors.HexColor('#064e3b'), spaceBefore=8, spaceAfter=4, keepWithNext=True)

    story = []
    story.append(safe_paragraph("PROOF OF WORK & TECHNICAL DOSSIER", title_style))
    story.append(safe_paragraph("SasyaSwasthya — Crop Health, Pest Forecasting & Advisory System", subtitle_style))
    story.append(safe_paragraph("<b>Empirical Formulations, Spectral Indices & Validation Benchmarks</b>", subtitle_style))
    
    meta_data = [
        [safe_paragraph("<b>Challenge ID:</b> NESFIC-D-11 (Govt Track)", meta_style), safe_paragraph("<b>Department:</b> Agriculture & ASSAC, Assam", meta_style)],
        [safe_paragraph("<b>Lead Applicant:</b> Rajib Dutta (Luitporiya Labs)", meta_style), safe_paragraph("<b>Technology Readiness:</b> TRL 6 (Validated)", meta_style)],
        [safe_paragraph("<b>Live Prototype:</b> https://sasya-swasthya.pages.dev/", meta_style), safe_paragraph("<b>Verification Status:</b> Fully Built & Verified", meta_style)]
    ]
    t_meta = Table(meta_data, colWidths=[240, 264])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#eff6ff')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#93c5fd')),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    img_dir = os.path.join(workspace_dir, 'assets', 'proposal_images')
    pow_path = os.path.join(workspace_dir, 'proof_of_work_dossier.md')
    with open(pow_path, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = content.split('\n## ')
    if sections[0].strip():
        story.extend(parse_markdown_content(sections[0].strip().split('\n'), available_width=490))

    for sec in sections[1:]:
        lines = sec.strip().split('\n')
        sec_title = lines[0].strip()
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0284c7'), spaceBefore=8, spaceAfter=5))
        story.append(safe_paragraph(sec_title, h2_style))

        if '1. Executive Summary' in sec_title:
            for img_name in ['gemini_framework_infographic_2.jpg', 'gemini_monsoon_radar_paddy.jpg']:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275))
                    story.append(Spacer(1, 6))
        elif '2. Empirical Performance' in sec_title:
            for img_name in ['gemini_sensor_hierarchy.jpg', 'diagram_4_land_health_score_hierarchy.jpg']:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275))
                    story.append(Spacer(1, 6))
        elif '3. Operational Time-to-Treatment' in sec_title:
            for img_name in ['gemini_agronomic_cce_sampling.jpg', 'gemini_development_roadmap.jpg']:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275))
                    story.append(Spacer(1, 6))
        elif '4. Drone Hardware' in sec_title:
            for img_name in ['gemini_enterprise_architecture.jpg', 'diagram_7_enterprise_system_architecture.jpg']:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275))
                    story.append(Spacer(1, 6))
        elif '5. Security' in sec_title:
            for img_name in ['gemini_crop_yield_certificate.jpg', 'wireframe_1_executive_dashboard.jpg', 'wireframe_2_cadastral_webgis.jpg', 'wireframe_3_lat_mandal_mobile.jpg']:
                img_path = os.path.join(img_dir, img_name)
                if os.path.exists(img_path):
                    story.append(Spacer(1, 4))
                    story.append(Image(img_path, width=490, height=275))
                    story.append(Spacer(1, 6))

        body_flowables = parse_markdown_content(lines[1:], available_width=490)
        story.extend(body_flowables)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated Proof of Work PDF: {output_path}")

if __name__ == '__main__':
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    proposal_pdf = os.path.join(workspace_dir, 'NESFIC_D11_Proposal_Ron_Hatibaruah.pdf')
    pow_pdf = os.path.join(workspace_dir, 'NESFIC_D11_Proof_of_Work_Ron_Hatibaruah.pdf')
    
    build_proposal_pdf(proposal_pdf, workspace_dir)
    build_proof_of_work_pdf(pow_pdf, workspace_dir)
