import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - ComedyAI Studio',
  description: 'Terms of Service for ComedyAI Studio. Review our terms and conditions.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: September 2025
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg prose prose-lg max-w-none text-gray-800">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing ComedyAI Studio, you agree to be bound by these Terms of Service 
            and our Privacy Policy. If you do not agree to these terms, please do not use our service.
          </p>

          <h2>Description of Service</h2>
          <p>
            ComedyAI Studio is a comedy discovery platform that:
          </p>
          <ul>
            <li>Showcases AI-generated comedy content previews</li>
            <li>Provides links to our social media platforms</li>
            <li>Offers entertainment content for adults aged 25-50</li>
            <li>Serves as a traffic funnel to TikTok, YouTube, and Instagram</li>
          </ul>

          <h2>User Conduct</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Use the service for personal, non-commercial purposes</li>
            <li>Not attempt to harm or disrupt our services</li>
            <li>Respect intellectual property rights</li>
            <li>Follow community guidelines on our social platforms</li>
          </ul>

          <h2>Content and Intellectual Property</h2>
          <p>
            All content on ComedyAI Studio, including AI-generated comedy, 
            design elements, and branding, is owned by us or our licensors. 
            Users may not reproduce, distribute, or create derivative works without permission.
          </p>

          <h2>Social Media Integration</h2>
          <p>
            Our service includes links to third-party social media platforms. 
            We are not responsible for the content or practices of these platforms. 
            Your use of social media platforms is governed by their respective terms of service.
          </p>

          <h2>Disclaimers</h2>
          <p>
            ComedyAI Studio is provided "as is" without warranties. 
            We do not guarantee:
          </p>
          <ul>
            <li>Uninterrupted service availability</li>
            <li>Error-free operation</li>
            <li>Compatibility with all devices</li>
            <li>Specific comedy content preferences</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable 
            for any indirect, incidental, or consequential damages arising 
            from your use of our service.
          </p>

          <h2>Privacy and Data</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy 
            to understand how we collect and use your information.
          </p>

          <h2>Modifications</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. 
            Changes will be effective immediately upon posting. 
            Continued use of the service constitutes acceptance of modified terms.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend access to our service at any time, 
            with or without cause, and with or without notice.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
            <br />
            <strong>legal@comedyai.studio</strong>
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance 
            with applicable laws. Any disputes shall be resolved through appropriate legal channels.
          </p>
        </div>
      </div>
    </div>
  )
}