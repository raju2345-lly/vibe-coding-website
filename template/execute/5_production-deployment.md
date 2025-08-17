# Step 5: Deploy to Production

## 🎯 Purpose
Deploy the tested and approved website to production with proper monitoring and analytics.

## 📋 Prerequisites
- All tests passing from Step 4
- Domain name ready (if custom domain)
- Hosting account (Vercel/Netlify recommended)

## 🚨 CRITICAL: Git Safety First

**DEPLOYMENT WORKFLOW:**
- Always work on development branch first
- Always ask: "May I commit these changes locally?"
- NEVER push without explicit user permission
- Deploy manually to preview BEFORE merging to production
- NEVER merge branches without explicit instruction
- Only merge development → production after preview approval

## 🤖 AI Instructions

### Phase 1: Production Build

#### Step 1.1: Build Optimization
```bash
# Clean previous builds
rm -rf .next out

# Production build
npm run build

# Check build output
# Should see:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

#### Step 1.2: Test Production Locally
```bash
# Run production build locally
npm run start

# Open http://localhost:3000
# Test all critical paths
```

### Phase 2: Manual Preview Deployment

#### Step 2.1: Deploy to Preview Environment
```bash
# Work on development branch
git checkout [development-branch]

# Deploy manually for testing (after getting permission)
npx vercel@latest
# Note the preview URL from Vercel CLI output or check Vercel dashboard
```

#### Step 2.2: Human Testing & Approval
- Test all functionality on preview URL (from Vercel CLI output or dashboard)
- Verify all pages load correctly
- Check mobile responsiveness
- Test contact/CTA button functionality
- Confirm analytics tracking
- Get explicit approval from human before proceeding

### Phase 3: Production Deployment (After Approval)

#### Step 3.1: Merge to Production Branch
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Step 2.2: Environment Variables
```bash
# Set production environment variables
vercel env add NEXT_PUBLIC_GA_ID production
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
```

### Phase 3: Deploy to Netlify (Alternative)

#### Step 3.1: Netlify Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Step 3.2: Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

### Phase 4: Post-Deployment Setup

#### Step 4.1: Domain Configuration
```bash
# For custom domain on Vercel
vercel domains add yourdomain.com

# DNS Settings (add to your domain provider):
# A Record: @ -> 76.76.21.21
# CNAME: www -> cname.vercel-dns.com
```

#### Step 4.2: SSL Certificate
```bash
# Vercel handles SSL automatically
# Verify HTTPS is working:
curl -I https://yourdomain.com
```

### Phase 5: Monitoring Setup

#### Step 5.1: Google Search Console
```javascript
// Verify ownership
// Add this to app/layout.tsx
export const metadata = {
  verification: {
    google: 'your-verification-code'
  }
};
```

Submit sitemap:
```
https://yourdomain.com/sitemap.xml
```

#### Step 5.2: Google Analytics Verification
**Manual Verification Steps:**
1. **Visit your live website** in a new browser tab
2. **Open Google Analytics 4** → Go to Reports → Realtime
3. **Check Real-time Users** - Should show 1+ active users (you)
4. **Navigate pages** - Should see page views updating in real-time
5. **Test Events** - Click CTAs/buttons and verify custom events trigger
6. **Wait 24-48 hours** - Check Acquisition and Engagement reports for data

**Automated Verification:**
```javascript
// Test analytics programmatically
const checkAnalytics = await page.evaluate(() => {
  return {
    gtagLoaded: typeof window.gtag === 'function',
    gaLoaded: typeof window.ga !== 'undefined',
    dataLayerExists: Array.isArray(window.dataLayer),
    configPresent: window.dataLayer?.some(item => 
      item[0] === 'config' && item[1]?.startsWith('G-'))
  };
});
console.log('Analytics Check:', checkAnalytics);
```

### Phase 6: Performance Monitoring

#### Step 6.1: Vercel Analytics
```bash
# Enable Vercel Analytics (automatic with Vercel deployment)
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Step 6.2: Error Tracking
```bash
# Optional: Add Sentry for error tracking
npm install @sentry/nextjs

# Configure Sentry
npx @sentry/wizard@latest -i nextjs
```

### Phase 7: Final Checklist

#### Production Verification
```javascript
// test/production-check.js
const puppeteer = require('puppeteer');

async function productionCheck() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const prodUrl = 'https://yourdomain.com';
  
  console.log('Checking production site...');
  
  // Check HTTPS
  const response = await page.goto(prodUrl);
  console.log('HTTPS:', response.url().startsWith('https') ? '✅' : '❌');
  
  // Check load time
  const loadTime = await page.evaluate(() => {
    return performance.timing.loadEventEnd - performance.timing.navigationStart;
  });
  console.log(`Load Time: ${loadTime}ms ${loadTime < 3000 ? '✅' : '⚠️'}`);
  
  // Check critical elements
  const elements = await page.evaluate(() => {
    return {
      hasNavigation: document.querySelector('nav') !== null,
      hasHero: document.querySelector('h1') !== null,
      hasWhatsApp: document.querySelector('[href*="wa.me"]') !== null,
      hasImages: document.querySelectorAll('img').length > 0
    };
  });
  
  console.log('Navigation:', elements.hasNavigation ? '✅' : '❌');
  console.log('Hero Section:', elements.hasHero ? '✅' : '❌');
  console.log('WhatsApp Button:', elements.hasWhatsApp ? '✅' : '❌');
  console.log('Images:', elements.hasImages ? '✅' : '❌');
  
  // Check analytics
  const hasAnalytics = await page.evaluate(() => {
    return typeof window.gtag === 'function';
  });
  console.log('Analytics:', hasAnalytics ? '✅' : '❌');
  
  await browser.close();
}

productionCheck();
```

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables set
- [ ] Domain configured

### Deployment
- [ ] Deployed to hosting
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] Redirects configured

### Post-Deployment
- [ ] Google Search Console verified
- [ ] Analytics tracking confirmed
- [ ] Sitemap submitted
- [ ] Performance acceptable
- [ ] Error monitoring active

## 🚦 Human Checkpoint

**Question**: "Is the production site working correctly?"

Visit your live site and verify:
- [ ] Loads quickly
- [ ] Looks correct
- [ ] WhatsApp button works
- [ ] Forms submit
- [ ] Analytics tracking

- ✅ **SUCCESS** → Website is live!
- 🔄 **ISSUES** → Debug and redeploy
- 📊 **MONITOR** → Check analytics daily

## 📊 Post-Launch Monitoring

### Week 1
- Monitor error logs
- Check analytics data
- Review user behavior
- Fix any urgent issues

### Week 2
- Analyze conversion rates
- Review performance metrics
- Gather user feedback
- Plan improvements

### Ongoing
- Weekly performance checks
- Monthly conversion analysis
- Quarterly content updates
- Continuous optimization

## 🎉 Success Metrics

Your website is successful when:
- **Performance**: Load time < 3s consistently
- **SEO**: Appearing in search results
- **Conversions**: Meeting target rates
- **Analytics**: Tracking all events
- **Uptime**: 99.9% availability

## 🔧 Useful Commands

```bash
# Deployment
vercel --prod                    # Deploy to Vercel
netlify deploy --prod            # Deploy to Netlify

# Monitoring
vercel logs                      # View logs
curl -I https://yourdomain.com  # Check headers

# Rollback if needed
vercel rollback                  # Rollback to previous
```

---

*Congratulations! Your website is now live and serving users!* 🚀