# AI Agent Script: Testing & Deployment

## 🎯 Purpose
Comprehensive testing of all website features, performance optimization, and deployment to production with monitoring.

## 📋 Prerequisites
- All development phases complete
- Testing environment ready
- Production hosting configured
- Domain and SSL certificates ready

## 🤖 AI Agent Instructions

### Step 1: Automated Testing Suite

#### Unit Tests for Conversion Components
Create `src/tests/conversion.test.ts`:
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ConversionForm } from '@/components/ConversionForm'
import { trackEvent } from '@/lib/analytics'

jest.mock('@/lib/analytics')

describe('Conversion Components', () => {
  describe('ConversionForm', () => {
    test('tracks form view on mount', () => {
      render(<ConversionForm />)
      expect(trackEvent).toHaveBeenCalledWith('form_view', {
        form_type: 'conversion',
        location: expect.any(String),
      })
    })
    
    test('validates email before submission', async () => {
      const { getByPlaceholderText, getByText } = render(<ConversionForm />)
      const emailInput = getByPlaceholderText('Enter your email')
      const submitButton = getByText('Get Started')
      
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.click(submitButton)
      
      await waitFor(() => {
        expect(getByText('Please enter a valid email')).toBeInTheDocument()
      })
    })
    
    test('tracks successful conversion', async () => {
      const onSubmit = jest.fn()
      const { getByPlaceholderText, getByText } = render(
        <ConversionForm onSubmit={onSubmit} />
      )
      
      fireEvent.change(getByPlaceholderText('Enter your email'), {
        target: { value: 'test@example.com' },
      })
      fireEvent.click(getByText('Get Started'))
      
      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith('conversion', {
          form_type: 'conversion',
          email: 'test@example.com',
        })
      })
    })
  })
  
  describe('Exit Intent', () => {
    test('triggers on mouse leave', () => {
      const { container } = render(<ExitIntentPopup />)
      
      fireEvent.mouseLeave(document)
      
      expect(container.querySelector('.exit-intent-popup')).toBeInTheDocument()
    })
    
    test('shows only once per session', () => {
      const { container, rerender } = render(<ExitIntentPopup />)
      
      fireEvent.mouseLeave(document)
      const firstPopup = container.querySelector('.exit-intent-popup')
      fireEvent.click(container.querySelector('.close-btn'))
      
      rerender(<ExitIntentPopup />)
      fireEvent.mouseLeave(document)
      
      expect(container.querySelector('.exit-intent-popup')).not.toBeInTheDocument()
    })
  })
})
```

#### Integration Tests
Create `src/tests/integration/funnel.test.ts`:
```typescript
describe('Conversion Funnel Integration', () => {
  test('complete user journey from landing to conversion', async () => {
    // 1. User lands on homepage
    const { page } = await visit('/')
    expect(await page.title()).toContain('Your Product')
    
    // 2. User interacts with hero CTA
    await page.click('[data-testid="hero-cta"]')
    expect(page.url()).toContain('/signup')
    
    // 3. User fills progressive form
    await page.fill('[name="email"]', 'test@example.com')
    await page.click('[data-testid="continue-btn"]')
    
    await page.fill('[name="company"]', 'Test Company')
    await page.click('[data-testid="continue-btn"]')
    
    // 4. Verify conversion tracking
    const dataLayer = await page.evaluate(() => window.dataLayer)
    expect(dataLayer).toContainEqual(
      expect.objectContaining({
        event: 'conversion',
        conversion_type: 'lead',
      })
    )
    
    // 5. Check thank you page
    expect(page.url()).toContain('/thank-you')
    expect(await page.textContent('h1')).toContain('Thank You')
  })
  
  test('abandoned cart recovery flow', async () => {
    // Add item to cart
    const { page } = await visit('/product/example')
    await page.click('[data-testid="add-to-cart"]')
    
    // Navigate away
    await page.goto('/blog')
    
    // Trigger exit intent
    await page.mouse.move(0, 0)
    
    // Verify popup appears with cart recovery offer
    const popup = await page.waitForSelector('.exit-intent-popup')
    expect(await popup.textContent()).toContain('Your cart is waiting')
  })
})
```

### Step 2: Performance Testing

#### Core Web Vitals Testing
Create `src/tests/performance.test.ts`:
```typescript
import { measureWebVitals } from '@/lib/performance'

