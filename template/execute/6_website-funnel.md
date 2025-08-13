# AI Agent Script: Conversion Funnel Implementation

## 🎯 Purpose
Build and optimize conversion funnels to guide users from awareness to action, maximizing conversion rates at each stage.

## 📋 Prerequisites
- Website core implementation complete
- Analytics tracking configured
- User journey mapped
- Conversion goals defined

## 🤖 AI Agent Instructions

### Step 1: Multi-Stage Funnel Architecture

#### Funnel Stage Manager
Create `src/lib/funnel/FunnelManager.ts`:
```typescript
export interface FunnelStage {
  id: string
  name: string
  type: 'awareness' | 'interest' | 'consideration' | 'decision' | 'retention'
  entryPoints: string[]
  exitPoints: string[]
  conversionGoals: ConversionGoal[]
  content: StageContent[]
}

export class FunnelManager {
  private stages: Map<string, FunnelStage> = new Map()
  private userJourney: Map<string, UserJourney> = new Map()
  
  constructor() {
    this.initializeStages()
  }
  
  private initializeStages() {
    // Awareness Stage
    this.stages.set('awareness', {
      id: 'awareness',
      name: 'Awareness',
      type: 'awareness',
      entryPoints: ['/blog', '/resources', '/guides'],
      exitPoints: ['/signup', '/demo', '/pricing'],
      conversionGoals: [
        { type: 'micro', action: 'email_capture', value: 5 },
        { type: 'micro', action: 'content_download', value: 10 },
      ],
      content: [
        { type: 'blog', topics: ['industry_insights', 'how_to'] },
        { type: 'video', format: 'educational' },
        { type: 'infographic', shareability: 'high' },
      ],
    })
    
    // Interest Stage
    this.stages.set('interest', {
      id: 'interest',
      name: 'Interest',
      type: 'interest',
      entryPoints: ['/features', '/solutions', '/case-studies'],
      exitPoints: ['/pricing', '/demo', '/contact'],
      conversionGoals: [
        { type: 'micro', action: 'demo_request', value: 50 },
        { type: 'micro', action: 'webinar_signup', value: 30 },
      ],
      content: [
        { type: 'case_study', format: 'detailed' },
        { type: 'comparison', versus: 'competitors' },
        { type: 'calculator', interaction: 'high' },
      ],
    })
    
    // Consideration Stage
    this.stages.set('consideration', {
      id: 'consideration',
      name: 'Consideration',
      type: 'consideration',
      entryPoints: ['/pricing', '/demo', '/free-trial'],
      exitPoints: ['/checkout', '/contact-sales'],
      conversionGoals: [
        { type: 'macro', action: 'trial_start', value: 100 },
        { type: 'macro', action: 'sales_qualified_lead', value: 200 },
      ],
      content: [
        { type: 'pricing', transparency: 'full' },
        { type: 'testimonial', credibility: 'high' },
        { type: 'guarantee', risk_reversal: true },
      ],
    })
    
    // Decision Stage
    this.stages.set('decision', {
      id: 'decision',
      name: 'Decision',
      type: 'decision',
      entryPoints: ['/checkout', '/upgrade', '/purchase'],
      exitPoints: ['/thank-you', '/dashboard'],
      conversionGoals: [
        { type: 'macro', action: 'purchase', value: 'dynamic' },
        { type: 'macro', action: 'subscription', value: 'recurring' },
      ],
      content: [
        { type: 'urgency', tactics: ['limited_time', 'limited_quantity'] },
        { type: 'social_proof', display: 'real_time' },
        { type: 'support', availability: '24/7' },
      ],
    })
  }
  
  trackUserProgress(userId: string, currentStage: string, action: string) {
    const journey = this.userJourney.get(userId) || this.createNewJourney(userId)
    journey.addTouchpoint({
      stage: currentStage,
      action: action,
      timestamp: Date.now(),
      sessionId: this.getCurrentSessionId(),
    })
    
    // Check for stage progression
    const nextStage = this.determineNextStage(journey, currentStage, action)
    if (nextStage) {
      this.moveUserToStage(userId, nextStage)
    }
  }
  
  getPersonalizedContent(userId: string): any {
    const journey = this.userJourney.get(userId)
    if (!journey) return this.getDefaultContent()
    
    const currentStage = journey.currentStage
    const stageConfig = this.stages.get(currentStage)
    
    return this.personalizeForUser(stageConfig, journey)
  }
}
```

