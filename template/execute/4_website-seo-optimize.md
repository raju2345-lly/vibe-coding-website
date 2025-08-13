# AI Agent Script: SEO & AI Search Optimization

## 🎯 Purpose
Optimize the website for search engines, AI assistants, and modern search experiences including Google SGE, ChatGPT, and other AI platforms.

## 📋 Prerequisites
- Website implementation complete
- Content structure defined
- Analytics setup ready

## 🤖 AI Agent Instructions

### Step 1: Technical SEO Audit & Setup

#### Core Web Vitals Optimization
Create `src/lib/performance.ts`:
```typescript
// Performance monitoring and optimization
export const performanceConfig = {
  LCP_TARGET: 2500, // 2.5 seconds
  INP_TARGET: 200,  // 200ms
  CLS_TARGET: 0.1,  // 0.1 score
}

export function initPerformanceObserver() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // LCP Observer
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime)
        // Send to analytics
        window.gtag?.('event', 'web_vitals', {
          name: 'LCP',
          value: entry.startTime,
        })
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })
    
    // CLS Observer
    new PerformanceObserver((list) => {
      let cls = 0
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value
        }
      }
      console.log('CLS:', cls)
    }).observe({ entryTypes: ['layout-shift'] })
  }
}
```

#### Next.js SEO Configuration
Update `next.config.js`:
```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  async redirects() {
    return [
      // Add any necessary redirects for SEO
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Step 2: AI Search Optimization (GEO/AEO)

#### Structured Data Implementation
Create `src/lib/structured-data.ts`:
```typescript
export function generateOrganizationSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: data.phone,
      contactType: 'customer service',
    },
    sameAs: data.socialProfiles,
  }
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    } : undefined,
  }
}

