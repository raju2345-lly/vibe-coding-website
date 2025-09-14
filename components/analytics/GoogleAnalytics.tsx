'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            debug_mode: false,
            enhanced_measurement: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true
            }
          });
          
          // Debug log
          console.log('Google Analytics initialized with ID: ${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

// Hook for tracking social media clicks (conversion events)
export const trackSocialClick = (platform: string, url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      event_category: 'Social Media',
      event_label: platform,
      custom_parameter_1: url,
    })
  }
}

// Hook for tracking page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    })
  }
}

// Hook for tracking newsletter signups
export const trackNewsletterSignup = (email?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'Engagement',
      event_label: 'Newsletter',
      value: 1,
    })
  }
}

// Types for global gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}