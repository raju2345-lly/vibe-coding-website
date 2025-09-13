# 🎭 ComedyAI Studio

> **Fresh AI Comedy Just Launched!** Experience the future of comedy with cutting-edge AI-generated content that understands your humor.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-comedy.skillcatcher.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Live Website

**🔗 [ai-comedy.skillcatcher.com](https://ai-comedy.skillcatcher.com)**

## 📖 About

ComedyAI Studio is a revolutionary comedy discovery platform that showcases the future of AI-generated entertainment. Built for working professionals aged 25-50, our platform serves as a gateway to fresh, personalized comedy content across multiple social media platforms.

### 🎯 Key Features

- **🤖 AI-Generated Comedy**: Cutting-edge artificial intelligence creates personalized humor
- **🚀 Fresh Launch**: Be among the first to discover next-generation comedy content
- **📱 Social Media Integration**: Seamless connections to TikTok, YouTube, and Instagram
- **💻 Responsive Design**: Perfect experience across all devices
- **⚡ Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **🎬 Video Gallery**: Interactive video player with embedded YouTube content
- **📄 Legal Pages**: Complete privacy policy and terms of service
- **📞 Contact System**: Secure contact form with email integration

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.5.0](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### UI Components
- **Custom Video Player** - YouTube integration with fallback support
- **Responsive Navigation** - Mobile-friendly hamburger menu
- **Interactive Buttons** - Social media CTAs with hover effects
- **Form Validation** - Client-side validation with error handling

### Deployment & Analytics
- **[Vercel](https://vercel.com/)** - Serverless deployment platform
- **[Google Analytics 4](https://analytics.google.com/)** - Advanced analytics tracking
- **Custom Domain** - Professional branding with SSL

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/halim-franky/vibe-coding-website.git
cd vibe-coding-website/output/website/comedyai-studio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Add your environment variables:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-google-analytics-id
NEXT_PUBLIC_SITE_URL=https://ai-comedy.skillcatcher.com
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
comedyai-studio/
├── app/                          # Next.js App Router
│   ├── about/                   # About page
│   ├── gallery/                 # Comedy gallery with video player
│   ├── contact/                 # Contact form
│   ├── privacy/                 # Privacy policy
│   ├── terms/                   # Terms of service
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── comedy/
│   │   └── VideoPlayer.tsx      # Custom video player
│   ├── layout/
│   │   ├── Navigation.tsx       # Header navigation
│   │   └── Footer.tsx           # Site footer
│   ├── analytics/
│   │   └── GoogleAnalytics.tsx  # GA4 integration
│   └── ui/                      # UI components
├── public/                       # Static assets
│   ├── favicon.ico
│   └── images/
└── lib/                         # Utilities
    └── utils.ts                 # Helper functions
```

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#f97316` - Call-to-action buttons, highlights
- **Secondary Yellow**: `#eab308` - Accents, gradients
- **Neutral Gray**: `#6b7280` - Text, subtle elements
- **Success Green**: `#10b981` - Success states, launch indicators

### Typography
- **Headings**: `font-bold` with responsive sizing
- **Body Text**: Clean, readable sans-serif
- **CTAs**: `font-semibold` for emphasis

### Components
- **Buttons**: Rounded corners, hover effects, consistent sizing
- **Cards**: Subtle shadows, rounded corners, hover states
- **Forms**: Validation states, error handling, accessibility

## 🌐 Social Media Integration

### Platforms
- **🎵 TikTok**: [@pureComedy.ai](https://www.tiktok.com/@pureComedy.ai)
- **📺 YouTube**: [@pureComedyAI](https://www.youtube.com/@pureComedyAI)
- **📸 Instagram**: [@purecomedy.ai](https://www.instagram.com/purecomedy.ai/)

### Features
- **Direct Links**: One-click access to social platforms
- **Call-to-Actions**: "Be First to Follow", "Subscribe Now", "Early Access"
- **Analytics Tracking**: Monitor click-through rates to social platforms

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Deployment
vercel --prod        # Deploy to Vercel
```

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)  
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Efficient caching strategies

## 🔒 Security & Privacy

### Data Protection
- **No Personal Data Collection**: Focus on analytics only
- **GDPR Compliant**: Privacy-first approach
- **Secure Contact Forms**: Email-based contact system
- **SSL Encryption**: Full HTTPS implementation

### Legal Compliance
- **Privacy Policy**: Comprehensive data handling explanation
- **Terms of Service**: Clear usage guidelines
- **Cookie Policy**: Transparent tracking disclosure

## 🚀 Deployment

### Vercel (Current Setup)
1. **Connected Repository**: GitHub repository linked to Vercel
2. **Automatic Builds**: Deploys on push to `dev/franky-comedy` branch
3. **Environment Variables**: GA tracking configured
4. **Custom Domain**: [ai-comedy.skillcatcher.com](https://ai-comedy.skillcatcher.com)
5. **SSL Certificate**: Automatic HTTPS

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

## 📈 Analytics & Monitoring

### Google Analytics 4
- **Page Views**: Track visitor engagement
- **Social Clicks**: Monitor platform conversion
- **User Flow**: Understand visitor journey
- **Performance**: Core Web Vitals monitoring

### Vercel Analytics
- **Build Times**: Monitor deployment performance
- **Error Tracking**: Catch and resolve issues quickly
- **Traffic Patterns**: Understand usage patterns

## 📱 Pages Overview

### Core Pages
- **`/`** - Homepage with fresh launch messaging and social CTAs
- **`/gallery`** - Interactive video gallery with debut AI comedy content
- **`/about`** - Information about ComedyAI Studio and mission
- **`/contact`** - Secure contact form with validation

### Legal Pages
- **`/privacy`** - GDPR-compliant privacy policy
- **`/terms`** - Comprehensive terms of service

### Features Per Page
- **Homepage**: Hero section, features, social platforms, testimonials
- **Gallery**: Video player, debut content info, platform integration
- **Contact**: Form validation, success states, security notices

## 🎯 Fresh Launch Strategy

### Messaging Framework
- **"Just Launched"** positioning instead of fake metrics
- **Early Adopter Benefits** - "Be First to Follow", "Founding Subscriber"
- **Innovation Focus** - Emphasizes cutting-edge AI technology
- **Quality over Quantity** - No pressure from low engagement numbers

### Content Approach
- **DEBUT | AI-GEN | FRESH** instead of view/like counts
- **Beta Tester Testimonials** instead of fake reviews
- **Ground Floor Opportunity** messaging
- **Authentic Growth Story** invitation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- **TypeScript**: Use strict typing
- **ESLint**: Follow linting rules
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimize for Core Web Vitals

## 🔄 Recent Updates

### Latest Changes (Current)
- ✅ Removed view counters from video players
- ✅ Fixed apostrophe display issues across site
- ✅ Replaced metrics with launch-appropriate content
- ✅ Updated all social media handles and links
- ✅ Implemented fresh launch messaging strategy
- ✅ Added comprehensive gallery with video integration

### Version History
- **v1.3** - Clean launch presentation without metrics
- **v1.2** - Social media integration and authentic messaging  
- **v1.1** - Video gallery and content management
- **v1.0** - Initial launch with core features

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Franky Halim**
- GitHub: [@halim-franky](https://github.com/halim-franky)
- Website: [ai-comedy.skillcatcher.com](https://ai-comedy.skillcatcher.com)
- Project: [vibe-coding-website](https://github.com/halim-franky/vibe-coding-website)

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Seamless deployment platform  
- **Tailwind CSS** - Beautiful utility-first CSS
- **Lucide** - Clean, consistent icons
- **Claude Code** - AI-powered development assistance

## 🎭 Project Philosophy

This project embodies the **vibe-coding** methodology - a collaborative approach between human creativity and AI assistance that produces authentic, high-quality web experiences. The result is a website that genuinely represents a fresh AI comedy launch without artificial inflation of metrics or engagement numbers.

---

<div align="center">

**🎭 Experience the Future of Comedy Today!**

[![Visit Website](https://img.shields.io/badge/Visit-ai--comedy.skillcatcher.com-orange?style=for-the-badge&logo=external-link)](https://ai-comedy.skillcatcher.com)

*Built with ❤️ using modern web technologies and vibe-coding methodology*

</div>