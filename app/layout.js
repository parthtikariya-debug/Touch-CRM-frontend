import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'WOVE — AI Customer Engagement Suite',
  description: 'The AI-powered Customer Engagement Suite for D2C brands to acquire customers, recover abandoned carts, automate conversations, and maximize Customer Lifetime Value.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-white text-black antialiased selection:bg-[#FEF48D] selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
