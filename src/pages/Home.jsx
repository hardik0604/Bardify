import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Translator from '../components/Translator'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <main className="flex-grow py-12 flex flex-col items-center relative w-full">
        <Hero />
        <Translator />
      </main>
      <Footer />
    </div>
  )
}
