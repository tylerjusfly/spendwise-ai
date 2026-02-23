import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CurrencyProvider } from "@/context/currency-context";

export const metadata: Metadata = {
  title: 'SpendWise AI - Smart Financial Management',
  description: 'Manage your salary, track expenses, and save more with AI-powered financial advice.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CurrencyProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto bg-background p-4 md:p-8">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
