"use client"

interface SleevesSelectorProps {
  onSelect: (sleeves: string) => void
}

export default function SleevesSelector({ onSelect }: SleevesSelectorProps) {
  const sleeves = [
    { id: "full", name: "Full", image: "/placeholder.svg?height=60&width=60" },
    { id: "half", name: "Half", image: "/placeholder.svg?height=60&width=60" },
    { id: "quarter", name: "Quarter", image: "/placeholder.svg?height=60&width=60" },
    { id: "sleeveless", name: "Sleeveless", image: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {sleeves.map((sleeve) => (
        <div
          key={sleeve.id}
          className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
          onClick={() => onSelect(sleeve.id)}
        >
          <div className="aspect-square bg-slate-100 rounded overflow-hidden">
            <img src={sleeve.image || "/placeholder.svg"} alt={sleeve.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-center mt-1">{sleeve.name}</p>
        </div>
      ))}
    </div>
  )
}
