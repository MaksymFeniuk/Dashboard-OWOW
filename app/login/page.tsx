"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Globe, ArrowRight, Check } from "lucide-react"

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false)
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.07] rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[120px]" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-extrabold text-lg shadow-lg shadow-blue-500/20">
          O
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight">OWOW<span className="text-xs align-top font-normal text-gray-500 ml-0.5">®</span></span>
          <span className="text-[11px] font-medium text-gray-500 tracking-widest uppercase mt-0.5">Dashboard</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center w-full px-4 lg:gap-24 max-w-[1400px] mx-auto relative z-10">

        {/* Left Side: Login Form */}
        <div className="w-full max-w-[440px] animate-fade-in">
          <div className="glass-card-static p-10 md:p-12">
            <div className="flex flex-col mb-10">
              <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome back</h1>
              <p className="text-sm text-gray-400">Sign in to access your project dashboard</p>
            </div>

            <form className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="pl-11 bg-white/[0.04] border border-white/[0.08] text-white h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/30 placeholder:text-gray-600 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="pl-11 bg-white/[0.04] border border-white/[0.08] text-white h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/30 placeholder:text-gray-600 text-sm transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                      rememberMe
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-white/10 bg-white/[0.04]'
                    }`}
                  >
                    {rememberMe && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-xs text-gray-400">Remember me</span>
                </label>
                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <div className="pt-2">
                <Link href="/dashboard/projects" className="block w-full">
                  <Button type="button" className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Globe Graphic */}
        <div className="hidden lg:flex items-center justify-center ml-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex items-center justify-center">
            <Globe className="w-[350px] h-[350px] text-blue-500/40 animate-float" strokeWidth={0.3} />
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full my-auto mx-auto w-[250px] h-[250px]" />

            {/* Orbital rings */}
            <div className="absolute border border-blue-500/20 w-[380px] h-[100px] rounded-[100%] rotate-12" />
            <div className="absolute border border-blue-400/15 w-[380px] h-[100px] rounded-[100%] -rotate-12" />
            <div className="absolute border border-blue-300/10 w-[400px] h-[140px] rounded-[100%] rotate-6" />
          </div>
        </div>

      </div>
    </div>
  )
}
