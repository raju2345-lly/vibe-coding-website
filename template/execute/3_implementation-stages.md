# Step 3: Implementation Stages with To-Do Driven Development

## 🎯 Purpose
Execute the staged implementation plan from the design document, using to-do lists to track progress and ensure nothing is missed.

## 📋 Prerequisites
- [ ] Design document approved (`output/docs/strategy/design-document.md`)
- [ ] Staged implementation plan with to-do lists
- [ ] Human vibecoder available for real-time testing
- [ ] For content integration: Read all files in `output/content/production/[date]-[topic]/`
- [ ] For content integration: Review `visual-requirements-detailed.md` for design specs

## 🤖 AI Instructions

### Phase 0: Setup & Initialization

#### Step 0.1: Load Implementation Plan
```bash
# Read the design document to get stages
cat output/docs/strategy/design-document.md

# Create progress tracking file
echo "# Implementation Progress" > output/docs/strategy/implementation-progress.md
echo "Started: $(date)" >> output/docs/strategy/implementation-progress.md
```

### Phase 1: Stage-by-Stage Implementation

#### For Each Stage (Repeat for Stages 1-4):

#### Step 1.1: Present Stage To-Do List
**Show the to-do list to human vibecoder**

```markdown
## Current Stage: [Stage Name]
### To-Do List:
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
[etc...]

Ready to begin this stage? (Human approval required)
```

#### Step 1.2: Execute To-Do Items Systematically

**For Stage 1: Foundation Setup**
```bash
# Initialize project
npx create-next-app@latest website --typescript --tailwind --app --no-src-dir
cd website

# Install dependencies
npm install framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install @headlessui/react @heroicons/react

# Create folder structure
mkdir -p app/components/ui
mkdir -p app/components/layout
mkdir -p app/lib
mkdir -p public/images

# Start development server
npm run dev
```

**Human Checkpoint**: "Please visit http://localhost:3000 to verify setup"

#### Step 1.3: Mark To-Do Items Complete
Update progress file after each completed task:

```bash
echo "✅ Stage 1: Foundation Setup - Task 1 Complete" >> output/docs/strategy/implementation-progress.md
```

### Phase 2: Real-Time Collaboration Protocol

#### Step 2.1: Feature Implementation Loop
For each feature in the to-do list:

1. **Announce Feature**
   ```
   "Now implementing: [Feature Name]"
   "This will add: [Brief description]"
   ```

2. **Implement Feature**
   - Write code
   - Save files
   - Hot reload updates automatically

3. **Request Testing**
   ```
   "Feature implemented! Please test:
   - Visit http://localhost:3000/[page]
   - Check [specific functionality]
   - Verify [visual elements]"
   ```

4. **Wait for Feedback**
   - If approved: Mark complete, move to next
   - If issues: Fix immediately, retest

#### Step 2.2: Stage Completion Checkpoint
After all to-do items in a stage:

```markdown
## Stage [X] Complete!

### Completed Tasks:
✅ Task 1
✅ Task 2
✅ Task 3

### Test Results:
- Functionality: [Human feedback]
- Visual Design: [Human feedback]
- Performance: [Metrics]

Ready to proceed to Stage [X+1]? (Human approval required)
```

### Phase 2.5: Content Integration Mode (When Adding Blog/Articles)

#### Detect Content Integration Context
```bash
# Check if this is content integration vs initial development
if [ -d "output/content/production" ] && [ -d "output/website" ]; then
    echo "Content Integration Mode Detected"
    # Read all content production files
    ls -la output/content/production/*/
fi
```

#### Content Integration Steps
1. **Read ALL content files**:
   - `final-article.md` - The approved content
   - `visual-requirements-detailed.md` - Design specifications
   - `distribution-package.md` - Social media snippets
   - `content-brief.md` - Context and goals

2. **Create blog structure**:
   ```bash
   mkdir -p output/website/app/blog
   mkdir -p output/website/app/blog/[article-slug]
   ```

3. **Implement visual requirements**:
   - Hero images/infographics as specified
   - Color palette from visual requirements
   - Charts/comparisons as designed
   - Mobile-optimized touch targets (44px+)

4. **Add to main navigation**:
   - Update homepage with article links
   - Add blog to navigation menu
   - Ensure proper routing

### Phase 3: Implementation Examples by Stage

#### Stage 1: Foundation Setup To-Dos
```typescript
// app/layout.tsx - Base layout implementation
import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

#### Stage 2: Core Features To-Dos
```typescript
// app/page.tsx - Landing page with hero
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Contact from './components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Contact />
    </>
  )
}
```

#### Stage 3: Content & Optimization To-Dos
```typescript
// app/components/seo/SEOHead.tsx
export default function SEOHead({
  title,
  description,
  image,
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* Additional SEO tags */}
    </>
  )
}
```

### Phase 4: Quality Assurance Per Stage

#### Step 4.1: Stage Testing Checklist
After each stage completion:

```markdown
## Stage [X] Testing Checklist

