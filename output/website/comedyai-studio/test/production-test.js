const puppeteer = require('puppeteer');

async function testLiveWebsite() {
  console.log('🚀 Testing Live ComedyAI Studio Website...\n');
  
  const prodUrl = 'https://comedyai-studio-1dbtb40e8-frankys-projects-6b7d91eb.vercel.app';
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    // Test 1: Basic Loading
    console.log('📱 Test 1: Website Loading...');
    const startTime = Date.now();
    const response = await page.goto(prodUrl, { waitUntil: 'networkidle2', timeout: 10000 });
    const loadTime = Date.now() - startTime;
    
    console.log(`   Status: ${response.status()} ${response.status() === 200 ? '✅' : '❌'}`);
    console.log(`   HTTPS: ${response.url().startsWith('https') ? '✅' : '❌'}`);
    console.log(`   Load Time: ${loadTime}ms ${loadTime < 3000 ? '✅' : '⚠️'}`);
    
    // Test 2: Core Content
    console.log('\n🎭 Test 2: Core Content...');
    const content = await page.evaluate(() => {
      return {
        hasTitle: !!document.title,
        title: document.title,
        hasH1: !!document.querySelector('h1'),
        h1Text: document.querySelector('h1')?.textContent,
        hasNavigation: !!document.querySelector('nav'),
        hasFooter: !!document.querySelector('footer'),
        pageText: document.body.textContent.includes('ComedyAI Studio')
      };
    });
    
    console.log(`   Page Title: "${content.title}" ${content.hasTitle ? '✅' : '❌'}`);
    console.log(`   H1 Heading: "${content.h1Text}" ${content.hasH1 ? '✅' : '❌'}`);
    console.log(`   Navigation: ${content.hasNavigation ? '✅' : '❌'}`);
    console.log(`   Footer: ${content.hasFooter ? '✅' : '❌'}`);
    console.log(`   ComedyAI Branding: ${content.pageText ? '✅' : '❌'}`);
    
    // Test 3: Social Media Links
    console.log('\n🔗 Test 3: Social Media Conversion...');
    const socialLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a[href*="tiktok"], a[href*="youtube"], a[href*="instagram"]').forEach(link => {
        const platform = link.href.includes('tiktok') ? 'TikTok' : 
                        link.href.includes('youtube') ? 'YouTube' : 
                        link.href.includes('instagram') ? 'Instagram' : 'Unknown';
        
        links.push({
          platform,
          url: link.href,
          text: link.textContent.trim(),
          hasTargetBlank: link.target === '_blank',
          hasRelNoopener: link.rel && link.rel.includes('noopener'),
          isVisible: link.offsetWidth > 0 && link.offsetHeight > 0
        });
      });
      return links;
    });
    
    console.log(`   Total Social Links: ${socialLinks.length} ${socialLinks.length >= 3 ? '✅' : '⚠️'}`);
    
    const platforms = [...new Set(socialLinks.map(l => l.platform))];
    platforms.forEach(platform => {
      const count = socialLinks.filter(l => l.platform === platform).length;
      console.log(`   ${platform} Links: ${count} ${count > 0 ? '✅' : '❌'}`);
    });
    
    // Test 4: Navigation
    console.log('\n🧭 Test 4: Navigation Links...');
    const navLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('nav a[href^="/"], nav a[href^="#"]').forEach(link => {
        links.push({
          text: link.textContent.trim(),
          href: link.href,
          isInternal: link.href.includes(window.location.hostname)
        });
      });
      return links;
    });
    
    console.log(`   Navigation Links Found: ${navLinks.length}`);
    navLinks.forEach(link => {
      console.log(`   - "${link.text}" → ${link.href.split('/').pop() || 'home'} ${link.isInternal ? '✅' : '⚠️'}`);
    });
    
    // Test 5: Mobile Responsiveness
    console.log('\n📱 Test 5: Mobile Responsiveness...');
    
    // Test iPhone size
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle2' });
    
    const mobileTest = await page.evaluate(() => {
      return {
        hasHorizontalScroll: document.body.scrollWidth > window.innerWidth,
        navVisible: document.querySelector('nav') && document.querySelector('nav').offsetHeight > 0,
        socialLinksVisible: document.querySelectorAll('a[href*="tiktok"], a[href*="youtube"]').length > 0,
        touchTargets: Array.from(document.querySelectorAll('button, a')).map(el => {
          const rect = el.getBoundingClientRect();
          return {
            element: el.tagName,
            width: rect.width,
            height: rect.height,
            size: Math.min(rect.width, rect.height)
          };
        }).filter(t => t.size > 0 && t.size < 44).length
      };
    });
    
    console.log(`   Mobile Navigation: ${mobileTest.navVisible ? '✅' : '❌'}`);
    console.log(`   Horizontal Scroll: ${mobileTest.hasHorizontalScroll ? '⚠️ Yes' : '✅ No'}`);
    console.log(`   Small Touch Targets: ${mobileTest.touchTargets} ${mobileTest.touchTargets === 0 ? '✅' : '⚠️'}`);
    console.log(`   Social Links Visible: ${mobileTest.socialLinksVisible ? '✅' : '❌'}`);
    
    // Test 6: Performance Metrics
    console.log('\n⚡ Test 6: Performance...');
    const metrics = await page.evaluate(() => {
      return {
        domElements: document.querySelectorAll('*').length,
        images: document.querySelectorAll('img').length,
        scripts: document.querySelectorAll('script').length,
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length
      };
    });
    
    console.log(`   DOM Elements: ${metrics.domElements}`);
    console.log(`   Images: ${metrics.images}`);
    console.log(`   Scripts: ${metrics.scripts}`);
    console.log(`   Stylesheets: ${metrics.stylesheets}`);
    
    // Test 7: Analytics
    console.log('\n📊 Test 7: Analytics & Tracking...');
    const analytics = await page.evaluate(() => {
      return {
        gtagFunction: typeof window.gtag === 'function',
        dataLayer: Array.isArray(window.dataLayer),
        gaConfig: window.dataLayer && window.dataLayer.some(item => 
          item && item[0] === 'config' && typeof item[1] === 'string' && item[1].startsWith('G-'))
      };
    });
    
    console.log(`   gtag Function: ${analytics.gtagFunction ? '✅' : '❌'}`);
    console.log(`   Data Layer: ${analytics.dataLayer ? '✅' : '❌'}`);
    console.log(`   GA Configuration: ${analytics.gaConfig ? '✅' : '⚠️'}`);
    
    // Overall Score
    console.log('\n🎯 Overall Assessment:');
    const tests = [
      response.status() === 200,
      content.hasTitle,
      content.hasH1,
      content.hasNavigation,
      socialLinks.length >= 3,
      navLinks.length > 0,
      mobileTest.navVisible,
      loadTime < 5000
    ];
    
    const passedTests = tests.filter(Boolean).length;
    const totalTests = tests.length;
    const score = ((passedTests / totalTests) * 100).toFixed(0);
    
    console.log(`   Score: ${score}% (${passedTests}/${totalTests} tests passed)`);
    
    if (score >= 90) {
      console.log('   Status: 🎉 EXCELLENT - Website is performing great!');
    } else if (score >= 75) {
      console.log('   Status: ✅ GOOD - Website is working well with minor issues');
    } else if (score >= 60) {
      console.log('   Status: ⚠️ NEEDS ATTENTION - Several issues found');
    } else {
      console.log('   Status: ❌ CRITICAL - Major issues need fixing');
    }
    
  } catch (error) {
    console.log('\n❌ Test Failed:', error.message);
  } finally {
    await browser.close();
  }
}

testLiveWebsite().catch(console.error);