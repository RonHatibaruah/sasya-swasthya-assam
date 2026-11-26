#!/usr/bin/env python3
"""
Generate ultra-high-definition, multi-resolution modern favicons for SasyaSwasthya.
Outputs:
- public/favicon-16x16.png
- public/favicon-32x32.png
- public/favicon-48x48.png
- public/apple-touch-icon.png (180x180)
- public/favicon.ico (multi-res 16, 32, 48)
"""

import math
from PIL import Image, ImageDraw, ImageFilter
import os

def create_super_resolution_favicon(size=1024):
    """Draws a master 1024x1024 canvas with supersampling for pristine antialiasing."""
    # RGBA transparent canvas
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Background Badge: Deep Forest Green to Radiant Emerald Gradient
    # Create gradient tile
    base_badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    badge_draw = ImageDraw.Draw(base_badge)
    
    pad = int(size * 0.04) # 4% margin
    rx = int(size * 0.26)   # Modern squircle radius
    
    # Draw rounded mask
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=rx, fill=255)
    
    # Create smooth linear gradient for badge
    grad = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    for y in range(size):
        ratio = y / float(size)
        # Gradient from #022c22 (2, 44, 34) to #047857 (4, 120, 87)
        r = int(2 * (1 - ratio) + 4 * ratio)
        g = int(44 * (1 - ratio) + 120 * ratio)
        b = int(34 * (1 - ratio) + 87 * ratio)
        for x in range(size):
            # diagonal tweak
            diag = (x + y) / float(2 * size)
            r_d = int(r * (1 - diag * 0.2) + 6 * diag)
            g_d = int(g * (1 - diag * 0.2) + 140 * diag)
            b_d = int(b * (1 - diag * 0.2) + 90 * diag)
            grad.putpixel((x, y), (r_d, g_d, b_d, 255))
            
    # Composite badge through mask
    img.paste(grad, (0, 0), mask)
    draw = ImageDraw.Draw(img)

    # Subtle inner border stroke
    stroke_w = int(size * 0.02)
    draw.rounded_rectangle([pad + stroke_w//2, pad + stroke_w//2, size - pad - stroke_w//2, size - pad - stroke_w//2], 
                           radius=rx - stroke_w//2, outline=(52, 211, 153, 90), width=stroke_w)

    # 2. Satellite / Radar Telemetry Wave (Top Right)
    center_sat = (int(size * 0.80), int(size * 0.22))
    
    # Arc 1
    arc_box1 = [center_sat[0] - int(size * 0.28), center_sat[1] - int(size * 0.12), 
                center_sat[0] + int(size * 0.12), center_sat[1] + int(size * 0.28)]
    draw.arc(arc_box1, start=140, end=240, fill=(56, 189, 248, 160), width=int(size * 0.035))
    
    # Arc 2
    arc_box2 = [center_sat[0] - int(size * 0.18), center_sat[1] - int(size * 0.05), 
                center_sat[0] + int(size * 0.08), center_sat[1] + int(size * 0.18)]
    draw.arc(arc_box2, start=140, end=240, fill=(125, 211, 252, 220), width=int(size * 0.028))

    # Satellite Glowing Pulse Node
    sat_r = int(size * 0.055)
    draw.ellipse([center_sat[0] - sat_r, center_sat[1] - sat_r, center_sat[0] + sat_r, center_sat[1] + sat_r], 
                 fill=(2, 132, 199, 255), outline=(125, 211, 252, 255), width=int(size * 0.012))
    sat_inner = int(sat_r * 0.45)
    draw.ellipse([center_sat[0] - sat_inner, center_sat[1] - sat_inner, center_sat[0] + sat_inner, center_sat[1] + sat_inner], 
                 fill=(255, 255, 255, 255))

    # 3. Golden Sali Paddy Grains (Left Flank)
    # Grain curve
    grain_coords = [
        # (center_x, center_y, radius_x, radius_y, angle_deg)
        (int(size * 0.36), int(size * 0.42), int(size * 0.07), int(size * 0.13), -30),
        (int(size * 0.31), int(size * 0.55), int(size * 0.065), int(size * 0.12), -20),
        (int(size * 0.34), int(size * 0.69), int(size * 0.06), int(size * 0.11), -10),
    ]

    for gx, gy, rx_g, ry_g, ang in grain_coords:
        # Create rotated oval
        grain_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        g_draw = ImageDraw.Draw(grain_img)
        # Golden gradient color
        g_draw.ellipse([gx - rx_g, gy - ry_g, gx + rx_g, gy + ry_g], fill=(250, 204, 21, 255), outline=(217, 119, 6, 255), width=int(size * 0.012))
        # Inner highlight
        hi_rx, hi_ry = int(rx_g * 0.5), int(ry_g * 0.6)
        g_draw.ellipse([gx - hi_rx - int(size*0.01), gy - hi_ry, gx + hi_rx - int(size*0.01), gy + hi_ry], fill=(254, 240, 138, 200))
        
        # Rotate around grain center
        grain_rot = grain_img.rotate(ang, center=(gx, gy), resample=Image.Resampling.BICUBIC)
        img.paste(grain_rot, (0, 0), grain_rot)

    draw = ImageDraw.Draw(img)

    # 4. Central Flourishing Crop Leaf
    # Main leaf polygon & curves
    # We will draw a smooth leaf path using polygon with smooth bezier points
    leaf_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    leaf_draw = ImageDraw.Draw(leaf_layer)

    # Vibrant emerald leaf path
    leaf_points = []
    # Base at (0.46, 0.84), Tip at (0.72, 0.38), Arch right (0.78, 0.60), Arch left (0.36, 0.60)
    cx_base, cy_base = int(size * 0.45), int(size * 0.83)
    cx_tip, cy_tip = int(size * 0.72), int(size * 0.38)
    
    # Generate parametric perimeter points
    # Right curve
    for t in range(0, 101):
        s = t / 100.0
        # Quadratic bezier from base to tip curving right through (0.78, 0.65)
        bx = (1-s)**2 * cx_base + 2*(1-s)*s * int(size * 0.80) + s**2 * cx_tip
        by = (1-s)**2 * cy_base + 2*(1-s)*s * int(size * 0.64) + s**2 * cy_tip
        leaf_points.append((int(bx), int(by)))
    # Left curve from tip back to base curving through (0.35, 0.52)
    for t in range(0, 101):
        s = t / 100.0
        bx = (1-s)**2 * cx_tip + 2*(1-s)*s * int(size * 0.36) + s**2 * cx_base
        by = (1-s)**2 * cy_tip + 2*(1-s)*s * int(size * 0.56) + s**2 * cy_base
        leaf_points.append((int(bx), int(by)))

    leaf_draw.polygon(leaf_points, fill=(34, 197, 94, 255), outline=(21, 128, 61, 255))
    
    # Secondary inner highlight leaf (left side)
    inner_leaf = []
    for t in range(0, 101):
        s = t / 100.0
        bx = (1-s)**2 * cx_base + 2*(1-s)*s * int(size * 0.62) + s**2 * cx_tip
        by = (1-s)**2 * cy_base + 2*(1-s)*s * int(size * 0.58) + s**2 * cy_tip
        inner_leaf.append((int(bx), int(by)))
    for t in range(0, 101):
        s = t / 100.0
        bx = (1-s)**2 * cx_tip + 2*(1-s)*s * int(size * 0.44) + s**2 * cx_base
        by = (1-s)**2 * cy_tip + 2*(1-s)*s * int(size * 0.60) + s**2 * cy_base
        inner_leaf.append((int(bx), int(by)))
    leaf_draw.polygon(inner_leaf, fill=(74, 222, 128, 200))

    # Central Leaf Energy Spine (Crisp White/Mint Line)
    spine_points = []
    for t in range(0, 101):
        s = t / 100.0
        bx = (1-s)**2 * cx_base + 2*(1-s)*s * int(size * 0.56) + s**2 * cx_tip
        by = (1-s)**2 * cy_base + 2*(1-s)*s * int(size * 0.60) + s**2 * cy_tip
        spine_points.append((int(bx), int(by)))
    
    for i in range(len(spine_points) - 1):
        leaf_draw.line([spine_points[i], spine_points[i+1]], fill=(240, 253, 244, 255), width=int(size * 0.024))

    # Leaf stem
    leaf_draw.line([(cx_base, cy_base), (int(size * 0.47), int(size * 0.90))], fill=(22, 101, 52, 255), width=int(size * 0.04))

    # Paste leaf
    img.paste(leaf_layer, (0, 0), leaf_layer)
    draw = ImageDraw.Draw(img)

    # 5. Diagnostic Health Pulse Indicator (Near Tip)
    diag_center = (cx_tip, cy_tip)
    diag_r = int(size * 0.04)
    draw.ellipse([diag_center[0] - diag_r, diag_center[1] - diag_r, diag_center[0] + diag_r, diag_center[1] + diag_r], 
                 fill=(56, 189, 248, 255), outline=(255, 255, 255, 255), width=int(size * 0.012))
    
    return img

def generate_all_icons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(base_dir, 'public')
    dist_dir = os.path.join(base_dir, 'dist')
    os.makedirs(public_dir, exist_ok=True)
    
    print("Generating Master 1024x1024 Favicon Image...")
    master = create_super_resolution_favicon(1024)

    # Output sizes
    sizes = {
        'favicon-16x16.png': (16, 16),
        'favicon-32x32.png': (32, 32),
        'favicon-48x48.png': (48, 48),
        'apple-touch-icon.png': (180, 180),
        'android-chrome-192x192.png': (192, 192),
        'android-chrome-512x512.png': (512, 512),
    }

    images_for_ico = []

    for filename, (w, h) in sizes.items():
        resampled = master.resize((w, h), Image.Resampling.LANCZOS)
        out_path = os.path.join(public_dir, filename)
        resampled.save(out_path, format="PNG", optimize=True)
        print(f"Saved: {out_path} ({w}x{h})")
        
        # If dist/ exists, also save to dist/
        if os.path.exists(dist_dir):
            dist_path = os.path.join(dist_dir, filename)
            resampled.save(dist_path, format="PNG", optimize=True)

        if (w, h) in [(16, 16), (32, 32), (48, 48)]:
            images_for_ico.append(resampled)

    # Save multi-resolution favicon.ico
    ico_path = os.path.join(public_dir, 'favicon.ico')
    images_for_ico[0].save(
        ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=images_for_ico[1:]
    )
    print(f"Saved Multi-Resolution ICO: {ico_path} (16, 32, 48)")
    
    if os.path.exists(dist_dir):
        dist_ico = os.path.join(dist_dir, 'favicon.ico')
        images_for_ico[0].save(
            dist_ico,
            format="ICO",
            sizes=[(16, 16), (32, 32), (48, 48)],
            append_images=images_for_ico[1:]
        )
        print(f"Saved Multi-Resolution ICO to dist: {dist_ico}")

if __name__ == '__main__':
    generate_all_icons()
