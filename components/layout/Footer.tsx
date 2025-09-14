import Link from 'next/link'
import { Laugh, Sparkles, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Laugh className="w-8 h-8 text-orange-500" />
                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold">
                Comedy<span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              AI comedy discovery platform for working professionals. 
              Find your daily dose of laughs across social media.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/gallery" className="block text-gray-400 hover:text-white transition-colors">
                Comedy Gallery
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="space-y-2">
              <a 
                href="https://www.tiktok.com/@pureComedy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                TikTok
              </a>
              <a 
                href="https://www.youtube.com/@pureComedyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                YouTube
              </a>
              <a 
                href="https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMjIzNHExZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Instagram
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ComedyAI Studio. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Built with AI-powered comedy curation
          </p>
        </div>
      </div>
    </footer>
  )
}