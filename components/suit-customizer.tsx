"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { RotateCcw, Download, Save, ShoppingCart, Upload, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"
import ColorPicker from "@/components/color-picker"
import FabricSelector from "@/components/fabric-selector"
import EmbroiderySelector from "@/components/embroidery-selector"
import NecklineSelector from "@/components/neckline-selector"
import SleevesSelector from "@/components/sleeves-selector"
import TrouserSelector from "@/components/trouser-selector"
import DupattaSelector from "@/components/dupatta-selector"

export default function SuitCustomizer({ onDesignUpdate }: { onDesignUpdate?: (data: any) => void }) {
  const [activeTab, setActiveTab] = useState("fabric")
  const [zoom, setZoom] = useState(100)
  const [selectedColor, setSelectedColor] = useState("#f8f5f2")
  const [selectedFabric, setSelectedFabric] = useState("cotton")
  const [selectedNeckline, setSelectedNeckline] = useState("round")
  const [selectedSleeves, setSelectedSleeves] = useState("full")
  const [selectedTrouser, setSelectedTrouser] = useState("straight")
  const [selectedEmbroidery, setSelectedEmbroidery] = useState("")
  const [selectedBorder, setSelectedBorder] = useState("")
  const [selectedLace, setSelectedLace] = useState("")
  const [selectedDupatta, setSelectedDupatta] = useState("plain")
  const [suitLength, setSuitLength] = useState("40")
  const [chestSize, setChestSize] = useState("36")
  const [sleeveLength, setSleeveLength] = useState("24")
  const canvasRef = useRef<HTMLDivElement>(null)
  const [designs, setDesigns] = useState<Array<{ name: string; data: any }>>([])

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateDesignData()
  }

  const handleReset = () => {
    setSelectedColor("#f8f5f2")
    setSelectedFabric("cotton")
    setSelectedNeckline("round")
    setSelectedSleeves("full")
    setSelectedTrouser("straight")
    setSelectedEmbroidery("")
    setSelectedBorder("")
    setSelectedLace("")
    setSelectedDupatta("plain")
    setSuitLength("40")
    setChestSize("36")
    setSleeveLength("24")
    setZoom(100)
    updateDesignData()
  }

  const updateDesignData = () => {
    if (onDesignUpdate) {
      const designData = {
        color: selectedColor,
        fabric: selectedFabric,
        neckline: selectedNeckline,
        sleeves: selectedSleeves,
        trouser: selectedTrouser,
        embroidery: selectedEmbroidery,
        border: selectedBorder,
        lace: selectedLace,
        dupatta: selectedDupatta,
        length: suitLength,
        chest: chestSize,
        sleeve: sleeveLength,
      }
      onDesignUpdate(designData)
    }
  }

  const handleSave = () => {
    const designData = {
      color: selectedColor,
      fabric: selectedFabric,
      neckline: selectedNeckline,
      sleeves: selectedSleeves,
      trouser: selectedTrouser,
      embroidery: selectedEmbroidery,
      border: selectedBorder,
      lace: selectedLace,
      dupatta: selectedDupatta,
      length: suitLength,
      chest: chestSize,
      sleeve: sleeveLength,
    }

    const designName = `Design_${new Date().toISOString().slice(0, 10)}_${designs.length + 1}`
    const newDesigns = [...designs, { name: designName, data: designData }]
    setDesigns(newDesigns)

    // Save to localStorage
    localStorage.setItem("savedDesigns", JSON.stringify(newDesigns))
    alert(`Design saved as "${designName}"!`)
  }

  const handleDownload = () => {
    if (!canvasRef.current) return

    // Create a temporary canvas to draw the design
    const canvas = document.createElement("canvas")
    canvas.width = 600
    canvas.height = 800
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw suit outline
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.drawImage(img, 150, 100, 300, 600)

      // Fill with selected color
      ctx.globalCompositeOperation = "source-atop"
      ctx.fillStyle = selectedColor
      ctx.fillRect(150, 100, 300, 600)

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over"

      // Add design details text
      ctx.font = "14px Arial"
      ctx.fillStyle = "#000000"
      ctx.fillText(`Fabric: ${selectedFabric}`, 20, 730)
      ctx.fillText(`Neckline: ${selectedNeckline}`, 20, 750)
      ctx.fillText(`Sleeves: ${selectedSleeves}`, 20, 770)
      ctx.fillText(`Trouser: ${selectedTrouser}`, 20, 790)

      // Create download link
      const link = document.createElement("a")
      link.download = "my-custom-suit.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }

    // Load SVG as image
    const svgData = document.querySelector(".suit-preview")?.outerHTML
    if (svgData) {
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" })
      const url = URL.createObjectURL(svgBlob)
      img.src = url
    }
  }

  const handleAddToCart = () => {
    const designData = {
      color: selectedColor,
      fabric: selectedFabric,
      neckline: selectedNeckline,
      sleeves: selectedSleeves,
      trouser: selectedTrouser,
      embroidery: selectedEmbroidery,
      border: selectedBorder,
      lace: selectedLace,
      dupatta: selectedDupatta,
      length: suitLength,
      chest: chestSize,
      sleeve: sleeveLength,
      price: calculatePrice(),
    }

    // Add to cart in localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    cart.push(designData)
    localStorage.setItem("cart", JSON.stringify(cart))

    alert("Design added to cart successfully!")
  }

  const calculatePrice = () => {
    // Base price
    let price = 2500

    // Add price based on fabric
    if (selectedFabric === "silk") price += 1500
    else if (selectedFabric === "lawn") price += 800
    else if (selectedFabric === "chiffon") price += 1200

    // Add price for embroidery
    if (selectedEmbroidery) price += 1000

    // Add price for border and lace
    if (selectedBorder) price += 500
    if (selectedLace) price += 300

    return price
  }

  // Use useEffect to update design data when any selection changes
  useEffect(() => {
    updateDesignData()
  }, [
    selectedColor,
    selectedFabric,
    selectedNeckline,
    selectedSleeves,
    selectedTrouser,
    selectedEmbroidery,
    selectedBorder,
    selectedLace,
    selectedDupatta,
    suitLength,
    chestSize,
    sleeveLength,
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left Panel - Customization Options */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="fabric" className="text-xs py-2">
              Fabric
            </TabsTrigger>
            <TabsTrigger value="style" className="text-xs py-2">
              Style
            </TabsTrigger>
            <TabsTrigger value="design" className="text-xs py-2">
              Design
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="fabric" className="mt-0 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Fabric Type</h3>
                <Select
                  value={selectedFabric}
                  onValueChange={(value) => {
                    setSelectedFabric(value)
                    updateDesignData()
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="lawn">Lawn</SelectItem>
                    <SelectItem value="silk">Silk</SelectItem>
                    <SelectItem value="chiffon">Chiffon</SelectItem>
                    <SelectItem value="georgette">Georgette</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FabricSelector
                onSelect={(fabric) => {
                  setSelectedFabric(fabric)
                  updateDesignData()
                }}
              />
            </TabsContent>

            <TabsContent value="style" className="mt-0 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Neckline</h3>
                <NecklineSelector
                  onSelect={(neckline) => {
                    setSelectedNeckline(neckline)
                    updateDesignData()
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Sleeves</h3>
                <SleevesSelector
                  onSelect={(sleeves) => {
                    setSelectedSleeves(sleeves)
                    updateDesignData()
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Trouser Style</h3>
                <TrouserSelector
                  onSelect={(trouser) => {
                    setSelectedTrouser(trouser)
                    updateDesignData()
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-0 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Embroidery</h3>
                <EmbroiderySelector
                  onSelect={(embroidery) => {
                    setSelectedEmbroidery(embroidery)
                    updateDesignData()
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Dupatta</h3>
                <DupattaSelector
                  onSelect={(dupatta) => {
                    setSelectedDupatta(dupatta)
                    updateDesignData()
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-slate-700">Upload Print</h3>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 text-slate-500 mb-2" />
                      <p className="text-xs text-slate-500">Upload custom print</p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Center Panel - Preview Canvas */}
      <div className="md:col-span-6 flex flex-col">
        <div
          ref={canvasRef}
          className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex items-center justify-center min-h-[600px] relative overflow-hidden"
          style={{ backgroundColor: selectedColor }}
        >
          <div
            className="relative"
            style={{
              transform: `scale(${zoom / 100})`,
              transition: "transform 0.3s ease",
            }}
          >
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              <svg
                width="300"
                height="500"
                viewBox="0 0 300 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="suit-preview"
              >
                {/* Kameez (Tunic) */}
                <path
                  d="M75 50 L75 350 L225 350 L225 50 C225 50, 175 80, 150 80 C125 80, 75 50, 75 50 Z"
                  fill={selectedColor}
                  stroke="#333"
                  strokeWidth="2"
                  style={{
                    filter:
                      selectedFabric === "silk"
                        ? "url(#silk-filter)"
                        : selectedFabric === "lawn"
                          ? "url(#lawn-filter)"
                          : selectedFabric === "chiffon"
                            ? "url(#chiffon-filter)"
                            : "none",
                  }}
                />

                {/* Fabric Filters */}
                <defs>
                  <filter id="silk-filter" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                  </filter>
                  <filter id="lawn-filter" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                  </filter>
                  <filter id="chiffon-filter" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                  </filter>
                </defs>

                {/* Neckline - changes based on selection */}
                {selectedNeckline === "round" && (
                  <path d="M130 50 L130 80 L170 80 L170 50" fill="none" stroke="#333" strokeWidth="2" />
                )}
                {selectedNeckline === "v-neck" && (
                  <path d="M130 50 L150 90 L170 50" fill="none" stroke="#333" strokeWidth="2" />
                )}
                {selectedNeckline === "square" && (
                  <path d="M130 50 L130 85 L170 85 L170 50" fill="none" stroke="#333" strokeWidth="2" />
                )}
                {selectedNeckline === "boat" && (
                  <path d="M110 60 C110 60, 150 75, 190 60" fill="none" stroke="#333" strokeWidth="2" />
                )}

                {/* Sleeves - changes based on selection */}
                {selectedSleeves === "full" && (
                  <>
                    <path
                      d="M75 50 L25 150 L40 160 L90 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <path
                      d="M225 50 L275 150 L260 160 L210 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    {/* Sleeve embroidery */}
                    {selectedLace === "simple" && (
                      <path
                        d="M25 150 C25 150, 30 155, 40 160 M275 150 C275 150, 270 155, 260 160"
                        fill="none"
                        stroke="#333"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    )}
                    {selectedLace === "scalloped" && (
                      <path
                        d="M25 150 C28 153, 32 153, 35 150 C38 153, 42 153, 45 150 M275 150 C272 153, 268 153, 265 150 C262 153, 258 153, 255 150"
                        fill="none"
                        stroke="#333"
                        strokeWidth="1"
                      />
                    )}
                  </>
                )}
                {selectedSleeves === "half" && (
                  <>
                    <path
                      d="M75 50 L45 100 L60 110 L90 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <path
                      d="M225 50 L255 100 L240 110 L210 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                  </>
                )}
                {selectedSleeves === "quarter" && (
                  <>
                    <path
                      d="M75 50 L60 80 L75 90 L90 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <path
                      d="M225 50 L240 80 L225 90 L210 80"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                  </>
                )}

                {/* Bottom embroidery */}
                {selectedBorder === "simple" && (
                  <path
                    d="M75 350 C75 350, 150 360, 225 350"
                    fill="none"
                    stroke="#333"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                )}
                {selectedBorder === "double" && (
                  <>
                    <path d="M75 340 C75 340, 150 350, 225 340" fill="none" stroke="#333" strokeWidth="1" />
                    <path d="M75 350 C75 350, 150 360, 225 350" fill="none" stroke="#333" strokeWidth="1" />
                  </>
                )}
                {selectedBorder === "dashed" && (
                  <path
                    d="M75 350 C75 350, 150 360, 225 350"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                )}
                {selectedBorder === "gradient" && (
                  <path d="M75 350 C75 350, 150 360, 225 350" fill="none" stroke="url(#gradient)" strokeWidth="4" />
                )}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f2c4c4" />
                    <stop offset="100%" stopColor="#c97c5d" />
                  </linearGradient>
                </defs>

                {/* Trousers - changes based on selection */}
                {selectedTrouser === "straight" && (
                  <>
                    <rect
                      x="100"
                      y="370"
                      width="40"
                      height={Number.parseInt(suitLength) * 2.5}
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <rect
                      x="160"
                      y="370"
                      width="40"
                      height={Number.parseInt(suitLength) * 2.5}
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                  </>
                )}
                {selectedTrouser === "wide" && (
                  <>
                    <path
                      d="M90 370 L70 490 L130 490 L110 370"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <path
                      d="M190 370 L170 490 L230 490 L210 370"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                  </>
                )}
                {selectedTrouser === "cigarette" && (
                  <>
                    <path
                      d="M100 370 L95 490 L135 490 L140 370"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                    <path
                      d="M160 370 L165 490 L205 490 L200 370"
                      fill={selectedColor}
                      stroke="#333"
                      strokeWidth="2"
                      style={{
                        filter:
                          selectedFabric === "silk"
                            ? "url(#silk-filter)"
                            : selectedFabric === "lawn"
                              ? "url(#lawn-filter)"
                              : selectedFabric === "chiffon"
                                ? "url(#chiffon-filter)"
                                : "none",
                      }}
                    />
                  </>
                )}

                {/* Dupatta (Scarf) */}
                {selectedDupatta !== "none" && (
                  <path
                    d="M225 100 C225 100, 250 150, 260 250 C270 350, 280 400, 290 450"
                    fill="none"
                    stroke={
                      selectedDupatta === "embroidered" ? "#555" : selectedDupatta === "printed" ? "#777" : "#333"
                    }
                    strokeWidth={selectedDupatta === "embroidered" ? "2" : "1"}
                    strokeDasharray={selectedDupatta === "printed" ? "5,5" : "none"}
                    opacity="0.7"
                  />
                )}

                {/* Embroidery patterns */}
                {selectedEmbroidery === "floral" && (
                  <>
                    <circle cx="150" cy="120" r="10" fill="none" stroke="#555" strokeWidth="1" />
                    <circle cx="150" cy="120" r="5" fill="none" stroke="#555" strokeWidth="1" />
                    <path d="M150 110 C155 105, 160 105, 165 110" fill="none" stroke="#555" strokeWidth="1" />
                    <path d="M150 110 C145 105, 140 105, 135 110" fill="none" stroke="#555" strokeWidth="1" />
                    <path d="M150 130 C155 135, 160 135, 165 130" fill="none" stroke="#555" strokeWidth="1" />
                    <path d="M150 130 C145 135, 140 135, 135 130" fill="none" stroke="#555" strokeWidth="1" />
                  </>
                )}
                {selectedEmbroidery === "geometric" && (
                  <>
                    <rect x="140" y="110" width="20" height="20" fill="none" stroke="#555" strokeWidth="1" />
                    <rect x="145" y="115" width="10" height="10" fill="none" stroke="#555" strokeWidth="1" />
                    <line x1="140" y1="110" x2="160" y2="130" stroke="#555" strokeWidth="1" />
                    <line x1="160" y1="110" x2="140" y2="130" stroke="#555" strokeWidth="1" />
                  </>
                )}
                {selectedEmbroidery === "traditional" && (
                  <>
                    <path
                      d="M130 120 C140 110, 160 110, 170 120 C160 130, 140 130, 130 120 Z"
                      fill="none"
                      stroke="#555"
                      strokeWidth="1"
                    />
                    <path
                      d="M140 120 C145 115, 155 115, 160 120 C155 125, 145 125, 140 120 Z"
                      fill="none"
                      stroke="#555"
                      strokeWidth="1"
                    />
                    <circle cx="150" cy="120" r="2" fill="#555" />
                  </>
                )}

                {/* Buttons */}
                {selectedLace === "buttons" && (
                  <>
                    <circle cx="150" cy="100" r="3" fill="#555" />
                    <circle cx="150" cy="120" r="3" fill="#555" />
                    <circle cx="150" cy="140" r="3" fill="#555" />
                    <circle cx="150" cy="160" r="3" fill="#555" />
                    <circle cx="150" cy="180" r="3" fill="#555" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Slider value={[zoom]} min={50} max={150} step={1} className="w-24" onValueChange={handleZoomChange} />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom In</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setZoom(100)}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset Zoom</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4 gap-4">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>

          <Button variant="outline" className="flex-1" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>

          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>

          <Button className="flex-1 bg-rose-500 hover:bg-rose-600" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      {/* Right Panel - Design Tools */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Color</h3>
          <ColorPicker onColorChange={handleColorChange} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Borders</h3>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedBorder === "simple" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedBorder(selectedBorder === "simple" ? "" : "simple")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-2 bg-rose-300"></div>
              </div>
              <p className="text-xs text-center mt-1">Simple</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedBorder === "double" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedBorder(selectedBorder === "double" ? "" : "double")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-4 bg-rose-300 border-t-2 border-b-2 border-rose-500"></div>
              </div>
              <p className="text-xs text-center mt-1">Double</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedBorder === "dashed" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedBorder(selectedBorder === "dashed" ? "" : "dashed")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-4 bg-rose-300 border-t border-b border-dashed border-rose-500"></div>
              </div>
              <p className="text-xs text-center mt-1">Dashed</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedBorder === "gradient" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedBorder(selectedBorder === "gradient" ? "" : "gradient")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-6 bg-gradient-to-b from-rose-200 to-rose-400"></div>
              </div>
              <p className="text-xs text-center mt-1">Gradient</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Lace & Buttons</h3>
          <div className="grid grid-cols-2 gap-2">
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedLace === "simple" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedLace(selectedLace === "simple" ? "" : "simple")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-4 border-b border-dotted border-slate-400"></div>
              </div>
              <p className="text-xs text-center mt-1">Simple Lace</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedLace === "scalloped" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedLace(selectedLace === "scalloped" ? "" : "scalloped")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-4 border-b-4 border-scalloped border-slate-400"></div>
              </div>
              <p className="text-xs text-center mt-1">Scalloped</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedLace === "buttons" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedLace(selectedLace === "buttons" ? "" : "buttons")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                </div>
              </div>
              <p className="text-xs text-center mt-1">Buttons</p>
            </div>
            <div
              className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${selectedLace === "zigzag" ? "ring-2 ring-rose-500" : ""}`}
              onClick={() => {
                setSelectedLace(selectedLace === "zigzag" ? "" : "zigzag")
                updateDesignData()
              }}
            >
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <div className="w-full h-4 border-b-2 border-zigzag border-slate-400"></div>
              </div>
              <p className="text-xs text-center mt-1">Zigzag</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Measurements</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Length</span>
              <Select
                value={suitLength}
                onValueChange={(value) => {
                  setSuitLength(value)
                  updateDesignData()
                }}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="38">38"</SelectItem>
                  <SelectItem value="40">40"</SelectItem>
                  <SelectItem value="42">42"</SelectItem>
                  <SelectItem value="44">44"</SelectItem>
                  <SelectItem value="46">46"</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Chest</span>
              <Select
                value={chestSize}
                onValueChange={(value) => {
                  setChestSize(value)
                  updateDesignData()
                }}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="Chest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="34">34"</SelectItem>
                  <SelectItem value="36">36"</SelectItem>
                  <SelectItem value="38">38"</SelectItem>
                  <SelectItem value="40">40"</SelectItem>
                  <SelectItem value="42">42"</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Sleeve</span>
              <Select
                value={sleeveLength}
                onValueChange={(value) => {
                  setSleeveLength(value)
                  updateDesignData()
                }}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue placeholder="Sleeve" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="22">22"</SelectItem>
                  <SelectItem value="24">24"</SelectItem>
                  <SelectItem value="26">26"</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
