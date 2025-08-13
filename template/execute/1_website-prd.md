# AI Agent Script: Website PRD Creation

## 🎯 Purpose
Transform user requirements into a comprehensive Product Requirements Document (PRD) for a high-converting, SEO-optimized website.

## 📋 Prerequisites
- `input/website-requirement.md` exists with user requirements
- User has specified business goals and target audience

## 🤖 AI Agent Instructions

### Step 1: Analyze Requirements
1. Read `input/website-requirement.md`
2. Extract:
   - Business type and industry
   - Target audience demographics
   - Core value proposition
   - Desired user actions (sales, leads, signups)
   - Content types needed
   - Technical requirements

### Step 2: Research Competition
1. Search for top 3-5 competitors in the industry
2. Analyze their:
   - Conversion strategies
   - SEO approach
   - Content structure
   - User journey flow
   - Technical stack (if visible)

### Step 3: Generate PRD
Create `output/docs/requirements/website-prd.md` with:

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

### Step 4: Validate with AI Search Optimization
Ensure PRD includes:
- Generative Engine Optimization (GEO) considerations
- Answer Engine Optimization (AEO) requirements
- Multi-platform search optimization (Google, AI assistants, social)
- Voice search optimization needs

### Step 5: Create Technical Specification
Generate `output/docs/requirements/website-tech-spec.md` with:
- Detailed technical architecture
- API requirements
- Database schema (if needed)
- Third-party service integrations
- Security requirements

## 🔄 Human Checkpoint
Present PRD to human for review:
- "I've created a comprehensive PRD for your website project"
- "Key focus areas: [list top 3]"
- "Please review and respond with: APPROVED, NEEDS FIXES, or RESTART"

## ✅ Success Criteria
- PRD comprehensively covers all conversion optimization aspects
- SEO and AI search strategies are clearly defined
- Technical requirements are specific and achievable
- Success metrics are measurable and realistic
- Human approves the PRD

## 📝 Output Files
- `output/docs/requirements/website-prd.md`
- `output/docs/requirements/website-tech-spec.md`
- `output/docs/requirements/competitor-analysis.md` (optional)

## 🚨 Important Notes
- Focus on conversion optimization from the start
- Include 2025 SEO best practices (AI search, Core Web Vitals)
- Plan for continuous optimization and testing
- Consider privacy regulations in all tracking implementations