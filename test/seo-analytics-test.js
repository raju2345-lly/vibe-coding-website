const puppeteer = require('puppeteer');

async function seoAnalyticsTest() {
  console.log('🔍 Starting SEO & Analytics Tests...\n');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  const seoData = await page.evaluate(() => {
    const results = {
      meta: {},
      og: {},
      twitter: {},
      analytics: {},
      structure: {},
      issues: []
    };
    
    // Check meta tags
    const title = document.querySelector('title');
    results.meta.title = title ? title.textContent : null;
    results.meta.titleLength = results.meta.title ? results.meta.title.length : 0;
    
    const description = document.querySelector('meta[name="description"]');
    results.meta.description = description ? description.content : null;
    results.meta.descriptionLength = results.meta.description ? results.meta.description.length : 0;
    
    const keywords = document.querySelector('meta[name="keywords"]');
    results.meta.keywords = keywords ? keywords.content : null;
    
    // Check Open Graph tags
    results.og.title = document.querySelector('meta[property="og:title"]')?.content || null;
    results.og.description = document.querySelector('meta[property="og:description"]')?.content || null;
    results.og.image = document.querySelector('meta[property="og:image"]')?.content || null;
    results.og.url = document.querySelector('meta[property="og:url"]')?.content || null;
    results.og.type = document.querySelector('meta[property="og:type"]')?.content || null;
    
    // Check Twitter cards
    results.twitter.card = document.querySelector('meta[name="twitter:card"]')?.content || null;
    results.twitter.title = document.querySelector('meta[name="twitter:title"]')?.content || null;
    results.twitter.description = document.querySelector('meta[name="twitter:description"]')?.content || null;
    results.twitter.image = document.querySelector('meta[name="twitter:image"]')?.content || null;
    
    // Check Google Analytics
    results.analytics.gtag = typeof window.gtag === 'function';
    results.analytics.gtagScript = !!document.querySelector('script[src*="googletagmanager.com"]');
    results.analytics.dataLayer = Array.isArray(window.dataLayer);
    
    // Check page structure
    results.structure.h1Count = document.querySelectorAll('h1').length;
    results.structure.h1Text = document.querySelector('h1')?.textContent || null;
    results.structure.imageCount = document.querySelectorAll('img').length;
    results.structure.altTextMissing = Array.from(document.querySelectorAll('img')).filter(img => !img.alt).length;
    results.structure.internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]').length;
    results.structure.externalLinks = document.querySelectorAll('a[href^="http"]:not([href^="' + window.location.origin + '"])').length;
    
    // Check canonical URL
    results.structure.canonical = document.querySelector('link[rel="canonical"]')?.href || null;
    
    // Check lang attribute
    results.structure.lang = document.documentElement.lang || null;
    
    // Check viewport meta tag
    results.structure.viewport = document.querySelector('meta[name="viewport"]')?.content || null;
    
    // Validate SEO elements
    if (!results.meta.title) {
      results.issues.push('Missing page title');
    } else if (results.meta.titleLength < 30 || results.meta.titleLength > 60) {
      results.issues.push(`Title length not optimal (${results.meta.titleLength} chars, recommend 30-60)`);
    }
    
    if (!results.meta.description) {
      results.issues.push('Missing meta description');
    } else if (results.meta.descriptionLength < 150 || results.meta.descriptionLength > 160) {
      results.issues.push(`Description length not optimal (${results.meta.descriptionLength} chars, recommend 150-160)`);
    }
    
    if (!results.og.title) results.issues.push('Missing Open Graph title');
    if (!results.og.description) results.issues.push('Missing Open Graph description');
    if (!results.og.image) results.issues.push('Missing Open Graph image');
    
    if (!results.twitter.card) results.issues.push('Missing Twitter card');
    
    if (results.structure.h1Count === 0) {
      results.issues.push('No H1 tag found');
    } else if (results.structure.h1Count > 1) {
      results.issues.push(`Multiple H1 tags (${results.structure.h1Count})`);
    }
    
    if (!results.structure.lang) {
      results.issues.push('Missing lang attribute on html element');
    }
    
    if (!results.structure.viewport) {
      results.issues.push('Missing viewport meta tag');
    }
    
    if (results.structure.altTextMissing > 0) {
      results.issues.push(`${results.structure.altTextMissing} images missing alt text`);
    }
    
    return results;
  });
  
  // Test social media conversion tracking
  const conversionTest = await page.evaluate(() => {
    const socialLinks = [];
    const links = document.querySelectorAll('a[href*="tiktok"], a[href*="youtube"], a[href*="instagram"]');
    
    links.forEach(link => {
      const platform = link.href.includes('tiktok') ? 'TikTok' : 
                      link.href.includes('youtube') ? 'YouTube' : 
                      link.href.includes('instagram') ? 'Instagram' : 'Unknown';
      
      socialLinks.push({
        platform,
        url: link.href,
        text: link.textContent.trim(),
        hasTargetBlank: link.target === '_blank',
        hasRelNoopener: link.rel && link.rel.includes('noopener')
      });
    });
    
    return {
      socialLinksCount: socialLinks.length,
      socialLinks: socialLinks,
      conversionFocused: socialLinks.length >= 3 // Should have TikTok, YouTube, Instagram
    };
  });
  
  console.log('📊 SEO Analysis:');
  console.log(`   Title: "${seoData.meta.title}" (${seoData.meta.titleLength} chars)`);
  console.log(`   Description: ${seoData.meta.description ? 'Present' : 'Missing'} (${seoData.meta.descriptionLength} chars)`);
  console.log(`   Keywords: ${seoData.meta.keywords ? 'Present' : 'Missing'}`);
  console.log(`   H1: ${seoData.structure.h1Count} found - "${seoData.structure.h1Text}"`);
  console.log(`   Images: ${seoData.structure.imageCount} (${seoData.structure.altTextMissing} missing alt)`);
  console.log(`   Lang: ${seoData.structure.lang || 'Missing'}`);
  console.log(`   Viewport: ${seoData.structure.viewport ? 'Present' : 'Missing'}`);
  
  console.log('\n📱 Open Graph:');
  console.log(`   Title: ${seoData.og.title ? 'Present' : 'Missing'}`);
  console.log(`   Description: ${seoData.og.description ? 'Present' : 'Missing'}`);
  console.log(`   Image: ${seoData.og.image ? 'Present' : 'Missing'}`);
  console.log(`   URL: ${seoData.og.url ? 'Present' : 'Missing'}`);
  
  console.log('\n🐦 Twitter Cards:');
  console.log(`   Card type: ${seoData.twitter.card || 'Missing'}`);
  console.log(`   Title: ${seoData.twitter.title ? 'Present' : 'Missing'}`);
  console.log(`   Description: ${seoData.twitter.description ? 'Present' : 'Missing'}`);
  console.log(`   Image: ${seoData.twitter.image ? 'Present' : 'Missing'}`);
  
  console.log('\n📈 Analytics:');
  console.log(`   Google Analytics: ${seoData.analytics.gtag ? '✅ Active' : '❌ Not found'}`);
  console.log(`   GA Script: ${seoData.analytics.gtagScript ? '✅ Loaded' : '❌ Missing'}`);
  console.log(`   Data Layer: ${seoData.analytics.dataLayer ? '✅ Present' : '❌ Missing'}`);
  
  console.log('\n🎯 Social Media Conversion:');
  console.log(`   Social links: ${conversionTest.socialLinksCount}`);
  console.log(`   Conversion focused: ${conversionTest.conversionFocused ? '✅ Yes' : '❌ No'}`);
  
  if (conversionTest.socialLinks.length > 0) {
    console.log('   Platform links:');
    conversionTest.socialLinks.forEach(link => {
      console.log(`     - ${link.platform}: "${link.text}" ${link.hasTargetBlank && link.hasRelNoopener ? '✅' : '⚠️'}`);
    });
  }
  
  console.log('\n🔍 SEO Assessment:');
  if (seoData.issues.length === 0) {
    console.log('✅ No major SEO issues found!');
  } else {
    console.log(`⚠️ Found ${seoData.issues.length} SEO issues:`);
    seoData.issues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  await browser.close();
  
  return {
    seo: seoData,
    conversion: conversionTest,
    issues: seoData.issues,
    passed: seoData.issues.length <= 2 // Allow minor issues
  };
}

// Only run if called directly
if (require.main === module) {
  seoAnalyticsTest().catch(console.error);
}

module.exports = seoAnalyticsTest;