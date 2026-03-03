import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f5f1] relative">

      {/* Notebook background lines */}
      <div

        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 31px,
            rgba(180, 160, 140, 0.2) 31px,
            rgba(180, 160, 140, 0.2) 32px
          )`,
        }}
      />

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#f3b98a] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[#8ac7b8] opacity-60 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#f8d67b] opacity-60 blur-2xl" />

      {/* Everything centered here */}
      <div className="relative z-10">


          <Navbar />

          

      </div>
    </div>
  )
}