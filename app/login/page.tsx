import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Globe } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black font-extrabold text-3xl">
          O
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-3xl font-extrabold tracking-widest lowercase">OWOW</span>
          <span className="text-sm font-light italic tracking-widest mt-1">Dashboard</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full px-4 lg:gap-32 max-w-[1400px] mx-auto">
        
        {/* Left Side: Login Form */}
        <div className="w-full max-w-[420px] bg-[#1a1a1a] p-12 rounded-[2rem] shadow-2xl z-10 relative">
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-5xl font-bold mb-3 tracking-wide">Login</h1>
            <p className="text-sm font-medium text-zinc-400">Lorem ipsum dolar at dolar lorem</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500">
                  <User className="h-5 w-5" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Username" 
                  className="pl-12 bg-white text-black border-0 h-14 rounded-xl focus-visible:ring-2 focus-visible:ring-[#007bfe] focus-visible:ring-offset-0 focus-visible:ring-offset-transparent placeholder:text-zinc-500 font-medium" 
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500">
                  <Lock className="h-5 w-5" />
                </div>
                <Input 
                  type="password" 
                  placeholder="Password" 
                  className="pl-12 bg-white text-black border-0 h-14 rounded-xl focus-visible:ring-2 focus-visible:ring-[#007bfe] focus-visible:ring-offset-0 focus-visible:ring-offset-transparent placeholder:text-zinc-500 font-medium" 
                />
              </div>
            </div>

            <div className="pt-2">
              <Link href="/dashboard" className="block w-full">
                <Button type="button" className="w-full h-12 bg-[#007bfe] hover:bg-blue-600 text-white rounded-xl text-lg font-medium transition-colors">
                  Login Now
                </Button>
              </Link>
            </div>

            <div className="text-center mt-6">
              <Link href="#" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side: 3D Globe Graphic */}
        <div className="hidden lg:flex items-center justify-center ml-12">
          <div className="relative flex items-center justify-center">
            {/* Using a stylized lucide icon to represent the 3D globe wireframe */}
            <Globe className="w-[400px] h-[400px] text-[#007bfe]" strokeWidth={0.5} />
            <div className="absolute inset-0 bg-[#007bfe]/20 blur-[100px] rounded-full my-auto mx-auto w-[300px] h-[300px] -z-10" />
            
            {/* Adding an intersecting ring to mimic the figma globe */}
            <div className="absolute border-[6px] border-[#007bfe] w-[420px] h-[120px] rounded-[100%] rotate-12 opacity-80" />
            <div className="absolute border-[6px] border-[#007bfe] w-[420px] h-[120px] rounded-[100%] -rotate-12 opacity-80" />
          </div>
        </div>

      </div>
    </div>
  )
}
