'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import VideoPlayer from '@/components/comedy/VideoPlayer'
import { ExternalLink, Play, Star, Users, Heart } from 'lucide-react'

// Note: Metadata export not allowed in client components
// The metadata is handled by the parent layout.tsx

// Featured videos data
const featuredVideos = [
  {
    id: '-mDJbhyQxKg',
    title: 'AI Comedy Preview',
    url: 'https://youtu.be/-mDJbhyQxKg',
    youtubeId: '-mDJbhyQxKg',
    character: 'PureComedy AI',
    duration: 30,
    views: 127,
    likes: 23,
    comments: 5,
    description: 'Experience the future of comedy with our AI-generated content that understands your humor!',
    tags: ['AI Comedy', 'Just Launched', 'Debut Video']
  }
]

const socialPlatforms = [
  {
    name: 'TikTok',
    handle: '@pureComedy.ai',
    avatar: '📱',
    description: 'Fresh AI comedy clips - be among our first followers!',
    color: 'bg-black hover:bg-gray-800',
    url: 'https://www.tiktok.com/@pureComedy.ai',
    buttonText: 'Be First to Follow',
    followers: 'Just Launched'
  },
  {
    name: 'YouTube',
    handle: '@pureComedyAI',
    avatar: '📺',
    description: 'Extended AI comedy content - join our founding subscribers!',
    color: 'bg-red-600 hover:bg-red-700',
    url: 'https://www.youtube.com/@pureComedyAI',
    buttonText: 'Subscribe Now',
    followers: 'Brand New'
  },
  {
    name: 'Instagram',
    handle: '@purecomedy.ai',
    avatar: '📸',
    description: 'Behind-the-scenes AI comedy creation - early access!',
    color: 'bg-pink-600 hover:bg-pink-700',
    url: 'https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMJIzNHExZQ%3D%3D&utm_source=qr',
    buttonText: 'Early Access',
    followers: 'Fresh Start'
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comedy Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Welcome to the cutting edge of AI comedy! Experience our first video and join the journey from the very beginning.
          </p>
          
          {/* Launch Stats Bar */}
          <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-orange-500" />
              <span>First Video Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-500" />
              <span>Just Launched</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-orange-500" />
              <span>3 Fresh Channels</span>
            </div>
          </div>
        </div>

        {/* Featured Video Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Debut Comedy Video
            </h2>
            <p className="text-lg text-gray-600">
              Experience the future of comedy with our very first AI-generated content!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Video Player */}
            <div className="flex justify-center">
              <div className="relative">
                <VideoPlayer 
                  video={featuredVideos[0]}
                  autoplay={false}
                  className="shadow-2xl"
                  onLike={() => console.log('Liked!')}
                  onShare={() => console.log('Shared!')}
                  onComment={() => console.log('Comment!')}
                />
                
                {/* Video Badge */}
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Featured ⭐
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {featuredVideos[0].title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {featuredVideos[0].description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredVideos[0].tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video Stats */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <div className="text-sm text-gray-600">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6">
                  <a 
                    href="https://www.youtube.com/@pureComedyAI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Watch Full Video on YouTube
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full text-lg py-6">
                  <Link href="/">
                    <Star className="w-5 h-5 mr-2" />
                    Discover More Content
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Platforms Section */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Comedy Revolution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of something groundbreaking! Follow our brand new channels and help us build the future of AI comedy from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  
                  {/* Platform Icon */}
                  <div className="text-6xl mb-4">{platform.avatar}</div>
                  
                  {/* Platform Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                    <p className="text-sm font-medium text-gray-500 mb-2">{platform.handle}</p>
                    <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                    
                    {/* Launch Status */}
                    <div className="inline-flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full text-sm font-medium text-green-700 mb-4">
                      <Users className="w-3 h-3" />
                      {platform.followers}
                    </div>
                  </div>
                  
                  {/* Follow Button */}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold transition-colors ${platform.color}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {platform.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Journey Starts Here!
            </h3>
            <p className="text-gray-600 mb-6">
              You&apos;re witnessing the birth of something special. Follow our fresh channels now to be part of the AI comedy revolution from the very beginning!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <a href="https://www.tiktok.com/@pureComedy.ai" target="_blank" rel="noopener noreferrer">
                  Follow on TikTok
                </a>
              </Button>
              <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                <a href="https://www.youtube.com/@pureComedyAI" target="_blank" rel="noopener noreferrer">
                  Subscribe Now
                </a>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}