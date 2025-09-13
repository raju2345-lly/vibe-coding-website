'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Heart, Share2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatNumber, formatDuration } from '@/lib/utils'

interface Video {
  id: string
  title: string
  url: string
  youtubeId?: string
  character: string
  duration: number
  views: number
  likes: number
  comments: number
}

interface VideoPlayerProps {
  video: Video
  autoplay?: boolean
  className?: string
  onComplete?: () => void
  onLike?: () => void
  onShare?: () => void
  onComment?: () => void
}

export default function VideoPlayer({ 
  video, 
  autoplay = false, 
  className,
  onComplete,
  onLike,
  onShare,
  onComment
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(true) // Start muted for autoplay compliance
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.()
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * video.duration
    
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  return (
    <div className={cn(
      "relative group bg-black rounded-lg overflow-hidden aspect-[9/16] max-w-sm mx-auto",
      className
    )}>
      
      {/* Video Element, YouTube Embed, or Placeholder */}
      {video.youtubeId ? (
        // YouTube Embed
        <div className="w-full h-full relative">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>
      ) : video.url ? (
        <video
          ref={videoRef}
          src={video.url}
          className="w-full h-full object-cover"
          muted={isMuted}
          autoPlay={autoplay}
          playsInline
          preload="metadata"
        />
      ) : (
        // Placeholder for demo with social CTA
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            <div className="text-6xl">🎭</div>
            <div className="text-white text-lg font-semibold">Comedy Video Preview</div>
            <div className="text-white/90 text-sm">
              Get the full laughs on our social platforms!
            </div>
            <div className="space-y-2">
              <a
                href="https://www.tiktok.com/@pureComedy.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Follow on TikTok
              </a>
              <a
                href="https://www.youtube.com/@pureComedyAI"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Play/Pause Overlay - only show for actual videos (not YouTube embeds) */}
      {video.url && !video.youtubeId && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlayPause}
        >
          {!isPlaying && (
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
              <Play className="w-12 h-12 text-white ml-1" />
            </div>
          )}
        </div>
      )}

      {/* Controls Overlay - only show for actual videos (not YouTube embeds) */}
      {video.url && !video.youtubeId && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        
        {/* Top Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="text-white">
            <h3 className="font-semibold text-sm mb-1">{video.title}</h3>
            <p className="text-white/80 text-xs">{video.character}</p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
          
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <span className="text-white text-sm">
                {formatDuration(Math.floor(currentTime))} / {formatDuration(video.duration)}
              </span>
            </div>

            {/* Right Engagement Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "text-white hover:bg-white/20 flex items-center gap-1",
                  isLiked && "text-red-500"
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                <span className="text-xs">{formatNumber(video.likes + (isLiked ? 1 : 0))}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onComment}
                className="text-white hover:bg-white/20 flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{formatNumber(video.comments)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                className="text-white hover:bg-white/20 flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* View Counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-white text-xs">{formatNumber(video.views)} views</span>
      </div>
    </div>
  )
}