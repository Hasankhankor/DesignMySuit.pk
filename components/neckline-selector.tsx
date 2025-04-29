"use client"

interface NecklineSelectorProps {
  onSelect: (neckline: string) => void
}

export default function NecklineSelector({ onSelect }: NecklineSelectorProps) {
  const necklines = [
    { id: "round", name: "Round", image: "/placeholder.svg?height=60&width=60" },
    { id: "v-neck", name: "V-Neck", image: "/placeholder.svg?height=60&width=60" },
    { id: "square", name: "Square", image: "/placeholder.svg?height=60&width=60" },
    { id: "boat", name: "Boat", image: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {necklines.map((neckline) => (
        <div
          key={neckline.id}
          className="border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50"
          onClick={() => onSelect(neckline.id)}
        >
          <div className="aspect-square bg-slate-100 rounded overflow-hidden">
            <img
              src={neckline.image || "/placeholder.svg"}
              alt={neckline.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-center mt-1">{neckline.name}</p>
        </div>
      ))}
    </div>
  )
}
