'use client';

import { toast as sonnerToast } from 'sonner';

export interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useToast() {
  return {
    toast: (options: ToastOptions) => {
      const { title, description, action } = options;
      const message = title ? `${title}${description ? `: ${description}` : ''}` : description;

      sonnerToast.success(message, {
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
      });
    },
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
    success: (title: string, description?: string) => {
      sonnerToast.success(title, {
        description,
      });
    },
    error: (title: string, description?: string) => {
      sonnerToast.error(title, {
        description,
      });
    },
    info: (title: string, description?: string) => {
      sonnerToast.info(title, {
        description,
      });
    },
    warning: (title: string, description?: string) => {
      sonnerToast.warning(title, {
        description,
      });
    },
  };
}
