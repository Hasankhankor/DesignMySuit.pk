"use client"

import { useState } from "react"

interface ColorPickerProps {
  onColorChange: (color: string) => void
}

export default function ColorPicker({ onColorChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState("#f8f5f2")

  const colors = [
    { name: "Cream", value: "#f8f5f2" },
    { name: "Beige", value: "#e8d6c3" },
    { name: "Sage", value: "#c2c5aa" },
    { name: "Dusty Blue", value: "#8896ab" },
    { name: "Teal", value: "#5e8b7e" },
    { name: "Navy", value: "#2d3142" },
    { name: "Blush", value: "#f2c4c4" },
    { name: "Mauve", value: "#c9ada7" },
    { name: "Terracotta", value: "#c97c5d" },
    { name: "Mustard", value: "#e6b89c" },
  ]

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    onColorChange(color)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`w-full aspect-square rounded-full border ${
              selectedColor === color.value ? "ring-2 ring-offset-2 ring-rose-500" : "ring-0"
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => handleColorSelect(color.value)}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: selectedColor }} />
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="w-full h-8"
        />
      </div>
    </div>
  )
}