### Step 2: Lead Capture Systems

#### Progressive Profiling Form
Create `src/components/funnel/ProgressiveForm.tsx`:
```typescript
interface FormStage {
  fields: FormField[]
  incentive?: string
  skipOption?: boolean
}

export function ProgressiveProfilingForm() {
  const [currentStage, setCurrentStage] = useState(0)
  const [userData, setUserData] = useState({})
  const [leadScore, setLeadScore] = useState(0)
  
  const formStages: FormStage[] = [
    {
      // Stage 1: Basic capture
      fields: [
        { name: 'email', type: 'email', required: true },
      ],
      incentive: 'Get our free guide',
      skipOption: false,
    },
    {
      // Stage 2: Qualification
      fields: [
        { name: 'company', type: 'text', required: false },
        { name: 'role', type: 'select', options: ['Manager', 'Director', 'C-Level'] },
      ],
      incentive: 'Unlock premium content',
      skipOption: true,
    },
    {
      // Stage 3: Intent signals
      fields: [
        { name: 'budget', type: 'range', min: 1000, max: 100000 },
        { name: 'timeline', type: 'select', options: ['Immediate', '1-3 months', '3-6 months'] },
      ],
      incentive: 'Get personalized recommendations',
      skipOption: true,
    },
  ]
  
  const handleSubmit = async (data: any) => {
    // Update user data progressively
    const updatedData = { ...userData, ...data }
    setUserData(updatedData)
    
    // Calculate lead score
    const score = calculateLeadScore(updatedData)
    setLeadScore(score)
    
    // Track conversion
    trackConversion('lead_capture', {
      stage: currentStage + 1,
      lead_score: score,
      fields_completed: Object.keys(updatedData).length,
    })
    
    // Move to next stage or complete
    if (currentStage < formStages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else {
      await submitLead(updatedData, score)
    }
  }
  
  return (
    <div className="progressive-form">
      <div className="form-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentStage + 1) / formStages.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          Step {currentStage + 1} of {formStages.length}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {formStages[currentStage].fields.map(field => (
          <FormField key={field.name} {...field} />
        ))}
        
        {formStages[currentStage].incentive && (
          <div className="incentive-message">
            🎁 {formStages[currentStage].incentive}
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Continue
          </button>
          {formStages[currentStage].skipOption && (
            <button type="button" onClick={() => setCurrentStage(currentStage + 1)}>
              Skip for now
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
```

#### Exit Intent Popup
Create `src/components/funnel/ExitIntent.tsx`:
```typescript
export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [offer, setOffer] = useState<Offer | null>(null)
  
  useEffect(() => {
    if (hasShown) return
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        const personalizedOffer = getPersonalizedOffer()
        setOffer(personalizedOffer)
        setIsVisible(true)
        setHasShown(true)
        
        trackEvent('exit_intent_triggered', {
          offer_type: personalizedOffer.type,
          page: window.location.pathname,
        })
      }
    }
    
    // Mobile exit intent (scroll-based)
    const handleMobileExit = () => {
      const scrollPercentage = (window.scrollY / document.body.scrollHeight) * 100
      if (scrollPercentage > 70 && !hasShown) {
        handleMouseLeave(new MouseEvent('mouseleave'))
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleMobileExit)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleMobileExit)
    }
  }, [hasShown])
  
  const getPersonalizedOffer = (): Offer => {
    const userStage = getUserFunnelStage()
    
    switch (userStage) {
      case 'awareness':
        return {
          type: 'content',
          title: "Wait! Don't miss our exclusive guide",
          description: 'Get our comprehensive industry report - FREE',
          cta: 'Download Now',
          value: 'free_guide',
        }
      case 'consideration':
        return {
          type: 'discount',
          title: 'Special offer just for you!',
          description: 'Get 20% off your first month',
          cta: 'Claim Discount',
          value: 'SAVE20',
        }
      case 'decision':
        return {
          type: 'urgency',
          title: 'Your cart is waiting!',
          description: 'Complete your purchase in the next 10 minutes for free shipping',
          cta: 'Complete Purchase',
          value: 'free_shipping',
        }
      default:
        return {
          type: 'newsletter',
          title: 'Stay connected!',
          description: 'Get weekly tips and exclusive offers',
          cta: 'Subscribe',
          value: 'newsletter',
        }
    }
  }
  
  if (!isVisible || !offer) return null
  
  return (
    <div className="exit-intent-overlay">
      <div className="exit-intent-popup">
        <button 
          className="close-btn"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
        
        <div className="popup-content">
          <h2>{offer.title}</h2>
          <p>{offer.description}</p>
          
          {offer.type === 'discount' && (
            <div className="discount-code">
              Code: <span className="code">{offer.value}</span>
            </div>
          )}
          
          <button 
            className="cta-btn"
            onClick={() => handleOfferAccept(offer)}
          >
            {offer.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
```