### Functionality Tests
- [ ] All features working as expected
- [ ] Forms submitting correctly
- [ ] Links navigating properly
- [ ] Error states handled

### Visual Tests
- [ ] Desktop responsive (1920px)
- [ ] Tablet responsive (768px)
- [ ] Mobile responsive (375px)
- [ ] Dark mode (if applicable)

### Performance Tests
- [ ] Page load < 3 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Images optimized
```

### Phase 5: Documentation & Handoff

#### Step 5.1: Update Progress Documentation
```bash
# Final progress update
cat >> output/docs/strategy/implementation-progress.md << EOF

## Implementation Summary
- Total Stages Completed: 4/4
- Total Tasks Completed: [X]/[Y]
- Development Time: [Days]
- Human Feedback Incorporated: [Count]

## Key Features Implemented
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

## Ready for Testing Phase
All stages complete. Website ready for comprehensive testing.
EOF
```

### Phase 6: MANDATORY Quality Review & Rating (9.5+/10 Required)

#### Step 6.1: Comprehensive Quality Assessment
**CRITICAL**: Implementation must achieve 9.5+/10 rating before proceeding

```markdown
## Quality Rating Checklist (Rate Each 1-10)

### 1. Functionality Tests
- [ ] All features working as expected
- [ ] Forms submitting correctly  
- [ ] Links navigating properly
- [ ] WhatsApp/contact buttons functional
- [ ] Error states handled gracefully
- [ ] Touch targets minimum 44px on mobile
**Functionality Rating: __/10**

### 2. Visual Design Tests
- [ ] Desktop responsive (1920px)
- [ ] Tablet responsive (768px)
- [ ] Mobile responsive (375px)
- [ ] Visual requirements implemented (if provided)
- [ ] Color scheme consistent
- [ ] Typography hierarchy clear
- [ ] Professional aesthetic achieved
**Visual Design Rating: __/10**

### 3. Content Quality
- [ ] All content integrated correctly
- [ ] SEO metadata complete
- [ ] Readability optimized
- [ ] Strategic CTAs placed
- [ ] Images/placeholders appropriate
- [ ] No lorem ipsum or placeholder text
**Content Quality Rating: __/10**

### 4. Performance & SEO
- [ ] Page load < 3 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Meta tags complete
- [ ] OpenGraph/Twitter cards configured
- [ ] Sitemap updated
- [ ] Mobile-first implementation
**Performance Rating: __/10**

### 5. User Experience
- [ ] Intuitive navigation
- [ ] Clear visual hierarchy
- [ ] Consistent branding
- [ ] Conversion-focused design
- [ ] Accessibility standards met
- [ ] Error handling user-friendly
**UX Rating: __/10**

## Overall Rating Calculation
Total Score: (__+__+__+__+__) / 5 = __/10

⚠️ IF RATING < 9.5: Must improve before proceeding!
✅ IF RATING ≥ 9.5: Ready for next phase!
```

#### Step 6.2: Improvement Implementation (If Rating < 9.5)
**If any category scores below 9.5, implement improvements:**

```markdown
## Required Improvements

### Identified Issues (Score < 9.5):
1. [Category]: [Specific issue] - Current: __/10
2. [Category]: [Specific issue] - Current: __/10

### Improvement Actions:
- [ ] Fix [specific issue 1]
- [ ] Enhance [specific issue 2]
- [ ] Optimize [specific issue 3]

### Re-test After Improvements:
- Repeat quality assessment
- Document new scores
- Continue until 9.5+ achieved
```

#### Step 6.3: Final Quality Certification
**Save quality assessment to single standard file:**
```bash
# Always update the same quality assessment file (no duplicates!)
QUALITY_FILE="output/docs/strategy/quality-rating-assessment.md"

# Update existing file or create if doesn't exist
cat > "$QUALITY_FILE" << 'EOF'
# Quality Rating Assessment - Step 3 Implementation
**Date**: [Current Date]
**Assessment Type**: [Stage/Phase]

## Quality Certification

✅ **CERTIFIED**: Implementation achieves __/10 rating

### Exceptional Areas (9.5+):
- [Category 1]: __/10
- [Category 2]: __/10

### Approved By:
- AI Implementation: [Date/Time]
- Human Vibecoder: [Approval confirmation]

Ready to proceed to Step 4: Testing & Validation
EOF
```

## 📊 Success Metrics
- All to-do items completed for each stage
- Human vibecoder approved each stage
- Website running at http://localhost:3000
- No critical bugs or issues
- Progress documented throughout
- **MANDATORY: Quality rating ≥ 9.5/10**

## 🔄 Human Collaboration Points
1. **Stage Start**: Review to-do list together
2. **During Development**: Test each feature as built
3. **Stage End**: Approve before moving to next
4. **Issue Resolution**: Fix problems immediately
5. **Final Review**: Complete walkthrough together

## 🚀 Next Steps
After all stages complete, proceed to Step 4: Testing & Validation