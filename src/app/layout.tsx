import { ThemeProvider } from "@/providers/theme-provider"
import { ModeToggle } from "@/components/ui/mode-toggle"
import './globals.css';
import Sidebar from "@/components/sidebar/sidebar";

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex flex-row">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen w-full">
              <Sidebar/>
              <main className="flex-1 p-4">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
