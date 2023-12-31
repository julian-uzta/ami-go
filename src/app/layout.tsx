import './globals.css'
import { Inter } from 'next/font/google'

import { NavigationBar } from './components/NavigationBar'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'amiGO',
  description: 'amiGO Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="h-screen w-screen bg-base-200 font-sans">
            <NavigationBar/>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
