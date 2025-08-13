# AI Agent Script: Analytics & Tracking Integration

## 🎯 Purpose
Implement comprehensive analytics, tracking, and monetization systems including Google Tag Manager, Google Analytics 4, AdSense, and conversion tracking.

## 📋 Prerequisites
- Google accounts for Analytics, Tag Manager, AdSense
- Website deployed to staging/production
- Privacy policy and cookie consent ready

## 🤖 AI Agent Instructions

### Step 1: Google Tag Manager Setup

#### Install GTM Container
Create `src/components/GoogleTagManager.tsx`:
```typescript
import Script from 'next/script'

export function GoogleTagManager({ gtmId }) {
  return (
    <>
      {/* GTM Head Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      
      {/* GTM NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
```

#### DataLayer Configuration
Create `src/lib/dataLayer.ts`:
```typescript
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export class DataLayerManager {
  private static instance: DataLayerManager
  
  private constructor() {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
    }
  }
  
  static getInstance(): DataLayerManager {
    if (!DataLayerManager.instance) {
      DataLayerManager.instance = new DataLayerManager()
    }
    return DataLayerManager.instance
  }
  
  push(data: any) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data)
    }
  }
  
  // Page view tracking
  trackPageView(pagePath: string, pageTitle: string) {
    this.push({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    })
  }
  
  // E-commerce tracking
  trackPurchase(transactionData: any) {
    this.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionData.id,
        value: transactionData.value,
        currency: transactionData.currency || 'USD',
        items: transactionData.items,
      },
    })
  }
  
  // Custom conversion tracking
  trackConversion(conversionType: string, value?: number, metadata?: any) {
    this.push({
      event: 'conversion',
      conversion_type: conversionType,
      conversion_value: value,
      conversion_metadata: metadata,
      timestamp: new Date().toISOString(),
    })
  }
  
  // Form tracking
  trackFormSubmit(formName: string, formData?: any) {
    this.push({
      event: 'form_submit',
      form_name: formName,
      form_data: formData,
      form_location: window.location.pathname,
    })
  }
  
  // Enhanced ecommerce
  trackAddToCart(product: any) {
    this.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
        }],
      },
    })
  }
}
```

### Step 2: Google Analytics 4 Implementation

#### GA4 Configuration
Create `src/lib/analytics/ga4.ts`:
```typescript
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID

export function initializeGA4() {
  if (typeof window === 'undefined' || !GA4_MEASUREMENT_ID) return
  
  // Load GA4 script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  
  gtag('js', new Date())
  gtag('config', GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send manually for better control
  })
  
  // Enhanced measurement
  gtag('config', GA4_MEASUREMENT_ID, {
    custom_map: {
      dimension1: 'user_type',
      dimension2: 'content_category',
      metric1: 'engagement_score',
    },
  })
}

// Custom events for GA4
export const GA4Events = {
  // Engagement events
  scrollDepth: (percentage: number) => ({
    event: 'scroll',
    percent_scrolled: percentage,
  }),
  
  timeOnPage: (seconds: number) => ({
    event: 'time_on_page',
    engagement_time: seconds,
  }),
  
  // Conversion events
  leadGeneration: (leadType: string, value?: number) => ({
    event: 'generate_lead',
    lead_type: leadType,
    value: value,
    currency: 'USD',
  }),
  
  signUp: (method: string) => ({
    event: 'sign_up',
    method: method,
  }),
  
  // Content events
  contentEngagement: (contentType: string, contentId: string) => ({
    event: 'content_engagement',
    content_type: contentType,
    content_id: contentId,
  }),
}
```

### Step 3: Google AdSense Integration

