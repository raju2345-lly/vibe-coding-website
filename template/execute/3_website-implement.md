# AI Agent Script: Website Implementation

## 🎯 Purpose
Build the high-converting website based on approved strategy and technical plan.

## 📋 Prerequisites
- Approved strategy documents
- Development environment ready
- Access to required services (CMS, hosting, etc.)

## 🤖 AI Agent Instructions

### Step 1: Project Setup
Initialize the website project:

```bash
# Create project structure
mkdir -p output/website
cd output/website

# Initialize with chosen framework
npx create-next-app@latest . --typescript --tailwind --app --eslint
# OR for Astro:
# npm create astro@latest . -- --template minimal --typescript

# Install essential dependencies
npm install @vercel/analytics @vercel/speed-insights
npm install framer-motion react-hook-form zod
npm install @headlessui/react @heroicons/react
npm install next-seo next-sitemap
```

### Step 2: Configure Project
Create configuration files:

#### `next.config.js` / `astro.config.mjs`
```javascript
// For Next.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-cms-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
}
```

#### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* brand colors */ },
        secondary: { /* secondary colors */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Step 3: Create Core Components

#### Hero Component with Conversion Focus
`src/components/Hero.tsx`:
```typescript
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Hero({ 
  headline, 
  subheadline, 
  ctaText, 
  ctaAction,
  trustBadges 
}) {
  const [conversionOptimized, setConversionOptimized] = useState(false)
  
  useEffect(() => {
    // A/B test tracking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'hero_view',
        hero_variant: 'A'
      })
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            {headline}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {subheadline}
          </p>
          
          <div className="mt-8 flex gap-4">
            <button 
              onClick={ctaAction}
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              data-conversion="primary-cta"
            >
              {ctaText}
            </button>
          </div>
          
          <div className="mt-12 flex gap-8">
            {trustBadges?.map(badge => (
              <img key={badge.id} src={badge.src} alt={badge.alt} className="h-12" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

#### Conversion Form Component
`src/components/ConversionForm.tsx`:
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
})

export function ConversionForm({ formType, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data) => {
    // Track conversion
    window.dataLayer?.push({
      event: 'form_submit',
      form_type: formType,
      form_location: 'hero',
    })
    
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register('email')}
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-3 border rounded-lg"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <button 
        type="submit"
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg"
      >
        Get Started Free
      </button>
    </form>
  )
}
```

### Step 4: Implement SEO Foundation

#### SEO Configuration
`src/components/SEO.tsx`:
```typescript
import { NextSeo } from 'next-seo'

export function SEO({ 
  title, 
  description, 
  canonical, 
  openGraph,
  structuredData 
}) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonical,
          title,
          description,
          images: openGraph?.images || [],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  )
}
```

### Step 5: Create Page Templates

#### Landing Page Template
`src/templates/LandingPage.tsx`:
```typescript
export function LandingPageTemplate({ data }) {
  return (
    <>
      <SEO {...data.seo} />
      <Hero {...data.hero} />
      <Features {...data.features} />
      <SocialProof {...data.socialProof} />
      <FAQ {...data.faq} />
      <CTA {...data.cta} />
      <ExitIntentPopup {...data.exitIntent} />
    </>
  )
}
```

### Step 6: Implement Conversion Tracking

#### Analytics Setup
`src/lib/analytics.ts`:
```typescript
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: 'USD',
  })
}

export const initializeAnalytics = () => {
  // GA4 initialization
  window.dataLayer = window.dataLayer || []
  function gtag() { dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', process.env.NEXT_PUBLIC_GA_ID)
}
```

### Step 7: Performance Optimization

#### Image Optimization Component
`src/components/OptimizedImage.tsx`:
```typescript
import Image from 'next/image'

export function OptimizedImage({ src, alt, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### Step 8: Create Core Pages

#### Homepage
`src/app/page.tsx`:
```typescript
export default function HomePage() {
  return (
    <main>
      <Hero 
        headline="Convert More Visitors Into Customers"
        subheadline="Data-driven optimization for maximum conversions"
        ctaText="Start Free Trial"
      />
      <Features />
      <SocialProof />
      <ConversionSection />
    </main>
  )
}
```

### Step 9: Setup CMS Integration
```typescript
// src/lib/cms.ts
export async function getPageData(slug: string) {
  // Integrate with chosen headless CMS
  const response = await fetch(`${CMS_API_URL}/pages/${slug}`)
  return response.json()
}

export async function getBlogPosts() {
  const response = await fetch(`${CMS_API_URL}/posts`)
  return response.json()
}
```

### Step 10: Implement Testing Structure
```typescript
// src/tests/conversion.test.ts
describe('Conversion Elements', () => {
  test('CTA buttons have tracking attributes', () => {
    // Test implementation
  })
  
  test('Forms validate correctly', () => {
    // Test implementation
  })
  
  test('Analytics events fire on interactions', () => {
    // Test implementation
  })
})
```

## 🔄 Human Checkpoint
- "Core website structure implemented"
- "Ready for review and testing"
- "Please test locally and respond with: APPROVED, NEEDS FIXES, or RESTART"

## ✅ Success Criteria
- All core pages created and functional
- Conversion tracking implemented
- Performance optimized (Core Web Vitals passing)
- Mobile responsive design working
- Forms and CTAs functional

## 📝 Output Structure
```
output/website/
├── src/
│   ├── app/          # Pages
│   ├── components/   # Reusable components
│   ├── lib/         # Utilities
│   └── styles/      # Global styles
├── public/          # Static assets
├── package.json     # Dependencies
└── README.md        # Documentation
```

## 🚨 Important Notes
- Test on multiple devices during development
- Ensure all tracking is privacy-compliant
- Optimize images before deployment
- Validate HTML for SEO compliance
- Check accessibility with screen readers