describe('Performance Metrics', () => {
  test('LCP is under 2.5 seconds', async () => {
    const metrics = await measureWebVitals('/')
    expect(metrics.LCP).toBeLessThan(2500)
  })
  
  test('INP is under 200ms', async () => {
    const metrics = await measureWebVitals('/')
    expect(metrics.INP).toBeLessThan(200)
  })
  
  test('CLS is under 0.1', async () => {
    const metrics = await measureWebVitals('/')
    expect(metrics.CLS).toBeLessThan(0.1)
  })
  
  test('bundle size is optimized', () => {
    const stats = require('../../.next/build-stats.json')
    const mainBundle = stats.bundles.find(b => b.name === 'main')
    
    expect(mainBundle.size).toBeLessThan(150000) // 150KB
  })
})
```

#### Load Testing Script
Create `scripts/load-test.js`:
```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
}

export default function () {
  // Test homepage
  const homepage = http.get('https://yoursite.com')
  check(homepage, {
    'homepage loads': (r) => r.status === 200,
    'homepage fast': (r) => r.timings.duration < 500,
  })
  
  sleep(1)
  
  // Test conversion flow
  const formData = {
    email: `test${Date.now()}@example.com`,
    name: 'Load Test User',
  }
  
  const conversion = http.post(
    'https://yoursite.com/api/convert',
    JSON.stringify(formData),
    { headers: { 'Content-Type': 'application/json' } }
  )
  
  check(conversion, {
    'conversion works': (r) => r.status === 200,
    'conversion fast': (r) => r.timings.duration < 1000,
  })
  
  sleep(2)
}
```

### Step 3: SEO Testing

#### SEO Audit Script
Create `scripts/seo-audit.ts`:
```typescript
import { chromium } from 'playwright'
import { analyze } from 'web-vitals'

export async function runSEOAudit(url: string) {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  
  const results = {
    meta: {},
    structured_data: [],
    performance: {},
    accessibility: {},
    mobile: {},
  }
  
  await page.goto(url)
  
  // Check meta tags
  results.meta = {
    title: await page.title(),
    description: await page.getAttribute('meta[name="description"]', 'content'),
    og_title: await page.getAttribute('meta[property="og:title"]', 'content'),
    og_description: await page.getAttribute('meta[property="og:description"]', 'content'),
    og_image: await page.getAttribute('meta[property="og:image"]', 'content'),
  }
  
  // Check structured data
  const structuredData = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    return scripts.map(s => JSON.parse(s.textContent || '{}'))
  })
  results.structured_data = structuredData
  
  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        resolve({
          LCP: entries.find(e => e.entryType === 'largest-contentful-paint')?.startTime,
          FID: entries.find(e => e.entryType === 'first-input')?.processingStart,
          CLS: entries.filter(e => e.entryType === 'layout-shift')
            .reduce((sum, entry) => sum + entry.value, 0),
        })
      }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    })
  })
  results.performance = metrics
  
  // Mobile friendliness
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(url)
  
  results.mobile = {
    viewport_configured: await mobilePage.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]')
      return viewport?.getAttribute('content')?.includes('width=device-width')
    }),
    text_readable: await mobilePage.evaluate(() => {
      const fontSize = window.getComputedStyle(document.body).fontSize
      return parseInt(fontSize) >= 16
    }),
  }
  
  await browser.close()
  return results
}
```

### Step 4: Deployment Configuration

#### Production Build Configuration
Create `scripts/build-production.sh`:
```bash
#!/bin/bash

echo "🚀 Starting production build..."

# Environment checks
if [ -z "$NEXT_PUBLIC_GA4_ID" ]; then
  echo "❌ Error: GA4 ID not set"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_GTM_ID" ]; then
  echo "❌ Error: GTM ID not set"
  exit 1
fi

# Clean previous builds
rm -rf .next out

# Run tests
echo "🧪 Running tests..."
npm run test:ci
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

# Build application
echo "🔨 Building application..."
npm run build

# Check build output
if [ ! -d ".next" ]; then
  echo "❌ Build failed"
  exit 1
fi

# Analyze bundle
echo "📊 Analyzing bundle..."
npx next-bundle-analyzer

# Generate sitemap
echo "🗺️ Generating sitemap..."
npm run generate:sitemap

# Run lighthouse
echo "🔍 Running Lighthouse audit..."
npx lighthouse https://staging.yoursite.com \
  --output=json \
  --output-path=./lighthouse-report.json \
  --only-categories=performance,seo,accessibility

