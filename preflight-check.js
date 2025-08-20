const fs = require('fs');
const { execSync } = require('child_process');

function runPreflightChecks() {
  const checks = {
    timestamp: new Date().toISOString(),
    environment: {
      node: process.version,
      npm: execSync('npm --version').toString().trim(),
      platform: process.platform,
      arch: process.arch
    },
    git: {
      configured: false,
      branch: 'unknown',
      cleanWorkingTree: false
    },
    mcp: {
      puppeteer: false,
      context7: false
    },
    errors: []
  };

  // Check Git
  try {
    checks.git.branch = execSync('git branch --show-current').toString().trim();
    checks.git.cleanWorkingTree = execSync('git status --porcelain').toString().trim() === '';
    checks.git.configured = true;
  } catch (e) {
    checks.errors.push('Git not configured properly');
  }

  // Check MCP servers (optional for now)
  try {
    execSync('npm list -g @modelcontextprotocol/server-puppeteer 2>/dev/null');
    checks.mcp.puppeteer = true;
  } catch (e) {
    // Not critical for basic setup
  }

  // Check critical directories
  const requiredDirs = ['input', 'template', 'output'];
  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      checks.errors.push(`Missing directory: ${dir}`);
    }
  });

  // Generate report
  console.log('🔍 Pre-Flight Check Results:\n');
  console.log('Environment:');
  console.log(`  Node: ${checks.environment.node} ${checks.environment.node.match(/v18|v19|v20|v21|v22/) ? '✅' : '⚠️ (Need v18+)'}`);
  console.log(`  Platform: ${checks.environment.platform}/${checks.environment.arch}`);
  
  console.log('\nGit Status:');
  console.log(`  Branch: ${checks.git.branch}`);
  console.log(`  Clean: ${checks.git.cleanWorkingTree ? '✅' : '⚠️ Uncommitted changes'}`);
  
  console.log('\nMCP Servers:');
  console.log(`  Puppeteer: ${checks.mcp.puppeteer ? '✅' : '⚠️ Optional for now'}`);
  console.log(`  Context7: ${checks.mcp.context7 ? '✅' : '⚠️ Optional for now'}`);
  
  console.log('\nDirectories:');
  requiredDirs.forEach(dir => {
    console.log(`  ${dir}: ${fs.existsSync(dir) ? '✅' : '❌'}`);
  });
  
  if (checks.errors.length > 0) {
    console.log('\n⚠️ Issues Found:');
    checks.errors.forEach(err => console.log(`  - ${err}`));
    
    if (checks.errors.some(err => err.includes('Missing directory'))) {
      console.log('\n📝 Critical directories missing - they will be created during setup');
    }
  } else {
    console.log('\n✅ All checks passed! Ready to proceed.');
  }
  
  // Save report
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output', { recursive: true });
  }
  fs.writeFileSync('output/preflight-report.json', JSON.stringify(checks, null, 2));
  return checks;
}

// Run if executed directly
if (require.main === module) {
  runPreflightChecks();
}

module.exports = runPreflightChecks;