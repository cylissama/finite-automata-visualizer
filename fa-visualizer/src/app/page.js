// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Next.js App Router Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/form" className="p-6 border rounded-lg hover:bg-blue-50 transition-colors">
            <h2 className="text-2xl font-semibold mb-3">Table Input Form →</h2>
            <p>A form with a 3-column table input that allows adding and removing rows.</p>
          </Link>
          
          <Link href="/circles-demo" className="p-6 border rounded-lg hover:bg-blue-50 transition-colors">
            <h2 className="text-2xl font-semibold mb-3">Text Circles Demo →</h2>
            <p>Demo showing how to create and position text circles on a page.</p>
          </Link>
        </div>
      </div>
    </main>
  )
}