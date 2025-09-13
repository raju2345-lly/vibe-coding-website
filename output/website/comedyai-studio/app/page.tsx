'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import VideoPlayer from '@/components/comedy/VideoPlayer'
import { trackSocialClick } from '@/components/analytics/GoogleAnalytics'
import { 
  Zap, 
  TrendingUp, 
  Play, 
  Star,
  ExternalLink
} from 'lucide-react'

// Real video data from social media
const featuredVideo = {
  id: '-mDJbhyQxKg',
  title: 'AI Comedy Preview',
  url: 'https://youtu.be/-mDJbhyQxKg',
  youtubeId: '-mDJbhyQxKg',
  character: 'PureComedy AI',
  duration: 30,
  views: 127,
  likes: 23,
  comments: 5
}

const features = [
  {
    icon: Play,
    title: 'Cutting-Edge AI Comedy',
    description: 'Experience the future of entertainment with AI that understands humor and creates personalized content.'
  },
  {
    icon: TrendingUp,
    title: 'Ground Floor Opportunity',
    description: 'Be among the first to discover and shape the next generation of digital comedy content.'
  },
  {
    icon: Zap,
    title: 'Always Fresh Content',
    description: 'Our AI continuously learns and creates new material, ensuring you never run out of laughs.'
  },
]

const testimonials = [
  {
    name: 'Alex T.',
    role: 'Beta Tester',
    content: "This AI comedy concept is groundbreaking! Can't wait to see how it evolves. Definitely following from day one.",
    rating: 5
  },
  {
    name: 'Jordan K.',
    role: 'Early Adopter',
    content: 'Finally something truly innovative in comedy! The AI understanding of humor is impressive. Excited to be here early.',
    rating: 5
  },
  {
    name: 'Sam L.',
    role: 'Comedy Enthusiast',
    content: 'Being part of this from the beginning feels special. The potential here is huge - following all platforms!',
    rating: 5
  }
]

export default function HomePage() {
  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url)
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
                  Fresh AI Comedy
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                    {' '}Just Launched!
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Be among the first to discover cutting-edge AI-generated comedy content! 
                  We're just getting started, and you're invited to join our comedy journey from day one.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" asChild className="bg-orange-500 hover:bg-orange-600">
                  <a 
                    href="https://www.tiktok.com/@pureComedy.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('TikTok', 'https://www.tiktok.com/@pureComedy.ai')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Follow on TikTok
                  </a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/gallery">
                    <Play className="w-5 h-5 mr-2" />
                    Browse Gallery
                  </Link>
                </Button>
              </div>

              {/* Launch Stats */}
              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">NEW</div>
                  <div className="text-sm text-gray-600">Just Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">AI</div>
                  <div className="text-sm text-gray-600">Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Platforms</div>
                </div>
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="flex justify-center">
              <div className="relative">
                <VideoPlayer 
                  video={featuredVideo}
                  autoplay={false}
                  className="shadow-2xl bg-gradient-to-br from-orange-500 to-yellow-500"
                  onLike={() => console.log('Liked!')}
                  onShare={() => console.log('Shared!')}
                  onComment={() => console.log('Comment!')}
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  Fresh Launch! 🚀
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  Be First! 🎭
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
              The Future of Comedy is Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience groundbreaking AI-generated comedy that's personalized, fresh, and always evolving. 
              Join us from the very beginning as we revolutionize digital entertainment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              Follow Us on Social Media
            </h2>
            <p className="text-xl text-gray-600">
              Our AI-generated comedy lives on social platforms. Click to follow for daily laughs!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'TikTok',
                handle: '@pureComedy.ai',
                avatar: '📱',
                description: 'Fresh AI comedy clips - be among our first followers!',
                color: 'bg-black hover:bg-gray-800',
                url: 'https://www.tiktok.com/@pureComedy.ai',
                buttonText: 'Be First to Follow'
              },
              {
                name: 'YouTube',
                handle: '@pureComedyAI',
                avatar: '📺',
                description: 'Extended AI comedy content - join our founding subscribers!',
                color: 'bg-red-600 hover:bg-red-700',
                url: 'https://www.youtube.com/@pureComedyAI',
                buttonText: 'Subscribe Now'
              },
              {
                name: 'Instagram',
                handle: '@purecomedy.ai',
                avatar: '📸',
                description: 'Behind-the-scenes AI comedy creation - early access!',
                color: 'bg-pink-600 hover:bg-pink-700',
                url: 'https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMjIzNHExZQ%3D%3D&utm_source=qr',
                buttonText: 'Early Access'
              }
            ].map((platform, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-center space-y-4">
                  <div className="text-5xl">{platform.avatar}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-sm font-medium text-gray-500">{platform.handle}</p>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold transition-colors ${platform.color}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {platform.buttonText}
                  </a>
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
              Early Access Preview
            </h2>
            <p className="text-xl text-gray-600">
              Our beta testers are already excited about the future of AI comedy. Here's what they're saying:
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
                <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
