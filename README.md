# DJ Looktop - Official Website

🎵 **Moroccan Beats & Global Sounds**

A creative, visually stunning website for DJ Looktop, featuring a unique blend of modern web design with traditional Moroccan aesthetic elements.

## 🌟 Features

- **Moroccan-Inspired Design**: Geometric patterns, gold accents, and traditional color palette
- **Responsive Layout**: Mobile-first design that looks great on all devices
- **Interactive Music Player**: Simulated audio player with progress tracking
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Gallery Lightbox**: Click-to-expand image gallery
- **Booking Form**: Contact form for event inquiries
- **Event Calendar**: Upcoming shows and performances

## 📁 File Structure

```
/
├── index.html          # Main HTML structure
├── style.css           # Complete styling with CSS custom properties
├── app.js              # JavaScript functionality
├── README.md           # Project documentation
└── .agent-meta.json    # Project metadata
```

## 🎨 Design System

### Colors (Moroccan Palette)
- **Gold**: `#d4af37` - Primary accent color
- **Teal**: `#1abc9c` - Secondary accent
- **Deep Red**: `#c0392b` - Tertiary accent
- **Dark Background**: `#0a0a0f` - Primary background

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Montserrat (text)

### Spacing Scale
Base-8 system: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px

## 🚀 Sections

1. **Hero**: Full-screen intro with animated elements
2. **About**: DJ biography with stats and image
3. **Music**: Latest releases and tracks
4. **Events**: Upcoming shows calendar
5. **Gallery**: Photo grid with lightbox
6. **Contact**: Booking form and contact info
7. **Footer**: Links and social media

## 🔧 Customization

### Changing Colors
Edit the CSS custom properties in `:root` at the top of `style.css`:

```css
:root {
    --color-gold: #d4af37;
    --color-teal: #1abc9c;
    --color-red: #c0392b;
}
```

### Adding Tracks
Add new tracks to the `tracks` object in `app.js`:

```javascript
const tracks = {
    'new-track': { name: 'Track Name', duration: '5:30' }
};
```

### Adding Events
Add new event cards in the events section of `index.html`.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

## 🇲🇦 Moroccan Design Elements

- Zellige-inspired geometric patterns
- Traditional color palette (gold, teal, red)
- Ornate border decorations
- Cultural references in content

## 📄 License

© 2025 DJ Looktop. All rights reserved.

---

Made with ♥ from Morocco 🇲🇦
