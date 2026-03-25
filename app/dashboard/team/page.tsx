import { Mail } from "lucide-react"

export default function TeamPage() {
  const team = [
    { name: "Sarah Jenkins", role: "Project Manager", image: "https://i.pravatar.cc/150?u=sarah", email: "sarah@owow.io", color: "from-blue-500/20 to-purple-500/20" },
    { name: "David Chen", role: "Lead Designer", image: "https://i.pravatar.cc/150?u=david", email: "david@owow.io", color: "from-emerald-500/20 to-teal-500/20" },
    { name: "Maria Garcia", role: "Frontend Developer", image: "https://i.pravatar.cc/150?u=maria", email: "maria@owow.io", color: "from-amber-500/20 to-orange-500/20" },
    { name: "James Wilson", role: "Backend Developer", image: "https://i.pravatar.cc/150?u=james", email: "james@owow.io", color: "from-purple-500/20 to-pink-500/20" },
    { name: "Karim Massaoud", role: "QA Engineer", image: "https://i.pravatar.cc/150?u=karim", email: "karim@owow.io", color: "from-rose-500/20 to-red-500/20" },
  ]

  const roleColors: Record<string, string> = {
    "Project Manager": "text-blue-400 bg-blue-500/10",
    "Lead Designer": "text-emerald-400 bg-emerald-500/10",
    "Frontend Developer": "text-amber-400 bg-amber-500/10",
    "Backend Developer": "text-purple-400 bg-purple-500/10",
    "QA Engineer": "text-rose-400 bg-rose-500/10",
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Team</h2>
        <p className="text-sm text-gray-500 mt-1">The core OWOW team members dedicated to your project.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.map((member, idx) => (
          <div
            key={idx}
            className={`glass-card overflow-hidden flex flex-col animate-slide-up stagger-${idx + 1}`}
          >
            {/* Gradient header */}
            <div className={`h-20 bg-gradient-to-r ${member.color} relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Content */}
            <div className="px-5 pb-5 relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-[3px] border-[#0a0a0f] overflow-hidden -mt-8 mb-3 bg-[#1a1a2e] ring-2 ring-white/10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-semibold text-white">{member.name}</h3>
              <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full mt-2 ${roleColors[member.role] || 'text-gray-400 bg-white/5'}`}>
                {member.role}
              </span>
            </div>

            {/* Action */}
            <div className="border-t border-white/[0.04] p-3 mt-auto">
              <button
                className="flex w-full items-center justify-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] py-2.5 rounded-xl transition-all"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
