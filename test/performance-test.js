const puppeteer = require('puppeteer');

async function performanceTest() {
  console.log('🚀 Starting Performance Tests...\n');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Enable performance metrics
  await page.evaluateOnNewDocument(() => {
    window.performance.mark('page-start');
  });
  
  const startTime = Date.now();
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2'
  });
  const loadTime = Date.now() - startTime;
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const paintMetrics = performance.getEntriesByType('paint');
    const FCP = paintMetrics.find(m => m.name === 'first-contentful-paint');
    const LCP = performance.getEntriesByType('largest-contentful-paint')[0];
    
    return {
      FCP: FCP ? FCP.startTime : null,
      LCP: LCP ? LCP.startTime : null,
      loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
      domElements: document.querySelectorAll('*').length,
      images: document.querySelectorAll('img').length,
      scripts: document.querySelectorAll('script').length,
      stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length
    };
  });
  
  // Performance targets
  const targets = {
    loadTime: 3000,  // 3 seconds
    FCP: 1800,       // 1.8 seconds
    LCP: 2500        // 2.5 seconds
  };
  
  console.log('📊 Performance Metrics:');
  console.log(`   Load Time: ${loadTime}ms ${loadTime <= targets.loadTime ? '✅' : '❌'} (Target: ${targets.loadTime}ms)`);
  console.log(`   FCP: ${metrics.FCP?.toFixed(0)}ms ${metrics.FCP <= targets.FCP ? '✅' : '❌'} (Target: ${targets.FCP}ms)`);
  console.log(`   LCP: ${metrics.LCP?.toFixed(0)}ms ${metrics.LCP <= targets.LCP ? '✅' : '❌'} (Target: ${targets.LCP}ms)`);
  
  console.log('\n📋 Resource Analysis:');
  console.log(`   DOM Elements: ${metrics.domElements}`);
  console.log(`   Images: ${metrics.images}`);
  console.log(`   Scripts: ${metrics.scripts}`);
  console.log(`   Stylesheets: ${metrics.stylesheets}`);
  
  // Check for performance issues
  const issues = [];
  if (loadTime > targets.loadTime) {
    issues.push(`Load time exceeds target (${loadTime}ms > ${targets.loadTime}ms)`);
  }
  if (metrics.FCP && metrics.FCP > targets.FCP) {
    issues.push(`First Contentful Paint exceeds target (${metrics.FCP.toFixed(0)}ms > ${targets.FCP}ms)`);
  }
  if (metrics.LCP && metrics.LCP > targets.LCP) {
    issues.push(`Largest Contentful Paint exceeds target (${metrics.LCP.toFixed(0)}ms > ${targets.LCP}ms)`);
  }
  
  console.log('\n⚡ Performance Assessment:');
  if (issues.length === 0) {
    console.log('✅ All performance targets met!');
  } else {
    console.log('⚠️ Performance Issues:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  await browser.close();
  
  return {
    loadTime,
    metrics,
    issues,
    passed: issues.length === 0
  };
}

// Only run if called directly (not required as module)
if (require.main === module) {
  performanceTest().catch(console.error);
}

module.exports = performanceTest;