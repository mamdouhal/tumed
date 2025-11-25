# TUMED - Türkiye Mezunları Derneği

A modern, fully responsive website for TUMED (Türkiye Mezunları Derneği) built with Next.js 14, TypeScript, and Tailwind CSS.

![TUMED Website](https://picsum.photos/1200/600?random=1)

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Montserrat, Work Sans, Poppins (via Google Fonts)
- **Icons**: Custom SVG icons

## 🎨 Design System

### Color Palette

| Color | RGB Value | Usage |
|-------|-----------|-------|
| Primary Red | `rgb(184, 10, 52)` | Buttons, accents, highlights |
| Accent Coral | `rgb(239, 105, 104)` | Hover states, secondary accents |
| Blue | `rgb(13, 79, 140)` | Category badges, links |
| Dark Text | `rgb(35, 30, 30)` | Body text, headings |
| Light Gray | `rgb(243, 243, 243)` | Backgrounds, borders |
| Yellow CTA | `#ffd800` | Call-to-action sections |

### Typography

- **Headings**: Montserrat Alternates, Poppins (font-weight: 700-800)
- **Body**: Work Sans, Open Sans (font-weight: 400)

## 📁 Project Structure

```
tumed/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Header.tsx          # Sticky header with navigation
│   │   ├── MobileMenu.tsx      # Mobile navigation drawer
│   │   ├── Hero.tsx            # Hero section with CTA
│   │   ├── Activities.tsx      # Activities grid section
│   │   ├── News.tsx            # News/announcements section
│   │   ├── Testimonials.tsx    # Alumni testimonials
│   │   ├── Stats.tsx           # Statistics & partners
│   │   ├── CTA.tsx             # Call-to-action banner
│   │   ├── Footer.tsx          # Footer with links
│   │   └── BackToTop.tsx       # Scroll to top button
├── public/
│   └── images/                 # Static images
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mamdouhal/tumed.git
cd tumed
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 🧩 Components

### Header
- Sticky navigation with shrink effect on scroll
- Desktop dropdown menus for "Hakkımızda" and "Faaliyetler"
- Mobile hamburger menu
- Login and Donate buttons

### Hero Section
- Full-width background with dark overlay
- Rounded corners (25px border radius)
- Animated scroll indicator
- CTA button "Bende Varım"

### Activities/Faaliyetler
- Masonry-style grid layout
- Image hover effects with zoom and gradient overlay
- Responsive grid for all screen sizes

### News/Haberler
- 3-column card layout
- Category badges with color coding
- Hover effects and transitions

### Testimonials
- 2-column layout with avatar cards
- Quote styling with decorative elements
- Light gray background

### Stats & Partners
- Animated counter (200+)
- Partner logos with grayscale to color hover effect
- Decorative divider lines

### CTA Section
- Yellow background (#ffd800)
- Call-to-action button

### Footer
- Multi-column layout
- Social media links
- Contact information
- Copyright notice

### BackToTop
- Floating button that appears on scroll
- Smooth scroll to top animation

## 📱 Responsive Design

The website is fully responsive across all device sizes:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔗 Links

- **Live Demo**: Coming soon
- **Original Website**: [tumed.org.tr](http://tumed.org.tr)

## 📄 License

This project is for educational and demonstration purposes only.

## 👥 Contributors

- TUMED Development Team

---

Built with ❤️ for TUMED - Türkiye Mezunları Derneği
