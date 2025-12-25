/**
 * AI Voice Tools Template - Terminal console style
 * Speech-to-Text and Text-to-Speech using OpenAI Whisper and TTS
 */
'use client';

import { useState } from 'react';
import { Mic, Volume2, Play, Pause, Upload, Download } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Demo transcription
const demoTranscription = `Welcome to Fabrk, the terminal-styled SaaS boilerplate. Today we're going to explore the AI features including chat, text tools, image generation, and voice processing. Let's get started.`;

// Available voices
const voices = [
  { id: 'alloy', label: 'Alloy', description: 'Neutral' },
  { id: 'echo', label: 'Echo', description: 'Male' },
  { id: 'fable', label: 'Fable', description: 'British' },
  { id: 'onyx', label: 'Onyx', description: 'Deep male' },
  { id: 'nova', label: 'Nova', description: 'Female' },
  { id: 'shimmer', label: 'Shimmer', description: 'Soft female' },
] as const;

const templateCode = `"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export default function AIVoicePage() {
  // Speech-to-Text state
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Text-to-Speech state
  const [text, setText] = useState("");
  const [voice, setVoice] = useState<"alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer">("alloy");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Speech-to-Text handler
  const handleTranscribe = async () => {
    if (!audioFile) return;

    setIsTranscribing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      const response = await fetch("/api/ai/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setTranscription(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Text-to-Speech handler
  const handleSpeak = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });

      if (!response.ok) throw new Error("Failed to generate speech");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-12">
      {/* Speech-to-Text Card */}
      <Card>
        <CardHeader code="0x01" title="SPEECH_TO_TEXT" />
        <CardContent padding="lg">
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
          <Button onClick={handleTranscribe} disabled={isTranscribing || !audioFile}>
            {isTranscribing ? "TRANSCRIBING..." : "> TRANSCRIBE"}
          </Button>
          {transcription && <div className="mt-4">{transcription}</div>}
        </CardContent>
      </Card>

      {/* Text-to-Speech Card */}
      <Card>
        <CardHeader code="0x02" title="TEXT_TO_SPEECH" />
        <CardContent padding="lg">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="> Enter text to speak..." />
          <select value={voice} onChange={(e) => setVoice(e.target.value as any)}>
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="nova">Nova</option>
          </select>
          <Button onClick={handleSpeak} disabled={isGenerating || !text.trim()}>
            {isGenerating ? "GENERATING..." : "> GENERATE SPEECH"}
          </Button>
          {audioUrl && <audio controls src={audioUrl} />}
        </CardContent>
      </Card>
    </div>
  );
}`;

