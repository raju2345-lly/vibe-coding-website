import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - ComedyAI Studio',
  description: 'Learn about ComedyAI Studio - the AI comedy discovery platform for working professionals aged 25-50.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About ComedyAI Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to AI-generated comedy designed for busy professionals who need a quick laugh.
          </p>
        </div>
        
        <div className="prose prose-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              ComedyAI Studio bridges the gap between AI-generated comedy and social media entertainment. 
              We create a clean discovery experience that helps you find the funniest AI comedy content 
              across TikTok, YouTube, and Instagram.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">Why ComedyAI Studio?</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• <strong>Mobile-First:</strong> Optimized for busy professionals on-the-go</li>
              <li>• <strong>Curated Content:</strong> Hand-picked AI comedy that actually makes you laugh</li>
              <li>• <strong>Social Integration:</strong> Easy access to our content on your favorite platforms</li>
              <li>• <strong>Time-Efficient:</strong> Quick comedy discovery without endless scrolling</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow Our Journey</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Join thousands of professionals who start their day with AI-generated comedy. 
              Follow us on social media for daily doses of intelligent humor designed for the 25-50 demographic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.tiktok.com/@pureComedy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
              >
                Follow on TikTok
              </a>
              <a
                href="https://www.youtube.com/@pureComedyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center"
              >
                Subscribe on YouTube
              </a>
              <a
                href="https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMjIzNHExZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}