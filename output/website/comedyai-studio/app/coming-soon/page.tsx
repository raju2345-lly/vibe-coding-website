import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Laugh, Sparkles, ArrowLeft, Calendar, Bell } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Laugh className="w-16 h-16 text-orange-500" />
                <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                Comedy<span className="text-orange-500">AI</span>
              </span>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Social Media
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600"> Coming Soon</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're currently setting up our TikTok, YouTube, and Instagram accounts to bring you the best AI-generated comedy content. Stay tuned!
            </p>
          </div>

          {/* Features Coming */}
          <div className="grid md:grid-cols-3 gap-8 py-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TikTok</h3>
              <p className="text-gray-600">Short-form comedy videos perfect for your daily dose of laughs</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">📺</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">YouTube</h3>
              <p className="text-gray-600">Longer comedy content and behind-the-scenes AI insights</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instagram</h3>
              <p className="text-gray-600">Visual comedy content and daily humor highlights</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-semibold text-gray-900">Launch Timeline</h3>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">✅ Website launched</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">🔄 Setting up social media accounts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">⏳ Content creation pipeline</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">🚀 Full social media launch</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-2xl text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Bell className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Get Notified When We Launch!</h3>
              </div>
              <p className="text-white/90">
                Be the first to know when our social media accounts go live. We'll send you the links as soon as they're ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                />
                <Button className="bg-white text-orange-600 hover:bg-gray-100">
                  Notify Me
                </Button>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="pt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}