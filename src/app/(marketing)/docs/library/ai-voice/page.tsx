'use client';

import { FeatureGuideTemplate, DocsSection, DocsCard } from '@/components/docs';
import { Mic, Volume2, Radio, Languages } from 'lucide-react';

export default function AiVoiceDocsPage() {
  return (
    <FeatureGuideTemplate
      code="[LIB.AI.05]"
      category="AI Tools"
      title="AI Voice"
      description="Speech-to-Text (STT) and Text-to-Speech (TTS) interfaces."
      overview="A dual-purpose voice interface for transcribing audio and generating speech. Features a real-time audio visualizer, multiple voice selections, and support for audio file uploads."
      features={[
        {
          icon: Mic,
          title: 'Speech to Text',
          description: 'High-accuracy transcription for microphone input or file uploads.',
        },
        {
          icon: Volume2,
          title: 'Text to Speech',
          description: 'Natural sounding voice generation with multiple accents.',
        },
        {
          icon: Radio,
          title: 'Visualizer',
          description: 'Real-time audio waveform visualization.',
        },
        {
          icon: Languages,
          title: 'Multi-language',
          description: 'Support for transcription and synthesis in multiple languages.',
        },
      ]}
      setup={[
        {
          title: 'Import Components',
          description: 'Add the voice tools to your page.',
          code: `import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";`,
          language: 'typescript',
        },
      ]}
      usage={[
        {
          title: 'Speech-to-Text',
          description: 'Transcribe audio files using OpenAI Whisper.',
          code: `const handleTranscribe = async (audioFile: File) => {
  const formData = new FormData();
  formData.append('audio', audioFile);

  const response = await fetch('/api/ai/speech-to-text', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data.text; // Transcribed text
};`,
          language: 'tsx',
        },
        {
          title: 'Text-to-Speech',
          description: 'Generate speech using OpenAI TTS.',
          code: `const handleSpeak = async (text: string, voice: string) => {
  const response = await fetch('/api/ai/text-to-speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  // Play or download the audio
  const audio = new Audio(url);
  audio.play();
};`,
          language: 'tsx',
        },
      ]}
      configuration={[
        {
          name: 'voice',
          type: '"alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"',
          default: '"alloy"',
          description: 'OpenAI TTS voice selection.',
        },
        {
          name: 'audioFormats',
          type: 'string[]',
          default: '["mp3", "wav", "m4a", "webm"]',
          description: 'Supported input formats for STT.',
        },
        {
          name: 'maxFileSize',
          type: 'number',
          default: '25MB',
          description: 'Maximum audio file size for transcription.',
        },
      ]}
      previous={{ title: 'AI Image', href: '/docs/library/ai-image' }}
      next={{ title: 'AI Integration', href: '/docs/features/ai-integration' }}
    >
      <DocsSection title="Voice Options">
        <DocsCard title="AVAILABLE VOICES">
          <ul className="space-y-2 text-sm text-muted-foreground font-mono">
            <li><strong>ALLOY</strong>: Neutral, balanced voice</li>
            <li><strong>ECHO</strong>: Male voice</li>
            <li><strong>FABLE</strong>: British accent</li>
            <li><strong>ONYX</strong>: Deep male voice</li>
            <li><strong>NOVA</strong>: Female voice</li>
            <li><strong>SHIMMER</strong>: Soft female voice</li>
          </ul>
        </DocsCard>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}