### Step 3: Personalization Engine

#### Dynamic Content Personalization
Create `src/lib/personalization/PersonalizationEngine.ts`:
```typescript
export class PersonalizationEngine {
  private userProfile: UserProfile
  private behaviorData: BehaviorData
  private contentVariants: Map<string, ContentVariant[]>
  
  constructor(userId: string) {
    this.userProfile = this.loadUserProfile(userId)
    this.behaviorData = this.loadBehaviorData(userId)
    this.contentVariants = this.loadContentVariants()
  }
  
  getPersonalizedHero(): HeroContent {
    const segment = this.getUserSegment()
    const intent = this.predictUserIntent()
    
    return {
      headline: this.selectHeadline(segment, intent),
      subheadline: this.selectSubheadline(segment, intent),
      cta: this.selectCTA(segment, intent),
      image: this.selectHeroImage(segment),
      socialProof: this.selectSocialProof(segment),
    }
  }
  
  private getUserSegment(): UserSegment {
    // Segment based on multiple factors
    const factors = {
      source: this.userProfile.acquisitionSource,
      behavior: this.behaviorData.primaryBehavior,
      stage: this.userProfile.funnelStage,
      value: this.calculateUserValue(),
    }
    
    if (factors.value > 1000) return 'high_value'
    if (factors.behavior === 'researcher') return 'information_seeker'
    if (factors.source === 'paid_search') return 'problem_aware'
    
    return 'explorer'
  }
  
  private predictUserIntent(): UserIntent {
    const recentActions = this.behaviorData.recentActions
    const pageViews = this.behaviorData.pageViews
    
    // Intent signals
    const signals = {
      pricing_views: pageViews.filter(p => p.includes('pricing')).length,
      feature_exploration: pageViews.filter(p => p.includes('features')).length,
      competitor_research: pageViews.filter(p => p.includes('compare')).length,
      support_searches: recentActions.filter(a => a.type === 'search' && a.query.includes('help')).length,
    }
    
    if (signals.pricing_views > 2) return 'ready_to_buy'
    if (signals.competitor_research > 0) return 'comparing_options'
    if (signals.feature_exploration > 3) return 'evaluating_fit'
    
    return 'exploring'
  }
  
  getPersonalizedRecommendations(): Recommendation[] {
    const userInterests = this.analyzeInterests()
    const previousPurchases = this.userProfile.purchases || []
    
    return this.recommendationEngine.generate({
      interests: userInterests,
      history: previousPurchases,
      stage: this.userProfile.funnelStage,
      budget: this.userProfile.estimatedBudget,
    })
  }
}
```

### Step 4: Lead Scoring System

