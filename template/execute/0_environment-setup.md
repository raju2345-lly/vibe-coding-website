# Step 0: Pre-Flight Checks (One-Time Setup)

## 🎯 Purpose
Validate your environment has the required tools for efficient development.

## 🤖 AI Instructions

### Phase 1: Environment Validation

#### Step 1.1: System Requirements Check
```bash
# Check Node version (should be 18+ for Next.js 14)
node --version

# Check npm version
npm --version

# Check Git configuration
git config --get user.name
git config --get user.email

# Verify MCP servers installed
npm list -g @modelcontextprotocol/server-puppeteer
npm list -g @upstash/context7-mcp
```

#### Step 1.2: Create Environment Report
```javascript
// test/preflight-check.js
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

  // Check MCP servers
  try {
    execSync('npm list -g @modelcontextprotocol/server-puppeteer');
    checks.mcp.puppeteer = true;
  } catch (e) {
    checks.errors.push('Puppeteer MCP server not installed');
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
  console.log(`  Node: ${checks.environment.node} ${checks.environment.node.match(/v18|v19|v20/) ? '✅' : '⚠️ (Need v18+)'}`);
  console.log(`  Platform: ${checks.environment.platform}/${checks.environment.arch}`);
  
  console.log('\nGit Status:');
  console.log(`  Branch: ${checks.git.branch}`);
  console.log(`  Clean: ${checks.git.cleanWorkingTree ? '✅' : '⚠️ Uncommitted changes'}`);
  
  console.log('\nMCP Servers:');
  console.log(`  Puppeteer: ${checks.mcp.puppeteer ? '✅' : '❌ Not installed'}`);
  console.log(`  Context7: ${checks.mcp.context7 ? '✅' : '❌ Not installed'}`);
  
  if (checks.errors.length > 0) {
    console.log('\n⚠️ Issues Found:');
    checks.errors.forEach(err => console.log(`  - ${err}`));
    console.log('\n📝 Fix Instructions:');
    
    if (!checks.mcp.puppeteer) {
      console.log('  npm install -g @modelcontextprotocol/server-puppeteer');
    }
    if (!checks.mcp.context7) {
      console.log('  npm install -g @upstash/context7-mcp');
    }
    console.log('  Then restart Claude Code');
    
    process.exit(1);
  } else {
    console.log('\n✅ All checks passed! Ready to proceed.');
  }
  
  // Save report
  fs.writeFileSync('output/preflight-report.json', JSON.stringify(checks, null, 2));
  return checks;
}

// Run if executed directly
if (require.main === module) {
  runPreflightChecks();
}

module.exports = runPreflightChecks;
```

### Phase 2: Project Initialization

#### Step 2.1: Basic Setup Check
```bash
# Check if project exists
if [ ! -f "output/website/package.json" ]; then
  echo "⚠️ Next.js project not found in output/website"
  echo "Will be created during Step 3: Coding"
fi

# Basic development tools (optional)
echo "📋 Recommended tools:"
echo "  - Prettier for formatting"
echo "  - ESLint for code quality"
echo "  - Puppeteer for visual testing (already configured)"
```

### Phase 3: Ready to Start

All essential tools are now validated. The workflow will handle:
- Project setup in Step 3 (Coding)
- Testing framework during development
- Deployment via Vercel in Step 5

## ✅ Pre-Flight Checklist

### Environment
- [ ] Node.js 18+ installed
- [ ] Git configured with user details
- [ ] MCP servers installed and running
- [ ] Working directory clean

### Project Setup
- [ ] Dependencies installed
- [ ] Linting configured
- [ ] Testing framework ready
- [ ] Git hooks configured

### Quality Tools
- [ ] Prettier formatting
- [ ] ESLint rules
- [ ] TypeScript strict mode
- [ ] Test coverage reporting

## 🚦 Human Checkpoint

**Question**: "Is your environment ready for production-grade development?"

Run: `node test/preflight-check.js`

- ✅ **READY** → Proceed to Step 1
- ⚠️ **ISSUES** → Fix environment problems
- ❌ **BLOCKED** → Install missing tools

## 💡 Why This Matters

- **Consistency**: Same environment = same results
- **Quality**: Automated checks prevent bad code
- **Speed**: No debugging environment issues later
- **Confidence**: Know your tools are working

---

*A proper setup saves hours of debugging later. Always run preflight checks!*