/**
 * Template code for error pages
 * Copy-paste ready code example
 */
export const templateCode = `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  FileQuestion,
  ServerCrash,
  Construction,
  Home,
  RefreshCw,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

// Choose error type: 'error' | '404' | '500' | '503'
const errorType = '404';

const errorPages = {
  error: {
    code: "ERROR",
    title: "Something Went Wrong",
    description: "We're sorry, but something unexpected happened.",
    icon: AlertTriangle,
    terminal: [
      "$ process.run --component=App",
      "STATUS: EXCEPTION CAUGHT",
      "TYPE: RuntimeError",
      "",
      "ERROR: Unexpected application error",
      "DIGEST: err_1921274745",
    ],
    actions: ["TRY AGAIN", "GO HOME"],
  },
  "404": {
    code: "404",
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    icon: FileQuestion,
    terminal: [
      "$ curl -I https://fabrk.ai/unknown-page",
      "HTTP/1.1 404 Not Found",
      "",
      "ERROR: Resource not found",
      "PATH: /unknown-page",
    ],
    actions: ["GO HOME", "GO BACK"],
  },
  "500": {
    code: "500",
    title: "Server Error",
    description: "Something went wrong on our end.",
    icon: ServerCrash,
    terminal: [
      "$ systemctl status fabrk-api",
      "● fabrk-api.service - Status: ERROR",
      "",
      "ERROR: Internal server exception",
      "TRACE: DatabaseConnectionError",
    ],
    actions: ["TRY AGAIN", "GO HOME"],
  },
  "503": {
    code: "503",
    title: "Under Maintenance",
    description: "We're performing scheduled maintenance.",
    icon: Construction,
    terminal: [
      "$ fabrk status",
      "SERVICE: maintenance_mode=true",
      "DOWNTIME: ~30 minutes",
      "",
      "STATUS: IN PROGRESS",
    ],
    actions: ["REFRESH", "STATUS PAGE"],
  },
};

export default function ErrorPage() {
  const error = errorPages[errorType];
  const Icon = error.icon;
  const isWarning = errorType === "503";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        {/* Icon */}
        <div
          className={\`mx-auto flex h-20 w-20 items-center justify-center border \${
            isWarning ? "border-warning bg-warning/10" : "border-destructive bg-destructive/10"
          }\`}
        >
          <Icon className={\`h-10 w-10 \${isWarning ? "text-warning" : "text-destructive"}\`} />
        </div>

        {/* Error Code */}
        <div className={cn(mode.font)}>
          <span className={\`text-6xl font-semibold \${isWarning ? "text-warning" : "text-destructive"}\`}>
            {error.code}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className={cn(mode.font, "mb-2 text-2xl font-semibold")}>{error.title}</h2>
          <p className={cn(mode.font, "text-muted-foreground text-sm")}>{error.description}</p>
        </div>

        {/* Terminal Output */}
        <Card>
          <CardHeader code="0x00" title="OUTPUT" />
          <CardContent>
            <div className="space-y-0.5 text-xs">
              {error.terminal.map((line, idx) => (
                <div key={idx} className={
                  line.startsWith("ERROR") ? "text-destructive" :
                  line.startsWith("$") ? "text-success" :
                  line === "" ? "h-2" : ""
                }>
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Home className="mr-1 h-3 w-3" /> &gt; GO HOME
          </Button>
          <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
            <ArrowLeft className="mr-1 h-3 w-3" /> &gt; GO BACK
          </Button>
        </div>

        <div className={cn(mode.font, "text-muted-foreground text-xs")}>
          [REQUEST ID]: req_abc123def456
        </div>
      </div>
    </div>
  );
}`;
