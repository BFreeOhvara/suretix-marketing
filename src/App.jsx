import Nav from './components/Nav'
import Hero from './components/Hero'
import Leak from './components/Leak'
import System from './components/System'
import Process from './components/Process'
import WhoItsFor from './components/WhoItsFor'
import Outcomes from './components/Outcomes'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
// ChatWidget is intentionally not mounted yet — its `marketing-chat` backend
// carries a behavioral-health system prompt and would talk off-brand on a
// bail-bonds site. Re-add <ChatWidget /> once a Suretix-aware backend exists
// (niche param on marketing-chat, or a dedicated edge function).

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-base">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Leak />
        <System />
        <Process />
        <WhoItsFor />
        <Outcomes />
        <FinalCTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
