import "./globals.css";
import Header from "./_features/Home/Header";
import Footer from "./_features/Footer";
import { ThemeProvider } from "./_context/ThemeContext";

export const metadata = {
  title: "Movie App",
  description: "Movie website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-white text-black dark:bg-[#0F0F0F] dark:text-white transition-colors"
      >
        <ThemeProvider>
          <div className="flex flex-col items-center justify-center">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
