'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AlertDialogProvider } from '@/components/alert-dialog-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <Toaster />
        <AlertDialogProvider />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
