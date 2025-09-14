const puppeteer = require('puppeteer');

async function accessibilityTest() {
  console.log('♿ Starting Accessibility Tests...\n');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  
  const issues = await page.evaluate(() => {
    const problems = [];
    
    // Check alt text for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt || img.alt.trim() === '') {
        problems.push(`Missing alt text for image: ${img.src || 'unknown'}`);
      }
    });
    
    // Check form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const hasLabel = input.labels && input.labels.length > 0;
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasPlaceholder = input.getAttribute('placeholder');
      
      if (!hasLabel && !hasAriaLabel && !hasPlaceholder) {
        problems.push(`Missing label for input: ${input.name || input.id || input.type}`);
      }
    });
    
    // Check heading hierarchy
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;
    let h1Count = 0;
    
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (h.tagName === 'H1') h1Count++;
      
      if (level - lastLevel > 1 && lastLevel !== 0) {
        problems.push(`Heading hierarchy skip: ${h.tagName} after H${lastLevel}`);
      }
      lastLevel = level;
    });
    
    if (h1Count === 0) {
      problems.push('No H1 heading found on page');
    } else if (h1Count > 1) {
      problems.push(`Multiple H1 headings found (${h1Count})`);
    }
    
    // Check for keyboard navigation
    const interactives = document.querySelectorAll('a, button, input, select, textarea');
    interactives.forEach(el => {
      if (el.tabIndex < -1) {
        problems.push(`Element not keyboard accessible: ${el.tagName}`);
      }
    });
    
    // Check for semantic landmarks
    const landmarks = document.querySelectorAll('main, nav, header, footer, aside, section');
    if (landmarks.length === 0) {
      problems.push('No semantic landmarks found');
    }
    
    // Check button accessibility
    const buttons = document.querySelectorAll('button, [role="button"]');
    buttons.forEach(btn => {
      const hasText = btn.textContent.trim().length > 0;
      const hasAriaLabel = btn.getAttribute('aria-label');
      const hasTitle = btn.getAttribute('title');
      
      if (!hasText && !hasAriaLabel && !hasTitle) {
        problems.push('Button without accessible text found');
      }
    });
    
    // Check links
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const hasText = link.textContent.trim().length > 0;
      const hasAriaLabel = link.getAttribute('aria-label');
      const hasTitle = link.getAttribute('title');
      
      if (!hasText && !hasAriaLabel && !hasTitle) {
        problems.push('Link without accessible text found');
      }
      
      // Check for external links
      if (link.hostname && link.hostname !== window.location.hostname) {
        const hasTargetBlank = link.target === '_blank';
        const hasRelNoopener = link.rel && link.rel.includes('noopener');
        
        if (hasTargetBlank && !hasRelNoopener) {
          problems.push('External link missing rel="noopener"');
        }
      }
    });
    
    return {
      problems,
      stats: {
        images: images.length,
        inputs: inputs.length,
        headings: headings.length,
        h1Count,
        interactives: interactives.length,
        landmarks: landmarks.length,
        buttons: buttons.length,
        links: links.length
      }
    };
  });
  
  console.log('📊 Accessibility Analysis:');
  console.log(`   Images: ${issues.stats.images}`);
  console.log(`   Form inputs: ${issues.stats.inputs}`);
  console.log(`   Headings: ${issues.stats.headings} (H1: ${issues.stats.h1Count})`);
  console.log(`   Interactive elements: ${issues.stats.interactives}`);
  console.log(`   Semantic landmarks: ${issues.stats.landmarks}`);
  console.log(`   Buttons: ${issues.stats.buttons}`);
  console.log(`   Links: ${issues.stats.links}`);
  
  console.log('\n♿ Accessibility Assessment:');
  if (issues.problems.length === 0) {
    console.log('✅ No accessibility issues found!');
  } else {
    console.log(`⚠️ Found ${issues.problems.length} accessibility issues:`);
    issues.problems.forEach(issue => console.log(`   - ${issue}`));
  }
  
  await browser.close();
  
  return {
    issues: issues.problems,
    stats: issues.stats,
    passed: issues.problems.length === 0
  };
}

// Only run if called directly
if (require.main === module) {
  accessibilityTest().catch(console.error);
}

module.exports = accessibilityTest;