#### GDPR-Compliant AdSense Setup
Create `src/components/AdSense.tsx`:
```typescript
import { useEffect, useState } from 'react'
import { useConsent } from '@/hooks/useConsent'

interface AdSenseProps {
  client: string
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle'
  responsive?: boolean
}

export function AdSenseUnit({ client, slot, format = 'auto', responsive = true }: AdSenseProps) {
  const { hasConsent } = useConsent()
  const [shouldShowAds, setShouldShowAds] = useState(false)
  
  useEffect(() => {
    // Only show ads if user has given consent
    if (hasConsent('marketing')) {
      setShouldShowAds(true)
      
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script')
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        script.async = true
        script.crossOrigin = 'anonymous'
        script.setAttribute('data-ad-client', client)
        document.head.appendChild(script)
      }
      
      // Push ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [hasConsent, client])
  
  if (!shouldShowAds) {
    return <div className="ad-placeholder">Advertisement</div>
  }
  
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  )
}

// Auto Ads configuration
export function AdSenseAutoAds({ client }: { client: string }) {
  const { hasConsent } = useConsent()
  
  useEffect(() => {
    if (hasConsent('marketing')) {
      const script = document.createElement('script')
      script.innerHTML = `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "${client}",
          enable_page_level_ads: true
        });
      `
      document.head.appendChild(script)
    }
  }, [hasConsent, client])
  
  return null
}
```

### Step 4: Conversion Tracking Setup

#### Advanced Conversion Tracking
Create `src/lib/tracking/conversions.ts`:
```typescript
interface ConversionConfig {
  googleAdsId?: string
  facebookPixelId?: string
  linkedInPartnerId?: string
}

export class ConversionTracker {
  private config: ConversionConfig
  private dataLayer: DataLayerManager
  
  constructor(config: ConversionConfig) {
    this.config = config
    this.dataLayer = DataLayerManager.getInstance()
  }
  
  // Google Ads Conversion
  trackGoogleAdsConversion(conversionLabel: string, value?: number) {
    if (!this.config.googleAdsId) return
    
    window.gtag?.('event', 'conversion', {
      send_to: `${this.config.googleAdsId}/${conversionLabel}`,
      value: value,
      currency: 'USD',
    })
    
    // Also push to dataLayer for GTM
    this.dataLayer.push({
      event: 'google_ads_conversion',
      conversion_label: conversionLabel,
      conversion_value: value,
    })
  }
  
  // Facebook Pixel Conversion
  trackFacebookConversion(eventName: string, parameters?: any) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, parameters)
    }
  }
  
  // LinkedIn Conversion
  trackLinkedInConversion(conversionId: string) {
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: conversionId })
    }
  }
  
  // Universal conversion method
  trackConversion(type: string, data: any) {
    // Track in GA4
    window.gtag?.('event', 'conversion', {
      conversion_type: type,
      ...data,
    })
    
    // Track in relevant platforms
    switch (type) {
      case 'purchase':
        this.trackGoogleAdsConversion('PURCHASE_LABEL', data.value)
        this.trackFacebookConversion('Purchase', data)
        break
      case 'lead':
        this.trackGoogleAdsConversion('LEAD_LABEL', data.value)
        this.trackFacebookConversion('Lead', data)
        break
      case 'signup':
        this.trackGoogleAdsConversion('SIGNUP_LABEL')
        this.trackFacebookConversion('CompleteRegistration', data)
        break
    }
  }
}
```

### Step 5: Heat Mapping and Session Recording

#### Microsoft Clarity Integration
Create `src/components/Clarity.tsx`:
```typescript
export function ClarityTracking({ projectId }: { projectId: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r)
      t.async = 1
      t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]
      y.parentNode.insertBefore(t, y)
    })(window, document, 'clarity', 'script', projectId)
  }, [projectId])
  
  return null
}
```

### Step 6: Custom Event Tracking

