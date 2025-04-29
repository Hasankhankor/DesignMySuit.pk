"use client"

export default function DupattaSelector({ onSelect }: { onSelect?: (dupatta: string) => void }) {
  const dupattas = [
    { id: "plain", name: "Plain", image: "/placeholder.svg?height=60&width=60" },
    { id: "embroidered", name: "Embroidered", image: "/placeholder.svg?height=60&width=60" },
    { id: "printed", name: "Printed", image: "/placeholder.svg?height=60&width=60" },
    { id: "none", name: "None", image: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {dupattas.map((dupatta) => (
        <div
          key={dupatta.id}
          className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
          onClick={() => onSelect && onSelect(dupatta.id)}
        >
          <div className="aspect-square bg-slate-100 rounded overflow-hidden">
            <img src={dupatta.image || "/placeholder.svg"} alt={dupatta.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-center mt-1">{dupatta.name}</p>
        </div>
      ))}
    </div>
  )
}
