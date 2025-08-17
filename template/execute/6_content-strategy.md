# Step 6: Content Strategy & Planning

## 🎯 Purpose
Research, analyze, and plan a comprehensive content strategy aligned with business goals and audience needs.

**UNIVERSAL APPLICATION**: This template works for ANY industry or topic - e-commerce, education, religious content, anime/gaming, B2B services, healthcare, food & beverage, etc. The research and strategy process adapts to your specific niche.

## 📋 Prerequisites
- [ ] Website deployed or in development
- [ ] Business goals defined in PRD
- [ ] Target audience identified
- [ ] **MANDATORY**: `input/content-requirement.md` exists and approved by human
- [ ] **MANDATORY**: Human has explicitly approved content requirements

## 🚨 CRITICAL VIBE-CODING REQUIREMENTS

### ⛔ BEFORE PROCEEDING - MANDATORY HUMAN APPROVAL CHECKPOINT

**AI MUST NOT PROCEED WITHOUT:**
1. ✅ `input/content-requirement.md` exists and is complete
2. ✅ Human has explicitly reviewed and approved the requirements
3. ✅ Human has answered any clarifying questions to reach 95% understanding
4. ✅ Human has given explicit permission to begin content strategy work

**VIOLATION WARNING**: Creating content strategy without human approval violates vibe-coding methodology and must never happen again.

### 🎯 Mandatory Pre-Execution Questions

**AI must ask these questions and get human approval BEFORE proceeding:**

1. "I see you have `input/content-requirement.md`. Have you reviewed and approved this document?"
2. "Are there any changes you'd like to make to the content requirements before I proceed?"
3. "Do you explicitly approve me to begin creating the content strategy based on these requirements?"
4. "Should I ask any clarifying questions to reach 95% understanding of your needs?"

**Only after receiving explicit "YES" approval should AI proceed with strategy creation.**

## 🤖 AI Instructions (ONLY AFTER HUMAN APPROVAL)

### ⚠️ MANDATORY RESEARCH AND DATA INTEGRATION REQUIREMENTS

**CRITICAL**: AI must conduct ACTUAL RESEARCH and integrate ALL input data before creating any strategy documents.

**Data Integration Checklist**:
- [ ] Read and analyze `input/content-requirement.md` thoroughly
- [ ] Read and analyze `input/website-requirement.md` for business context
- [ ] Review `output/docs/requirements/website-prd.md` for detailed goals
- [ ] Check `output/docs/requirements/competitor-analysis.md` for market insights

