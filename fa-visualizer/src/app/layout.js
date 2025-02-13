import "./globals.css";

export const metadata = {
  title: "Finite Automata Visualizer",
  description: "Visualize finite automata easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
