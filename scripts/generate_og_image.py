#!/usr/bin/env python3
"""
Generate ultra-fast, professional 1200x630 OpenGraph social card (og-image.jpg) for SasyaSwasthya using pure Pillow.
Zero dependencies on matplotlib.
Features:
- Technological blueprint style
- Official Assam Agriculture & ASSAC branding (NESFIC-D-11)
- Lead Applicant: Rajib Dutta (Luitporiya Labs)
- Lead Architect: Ron Hatibaruah
- 4 Modular System Feature Cards (Space, AI Engine, Drone Avionics, Sasya Seva)
- Sub-meter Dag Geofencing, 72h Early Warning, PMFBY Validation
"""

import os
from PIL import Image, ImageDraw, ImageFont

def get_font(font_names, size):
    system_font_paths = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/SFCompact.ttf",
        "/System/Library/Fonts/SFNS.ttf"
    ]
    for p in system_font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def get_bold_font(size):
    bold_paths = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Black.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc"
    ]
    for p in bold_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return get_font([], size)

def generate_og_image():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, 'public')
    dist_dir = os.path.join(base_dir, 'dist')
    os.makedirs(public_dir, exist_ok=True)

    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (248, 250, 252)) # Slate 50 background
    draw = ImageDraw.Draw(img)

    # 1. Subtle Engineering Grid Lines
    for x in range(60, W, 80):
        draw.line([(x, 0), (x, H)], fill=(226, 232, 240), width=1)
    for y in range(40, H, 60):
        draw.line([(0, y), (W, y)], fill=(226, 232, 240), width=1)

    # 2. Top Header Bar (0 to 52)
    draw.rectangle([(0, 0), (W, 52)], fill=(15, 23, 42)) # Slate 900
    # Accent indicator dot
    draw.ellipse([(38, 20), (50, 32)], fill=(52, 211, 153)) # Emerald 400
    
    font_top_bold = get_bold_font(16)
    font_top_sub = get_font([], 14)
    draw.text((62, 17), "GOVERNMENT OF ASSAM", fill=(255, 255, 255), font=font_top_bold)
    draw.text((275, 17), "•", fill=(100, 116, 139), font=font_top_bold)
    draw.text((295, 18), "DEPARTMENT OF AGRICULTURE & ASSAC (SCIENCE & TECHNOLOGY)", fill=(203, 213, 225), font=font_top_sub)

    # Right Badge: NESFIC-D-11 TRACK
    draw.rounded_rectangle([(960, 11), (1160, 41)], radius=6, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
    font_badge = get_bold_font(13)
    draw.text((982, 18), "NESFIC-D-11 TRACK", fill=(56, 189, 248), font=font_badge)

    # 3. Main Brand Title Section (52 to 175)
    # Embed Icon if available
    icon_path = os.path.join(public_dir, 'apple-touch-icon.png')
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert("RGBA").resize((92, 92), Image.Resampling.LANCZOS)
        img.paste(icon, (40, 70), icon)
    else:
        draw.rounded_rectangle([(40, 70), (132, 162)], radius=18, fill=(6, 78, 59), outline=(52, 211, 153), width=2)

    font_title = get_bold_font(42)
    font_sub_pill = get_bold_font(13)
    draw.text((150, 68), "SasyaSwasthya", fill=(15, 23, 42), font=font_title)
    
    # State Tech Pill
    draw.rounded_rectangle([(480, 78), (645, 110)], radius=8, fill=(236, 253, 245), outline=(16, 185, 129), width=1)
    draw.text((498, 86), "ASSAM AGRI-TECH", fill=(6, 95, 70), font=font_sub_pill)

    font_desc = get_bold_font(16)
    font_subdesc = get_font([], 14)
    draw.text((150, 118), "Assam Crop Health Monitoring, Pest & Disease Forecasting and Location-Specific Advisory System", fill=(4, 120, 87), font=font_desc)
    draw.text((150, 142), "Space-to-Ground Multi-Tier Surveillance • Sub-Meter Cadastral Dag Geofencing • 72-Hour Early Warning", fill=(100, 116, 139), font=font_subdesc)

    # 4. Four Architecture Modular Cards (Y: 175 to 525)
    # Card 1: Satellite & SAR Radar (Left Top: X: 40 to 585, Y: 180 to 335)
    draw.rounded_rectangle([(40, 180), (585, 338)], radius=12, fill=(255, 255, 255), outline=(52, 211, 153), width=2)
    draw.rectangle([(41, 181), (584, 218)], fill=(236, 253, 245))
    font_card_head = get_bold_font(13)
    font_card_body = get_font([], 12)
    font_card_sub = get_font([], 11)
    draw.text((55, 192), "[TIER 1] ALL-WEATHER SPACE & RADAR TELEMETRY", fill=(6, 95, 70), font=font_card_head)
    draw.text((55, 228), "• 10m Sentinel-2 multi-spectral NDVI, NDWI & SAVI biophysical indices.", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 252), "• Sentinel-1 C-Band SAR microwave radar penetrates 100% monsoon clouds.", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 276), "• Hourly IMD AWS weather telemetry (RH >88%, GDD, rainfall accumulation).", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 302), "• Automated 5-day spaceborne pipeline covering all 35 Assam districts.", fill=(100, 116, 139), font=font_card_sub)

    # Card 2: Epidemiological AI Engine (Right Top: X: 615 to 1160, Y: 180 to 338)
    draw.rounded_rectangle([(615, 180), (1160, 338)], radius=12, fill=(255, 255, 255), outline=(56, 189, 248), width=2)
    draw.rectangle([(616, 181), (1159, 218)], fill=(240, 249, 255))
    draw.text((630, 192), "[TIER 2] AI EPIDEMIOLOGICAL FORECAST ENGINE", fill=(3, 105, 161), font=font_card_head)
    draw.text((630, 228), "• 72-Hour Pre-Symptomatic Early Warnings before foliar necrosis.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 252), "• Targeted Pathogens: Rice Blast, Yellow Stem Borer & Sheath Blight.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 276), "• Cadastral Crop Health Index (CHI: 1-100) and vulnerability matrices.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 302), "• 88.6% double-blind validation accuracy across Kamrup Rural & Nagaon.", fill=(100, 116, 139), font=font_card_sub)

    # Card 3: Drone Avionics & Edge AI PWA (Left Bottom: X: 40 to 585, Y: 355 to 518)
    draw.rounded_rectangle([(40, 355), (585, 518)], radius=12, fill=(255, 255, 255), outline=(192, 132, 252), width=2)
    draw.rectangle([(41, 356), (584, 393)], fill=(250, 245, 255))
    draw.text((55, 367), "[TIER 3] DRONE AVIONICS & OFFLINE EDGE AI PWA", fill=(126, 34, 206), font=font_card_head)
    draw.text((55, 403), "• Sub-5cm 5-Band Multispectral + Long-Wave Thermal IR sensor payload.", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 427), "• Indian NavIC (IRNSS) RTK GNSS centimeter spatial locking (Sub-1.5 cm).", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 451), "• MobileNetV3 INT8 on-device leaf diagnostics (82ms offline inferencing).", fill=(30, 41, 59), font=font_card_body)
    draw.text((55, 477), "• Sub-meter GPS parcel verification for Extension Officers (ADO/AEO).", fill=(100, 116, 139), font=font_card_sub)

    # Card 4: Sasya Seva & Governance (Right Bottom: X: 615 to 1160, Y: 355 to 518)
    draw.rounded_rectangle([(615, 355), (1160, 518)], radius=12, fill=(255, 255, 255), outline=(245, 158, 11), width=2)
    draw.rectangle([(616, 356), (1159, 393)], fill=(255, 251, 235))
    draw.text((630, 367), "[TIER 4] SASYA SEVA (ADVISORY & AUDIT LEDGER)", fill=(180, 83, 9), font=font_card_head)
    draw.text((630, 403), "• Automated Multilingual Advisories in Assamese, Bodo, Bengali & English.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 427), "• Calibrated per Bigha (14,400 sq ft) biological IPM & water drainage steps.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 451), "• Immutable SHA-256 Cryptographic Audit Ledger for PMFBY validation.", fill=(30, 41, 59), font=font_card_body)
    draw.text((630, 477), "• 15,000+ onboarded farmers & 60% reduction in emergency response time.", fill=(100, 116, 139), font=font_card_sub)

    # 5. Bottom Leadership & Institutional Footer (535 to 630)
    draw.rectangle([(0, 535), (W, 630)], fill=(15, 23, 42))

    font_foot_head = get_bold_font(14)
    font_foot_sub = get_font([], 12)
    font_foot_copy = get_font([], 10)

    # Left: Project Leadership
    draw.text((45, 545), "LEAD APPLICANT: RAJIB DUTTA", fill=(255, 255, 255), font=font_foot_head)
    draw.text((45, 568), "Organization: Luitporiya Labs   •   Lead Architect: Ron Hatibaruah", fill=(148, 163, 184), font=font_foot_sub)
    draw.text((45, 590), "(C) 2026 Luitporiya Labs. All rights reserved.   •   Guwahati, Assam, India (IN-AS)", fill=(100, 116, 139), font=font_foot_copy)

    # Right: Institutional Partners & URL
    font_url = get_bold_font(12)
    draw.text((750, 545), "KNOWLEDGE PARTNER: AAU JORHAT", fill=(52, 211, 153), font=font_foot_head)
    draw.text((750, 568), "Assam State Space Application Centre (ASSAC) & Dept. of Agriculture", fill=(148, 163, 184), font=font_foot_sub)

    # Live URL Button
    draw.rounded_rectangle([(750, 588), (1160, 618)], radius=5, fill=(30, 41, 59), outline=(16, 185, 129), width=1)
    draw.text((765, 595), "LIVE DEMO: https://sasya-swasthya.pages.dev", fill=(110, 231, 183), font=font_url)

    # Save outputs
    out_public = os.path.join(public_dir, 'og-image.jpg')
    img.save(out_public, format='JPEG', quality=95)
    print(f"Generated: {out_public} ({W}x{H})")

    if os.path.exists(dist_dir):
        out_dist = os.path.join(dist_dir, 'og-image.jpg')
        img.save(out_dist, format='JPEG', quality=95)
        print(f"Generated: {out_dist} ({W}x{H})")

if __name__ == '__main__':
    generate_og_image()
