"use client"

interface FabricSelectorProps {
  onSelect: (fabric: string) => void
}

export default function FabricSelector({ onSelect }: FabricSelectorProps) {
  const fabrics = [
    { id: "cotton", name: "Cotton", image: "/placeholder.svg?height=80&width=80" },
    { id: "lawn", name: "Lawn", image: "/placeholder.svg?height=80&width=80" },
    { id: "silk", name: "Silk", image: "/placeholder.svg?height=80&width=80" },
    { id: "chiffon", name: "Chiffon", image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-slate-700">Fabric Patterns</h3>
      <div className="grid grid-cols-2 gap-2">
        {fabrics.map((fabric) => (
          <div
            key={fabric.id}
            className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
            onClick={() => onSelect(fabric.id)}
          >
            <div className="aspect-square bg-slate-100 rounded overflow-hidden">
              <img src={fabric.image || "/placeholder.svg"} alt={fabric.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-center mt-1">{fabric.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
