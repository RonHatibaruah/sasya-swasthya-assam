#!/usr/bin/env node

/**
 * Autonomous Gemini Pro Image Generation Bot for Sasya Drishti Assam (NESFIC-D-11)
 * Using Chrome DevTools Protocol & Puppeteer to automate Google Gemini Pro (kalyanjit@gmail.com)
 *
 * Requirements:
 *   Start Google Chrome with remote debugging:
 *   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir="$HOME/Library/Application Support/Google/Chrome-Gemini-Pro" --remote-debugging-port=9222 &
 *
 * Usage:
 *   node scripts/chrome_gemini_bot.js
 *   node scripts/chrome_gemini_bot.js --force
 *   node scripts/chrome_gemini_bot.js --port=9222
 *   node scripts/chrome_gemini_bot.js --id=diagram_1_paradigm_shift
 */

const fs = require('fs');
const path = require('path');

// Auto-resolve puppeteer-core from local or sibling Data Centers node_modules
let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch (e) {
  const fallbackPath = '/Users/kalyan/Downloads/2026/Sep2026/Data Centers and Way Head/node_modules/puppeteer-core';
  if (fs.existsSync(fallbackPath)) {
    puppeteer = require(fallbackPath);
  } else {
    console.error('❌ Error: puppeteer-core not found. Run npm install puppeteer-core');
    process.exit(1);
  }
}

const BASE_DIR = path.resolve(__dirname, '..');
const PROMPTS_FILE = path.join(BASE_DIR, 'scripts', 'image_prompts.json');
const ASSETS_DIR = path.join(BASE_DIR, 'assets', 'proposal_images');
const PUBLIC_ASSETS_DIR = path.join(BASE_DIR, 'public', 'assets', 'proposal_images');

// Ensure output directories exist
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_ASSETS_DIR)) fs.mkdirSync(PUBLIC_ASSETS_DIR, { recursive: true });

// Parse CLI Arguments
const args = process.argv.slice(2);
let port = 9222;
let filterId = null;
let forceOverwrite = false;

args.forEach(arg => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.replace('--port=', '').trim(), 10);
  } else if (arg.startsWith('--id=')) {
    filterId = arg.replace('--id=', '').trim();
  } else if (arg === '--force') {
    forceOverwrite = true;
  }
});

if (!fs.existsSync(PROMPTS_FILE)) {
  console.error(`❌ Error: Prompts file not found at ${PROMPTS_FILE}`);
  process.exit(1);
}

const allPrompts = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
const queue = allPrompts.filter(item => {
  if (filterId && item.id !== filterId) return false;
  const targetPath = path.join(ASSETS_DIR, item.filename);
  if (fs.existsSync(targetPath) && !forceOverwrite) {
    return false;
  }
  return true;
});

console.log('\n=============================================================');
console.log('🌾 SASYA DRISHTI ASSAM - GEMINI PRO AUTOMATION BOT (CDP)');
console.log('=============================================================');
console.log(`🔌 Target Chrome Port      : ${port}`);
console.log(`📁 Target Assets Directory : ${ASSETS_DIR}`);
console.log(`📋 Total Prompts in Queue  : ${queue.length} of ${allPrompts.length}`);
if (filterId) console.log(`🔍 Filter Prompt ID        : ${filterId}`);
console.log('=============================================================\n');

