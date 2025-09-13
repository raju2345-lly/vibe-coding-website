'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Laugh, Sparkles, TrendingUp, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: 'Home', href: '/', icon: Laugh },
  { name: 'Comedy Gallery', href: '/gallery', icon: Sparkles },
  { name: 'About', href: '/about', icon: TrendingUp },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-orange-400 to-yellow-400 backdrop-blur-md border-b border-orange-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Laugh className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
              <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-white">
              Comedy<span className="text-yellow-100">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-white hover:text-yellow-100 transition-colors group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Social Media CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button asChild className="bg-black text-white hover:bg-gray-800" size="sm">
              <a href="https://www.tiktok.com/@pureComedy.ai" target="_blank" rel="noopener noreferrer">
                Follow on TikTok
              </a>
            </Button>
            <Button asChild className="bg-red-600 text-white hover:bg-red-700" size="sm">
              <a href="https://www.youtube.com/@pureComedyAI" target="_blank" rel="noopener noreferrer">
                Subscribe Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-200 ease-in-out overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="py-4 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-white hover:text-yellow-100 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-orange-300 space-y-2">
              <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                <a href="https://www.tiktok.com/@pureComedy.ai" target="_blank" rel="noopener noreferrer">
                  Follow on TikTok
                </a>
              </Button>
              <Button className="w-full bg-red-600 text-white hover:bg-red-700" asChild>
                <a href="https://www.youtube.com/@pureComedyAI" target="_blank" rel="noopener noreferrer">
                  Subscribe Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}