export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo,
      },
    },
  }
}
```

#### AI-Optimized Content Structure
Create `src/components/AIOptimizedContent.tsx`:
```typescript
export function AIOptimizedContent({ 
  question, 
  answer, 
  relatedQuestions,
  sources 
}) {
  return (
    <section className="ai-optimized-content">
      {/* Clear Q&A format for AI parsing */}
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      
      {/* Concise 40-60 word answer for AI snippets */}
      <div className="answer-summary bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-lg">{answer.summary}</p>
      </div>
      
      {/* Detailed explanation with proper structure */}
      <div className="detailed-answer prose max-w-none">
        {answer.detailed}
      </div>
      
      {/* Bulleted key points for easy AI extraction */}
      <div className="key-points mt-6">
        <h3 className="font-semibold mb-3">Key Points:</h3>
        <ul className="list-disc pl-6 space-y-2">
          {answer.keyPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
      
      {/* Related questions for comprehensive coverage */}
      <div className="related-questions mt-8">
        <h3 className="font-semibold mb-3">Related Questions:</h3>
        <div className="space-y-4">
          {relatedQuestions.map((q, i) => (
            <details key={i} className="border-b pb-4">
              <summary className="cursor-pointer font-medium">
                {q.question}
              </summary>
              <p className="mt-2 pl-4">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
      
      {/* Source citations for authority */}
      {sources && (
        <div className="sources mt-8 text-sm text-gray-600">
          <h4 className="font-medium mb-2">Sources:</h4>
          <ul className="space-y-1">
            {sources.map((source, i) => (
              <li key={i}>
                <a href={source.url} className="underline">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
```

### Step 3: Content Optimization Strategy

#### SEO Content Templates
Create `src/templates/SEOBlogPost.tsx`:
```typescript
export function SEOBlogPost({ post }) {
  const tableOfContents = generateTOC(post.content)
  
  return (
    <article>
      {/* Breadcrumbs for structure */}
      <Breadcrumbs items={post.breadcrumbs} />
      
      {/* Optimized title with keyword */}
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>
      
      {/* Meta information */}
      <div className="flex items-center gap-4 text-gray-600 mb-8">
        <time dateTime={post.publishedDate}>
          {formatDate(post.publishedDate)}
        </time>
        <span>·</span>
        <span>{post.readTime} min read</span>
        <span>·</span>
        <a href={`#author-${post.author.id}`}>
          {post.author.name}
        </a>
      </div>
      
      {/* Table of Contents for better navigation */}
      <nav className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="font-semibold mb-4">Table of Contents</h2>
        <ol className="space-y-2">
          {tableOfContents.map((item, i) => (
            <li key={i}>
              <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Content with proper heading hierarchy */}
      <div className="prose max-w-none">
        {post.content}
      </div>
      
      {/* Author bio for E-E-A-T */}
      <AuthorBio author={post.author} />
      
      {/* Related posts for internal linking */}
      <RelatedPosts posts={post.related} />
    </article>
  )
}
```

### Step 4: Multi-Platform Optimization

#### Voice Search Optimization
```typescript
// src/lib/voice-search.ts
export function optimizeForVoiceSearch(content) {
  return {
    // Natural language patterns
    conversationalTitle: convertToQuestion(content.title),
    
    // Featured snippet optimization
    directAnswer: content.summary.slice(0, 160),
    
    // Long-tail keywords
    voiceKeywords: generateVoiceKeywords(content.keywords),
    
    // Local optimization if applicable
    localInfo: content.location ? {
      nearMe: true,
      address: content.location.address,
      hours: content.location.hours,
    } : null,
  }
}
```

#### Video SEO
```typescript
// src/components/VideoSEO.tsx
export function VideoWithSEO({ video }) {
  return (
    <div className="video-container">
      <video 
        controls
        preload="metadata"
        poster={video.thumbnail}
      >
        <source src={video.src} type="video/mp4" />
        <track 
          kind="captions" 
          src={video.captions} 
          srclang="en" 
          label="English" 
        />
      </video>
      
      {/* Video schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: video.title,
            description: video.description,
            thumbnailUrl: video.thumbnail,
            uploadDate: video.uploadDate,
            duration: video.duration,
            contentUrl: video.src,
          }),
        }}
      />
      
      {/* Transcript for accessibility and SEO */}
      <details className="mt-4">
        <summary>View Transcript</summary>
        <div className="mt-2 p-4 bg-gray-50 rounded">
          {video.transcript}
        </div>
      </details>
    </div>
  )
}
```

### Step 5: International SEO

#### Multi-language Support
```typescript
// src/lib/i18n-seo.ts
export function generateHreflangTags(currentUrl, languages) {
  return languages.map(lang => ({
    rel: 'alternate',
    hreflang: lang.code,
    href: `${lang.domain}${currentUrl}`,
  }))
}

export function LocalizedSEO({ locale, alternates }) {
  return (
    <Head>
      <link rel="alternate" hrefLang="x-default" href={alternates.default} />
      {alternates.languages.map(alt => (
        <link 
          key={alt.lang}
          rel="alternate" 
          hrefLang={alt.lang} 
          href={alt.url} 
        />
      ))}
    </Head>
  )
}
```

### Step 6: Generate SEO Configuration Files

#### Sitemap Generation
`src/pages/api/sitemap.ts`:
```typescript
export default async function handler(req, res) {
  const pages = await getAllPages()
  const posts = await getAllPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${SITE_URL}${page.slug}</loc>
          <lastmod>${page.updatedAt}</lastmod>
          <changefreq>${page.changeFreq || 'weekly'}</changefreq>
          <priority>${page.priority || 0.5}</priority>
        </url>
      `).join('')}
      ${posts.map(post => `
        <url>
          <loc>${SITE_URL}/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
}
```

#### Robots.txt
`public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://yoursite.com/sitemap.xml
```

### Step 7: SEO Monitoring Setup

Create `src/lib/seo-monitoring.ts`:
```typescript
export function initSEOMonitoring() {
  // Track Core Web Vitals
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics)
      getFID(sendToAnalytics)
      getFCP(sendToAnalytics)
      getLCP(sendToAnalytics)
      getTTFB(sendToAnalytics)
    })
  }
}

function sendToAnalytics(metric) {
  window.gtag?.('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  })
}
```

## 🔄 Human Checkpoint
- "SEO and AI search optimization complete"
- "Core Web Vitals optimized"
- "Structured data implemented"
- "Please review SEO setup: APPROVED, NEEDS FIXES, or RESTART"

## ✅ Success Criteria
- Core Web Vitals scores passing (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- All pages have proper meta tags and structured data
- Content optimized for AI search engines
- Sitemap and robots.txt configured
- Multi-platform optimization implemented

## 📝 SEO Checklist
- [ ] Meta tags on all pages
- [ ] Open Graph tags configured
- [ ] Structured data implemented
- [ ] XML sitemap generated
- [ ] Robots.txt configured
- [ ] Core Web Vitals passing
- [ ] Mobile-friendly test passing
- [ ] Page speed > 90 on PageSpeed Insights
- [ ] Content in Q&A format for AI
- [ ] Internal linking strategy implemented

## 🚨 Important Notes
- Test with Google's Rich Results Test
- Validate structured data with Schema.org validator
- Check Core Web Vitals with PageSpeed Insights
- Monitor search console for errors
- Keep content fresh and updated regularly