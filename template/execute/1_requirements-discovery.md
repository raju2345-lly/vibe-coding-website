# AI Agent Script: Requirements Discovery with Clarifying Questions

## 🎯 Purpose
Use proven methodology to gather complete requirements through systematic clarifying questions, achieving 95% understanding before creating the PRD.

**UNIVERSAL APPLICATION**: Works for ANY website type - e-commerce stores, educational platforms, religious organizations, anime/gaming communities, restaurants, healthcare providers, SaaS products, portfolios, or any other website you can imagine.

## 📋 Prerequisites Check
**CRITICAL: AI Agent MUST verify all prerequisites before proceeding**

### Required Files & Documentation
- [ ] `input/website-requirement.md` exists with initial requirements
- [ ] Human vibecoder is available for interactive Q&A session

### Validation Commands
```bash
# Check if requirements file exists
if [ ! -f "input/website-requirement.md" ]; then
  echo "❌ ERROR: input/website-requirement.md not found"
  echo "Please create the requirements file first"
  exit 1
fi

# Create output directories
mkdir -p output/docs/requirements
mkdir -p output/docs/strategy
```

## 🤖 AI Agent Instructions

### Phase 1: Clarifying Questions Session (MANDATORY)
**Status: 🔄 Active Phase**

#### Step 1.1: Initial Requirements Review
**Read the initial requirements to understand baseline**

```bash
# Read the requirements file
cat input/website-requirement.md
```

#### Step 1.2: Systematic Clarifying Questions
**ASK QUESTIONS ONE AT A TIME until 95% confidence achieved**

Required question categories (ask in order):
1. **Business Goals & KPIs**
   - "What is the primary business goal for this website?"
   - "What specific KPIs will measure success?"
   - "What is your revenue model?"

2. **Target Audience**
   - "Who is your primary target audience?"
   - "What are their pain points?"
   - "What actions do you want them to take?"

3. **Competition & Differentiation**
   - "Who are your top 3 competitors?"
   - "What makes you different from them?"
   - "What features do competitors have that you want/don't want?"

4. **Features & Functionality**
   - "What are your must-have features?"
   - "What are nice-to-have features?"
   - "Any specific integrations required?"

5. **Content & Marketing**
   - "What type of content will you create?"
   - "What marketing channels will you use?"
   - "Do you have existing brand guidelines?"

6. **Technical Requirements**
   - "Any specific technology preferences?"
   - "Performance requirements?"
   - "Security or compliance needs?"

7. **Timeline & Budget**
   - "What is your launch timeline?"
   - "What is your budget range?"
   - "Any critical deadlines?"

8. **Success Criteria**
   - "How will you measure success in 30 days?"
   - "What would make this project a failure?"
   - "Long-term vision for the website?"

**IMPORTANT**: Continue asking follow-up questions based on answers until you have 95% confidence in understanding.

#### Step 1.3: Document All Answers
Create `output/docs/requirements/clarifying-questions-answers.md`

```bash
# Read the requirements file
cat input/website-requirement.md

# Extract key sections
grep -A 5 "Business Goals" input/website-requirement.md
grep -A 5 "Target Audience" input/website-requirement.md
grep -A 5 "Success Metrics" input/website-requirement.md
```

#### Step 1.2: Extract Key Information
Analyze and document:
   - Business type and industry
   - Target audience demographics
   - Core value proposition
   - Desired user actions (sales, leads, signups)
   - Content types needed
   - Technical requirements

#### Step 1.3: Research Competition
**Research current market and competitors**
1. Search for top 3-5 competitors in the industry
2. Analyze their:
   - Conversion strategies
   - SEO approach
   - Content structure
   - User journey flow
   - Technical stack (if visible)

**✅ Phase 1 Complete Criteria:**
- Requirements file read and analyzed
- Key business goals extracted
- Target audience identified
- Competitor research completed
- Market insights gathered

---

### Phase 2: PRD Document Creation (30 min)
**Status: ⏸️ Waiting for Phase 1 Completion**