if (queue.length === 0) {
  console.log('✨ All images in queue already exist in assets/proposal_images/! Use --force to regenerate.\n');
  process.exit(0);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  let browser;
  try {
    console.log(`⏳ Connecting to Chrome on http://127.0.0.1:${port}...`);
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${port}`,
      defaultViewport: null
    });
    console.log(`✅ Connected successfully to Google Chrome!`);
  } catch (err) {
    console.error(`\n❌ Could not connect to Google Chrome on port ${port}.`);
    console.error(`\n👉 Make sure Chrome is running in debugging mode:`);
    console.log(`   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --user-data-dir="$HOME/Library/Application Support/Google/Chrome-Gemini-Pro" --remote-debugging-port=${port} &\n`);
    process.exit(1);
  }

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));

  if (!geminiPage) {
    console.log(`🌐 Opening a new tab navigating to https://gemini.google.com/app...`);
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    console.log(`🌐 Found active Gemini tab: ${geminiPage.url()}`);
    await geminiPage.bringToFront();
  }

  await geminiPage.waitForSelector('rich-textarea, div[contenteditable="true"], textarea', { timeout: 30000 })
    .catch(() => console.log('⚠️ Notice: Make sure you are logged into your Gemini Pro account on the opened browser window.'));

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const targetFile = path.join(ASSETS_DIR, item.filename);
    const publicTargetFile = path.join(PUBLIC_ASSETS_DIR, item.filename);

    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${queue.length}] 🎨 Generating: ${item.title}`);
    console.log(`   📄 Output File : ${item.filename}`);
    console.log(`   🎯 Section     : ${item.section}`);
    console.log(`-------------------------------------------------------------`);

    let promptSent = false;
    let attempts = 0;

    while (attempts < 2 && !promptSent) {
      attempts++;
      try {
        await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
        await sleep(2500);
        await geminiPage.waitForSelector('rich-textarea, div[contenteditable="true"], textarea', { timeout: 20000 }).catch(() => {});

        const existingImageUrls = await geminiPage.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
        });

        const promptFull = `Generate a high-quality 16:9 widescreen infographic image: ${item.prompt}`;
        
        await geminiPage.evaluate((text) => {
          const input = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
          if (input) {
            input.focus();
            input.innerText = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, promptFull);

        await sleep(1000);

        const clicked = await geminiPage.evaluate(() => {
          const sendBtn = document.querySelector('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
          if (sendBtn && !sendBtn.disabled) {
            sendBtn.click();
            return true;
          }
          return false;
        });

        if (!clicked) {
          await geminiPage.keyboard.press('Enter');
        }

        console.log(`   📤 Prompt submitted. Waiting for Imagen 3 generation...`);
        promptSent = true;

        let imageBuffer = null;
        let waitAttempts = 0;

        while (!imageBuffer && waitAttempts < 35) {
          await sleep(3000);
          waitAttempts++;

          const newImageData = await geminiPage.evaluate((existingUrls) => {
            const allImages = Array.from(document.querySelectorAll('img'));
            const candidates = allImages.filter(img => 
              img.src && 
              !existingUrls.includes(img.src) &&
              (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
              img.naturalWidth > 350
            );

            if (candidates.length > 0) {
              const latest = candidates[candidates.length - 1];
              return { src: latest.src, width: latest.naturalWidth, height: latest.naturalHeight };
            }
            return null;
          }, existingImageUrls);

          if (newImageData) {
            console.log(`   🖼️ Image detected in chat (${newImageData.width}x${newImageData.height})! Fetching raw bytes...`);
            
            const base64Data = await geminiPage.evaluate((imgSrc) => {
              const img = Array.from(document.querySelectorAll('img')).find(i => i.src === imgSrc);
              if (!img || !img.complete || img.naturalWidth === 0) return null;
              try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
                return dataUrl.split(',')[1];
              } catch (e) {
                return null;
              }
            }, newImageData.src);

            if (base64Data) {
              imageBuffer = Buffer.from(base64Data, 'base64');
            }
          }
        }

        if (imageBuffer) {
          fs.writeFileSync(targetFile, imageBuffer);
          fs.writeFileSync(publicTargetFile, imageBuffer);
          const stats = fs.statSync(targetFile);
          console.log(`   ✅ Successfully saved: assets/proposal_images/${item.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
          successCount++;
        } else {
          console.error(`   ⚠️ Timed out waiting for ${item.filename} (75s). Skipping to next...`);
          failureCount++;
        }

      } catch (err) {
        console.error(`   ⚠️ Error during processing: ${err.message}`);
        if (attempts >= 2) failureCount++;
      }
    }

    if (i < queue.length - 1) {
      console.log(`   ⏳ Cooling down for 6 seconds before next prompt...`);
      await sleep(6000);
    }
  }

  console.log('\n=============================================================');
  console.log(`🎉 RUN COMPLETE: ${successCount} Saved, ${failureCount} Failed`);
  console.log('=============================================================\n');

  browser.disconnect();
}

main().catch(err => {
  console.error(`\n❌ Fatal Error: ${err.message}\n`);
  process.exit(1);
});
