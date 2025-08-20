'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import VideoPlayer from '@/components/comedy/VideoPlayer'
import { 
  Sparkles, 
  Users, 
  Zap, 
  TrendingUp, 
  Play, 
  ArrowRight,
  Star,
  MessageCircle,
  Share2
} from 'lucide-react'

// Mock data for demo - placeholder for now
const mockVideo = {
  id: '1',
  title: 'Working From Home Reality Check',
  url: '', // Empty URL - will show placeholder
  character: 'The Observational Oracle',
  duration: 30,
  views: 25000,
  likes: 1200,
  comments: 89
}

const features = [
  {
    icon: Sparkles,
    title: 'AI Comedy Generation',
    description: 'Input any topic and get instant, personalized comedy content tailored to your sense of humor.'
  },
  {
    icon: Users,
    title: 'Multiple AI Characters',
    description: 'Choose from 4 unique AI personalities, each with their own comedy style and perspective.'
  },
  {
    icon: Zap,
    title: 'Instant Content',
    description: 'Generate fresh comedy content in seconds, perfect for your daily dose of laughs.'
  },
  {
    icon: TrendingUp,
    title: 'Trending Topics',
    description: 'Stay current with AI that understands what\'s happening now and makes it funny.'
  }
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Marketing Manager',
    content: 'Finally, comedy that gets my work-life struggles! The AI actually understands millennial humor.',
    rating: 5
  },
  {
    name: 'Mike R.',
    role: 'Software Developer',
    content: 'I use this during my lunch breaks. The tech humor is spot-on and actually makes my day better.',
    rating: 5
  },
  {
    name: 'Jessica L.',
    role: 'Product Manager',
    content: 'Love how I can generate comedy about any topic. Great for sharing with my team!',
    rating: 5
  }
]

export default function HomePage() {
  const [email, setEmail] = useState('')

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
    alert('Thanks for signing up! 🎭')
  }

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  AI Comedy That
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                    {' '}Gets You
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience personalized stand-up comedy created by AI. Interactive generation, 
                  multiple characters, and daily laughs designed for working professionals aged 25-50.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/generate">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Comedy Now
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/trending">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trending
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25K+</div>
                  <div className="text-sm text-gray-600">Monthly Laughs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4</div>
                  <div className="text-sm text-gray-600">AI Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="flex justify-center">
              <div className="relative">
                <VideoPlayer 
                  video={mockVideo}
                  autoplay={false}
                  className="shadow-2xl bg-gradient-to-br from-orange-500 to-yellow-500"
                  onLike={() => console.log('Liked!')}
                  onShare={() => console.log('Shared!')}
                  onComment={() => console.log('Comment!')}
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  New! 🎭
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  AI Generated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Comedy Generation, Reimagined
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI understands what makes working professionals laugh. No more scrolling 
              through irrelevant content – get comedy that actually relates to your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Meet Your AI Comedy Characters
            </h2>
            <p className="text-xl text-gray-600">
              Each character has a unique personality and comedy style tailored to different moods and topics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'The Observational Oracle',
                specialty: 'Workplace & Daily Life',
                avatar: '🎯',
                description: 'Master of finding humor in everyday situations'
              },
              {
                name: 'The Trendy Commentator',
                specialty: 'Current Events & Trends',
                avatar: '📱',
                description: 'Always up-to-date with the latest social media buzz'
              },
              {
                name: 'The Lifestyle Guru',
                specialty: 'Food, Fashion & Travel',
                avatar: '✈️',
                description: 'Finds comedy in the finer things in life'
              },
              {
                name: 'The Millennial Mood',
                specialty: 'Generational Humor',
                avatar: '🥑',
                description: 'Perfectly captures the millennial experience'
              }
            ].map((character, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{character.avatar}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{character.name}</h3>
                  <p className="text-sm font-medium text-orange-600">{character.specialty}</p>
                  <p className="text-sm text-gray-600">{character.description}</p>
                  <Button variant="outline" size="sm" className="w-full hover:bg-orange-50 hover:text-orange-600">
                    Try This Character
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What People Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who have found their daily dose of laughter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Never Miss a Laugh
            </h2>
            <p className="text-xl text-gray-800">
              Get our weekly comedy digest with the best AI-generated content, 
              behind-the-scenes insights, and exclusive early access to new characters.
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-orange-500 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:outline-none transition-colors"
                  required
                />
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white" size="lg">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>

            <p className="text-sm text-gray-700">
              Join 2,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
