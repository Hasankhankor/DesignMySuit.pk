"use client"

interface TrouserSelectorProps {
  onSelect: (trouser: string) => void
}

export default function TrouserSelector({ onSelect }: TrouserSelectorProps) {
  const trousers = [
    { id: "straight", name: "Straight", image: "/placeholder.svg?height=60&width=60" },
    { id: "wide", name: "Wide", image: "/placeholder.svg?height=60&width=60" },
    { id: "cigarette", name: "Cigarette", image: "/placeholder.svg?height=60&width=60" },
    { id: "dhoti", name: "Dhoti", image: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {trousers.map((trouser) => (
        <div
          key={trouser.id}
          className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
          onClick={() => onSelect(trouser.id)}
        >
          <div className="aspect-square bg-slate-100 rounded overflow-hidden">
            <img src={trouser.image || "/placeholder.svg"} alt={trouser.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-center mt-1">{trouser.name}</p>
        </div>
      ))}
    </div>
  )
}
