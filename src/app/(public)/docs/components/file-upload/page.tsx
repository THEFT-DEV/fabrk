'use client';

import { useState } from 'react';
import { ComponentShowcaseTemplate } from '@/components/docs';
import { DocsSection, DocsCard } from '@/components/docs';
import { Dropzone } from '@/components/ui/file-upload/dropzone';
import { Upload, FileText, Image as ImageIcon, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

function DropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="space-y-4">
      <Dropzone onFilesDropped={setFiles}>
        <div className="flex flex-col items-center gap-2">
          <Upload className={cn('size-8', mode.color.text.muted)} />
          <p className={cn('text-sm', mode.font)}>
            Drag and drop files here, or click to select
          </p>
          <p className={cn('text-xs', mode.color.text.muted, mode.font)}>
            Supports any file type
          </p>
        </div>
      </Dropzone>
      {files.length > 0 && (
        <div className={cn('border p-4 space-y-2', mode.radius, mode.color.border.default)}>
          <p className={cn('text-xs font-semibold', mode.font)}>[SELECTED FILES]:</p>
          {files.map((file, i) => (
            <div key={i} className={cn('flex items-center gap-2 text-xs', mode.font)}>
              <FileText className="size-4" />
              <span>{file.name}</span>
              <span className={mode.color.text.muted}>({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageDropzoneDemo() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Dropzone onFilesDropped={setFiles} className="aspect-video">
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <ImageIcon className={cn('size-10', mode.color.text.muted)} />
        <p className={cn('text-sm', mode.font)}>Drop images here</p>
        {files.length > 0 && (
          <p className={cn('text-xs', mode.color.text.accent, mode.font)}>
            {files.length} image(s) selected
          </p>
        )}
      </div>
    </Dropzone>
  );
}

function MinimalDropzoneDemo() {
  return (
    <Dropzone className="py-4">
      <div className="flex items-center justify-center gap-2">
        <File className={cn('size-4', mode.color.text.muted)} />
        <span className={cn('text-xs', mode.font)}>Click or drop to upload</span>
      </div>
    </Dropzone>
  );
}

export default function FileUploadPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.63]"
      title="File Upload"
      description="Drag-and-drop file upload zone with visual feedback. Supports click-to-upload and keyboard navigation. Fully accessible."
      importCode={`import { Dropzone } from "@/components/ui/file-upload/dropzone";`}
      mainPreview={{
        preview: <DropzoneDemo />,
        code: `const [files, setFiles] = useState<File[]>([]);

<Dropzone onFilesDropped={setFiles}>
  <div className="flex flex-col items-center gap-2">
    <Upload className="size-8 text-muted-foreground" />
    <p className="text-sm font-mono">
      Drag and drop files here, or click to select
    </p>
    <p className="text-xs text-muted-foreground font-mono">
      Supports any file type
    </p>
  </div>
</Dropzone>

{files.length > 0 && (
  <div className="border rounded-none p-4 space-y-2">
    <p className="text-xs font-semibold">[SELECTED FILES]:</p>
    {files.map((file, i) => (
      <div key={i} className="flex items-center gap-2 text-xs">
        <FileText className="size-4" />
        <span>{file.name}</span>
        <span className="text-muted-foreground">
          ({(file.size / 1024).toFixed(1)} KB)
        </span>
      </div>
    ))}
  </div>
)}`,
      }}
      variants={[
        {
          title: 'Image Upload Zone',
          description: 'Styled for image uploads with aspect ratio',
          preview: <ImageDropzoneDemo />,
          code: `<Dropzone onFilesDropped={setFiles} className="aspect-video">
  <div className="flex flex-col items-center justify-center h-full gap-2">
    <ImageIcon className="size-10 text-muted-foreground" />
    <p className="text-sm font-mono">Drop images here</p>
    {files.length > 0 && (
      <p className="text-xs text-primary font-mono">
        {files.length} image(s) selected
      </p>
    )}
  </div>
</Dropzone>`,
        },
        {
          title: 'Minimal Style',
          description: 'Compact dropzone for inline use',
          preview: <MinimalDropzoneDemo />,
          code: `<Dropzone className="py-4">
  <div className="flex items-center justify-center gap-2">
    <File className="size-4 text-muted-foreground" />
    <span className="text-xs font-mono">Click or drop to upload</span>
  </div>
</Dropzone>`,
        },
      ]}
    >
      <DocsSection title="Features">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsCard title="DRAG AND DROP">
            <p className="text-muted-foreground text-sm">
              Visual feedback when dragging files over the zone. Border and background change to indicate drop target.
            </p>
          </DocsCard>
          <DocsCard title="CLICK TO UPLOAD">
            <p className="text-muted-foreground text-sm">
              Click anywhere in the zone to open the native file picker. Supports multiple file selection.
            </p>
          </DocsCard>
          <DocsCard title="KEYBOARD ACCESSIBLE">
            <p className="text-muted-foreground text-sm">
              Full keyboard support with Enter and Space to activate. Focus states visible for navigation.
            </p>
          </DocsCard>
          <DocsCard title="CUSTOMIZABLE">
            <p className="text-muted-foreground text-sm">
              Pass any children for custom content. Style with className prop. Flexible sizing.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      <DocsSection title="Props Reference">
        <DocsCard title="DROPZONE PROPS">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-border border-b">
                  <th className="p-2 text-left">Prop</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">onFilesDropped</td>
                  <td className="p-2 font-mono">(files: File[]) =&gt; void</td>
                  <td className="p-2">Callback when files are selected</td>
                </tr>
                <tr className="border-border border-b">
                  <td className="p-2 font-mono">children</td>
                  <td className="p-2 font-mono">ReactNode</td>
                  <td className="p-2">Content to display inside zone</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono">className</td>
                  <td className="p-2 font-mono">string</td>
                  <td className="p-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="Usage Notes">
        <DocsCard title="FILE HANDLING">
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              <strong>Multiple files:</strong> The hidden input has <code className="bg-muted px-1">multiple</code> enabled by default.
            </li>
            <li>
              <strong>File types:</strong> Add validation in your onFilesDropped callback to restrict types.
            </li>
            <li>
              <strong>Upload logic:</strong> This component only handles selection. Implement your own upload logic.
            </li>
            <li>
              <strong>File size:</strong> Validate file sizes in your callback before uploading.
            </li>
          </ul>
        </DocsCard>
      </DocsSection>
    </ComponentShowcaseTemplate>
  );
}