#### Automated Lead Scoring
Create `src/lib/funnel/LeadScoring.ts`:
```typescript
export class LeadScoringSystem {
  private scoringRules: ScoringRule[]
  
  constructor() {
    this.scoringRules = [
      // Demographic scoring
      { field: 'jobTitle', values: { 'C-Level': 30, 'VP': 25, 'Director': 20, 'Manager': 15 } },
      { field: 'companySize', values: { 'Enterprise': 30, 'Mid-Market': 20, 'SMB': 10 } },
      { field: 'industry', values: { 'target_industry': 20, 'adjacent': 10, 'other': 0 } },
      
      // Behavioral scoring
      { action: 'demo_request', points: 50 },
      { action: 'pricing_view', points: 30 },
      { action: 'case_study_download', points: 20 },
      { action: 'blog_read', points: 5, max: 25 },
      { action: 'email_open', points: 3, max: 15 },
      { action: 'webinar_attendance', points: 40 },
      
      // Engagement scoring
      { metric: 'session_duration', threshold: 300, points: 10 },
      { metric: 'pages_per_session', threshold: 5, points: 15 },
      { metric: 'return_visits', threshold: 3, points: 20 },
      
      // Negative scoring
      { action: 'unsubscribe', points: -50 },
      { action: 'bounce', points: -10 },
      { metric: 'days_inactive', threshold: 30, points: -20 },
    ]
  }
  
  calculateLeadScore(lead: Lead): LeadScore {
    let score = 0
    const scoreBreakdown: ScoreBreakdown = {}
    
    // Apply demographic rules
    for (const rule of this.scoringRules.filter(r => r.field)) {
      const value = lead[rule.field]
      if (value && rule.values[value]) {
        score += rule.values[value]
        scoreBreakdown[rule.field] = rule.values[value]
      }
    }
    
    // Apply behavioral rules
    for (const rule of this.scoringRules.filter(r => r.action)) {
      const actionCount = lead.actions.filter(a => a.type === rule.action).length
      const points = rule.max ? Math.min(actionCount * rule.points, rule.max) : actionCount * rule.points
      score += points
      scoreBreakdown[rule.action] = points
    }
    
    // Apply engagement rules
    for (const rule of this.scoringRules.filter(r => r.metric)) {
      const metricValue = lead.metrics[rule.metric]
      if (metricValue >= rule.threshold) {
        score += rule.points
        scoreBreakdown[rule.metric] = rule.points
      }
    }
    
    return {
      total: Math.max(0, Math.min(100, score)), // Normalize to 0-100
      breakdown: scoreBreakdown,
      grade: this.getGrade(score),
      readiness: this.getSalesReadiness(score),
      recommendations: this.getNurturingRecommendations(score, lead),
    }
  }
  
  private getGrade(score: number): string {
    if (score >= 80) return 'A'
    if (score >= 60) return 'B'
    if (score >= 40) return 'C'
    if (score >= 20) return 'D'
    return 'F'
  }
  
  private getSalesReadiness(score: number): string {
    if (score >= 70) return 'sales_qualified'
    if (score >= 40) return 'marketing_qualified'
    return 'nurturing_required'
  }
}
```

### Step 5: Conversion Rate Optimization

#### A/B Testing Framework
Create `src/lib/testing/ABTestFramework.ts`:
```typescript
export class ABTestFramework {
  private tests: Map<string, ABTest> = new Map()
  
  createTest(config: TestConfig): ABTest {
    const test = new ABTest({
      id: generateTestId(),
      name: config.name,
      hypothesis: config.hypothesis,
      variants: config.variants,
      traffic: config.traffic || 100,
      goals: config.goals,
      minSampleSize: this.calculateSampleSize(config),
      status: 'draft',
    })
    
    this.tests.set(test.id, test)
    return test
  }
  
  runTest(testId: string) {
    const test = this.tests.get(testId)
    if (!test) throw new Error('Test not found')
    
    test.status = 'running'
    test.startDate = new Date()
    
    // Implement variant assignment
    this.implementVariantAssignment(test)
    
    // Start tracking
    this.startTracking(test)
  }
  
  private implementVariantAssignment(test: ABTest) {
    // Use deterministic hashing for consistent assignment
    return (userId: string): string => {
      const hash = this.hashUserId(userId + test.id)
      const variantIndex = hash % test.variants.length
      return test.variants[variantIndex].id
    }
  }
  
  analyzeResults(testId: string): TestResults {
    const test = this.tests.get(testId)
    const data = this.getTestData(testId)
    
    const results: TestResults = {
      test: test,
      variants: [],
      winner: null,
      confidence: 0,
      recommendation: '',
    }
    
    for (const variant of test.variants) {
      const variantData = data.filter(d => d.variant === variant.id)
      const stats = this.calculateStatistics(variantData, test.goals)
      
      results.variants.push({
        id: variant.id,
        name: variant.name,
        visitors: variantData.length,
        conversions: stats.conversions,
        conversionRate: stats.conversionRate,
        averageValue: stats.averageValue,
        confidence: stats.confidence,
      })
    }
    
    // Determine winner
    results.winner = this.determineWinner(results.variants)
    results.confidence = this.calculateConfidence(results.variants)
    results.recommendation = this.generateRecommendation(results)
    
    return results
  }
}
```

