"use client"

import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlayCircle, ChevronDown, CheckCircle, XCircle, HelpCircle } from "lucide-react"
import { improvedTranscriptData, factcheckData, TextPart, FactcheckStatement } from "@/lib/dummy-transcript"

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const DeterminationBadge = ({ determination }: { determination: string }) => {
  switch (determination.toLowerCase()) {
    case 'true':
      return <Badge variant="outline" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> True</Badge>
    case 'false':
      return <Badge variant="outline" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> False</Badge>
    default:
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800"><HelpCircle className="w-3 h-3 mr-1" /> Uncertain</Badge>
  }
}

export default function YoutubeFactcheck() {
  const [currentTime, setCurrentTime] = useState(0)
  const [videoUrl, setVideoUrl] = useState("")
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const playerRef = useRef<ReactPlayer>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [lastActiveItemId, setLastActiveItemId] = useState<string | null>(null)
  const [highlightedTextPartIds, setHighlightedTextPartIds] = useState<number[]>([])

  const handleProgress = (state: { playedSeconds: number }) => {
    if (Math.abs(state.playedSeconds - currentTime) > 0.1) {
      setCurrentTime(state.playedSeconds)
    }
  }

  const seekTo = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds')
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVideoLoaded(true)
  }

  useEffect(() => {
    if (isVideoLoaded && scrollAreaRef.current) {
      const activeItem = improvedTranscriptData.transcript.find((item: TextPart) => 
        item.startTime === Math.floor(currentTime)
      )
      if (activeItem && activeItem.id.toString() !== lastActiveItemId) {
        setLastActiveItemId(activeItem.id.toString())
        const activeElement = document.getElementById(`transcript-item-${activeItem.id}`)
        if (activeElement) {
          const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement
          if (scrollContainer) {
            const topOffset = (activeElement as HTMLElement).offsetTop - scrollContainer.offsetTop
            scrollContainer.scrollTo({
              top: topOffset,
              behavior: 'smooth'
            })
          }
        }
      }
    }
  }, [currentTime, isVideoLoaded, lastActiveItemId])

  const handleFactcheckClick = (factcheck: FactcheckStatement) => {
    setHighlightedTextPartIds(factcheck.attachedTextPartIds)
  }

  return (
    <Card className="max-w-4xl mx-auto p-4">
      <CardContent className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">YouTube Video Player with Transcript</h1>
        <form onSubmit={handleUrlSubmit} className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Paste your YouTube video link here"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Load Video</Button>
          </div>
        </form>
        {isVideoLoaded && (
          <>
            <div className="aspect-video mb-4 bg-gray-200 rounded-lg overflow-hidden">
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                width="100%"
                height="100%"
                controls={true}
                onProgress={handleProgress}
                playing={true}
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">Transcript</h2>
            <ScrollArea ref={scrollAreaRef} className="h-[300px] border rounded-md p-4">
              {improvedTranscriptData.transcript.map((item: TextPart, index: number) => (
                <div
                  key={index}
                  id={`transcript-item-${item.id}`}
                  className={`mb-4 ${
                    currentTime >= item.startTime && currentTime < item.endTime
                      ? 'bg-primary/10 p-2 rounded'
                      : highlightedTextPartIds.includes(item.id)
                      ? 'bg-yellow-100 p-2 rounded'
                      : ''
                  }`}
                >
                  <div key={item.id}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => seekTo(item.startTime)}
                      className="text-primary hover:text-primary/80 transition-colors p-0 h-auto font-mono"
                    >
                      <PlayCircle className="w-4 h-4 mr-1" />
                      {formatTime(item.startTime)}
                    </Button>
                    <p className="mt-1">{item.text}</p>
                  </div>
                  {factcheckData.factcheckStatements
                    .filter((factcheck: FactcheckStatement) => factcheck.attachedTextPartIds.includes(item.id))
                    .map((factcheck: FactcheckStatement) => (
                      <Collapsible key={factcheck.id} className="mt-4">
                        <div className="flex items-center space-x-2">
                          <DeterminationBadge determination={factcheck.determination} />
                          <CollapsibleTrigger
                            className="flex items-center text-sm text-left font-medium hover:underline"
                            onClick={() => handleFactcheckClick(factcheck)}
                          >
                            {factcheck.claim}
                            <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200" />
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="mt-2 pl-4 border-l-2 border-primary/20">
                          <p className="text-sm text-muted-foreground mb-2">{factcheck.explanation}</p>
                          <h4 className="text-sm font-semibold mb-1">Sources:</h4>
                          <ul className="list-none space-y-1">
                            {factcheck.sources.map((source, sourceIndex) => (
                              <li key={sourceIndex}>
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {source.title || source.url}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                </div>
              ))}
            </ScrollArea>
          </>
        )}
      </CardContent>
    </Card>
  )
}