function AIVoicePreview() {
  const [activeTab, setActiveTab] = useState<'stt' | 'tts'>('stt');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <TemplatePreviewWrapper>
      <div className="space-y-6">
        {/* Tab Selector */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'stt' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('stt')}
            className={cn('text-xs', mode.radius, mode.font)}
          >
            <Mic className="mr-2 size-4" />
            SPEECH TO TEXT
          </Button>
          <Button
            variant={activeTab === 'tts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('tts')}
            className={cn('text-xs', mode.radius, mode.font)}
          >
            <Volume2 className="mr-2 size-4" />
            TEXT TO SPEECH
          </Button>
        </div>

        {/* Speech-to-Text */}
        {activeTab === 'stt' && (
          <Card>
            <CardHeader code="0x01" title="SPEECH_TO_TEXT" />
            <CardContent padding="lg">
              {/* File Upload */}
              <div className="mb-6">
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[AUDIO FILE]:</p>
                <div
                  className={cn(
                    'border-border bg-muted/30 flex flex-col items-center justify-center gap-4 border border-dashed p-8',
                    mode.radius
                  )}
                >
                  <Upload className="text-muted-foreground size-8" />
                  <p className={cn('text-muted-foreground text-center text-xs', mode.font)}>
                    Drag and drop an audio file, or click to browse
                    <br />
                    <span className="text-muted-foreground/70">
                      Supports MP3, WAV, M4A, WebM (max 25MB)
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className={cn('text-xs', mode.radius, mode.font)}
                  >
                    <Upload className="mr-2 size-3" />
                    UPLOAD FILE
                  </Button>
                </div>
              </div>

              {/* Transcribe Button */}
              <Button disabled className={cn('mb-6 text-xs', mode.state.muted.opacity, mode.radius, mode.font)}>
                <Mic className="mr-2 size-4" />
                &gt; TRANSCRIBE
              </Button>

              {/* Demo Transcription Output */}
              <div>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>
                  [TRANSCRIPTION]:
                </p>
                <div
                  className={cn(
                    'border-border bg-muted/30 border p-4 text-sm',
                    mode.radius,
                    mode.font
                  )}
                >
                  {demoTranscription}
                </div>
                <div className="mt-2 flex gap-4">
                  <span className={cn('text-muted-foreground text-xs', mode.font)}>
                    [MODEL]: whisper-1
                  </span>
                  <span className={cn('text-muted-foreground text-xs', mode.font)}>
                    [DURATION]: 12.5s
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Text-to-Speech */}
        {activeTab === 'tts' && (
          <Card>
            <CardHeader code="0x02" title="TEXT_TO_SPEECH" />
            <CardContent padding="lg">
              {/* Text Input */}
              <div className="mb-6">
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[TEXT]:</p>
                <Textarea
                  value="Welcome to Fabrk, the terminal-styled SaaS boilerplate."
                  readOnly
                  rows={3}
                  className={cn('text-sm', mode.radius, mode.font)}
                />
              </div>

              {/* Voice Selector */}
              <div className="mb-6">
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[VOICE]:</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {voices.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVoice(v.id)}
                      className={cn(
                        'flex flex-col items-center border p-2',
                        mode.radius,
                        selectedVoice === v.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-muted/50'
                      )}
                    >
                      <span className={cn('text-xs font-medium', mode.font)}>{v.label}</span>
                      <span className={cn('text-muted-foreground text-xs', mode.font)}>
                        {v.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button disabled className={cn('mb-6 text-xs', mode.state.muted.opacity, mode.radius, mode.font)}>
                <Volume2 className="mr-2 size-4" />
                &gt; GENERATE SPEECH
              </Button>

              {/* Audio Player */}
              <div>
                <p className={cn('text-muted-foreground mb-2 text-xs', mode.font)}>[OUTPUT]:</p>
                <div
                  className={cn('border-border flex items-center gap-4 border p-4', mode.radius)}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn('size-10 p-0', mode.radius)}
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </Button>

                  <div className="flex-1">
                    <div className="bg-muted mb-1 h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: isPlaying ? '45%' : '0%' }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className={cn('text-muted-foreground text-xs', mode.font)}>
                        {isPlaying ? '0:05' : '0:00'}
                      </span>
                      <span className={cn('text-muted-foreground text-xs', mode.font)}>0:12</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className={cn('text-xs', mode.radius, mode.font)}
                  >
                    <Download className="mr-1 size-3" />
                    MP3
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TemplatePreviewWrapper>
  );
}

export default function AIVoiceTemplate() {
  return (
    <TemplateShowcasePage
      badge="AI VOICE"
      title="AI Voice Tools"
      description="Speech-to-Text transcription and Text-to-Speech synthesis using OpenAI"
      templateId="ai-voice"
      category={{ name: 'AI', href: '/library?category=ai' }}
      preview={<AIVoicePreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', 'api/ai/', 'speech-to-text/route.ts'], label: '← Whisper API' },
        { path: ['app/', 'api/ai/', 'text-to-speech/route.ts'], label: '← TTS API' },
        { path: ['app/', '(tools)/', 'ai-voice/page.tsx'], label: '← Copy template here' },
      ]}
      features={[
        'Speech-to-Text using OpenAI Whisper',
        'Text-to-Speech using OpenAI TTS',
        '6 voice options (alloy, echo, fable, onyx, nova, shimmer)',
        'Multiple audio formats (MP3, WAV, M4A, WebM)',
        'Adjustable speech speed (0.25x to 4x)',
        'HD quality option',
        'Download generated audio',
        'Supports 50+ languages',
        'Max 25MB audio files',
        'Optional credit integration',
      ]}
    />
  );
}
