const puppeteer = require('puppeteer');

async function responsiveTest() {
  console.log('📱 Starting Responsive Design Tests...\n');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const viewports = [
    { name: 'Mobile-Small', width: 375, height: 667, device: 'iPhone SE' },
    { name: 'Mobile-Large', width: 390, height: 844, device: 'iPhone 12' },
    { name: 'Tablet', width: 768, height: 1024, device: 'iPad' },
    { name: 'Desktop', width: 1920, height: 1080, device: 'Desktop' }
  ];
  
  const allIssues = [];
  
  for (const viewport of viewports) {
    console.log(`🔍 Testing ${viewport.name} (${viewport.device})...`);
    
    await page.setViewport({
      width: viewport.width,
      height: viewport.height
    });
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Take screenshot
    await page.screenshot({
      path: `test/screenshots/${viewport.name.replace(' ', '-')}.png`,
      fullPage: true
    });
    
    // Check for layout issues
    const issues = await page.evaluate((viewportInfo) => {
      const problems = [];
      
      // Check for horizontal scroll
      if (document.body.scrollWidth > window.innerWidth) {
        problems.push(`Horizontal scroll detected (${document.body.scrollWidth}px > ${window.innerWidth}px)`);
      }
      
      // Check touch target sizes on mobile
      if (viewportInfo.width < 768) {
        const interactives = document.querySelectorAll('button, a, input, select');
        interactives.forEach(el => {
          const rect = el.getBoundingClientRect();
          const size = Math.min(rect.width, rect.height);
          
          if (size > 0 && size < 44) {
            problems.push(`Touch target too small: ${el.tagName} (${size.toFixed(0)}px < 44px)`);
          }
        });
      }
      
      // Check text readability
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      let smallTextCount = 0;
      
      textElements.forEach(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        
        if (fontSize < 14 && el.textContent.trim().length > 0) {
          smallTextCount++;
        }
      });
      
      if (smallTextCount > 10) {
        problems.push(`Many text elements below 14px (${smallTextCount} elements)`);
      }
      
      // Check navigation visibility
      const nav = document.querySelector('nav');
      if (nav) {
        const navRect = nav.getBoundingClientRect();
        if (navRect.width === 0 || navRect.height === 0) {
          problems.push('Navigation not visible');
        }
      }
      
      // Check main content area
      const main = document.querySelector('main');
      if (main) {
        const mainRect = main.getBoundingClientRect();
        if (mainRect.width < viewportInfo.width * 0.8) {
          problems.push(`Main content too narrow (${mainRect.width.toFixed(0)}px < ${(viewportInfo.width * 0.8).toFixed(0)}px)`);
        }
      }
      
      return problems;
    }, viewport);
    
    console.log(`   Resolution: ${viewport.width}x${viewport.height}`);
    console.log(`   Issues: ${issues.length === 0 ? '✅ None' : '⚠️ ' + issues.length}`);
    
    if (issues.length > 0) {
      issues.forEach(issue => console.log(`     - ${issue}`));
      allIssues.push(...issues.map(issue => `${viewport.name}: ${issue}`));
    }
    
    console.log(`   Screenshot: test/screenshots/${viewport.name.replace(' ', '-')}.png\n`);
  }
  
  console.log('📱 Responsive Design Assessment:');
  if (allIssues.length === 0) {
    console.log('✅ All viewports passed responsive design tests!');
  } else {
    console.log(`⚠️ Found ${allIssues.length} responsive design issues:`);
    allIssues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  await browser.close();
  
  return {
    issues: allIssues,
    viewportsTested: viewports.length,
    passed: allIssues.length === 0
  };
}

// Only run if called directly
if (require.main === module) {
  responsiveTest().catch(console.error);
}

module.exports = responsiveTest;