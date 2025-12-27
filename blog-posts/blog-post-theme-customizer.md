# I Love Terminal Aesthetics. Not Everyone Does. Here's How I Solved That.

I'm obsessed with terminal UI. Monospace fonts, sharp corners, amber-on-black color schemes, CRT scanlines - that's my jam. When I built [FABRK](https://fabrk.dev), I went all-in on the retro terminal aesthetic.

But here's the thing: not everyone shares my taste.

Some devs want rounded corners. Some want light mode. Some think CRT effects are cool for about 5 minutes before they get annoying. And you know what? They're not wrong.

So I had a choice: force my aesthetic on everyone, or build something flexible.

## The Problem With Opinionated Design

When you ship a boilerplate with a strong visual identity, you're essentially saying "this is how it should look." That works until someone wants to:

- Match their existing brand colors
- Use a softer, more modern look
- Not explain to their boss why the app looks like a 1980s computer

I didn't want FABRK users spending their first hour ripping out my design choices. That's a shit experience.

## My Solution: Make Everything Configurable

Instead of hardcoding the terminal look, I built a theme system with 18 presets and a live customizer panel.

### The Themes

I went a little crazy here. We've got:

**Dark themes (my favorites):**
- Amber, Green, Blue, Purple, Red - classic terminal colors
- Cyberpunk, Phosphor, Holographic - for the aesthetic crowd
- Blueprint, Navigator - more subdued options
- Atari, C64 - retro computer vibes

**Light themes (for the normies):**
- B&W - clean and professional
- Spectrum, Infrared - colorful but light
- Game Boy, GB Pocket - handheld nostalgia
- VIC-20 - because why not

Each theme has its own personality but uses the same underlying system.

### The Customizer Panel

Here's where it gets fun. I built a floating panel that lets you:

1. **Switch themes instantly** - Click a color swatch, see it change
2. **Adjust border radius** - From sharp corners to fully rounded
3. **Toggle display effects** - CRT scanlines, LCD pixels, VHS tracking
4. **Copy the exact config** - One click, paste into your project

The panel itself is draggable (grab the header, move it anywhere) and minimizable (collapse it to just the title bar). I didn't want it blocking content while you're trying to see your changes.

## The Technical Bits

### One CSS Variable Rules Them All

The border radius thing was tricky. I wanted users to go from sharp terminal corners to soft modern curves with one setting. The solution:

```css
:root {
  --radius: 0; /* Terminal mode */
  /* or */
  --radius: 0.5rem; /* Friendly mode */
}
```

Every component uses `rounded-dynamic` which maps to this variable. Change it once, everything updates.

### Theme Switching Without Page Reload

Themes are applied via a `data-theme` attribute on the HTML element:

```html
<html data-theme="amber" class="dark">
```

CSS custom properties handle the rest. No JavaScript theme object, no context re-renders, just CSS doing what CSS does best.

### The Copy Feature

When someone finds a combo they like, they hit "Copy Theme" and get this:

```
/* ═══════════════════════════════════════════════════════════════
   FABRK THEME: AMBER
   Mode: dark | Radius: none | Effect: crt
   ═══════════════════════════════════════════════════════════════ */

// 1. Set border radius in globals.css:
:root {
  --radius: 0;
}

// 2. Add to your root layout.tsx <html> tag:
<html data-theme="amber" className="dark">

// 3. Or set dynamically:
setColorTheme('amber');
```

Everything they need to recreate that exact look. No digging through docs.

## What I Learned

**Strong opinions, loosely held.** I still default to the terminal aesthetic because that's the product's identity. But making it easy to change means users adopt FABRK for the functionality and adapt the design to their needs.

**Let people play.** A live customizer is way more effective than documentation. People understand "click this, see that change" faster than reading about CSS variables.

**Don't hide the config.** The copy button was an afterthought but turned out to be clutch. Users customize, copy, paste, done. No hunting for settings files.

## Try It

Hit up [fabrk.dev](https://fabrk.dev) and click "Customize" in the nav. Drag the panel around, try some themes, crank the radius to full and watch everything go bubbly.

If terminal UI isn't your thing, that's cool. Pick something else. The boilerplate works either way.

---

*Got questions about the implementation? Drop a comment. Building something with FABRK? I want to see it.*

#webdev #nextjs #react #design #ux
