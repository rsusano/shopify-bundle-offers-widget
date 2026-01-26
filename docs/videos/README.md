# 🎥 Video Demo Guide

Create a short demo video showing the complete user flow.

---

## Required Video

### `demo.gif` or `demo.mp4`

**What to record:**
A complete user journey from viewing product to adding bundle to cart.

**Script (15-20 seconds):**

1. **[0-2s]** Product page loads, show bundles
2. **[2-4s]** Hover over Bundle 2 (Most Popular)
3. **[4-6s]** Click Bundle 2, watch price update in button
4. **[6-8s]** Show compare-at price changing
5. **[8-10s]** Click "Add to Cart" button
6. **[10-12s]** Button animation (loading → success)
7. **[12-16s]** Cart drawer opens, show items
8. **[16-18s]** Highlight free gift in cart
9. **[18-20s]** Show final cart total

**Recommended specs:**
- Resolution: 1920×1080 or 1280×720
- Frame rate: 30 FPS
- Format: MP4 (for video) or GIF (for animation)
- Duration: 15-20 seconds
- Size: Under 10MB (GIF) or 20MB (MP4)

---

## Recording Options

### Option 1: Record as GIF (Recommended for README)

**Pros:**
- Plays automatically in GitHub README
- No player controls needed
- Loops continuously

**Tools:**
- **ScreenToGif** (Windows, Free) - https://www.screentogif.com/
- **Kap** (Mac, Free) - https://getkap.co/
- **LICEcap** (Cross-platform, Free)
- **Peek** (Linux, Free)

**Steps:**
1. Download and install ScreenToGif (or alternative)
2. Open the app
3. Click "Recorder"
4. Position the recording frame over your browser
5. Click "Record"
6. Perform the demo (follow script above)
7. Click "Stop"
8. Click "Save As" > Choose GIF format
9. Adjust quality settings (aim for <10MB)
10. Save as `demo.gif`

---

### Option 2: Record as MP4 (Better Quality)

**Pros:**
- Higher quality
- Smoother playback
- Smaller file size for same quality

**Tools:**
- **OBS Studio** (Cross-platform, Free) - https://obsproject.com/
- **ShareX** (Windows, Free)
- **QuickTime Player** (Mac, built-in)
- **Chrome DevTools** (for in-browser recording)

**Steps (OBS Studio):**
1. Download and install OBS Studio
2. Open OBS
3. Add source: "Display Capture" or "Window Capture"
4. Select your browser window
5. Click "Start Recording"
6. Perform demo
7. Click "Stop Recording"
8. File saves to Videos folder
9. (Optional) Convert to GIF using EZGIF.com

---

## Recording Tips

### Preparation
- **Close unnecessary tabs**: Reduce distractions
- **Clear browser cache**: Ensure fresh page load
- **Use incognito mode**: Avoid extensions interfering
- **Practice run**: Do demo 2-3 times before recording
- **Disable notifications**: Turn off Windows/Mac notifications

### During Recording
- **Smooth mouse movements**: Don't rush
- **Pause briefly**: Between actions (1-2 seconds)
- **Center elements**: Keep important parts in frame
- **Avoid scrolling**: Unless necessary
- **No typos**: If typing, go slow

### After Recording
- **Trim edges**: Cut empty frames at start/end
- **Add captions** (optional): Text overlays for key steps
- **Compress**: Use HandBrake or online tools
- **Preview**: Watch full recording before finalizing

---

## Advanced: Adding Annotations

### Tools for Annotation
- **Camtasia** (Paid, but free trial)
- **DaVinci Resolve** (Free)
- **Kapwing** (Online, Free tier)
- **VEED.io** (Online)

### What to Annotate
- **Arrows**: Point to bundle selection
- **Highlights**: Circle the price update
- **Text boxes**: "Free Gift Included!"
- **Zoom effects**: Emphasize button click

---

## Publishing to README

### For GIF:
```markdown
![Demo Video](./docs/videos/demo.gif)
```

### For MP4:
```markdown
https://github.com/user-attachments/assets/demo.mp4
```

Or upload to:
- **YouTube** (unlisted) - Best for detailed tutorials
- **Vimeo** - Professional presentation
- **Loom** - Quick screen recording with narration

---

## Alternative: Multiple Short GIFs

Instead of one long video, create focused micro-demos:

### `bundle-selection.gif` (5s)
- Just selecting different bundles
- Show price updates

### `add-to-cart.gif` (5s)
- Click add to cart
- Show button animation

### `cart-open.gif` (5s)
- Cart drawer opens
- Items appear

**Benefits:**
- Smaller file sizes
- Easier to create
- Show specific features

---

## Optimization

### Reduce GIF Size
1. **Lower frame rate**: 20 FPS instead of 30
2. **Reduce colors**: 128 colors instead of 256
3. **Crop tightly**: Remove unnecessary borders
4. **Trim duration**: Every second counts
5. **Use lossy compression**: 10-20% loss acceptable

### Tools:
- **EZGIF.com** - Optimize online
- **gifsicle** - Command line optimization
- **ImageMagick** - Batch processing

---

## Quality Checklist

Before publishing, verify:

- [ ] All key steps are visible
- [ ] Text is readable (if any)
- [ ] File size < 10MB (GIF) or < 20MB (MP4)
- [ ] Plays smoothly without stuttering
- [ ] No sensitive information visible (email, phone, etc.)
- [ ] Demonstrates value clearly
- [ ] Professional appearance

---

## Example Command (FFmpeg)

Convert video to GIF:
```bash
ffmpeg -i demo.mp4 -vf "fps=20,scale=800:-1:flags=lanczos" -c:v gif demo.gif
```

---

**Once complete, your demo will bring the README to life!**

Good luck with the recording! 🎬
