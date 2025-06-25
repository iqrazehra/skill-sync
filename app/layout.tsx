import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeProvider from './styles/NextThemeProvider'
import ToastProvider from './components/toast.provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkillSync',
  description: 'Powered by SkillSync.ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg"
          sizes='32px'
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