# Check lighthouse scores
node scripts/check-lighthouse-scores.js

echo "✅ Production build complete!"
```

#### Vercel Deployment Config
Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build:production",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "app/api/convert/route.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

### Step 5: Monitoring Setup

#### Real User Monitoring
Create `src/lib/monitoring/rum.ts`:
```typescript
export function initializeRUM() {
  // Sentry for error tracking
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
    })
  }
  
  // Custom performance monitoring
  if ('PerformanceObserver' in window) {
    // Track long tasks
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          trackEvent('long_task', {
            duration: entry.duration,
            start_time: entry.startTime,
          })
        }
      }
    }).observe({ entryTypes: ['longtask'] })
    
    // Track resource timing
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
          trackEvent('slow_resource', {
            name: entry.name,
            duration: entry.duration,
            type: entry.initiatorType,
          })
        }
      }
    }).observe({ entryTypes: ['resource'] })
  }
  
  // Track JavaScript errors
  window.addEventListener('error', (event) => {
    trackEvent('javascript_error', {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack,
    })
  })
  
  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackEvent('unhandled_rejection', {
      reason: event.reason,
      promise: event.promise,
    })
  })
}
```

### Step 6: Post-Deployment Checklist

Create `scripts/post-deploy-checks.ts`:
```typescript
async function runPostDeploymentChecks(productionUrl: string) {
  const checks = []
  
  // 1. SSL Certificate
  checks.push({
    name: 'SSL Certificate',
    test: async () => {
      const response = await fetch(productionUrl)
      return response.url.startsWith('https://')
    },
  })
  
  // 2. Robots.txt accessible
  checks.push({
    name: 'Robots.txt',
    test: async () => {
      const response = await fetch(`${productionUrl}/robots.txt`)
      return response.ok && response.headers.get('content-type')?.includes('text/plain')
    },
  })
  
  // 3. Sitemap accessible
  checks.push({
    name: 'Sitemap',
    test: async () => {
      const response = await fetch(`${productionUrl}/sitemap.xml`)
      return response.ok && response.headers.get('content-type')?.includes('xml')
    },
  })
  
  // 4. Analytics tracking
  checks.push({
    name: 'Analytics',
    test: async () => {
      const browser = await chromium.launch()
      const page = await browser.newPage()
      await page.goto(productionUrl)
      const hasGA = await page.evaluate(() => typeof window.gtag !== 'undefined')
      await browser.close()
      return hasGA
    },
  })
  
  // 5. Core Web Vitals
  checks.push({
    name: 'Core Web Vitals',
    test: async () => {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${productionUrl}`
      )
      const data = await response.json()
      const score = data.lighthouseResult.categories.performance.score
      return score > 0.9
    },
  })
  
  // Run all checks
  const results = await Promise.all(
    checks.map(async (check) => ({
      name: check.name,
      passed: await check.test().catch(() => false),
    }))
  )
  
  // Report results
  console.log('\n📋 Post-Deployment Check Results:\n')
  results.forEach(result => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.name}`)
  })
  
  const allPassed = results.every(r => r.passed)
  if (!allPassed) {
    throw new Error('Post-deployment checks failed')
  }
  
  console.log('\n🎉 All checks passed! Deployment successful.\n')
}
```

## 🔄 Human Checkpoint
- "All tests passing"
- "Performance metrics meeting targets"
- "SEO audit complete"
- "Ready for production deployment: APPROVED or NEEDS FIXES"

## ✅ Deployment Success Criteria
- All automated tests passing
- Core Web Vitals scores passing
- SEO audit showing no critical issues
- Security headers configured
- SSL certificate valid
- Analytics tracking verified
- Error monitoring active
- Backup and rollback plan ready

## 📝 Final Checklist
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Performance tests passing
- [ ] SEO tests passing
- [ ] Build successful
- [ ] Staging deployment tested
- [ ] Production deployment completed
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Monitoring dashboard live
- [ ] Analytics data flowing
- [ ] Backup created
- [ ] Documentation updated
- [ ] Team notified

## 🚨 Important Notes
- Always test in staging before production
- Have rollback plan ready
- Monitor closely for first 24 hours
- Check all conversion paths post-deployment
- Verify payment processing if applicable
- Test on multiple devices and browsers