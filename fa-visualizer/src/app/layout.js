import './globals.css'


// app/layout.js
export const metadata = {
  title: 'Next.js App with Tables and Circles',
  description: 'A Next.js application with table inputs and dynamic circle components',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}