### Step 6: Email Nurturing Sequences

#### Automated Email Campaigns
Create `src/lib/email/NurturingCampaigns.ts`:
```typescript
export class NurturingCampaigns {
  private campaigns: Map<string, EmailCampaign> = new Map()
  
  constructor() {
    this.initializeCampaigns()
  }
  
  private initializeCampaigns() {
    // Welcome series
    this.campaigns.set('welcome', {
      id: 'welcome',
      name: 'Welcome Series',
      trigger: 'signup',
      emails: [
        {
          delay: 0,
          subject: 'Welcome! Here\'s what to expect',
          template: 'welcome_1',
          personalization: ['first_name', 'signup_source'],
        },
        {
          delay: 2 * 24 * 60 * 60 * 1000, // 2 days
          subject: 'Getting started guide',
          template: 'welcome_2',
          condition: 'not_activated',
        },
        {
          delay: 7 * 24 * 60 * 60 * 1000, // 7 days
          subject: 'Success story from a customer like you',
          template: 'welcome_3',
          segmentation: 'by_industry',
        },
      ],
    })
    
    // Abandoned cart series
    this.campaigns.set('abandoned_cart', {
      id: 'abandoned_cart',
      name: 'Cart Recovery',
      trigger: 'cart_abandonment',
      emails: [
        {
          delay: 60 * 60 * 1000, // 1 hour
          subject: 'You left something behind',
          template: 'cart_1',
          includeProducts: true,
        },
        {
          delay: 24 * 60 * 60 * 1000, // 24 hours
          subject: '10% off your cart items',
          template: 'cart_2',
          discount: 10,
        },
        {
          delay: 72 * 60 * 60 * 1000, // 72 hours
          subject: 'Last chance - items selling out',
          template: 'cart_3',
          urgency: 'high',
        },
      ],
    })
  }
  
  triggerCampaign(trigger: string, user: User, data?: any) {
    const campaign = Array.from(this.campaigns.values())
      .find(c => c.trigger === trigger)
    
    if (!campaign) return
    
    this.scheduleCampaignEmails(campaign, user, data)
  }
}
```

## 🔄 Human Checkpoint
- "Conversion funnel implementation complete"
- "Lead capture and nurturing systems ready"
- "Personalization engine configured"
- "Please test funnel flow: APPROVED, NEEDS FIXES, or RESTART"

## ✅ Success Criteria
- Multi-stage funnel tracking working
- Progressive profiling forms functional
- Exit intent popups triggering correctly
- Lead scoring calculating accurately
- Email nurturing campaigns scheduled
- A/B testing framework operational

## 📝 Funnel Optimization Checklist
- [ ] All funnel stages defined
- [ ] Entry/exit points tracked
- [ ] Micro-conversions identified
- [ ] Lead scoring rules configured
- [ ] Personalization rules active
- [ ] Email campaigns created
- [ ] A/B tests planned
- [ ] Analytics events configured
- [ ] Retargeting pixels placed
- [ ] Conversion paths optimized

## 🚨 Important Notes
- Test each funnel stage thoroughly
- Monitor drop-off rates at each stage
- Continuously optimize based on data
- Ensure GDPR compliance for data collection
- Document all personalization rules