"use client"

export default function EmbroiderySelector({ onSelect }: { onSelect?: (embroidery: string) => void }) {
  const embroideryStyles = [
    { id: "floral", name: "Floral", image: "/placeholder.svg?height=80&width=80" },
    { id: "geometric", name: "Geometric", image: "/placeholder.svg?height=80&width=80" },
    { id: "traditional", name: "Traditional", image: "/placeholder.svg?height=80&width=80" },
    { id: "modern", name: "Modern", image: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {embroideryStyles.map((style) => (
        <div
          key={style.id}
          className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
          onClick={() => onSelect && onSelect(style.id)}
        >
          <div className="aspect-square bg-slate-100 rounded overflow-hidden">
            <img src={style.image || "/placeholder.svg"} alt={style.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-center mt-1">{style.name}</p>
        </div>
      ))}
    </div>
  )
}
