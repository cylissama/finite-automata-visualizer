// app/layout.js
import './globals.css'
import Navbar from '../../components/Navbar'

export const metadata = {
  title: 'Next.js App with Tables and Circles',
  description: 'A Next.js application with table inputs and dynamic circle components',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container mx-auto pt-6 px-4">
          {children}
        </div>
      </body>
    </html>
  )
}