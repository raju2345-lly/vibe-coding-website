import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - ComedyAI Studio',
  description: 'Privacy Policy for ComedyAI Studio. Learn how we protect your data and privacy.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 2025
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            ComedyAI Studio ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information 
            when you visit our website and use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Analytics Data</h3>
          <p>We use Google Analytics to collect:</p>
          <ul>
            <li>Page views and user interactions</li>
            <li>Browser type and device information</li>
            <li>Geographic location (city/region level)</li>
            <li>Referral sources and traffic patterns</li>
          </ul>

          <h3>Social Media Interactions</h3>
          <p>When you click our social media links, we may track:</p>
          <ul>
            <li>Click-through rates to social platforms</li>
            <li>Conversion metrics for our content</li>
            <li>Engagement patterns with our comedy content</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Improve our website and user experience</li>
            <li>Analyze content performance and engagement</li>
            <li>Optimize our comedy content strategy</li>
            <li>Measure conversion rates to social platforms</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. 
            We may share anonymized analytics data with partners to improve our services.
          </p>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies for analytics and to improve 
            your browsing experience. You can control cookie preferences through your browser settings.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of analytics tracking</li>
            <li>Update your preferences</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            <strong>privacy@comedyai.studio</strong>
          </p>

          <h2>Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. 
            Changes will be posted on this page with an updated date.
          </p>
        </div>
      </div>
    </div>
  )
}