#### Step 2.1: Generate Comprehensive PRD
**Create `output/docs/requirements/website-prd.md` based on analyzed requirements**

```markdown
# Website Product Requirements Document

## Executive Summary
[Brief overview of the website project and its strategic importance]

## Business Objectives
- Primary conversion goal: [e.g., product sales, lead generation]
- Secondary goals: [newsletter signups, content engagement]
- KPIs to track: [conversion rate, bounce rate, time on site]

## Target Audience Profiles
### Primary Persona
- Demographics: [age, location, income]
- Pain points: [3-5 key problems they face]
- Goals: [what they want to achieve]
- Online behavior: [how they search, what platforms they use]

### Secondary Personas
[Additional audience segments if applicable]

## Core Features

### 1. Conversion-Focused Homepage
- Hero section with clear value proposition
- Trust signals (testimonials, badges, logos)
- Primary CTA above the fold
- Secondary CTAs for different user intents

### 2. Content Structure
- Landing pages for each conversion path
- Blog/resource section for SEO content
- Product/service pages with detailed information
- Case studies/success stories

### 3. User Journey Funnels
- Awareness stage: [educational content, SEO pages]
- Consideration stage: [comparison pages, case studies]
- Decision stage: [pricing, demos, trials]
- Post-purchase: [support, upsells, retention]

### 4. Technical Requirements
- Framework: [Next.js/Gatsby/Astro recommended for SEO]
- CMS: [Headless CMS for content management]
- Hosting: [Vercel/Netlify for performance]
- Analytics: [GA4 + GTM setup required]

### 5. SEO & AI Search Optimization
- Core Web Vitals compliance (LCP < 2.5s, INP < 200ms)
- Schema markup for all content types
- AI-optimized content structure (Q&A format, clear headings)
- Mobile-first responsive design

### 6. Conversion Elements
- Exit-intent popups
- Social proof widgets
- Live chat/chatbot
- A/B testing capability
- Progressive disclosure forms

### 7. Analytics & Tracking
- Google Tag Manager container
- Conversion tracking for all goals
- Heat mapping setup
- User session recording capability
- Custom event tracking

## Content Requirements

### SEO Content Strategy
- Keyword research targeting [X] primary keywords
- Content calendar for [frequency] publishing
- Pillar pages for main topics
- Supporting cluster content

### Conversion Content
- Landing pages for paid campaigns
- Email capture incentives (lead magnets)
- Product/service demos or trials
- Trust-building content (about, testimonials)

## User Experience Requirements

### Performance
- Page load time < 3 seconds
- Core Web Vitals passing scores
- 98+ PageSpeed Insights score

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization

### Mobile Experience
- Touch-optimized interfaces
- Mobile-specific CTAs
- Simplified navigation

## Integration Requirements
- Google Analytics 4
- Google Tag Manager
- Google AdSense (if monetizing)
- CRM integration [specify system]
- Email marketing platform
- Payment processing (if e-commerce)

## Success Metrics
- Conversion rate: [target %]
- Average session duration: [target time]
- Bounce rate: [target %]
- Organic traffic growth: [target %/month]
- Lead quality score: [define scoring]

## Timeline & Phases
- Phase 1: Core website with conversion paths
- Phase 2: SEO optimization and content
- Phase 3: Analytics and optimization
- Phase 4: Advanced features and scaling

## Risk Mitigation
- SEO risks and mitigation strategies
- Performance optimization plan
- Security considerations
- Compliance requirements (GDPR, CCPA)
```

#### Step 2.2: Validate with AI Search Optimization
Ensure PRD includes:
- Generative Engine Optimization (GEO) considerations
- Answer Engine Optimization (AEO) requirements
- Multi-platform search optimization (Google, AI assistants, social)
- Voice search optimization needs

#### Step 2.3: Create Technical Specification
**Generate `output/docs/requirements/website-tech-spec-mvp.md` with MVP focus**
- Detailed technical architecture
- API requirements
- Database schema (if needed)
- Third-party service integrations
- Security requirements

