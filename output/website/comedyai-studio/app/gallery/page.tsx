import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comedy Gallery - ComedyAI Studio',
  description: 'Browse AI-generated comedy content and follow us on social media platforms.',
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comedy Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover hilarious AI-generated comedy content and follow us on social media for more laughs!
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 mb-8">Gallery coming soon with video previews from our social platforms!</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.tiktok.com/@pureComedy.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Follow on TikTok
            </a>
            <a
              href="https://www.youtube.com/@pureComedyAI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Subscribe on YouTube
            </a>
            <a
              href="https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMJIzNHExZQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}