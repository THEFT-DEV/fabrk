'use client';

import * as React from 'react';
import {
  FileUp,
  Send,
  Loader2,
  FileText,
  X,
  Bot,
  User,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export interface PdfChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface PdfChatProps {
  onAskQuestion?: (question: string, pdfContent: string) => Promise<string>;
  className?: string;
}

// Demo responses for when no API is provided
const DEMO_RESPONSES: Record<string, string> = {
  summary:
    'Based on the uploaded document, this appears to be a technical specification document covering system architecture, API endpoints, and integration guidelines. The document is organized into 5 main sections with detailed implementation notes.',
  default:
    'I can help you analyze this document. The content has been processed and indexed. Try asking about specific sections, key points, or request a summary of particular topics.',
  key_points:
    'Key points from the document:\n\n1. Authentication uses JWT tokens with 24-hour expiry\n2. Rate limiting is set at 1000 requests/minute\n3. All endpoints require HTTPS\n4. Data is encrypted at rest using AES-256',
};

export function AiPdfChat({ onAskQuestion, className }: PdfChatProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [pdfContent, setPdfContent] = React.useState<string>('');
  const [messages, setMessages] = React.useState<PdfChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile || uploadedFile.type !== 'application/pdf') return;

    setFile(uploadedFile);
    setIsProcessing(true);
    setMessages([]);

    // Simulate PDF processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real implementation, you'd extract text with pdf-parse or similar
    setPdfContent(`[Extracted content from ${uploadedFile.name}]`);
    setIsProcessing(false);

    // Add initial message
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `I've processed "${uploadedFile.name}" (${(uploadedFile.size / 1024).toFixed(1)} KB). You can now ask me questions about its content.`,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !file) return;

    const userMessage: PdfChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response: string;

      if (onAskQuestion) {
        response = await onAskQuestion(userMessage.content, pdfContent);
      } else {
        // Demo mode - simulate response
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const lowerContent = userMessage.content.toLowerCase();
        if (lowerContent.includes('summary') || lowerContent.includes('summarize')) {
          response = DEMO_RESPONSES.summary;
        } else if (lowerContent.includes('key') || lowerContent.includes('points') || lowerContent.includes('main')) {
          response = DEMO_RESPONSES.key_points;
        } else {
          response = DEMO_RESPONSES.default;
        }
      }

      const assistantMessage: PdfChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '[ERROR] Failed to process your question. Please try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPdfContent('');
    setMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={cn('flex h-[600px] flex-col', className)}>
      <CardHeader
        code="0xPDF"
        title="PDF_CHAT"
        meta={
          file && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={cn('h-6 px-2 text-xs', mode.radius, mode.font)}
            >
              <Trash2 className="mr-1 size-3" />
              CLEAR
            </Button>
          )
        }
      />

      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        {/* Upload Area or Chat */}
        {!file ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <div
              className={cn(
                'flex size-16 items-center justify-center border-2 border-dashed',
                mode.radius,
                mode.color.border.default
              )}
            >
              <FileUp className="size-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className={cn('text-sm font-semibold', mode.font)}>
                UPLOAD A PDF DOCUMENT
              </p>
              <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                Drag & drop or click to browse
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className={cn('text-xs', mode.radius, mode.font)}
            >
              <FileUp className="mr-2 size-4" />
              SELECT PDF
            </Button>
          </div>
        ) : (
          <>
            {/* File Info Bar */}
            <div
              className={cn(
                'flex items-center gap-2 border-b px-4 py-2',
                mode.color.border.default,
                'bg-muted/50'
              )}
            >
              <FileText className="size-4 text-primary" />
              <span className={cn('flex-1 truncate text-xs', mode.font)}>
                {file.name}
              </span>
              <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="size-6 p-0"
              >
                <X className="size-3" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <Loader2 className="size-6 animate-spin" />
                  <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    PROCESSING DOCUMENT...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn('flex gap-4', msg.role === 'user' && 'justify-end')}
                    >
                      {msg.role === 'assistant' && (
                        <div
                          className={cn(
                            'flex size-8 shrink-0 items-center justify-center border',
                            mode.radius,
                            mode.color.border.default,
                            'bg-muted'
                          )}
                        >
                          <Bot className="size-4" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'max-w-[80%] border px-3 py-2',
                          mode.radius,
                          msg.role === 'user'
                            ? 'bg-primary/10 border-primary'
                            : cn('bg-muted/50', mode.color.border.default)
                        )}
                      >
                        <p
                          className={cn(
                            'whitespace-pre-wrap text-sm',
                            mode.font
                          )}
                        >
                          {msg.content}
                        </p>
                      </div>
                      {msg.role === 'user' && (
                        <div
                          className={cn(
                            'flex size-8 shrink-0 items-center justify-center border',
                            mode.radius,
                            'border-primary bg-primary/10'
                          )}
                        >
                          <User className="size-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center border',
                          mode.radius,
                          mode.color.border.default,
                          'bg-muted'
                        )}
                      >
                        <Bot className="size-4" />
                      </div>
                      <div
                        className={cn(
                          'flex items-center gap-1 border px-3 py-2',
                          mode.radius,
                          'bg-muted/50',
                          mode.color.border.default
                        )}
                      >
                        <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                        <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                        <span className="size-2 animate-bounce rounded-full bg-current" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className={cn('border-t p-4', mode.color.border.default)}>
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="> Ask a question about the document..."
                  disabled={isLoading || isProcessing}
                  className={cn('flex-1 text-sm', mode.radius, mode.font)}
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || isProcessing}
                  className={cn('px-4 text-xs', mode.radius, mode.font)}
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </div>
              <p className={cn('mt-2 text-center text-xs', mode.font, mode.color.text.muted)}>
                Try: &quot;Summarize this document&quot; or &quot;What are the key points?&quot;
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
