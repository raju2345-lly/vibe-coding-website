'use client'

import { useState } from 'react'
import { Metadata } from 'next'

// Note: In a real Next.js app, you'd move metadata to a separate file
// export const metadata: Metadata = {
//   title: 'Contact Us - ComedyAI Studio',
//   description: 'Get in touch with ComedyAI Studio team. We love to hear from our comedy community!',
// }

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')

    try {
      // Using Formspree (free, secure form handling service)
      // You'll need to replace this with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/comedyai-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New message from ${formData.name} - ComedyAI Studio`
        })
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState('error')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Business Inquiries</h3>
                <p className="text-gray-600">Use the contact form for business partnerships and collaborations</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">General Questions</h3>
                <p className="text-gray-600">Send us a message using the form and we'll get back to you quickly</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Follow Our Content</h3>
                <p className="text-gray-600">Connect with us on social media for daily comedy content</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.tiktok.com/@pureComedy.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="https://www.youtube.com/@pureComedyAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://www.instagram.com/purecomedy.ai/?igsh=MW5zN2QxMjIzNHExZQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Message</h2>
            
            <form 
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={formState === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={formState === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  disabled={formState === 'loading'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            {/* Status Messages */}
            {formState === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Message sent successfully!</strong> We'll get back to you soon.
                </p>
              </div>
            )}
            
            {formState === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Please check your input.</strong> Make sure all fields are filled correctly, or contact us directly at comedyai099@gmail.com
                </p>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>🔒 Secure Contact:</strong> Clicking "Send Message" will open your email client with pre-filled content for secure communication.
              </p>
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                Privacy-focused • No data stored on servers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}