**Research Requirements**:
- Use WebSearch to find current data (check today's date with environment variables)
- Verify all statistics from official sources (IRAS, HDB, CPF, MOM)
- Research actual user pain points from forums/Reddit/Facebook groups
- Get latest regulations, rates, and enforcement actions
- Research trending topics and recent policy changes
- NO assumptions or made-up demographics allowed

**Research Checklist Before Creating Strategy:**
- [ ] Industry statistics and market size from credible sources
- [ ] Current regulations/standards (ABSD rates, HDB rules, CPF limits)
- [ ] Target audience demographics from verified data
- [ ] Real user questions from forums/Reddit/Facebook groups
- [ ] Competitor content analysis (PropertyGuru, StackedHomes, 99.co)
- [ ] Current market trends and enforcement actions (IRAS investigations)
- [ ] Platform-specific communities for distribution
- [ ] Resource constraints from `input/content-requirement.md`

### Phase 0: Data Verification (NEW - MANDATORY)

#### Step 0.1: Verify Input Data Integration
```bash
# AI must verify all input data is loaded before proceeding
echo "Verifying input data sources..."

# Check required files exist
if [ ! -f "input/content-requirement.md" ]; then
    echo "ERROR: Missing input/content-requirement.md"
    exit 1
fi

if [ ! -f "output/docs/requirements/website-prd.md" ]; then
    echo "ERROR: Missing PRD documents. Run Step 1 first."
    exit 1
fi

# Confirm data points are extracted
echo "✓ Business objectives loaded"
echo "✓ Target audience segments identified"
echo "✓ Resource constraints acknowledged"
echo "✓ Success metrics defined"
```

### Phase 1: Content Research & Analysis

#### Step 1.1: Audience Research (WITH PROPER RESEARCH AND INPUT DATA)
```markdown
## Target Audience Analysis

### MANDATORY: Integration of Input Data
- Business objectives from `input/content-requirement.md`
- Target segments from `input/website-requirement.md`
- Success metrics from PRD documents
- Resource constraints and timeline

### MANDATORY: Research-Based Demographics
- Target market size: [Verify from industry sources]
- Age distribution: [From credible statistics]
- Geographic distribution: [Where audience is located]
- Relevant characteristics: [Industry-specific demographics]
- Special segments: [e.g., GIP programme participants]

### MANDATORY: Verified Pain Points
- Research from actual forums/Reddit/Facebook posts
- Common questions from community discussions
- Real problems faced (not assumptions)
- Industry-specific challenges
- Current enforcement concerns (e.g., IRAS investigations)

### MANDATORY: Content Consumption Reality
- Where target audience actually seeks information
- Specific groups/forums/subreddits identified
- Trust factors from research
- Actual search terms and keywords used
```

**CRITICAL File Management Rules**: 
1. NEVER create duplicate files like "revised" or "updated" versions
2. ALWAYS update the original file directly  
3. Use the Edit or MultiEdit tools, not Write for existing files
4. Maintain single source of truth for each document

#### Step 1.2: Competitor Content Analysis
```bash
# Analyze top 3 competitors
echo "## Competitor Content Analysis" > output/content/strategy/competitor-analysis.md

# For each competitor, document:
# - Content topics covered
# - Publishing frequency
# - Engagement rates
# - Content gaps/opportunities
```

#### Step 1.3: Keyword & Topic Research
```markdown
## Keyword Research Results

### Primary Keywords
1. [Keyword] - Search Volume: [X], Difficulty: [Y]
2. [Keyword] - Search Volume: [X], Difficulty: [Y]
3. [Keyword] - Search Volume: [X], Difficulty: [Y]

### Content Topics (Based on Search Intent)
1. **Informational**: How-to guides, tutorials
2. **Commercial**: Product comparisons, reviews
3. **Transactional**: Landing pages, offers
4. **Navigational**: Brand content, about pages
```

### Phase 2: Content Pillar Definition

#### Step 2.1: Define Content Strategy
```markdown
# Create consolidated strategy document
# output/content/strategy/content-strategy.md

## This single document will contain:
1. Content Pillars (Education 40%, Market Intel 25%, Success 20%, Lifestyle 15%)
2. 12-Week Content Pipeline with specific articles
3. Editorial Standards & Weekly Workflow
4. Performance Metrics & KPIs
5. Distribution Strategy & Channels

## Benefits of consolidation:
- Single source of truth
- No duplicate information
- Clear dependencies for Steps 7-10
- Easier human review and approval
```

#### Step 2.2: Supporting Research Documents
```markdown
# output/content/strategy/audience-analysis.md
# Detailed persona research and demographics

# output/content/strategy/keyword-research.md
# SEO keyword database and search volumes

## Complete Content Pipeline & Implementation Guide

### Strategy Overview
- Resource Reality Check (time available, pace, focus)
- Success Metrics (realistic monthly targets)
- 12-Week Content Pipeline (detailed table format)

### Phase 1: Replace Homepage Sections (Weeks 1-3)
[Detailed table with titles, sections replaced, hooks, keywords, conversion paths]

### Phase 2: Authority Building (Weeks 4-8)
[Detailed table with content types, purposes, conversion paths]

### Phase 3: Segment Targeting (Weeks 9-12)
[Detailed table targeting specific audience segments]

### Weekly Production Workflow
[Day-by-day breakdown with time allocations]

### Distribution Strategy (Realistic)
[Primary channels only, specific targets, what NOT to do yet]

### Quick Start Implementation
[Week 1 action plan, WhatsApp templates, setup checklist]

### Success Factors & Pitfalls
[Do's and don'ts for human vibecoder]

### Performance Tracking
[Simple tracking sheet, weekly review process]

### Scaling Plan (Month 4+)
[Future expansion phases]
```

### Phase 3: Finalize Consolidated Strategy

#### Step 3.1: Review and Finalize Strategy
```markdown
## All strategy elements now in one place:
- content-strategy.md contains everything
- No need to reference multiple files
- Clear input for Steps 7-10

## Archived/removed files:
- content-calendar.md (integrated)
- content-pillars.md (integrated)
- content-gap-analysis.md (insights integrated)
- content-formats-distribution.md (integrated)
- editorial-guidelines.md (integrated)
- content-kpis.md (integrated)
- CONTENT-STRATEGY-SUMMARY.md (replaced)
```

#### Step 3.2: Focused Distribution Strategy
```markdown
## Distribution Channels (Manageable Scope)

### Primary Channels (Focus Here)
- Website Blog: Primary content hub + SEO
- WhatsApp: Direct conversion channel
- Facebook Groups: 2-3 targeted groups (Singapore Expats, Property Talk)
- Reddit: 1-2 high-quality answers weekly (r/askSingapore, r/singaporefi)

### Future Channels (Month 4+)
- Email Newsletter: When subscriber base reaches 500+
- YouTube: Monthly videos repurposing best articles
- Paid Ads: $300/month Facebook budget
- Quora: If time permits after workflow established

### NOT Doing Initially (Resource Constraints)
- Daily social posting
- Multiple video platforms
- Multiple articles per week
- Daily community engagement
```

### Phase 4: Streamlined Production Workflow

#### Step 4.1: Include Production Workflow in Main Calendar
```markdown
# Include in output/content/strategy/content-calendar.md

## Weekly Production Workflow (10-15 hours total)
| Day | Task | Time | Output |
|-----|------|------|---------|
| Monday | Research + outline | 2-3 hours | Article structure + data |
| Tuesday | Write first draft | 3-4 hours | 1500-2000 word draft |
| Wednesday | Edit + SEO optimize | 2-3 hours | Final article ready |
| Thursday | Publish + distribute | 2-3 hours | Live + all channels |
| Friday | Engage + follow-up | 1-2 hours | Community responses |

## Content Requirements (From input/content-requirement.md)
- Brand voice from requirements document
- Keywords targeting from audience analysis
- Conversion focus (WhatsApp CTAs)
- Data-driven approach with official sources
- Current 2025 information only
```

#### Step 4.2: Simplified Creation Process
```markdown
## Production Process (Included in Main Calendar)

### Content Must Have:
- Specific numbers (not "save money" but "save $50K")
- Real examples (actual PR stories, not hypotheticals)
- Current data (2025 rates, not 2023)
- Clear CTAs ("WhatsApp 9XXX-XXXX for calculation")
- Urgency/Opportunity (why act now?)

### Distribution Must:
- Add value first (help, don't sell)
- Build relationships (engage genuinely)
- Track everything (know what works)
- Be consistent (same day/time weekly)
- Follow up (most conversions need 2-3 touches)
```

### Phase 5: Finalize Strategy Document

#### Step 5.1: Complete Consolidated Strategy
```markdown
# The content-strategy.md now includes:

## All Essential Elements:
- Executive Summary with realistic metrics
- Content Pillars & 12-Week Pipeline
- Editorial Standards & Workflow
- Performance Metrics & KPIs
- Distribution Strategy

## Clear Dependencies:
- Step 7 uses this for content creation guidelines
- Step 8 uses this for distribution channels
- Step 9 uses this for performance metrics
- Step 10 uses this for optimization priorities
```

#### Step 5.2: Minimal Tracking Setup
```markdown
# Include tracking section in main calendar document

### Key Metrics to Track
- WhatsApp inquiries per article (most important)
- Traffic source breakdown
- Consultation conversion rate
- Article topics that drive most inquiries

### Tools Needed
- Google Analytics (basic setup)
- WhatsApp Business (inquiry tracking)
- Simple spreadsheet for weekly review
```

### Phase 6: Human Approval Checkpoint

#### Step 6.1: Present Strategy for Approval
```markdown
## Content Strategy Summary

### Key Deliverables
1. Content Pillars Defined
2. Editorial Calendar (3 months)
3. Distribution Plan
4. Production Workflow
5. Success Metrics

### Investment Required
- Time: [Hours per week]
- Budget: [Monthly budget]
- Resources: [Team needs]

### Expected Results
- Month 1: Foundation building
- Month 3: 50% traffic increase
- Month 6: 100% traffic increase

**MANDATORY HUMAN APPROVAL REQUIRED**
Do you approve this content strategy to proceed to Step 7?
```

## 🚨 CRITICAL REMINDER: VIBE-CODING METHODOLOGY

### ⛔ AI AGENTS MUST NEVER:
- Create content strategy without human approval of requirements
- Proceed to execution without explicit permission
- Make assumptions about content needs
- Skip the clarifying questions phase

### ✅ PROPER VIBE-CODING PROCESS:
1. Human defines requirements in `input/content-requirement.md`
2. AI asks clarifying questions until 95% understanding
3. Human explicitly approves requirements
4. AI creates strategy based on approved requirements
5. Human approves strategy before proceeding to Step 7
6. AI executes only with explicit permission at each checkpoint

**This ensures perfect alignment between human vision and AI execution.**

## 📊 Success Metrics & Output Format

### Streamlined Output Structure
- **PRIMARY FILE**: `output/content/strategy/content-strategy.md` - Master strategy
- **SUPPORT FILE 1**: `output/content/strategy/audience-analysis.md` - Detailed personas
- **SUPPORT FILE 2**: `output/content/strategy/keyword-research.md` - SEO data
- **BENEFIT**: No overlapping content, clear single source of truth
- **MOST IMPORTANT**: Human approval at every step

### Expected Output for Human Vibecoder

**Main Document** (`content-strategy.md`):
- Executive Summary with realistic projections
- Content Pillars & 12-week pipeline (table format)
- Weekly workflow (Monday-Friday breakdown)
- Distribution channels (primary focus only)
- Performance KPIs (business & content metrics)
- Week 1 action checklist

**Supporting Documents**:
- `audience-analysis.md` - PR demographics & pain points
- `keyword-research.md` - SEO opportunities

## 🔄 Next Steps
**ONLY** after explicit human approval of the content strategy, proceed to Step 7: Content Production

---

## 🛡️ Process Protection Notice

This template has been updated to prevent future violations of vibe-coding methodology. All AI agents must follow the mandatory approval checkpoints to ensure human-AI collaboration remains aligned with the project vision.