#### Event Tracking Hooks
Create `src/hooks/useTracking.ts`:
```typescript
export function useTracking() {
  const dataLayer = DataLayerManager.getInstance()
  
  const trackClick = (elementName: string, elementType: string) => {
    dataLayer.push({
      event: 'click',
      element_name: elementName,
      element_type: elementType,
      click_url: window.location.href,
    })
  }
  
  const trackScroll = (percentage: number) => {
    dataLayer.push({
      event: 'scroll_depth',
      scroll_percentage: percentage,
    })
  }
  
  const trackVideoEngagement = (videoId: string, action: string, progress?: number) => {
    dataLayer.push({
      event: 'video_engagement',
      video_id: videoId,
      video_action: action,
      video_progress: progress,
    })
  }
  
  const trackSearch = (searchTerm: string, resultsCount: number) => {
    dataLayer.push({
      event: 'search',
      search_term: searchTerm,
      search_results_count: resultsCount,
    })
  }
  
  return {
    trackClick,
    trackScroll,
    trackVideoEngagement,
    trackSearch,
  }
}
```

### Step 7: Privacy Compliance

#### Cookie Consent Manager
Create `src/components/CookieConsent.tsx`:
```typescript
export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  })
  
  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    setConsent(fullConsent)
    saveConsent(fullConsent)
    initializeTracking(fullConsent)
  }
  
  const handleAcceptSelected = () => {
    saveConsent(consent)
    initializeTracking(consent)
  }
  
  const initializeTracking = (consentState: ConsentState) => {
    if (consentState.analytics) {
      initializeGA4()
      initializeGTM()
    }
    if (consentState.marketing) {
      initializeAdSense()
      initializeFacebookPixel()
    }
  }
  
  return (
    <div className="cookie-consent-banner">
      <h3>Cookie Settings</h3>
      <p>We use cookies to enhance your experience.</p>
      
      <div className="consent-options">
        <label>
          <input type="checkbox" checked disabled />
          Necessary (Required)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={consent.functional}
            onChange={(e) => setConsent({...consent, functional: e.target.checked})}
          />
          Functional
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={consent.analytics}
            onChange={(e) => setConsent({...consent, analytics: e.target.checked})}
          />
          Analytics
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={consent.marketing}
            onChange={(e) => setConsent({...consent, marketing: e.target.checked})}
          />
          Marketing
        </label>
      </div>
      
      <div className="consent-actions">
        <button onClick={handleAcceptSelected}>Accept Selected</button>
        <button onClick={handleAcceptAll}>Accept All</button>
      </div>
    </div>
  )
}
```

### Step 8: Analytics Dashboard Setup

#### Custom Reporting Dashboard
Create `src/pages/api/analytics-dashboard.ts`:
```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Fetch data from GA4 API
  const analyticsData = await fetchGA4Data({
    metrics: ['sessions', 'conversions', 'revenue'],
    dimensions: ['date', 'source', 'medium'],
    dateRange: 'last30days',
  })
  
  // Process and return dashboard data
  res.json({
    overview: {
      sessions: analyticsData.sessions,
      conversions: analyticsData.conversions,
      conversionRate: (analyticsData.conversions / analyticsData.sessions) * 100,
      revenue: analyticsData.revenue,
    },
    charts: {
      sessionsOverTime: processTimeSeriesData(analyticsData),
      topSources: processSourceData(analyticsData),
      conversionFunnel: processFunnelData(analyticsData),
    },
  })
}
```

## 🔄 Human Checkpoint
- "Analytics and tracking integration complete"
- "GTM, GA4, and AdSense configured"
- "Privacy compliance implemented"
- "Please test tracking: APPROVED, NEEDS FIXES, or RESTART"

## ✅ Success Criteria
- GTM container properly installed
- GA4 tracking all key events
- AdSense integrated with consent
- Conversion tracking functional
- Privacy compliance implemented
- Custom events tracking properly

## 📝 Analytics Checklist
- [ ] GTM container installed
- [ ] GA4 property configured
- [ ] Enhanced ecommerce tracking
- [ ] Conversion goals defined
- [ ] AdSense account linked
- [ ] Cookie consent implemented
- [ ] Custom dimensions configured
- [ ] Audiences created
- [ ] Remarketing tags installed
- [ ] Server-side tracking considered

## 🚨 Important Notes
- Test in GTM Preview mode before publishing
- Verify conversions with Google Ads tag assistant
- Check privacy compliance with regulations
- Monitor for tracking blockers
- Document all custom events