#### Step 2.4: Create Competitor Analysis
**Generate `output/docs/requirements/competitor-analysis.md`**

```markdown
# Competitor Analysis Report

## Competitors Analyzed
[Based on input/website-requirement.md competitors list]

## Key Findings
- Conversion strategies used
- Content gaps identified
- Technical stack insights
- SEO opportunities

## Our Differentiation Strategy
[How we'll stand out]
```

**✅ Phase 2 Complete Criteria:**
- PRD document created with all sections
- Technical specification documented
- Competitor analysis completed
- All files saved in correct locations

---

### Phase 3: Review & Validation (10 min)
**Status: ⏸️ Waiting for Phase 2 Completion**

#### Step 3.1: Internal Validation
- Verify PRD aligns with requirements
- Check technical feasibility
- Ensure measurable success metrics
- Validate competitor differentiation

#### Step 3.2: Prepare Human Review Package
Create summary for human approval:
- Executive summary of PRD
- Key decisions and rationale
- Risk assessment
- Timeline estimation

**✅ Phase 3 Complete Criteria:**
- All documents internally validated
- Summary prepared for human review
- Files organized and accessible

---

## 🔄 Human Checkpoint
**Present PRD package to human for review:**

### Executive Summary
- **Business Goals**: [Extracted from requirements]
- **Target Audience**: [Primary and secondary personas]
- **Key Features**: [Top 5 features prioritized]
- **Success Metrics**: [Specific, measurable targets]
- **Timeline**: [Estimated phases and duration]

### Deliverables Created
- ✅ `output/docs/requirements/website-prd.md`
- ✅ `output/docs/requirements/website-tech-spec-mvp.md`
- ✅ `output/docs/requirements/competitor-analysis.md`

**Human Decision Required:**
- 🟢 **APPROVED** - Proceed to strategy phase
- 🟡 **NEEDS FIXES** - [Specify required changes]
- 🔴 **RESTART** - Fundamental requirements revision needed

## ✅ Success Criteria

### Phase 1 Success
- [ ] Requirements file successfully read and analyzed
- [ ] All key sections extracted and documented
- [ ] Competitor research completed with insights
- [ ] Market opportunities identified

### Phase 2 Success  
- [ ] PRD comprehensively covers all conversion optimization aspects
- [ ] SEO and AI search strategies clearly defined
- [ ] Technical requirements specific and achievable
- [ ] Success metrics measurable and realistic
- [ ] Competitor analysis provides actionable insights

### Phase 3 Success
- [ ] All documents pass internal validation
- [ ] Executive summary clearly communicates value
- [ ] Human approves the PRD package

## 📝 Output Files Structure
```
output/docs/requirements/
├── website-prd.md              # Comprehensive PRD
├── website-tech-spec-mvp.md    # MVP technical specifications
└── competitor-analysis.md       # Competitive insights
```

**Each file must include:**
- Clear section headers
- Specific, actionable content
- Measurable success criteria
- Links to source requirements

## 📊 Progress Tracking

### Phase Status
- [ ] Phase 1: Requirements Analysis (20 min)
- [ ] Phase 2: PRD Creation (30 min)
- [ ] Phase 3: Review & Validation (10 min)
- [ ] Human Approval Received

### Time Allocation
- Phase 1: 20 minutes (Analysis)
- Phase 2: 30 minutes (Documentation)
- Phase 3: 10 minutes (Validation)
- **Total Estimated Time: 60 minutes**

---

## 🚨 Important Notes & Requirements

### Critical Implementation Guidelines
- **Always verify prerequisites** before starting any work
- **Read input files completely** before generating output
- **Reference source requirements** in all generated documents
- **Focus on conversion optimization** from the start
- **Include 2025 SEO best practices** (AI search, Core Web Vitals)
- **Plan for continuous optimization** and testing
- **Consider privacy regulations** in all tracking implementations

### Quality Standards
- PRD must be specific, not generic
- Technical specs must be implementable
- Success metrics must be measurable
- Timeline must be realistic
- All documents must be consistent with requirements