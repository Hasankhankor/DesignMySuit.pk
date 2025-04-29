"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"

export default function ModelViewer3D({ designData }: { designData?: any }) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [selectedPose, setSelectedPose] = useState("standing")
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  const handleRotationChange = (value: number[]) => {
    setRotation(value[0])
  }

  const handleReset = () => {
    setZoom(100)
    setRotation(0)
  }

  // Poses available in the 3D viewer
  const poses = [
    { id: "standing", name: "Standing" },
    { id: "walking", name: "Walking" },
    { id: "sitting", name: "Sitting" },
    { id: "formal", name: "Formal Pose" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Main 3D Viewer */}
      <div className="md:col-span-9 flex flex-col">
        <div
          ref={canvasRef}
          className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex items-center justify-center min-h-[600px] relative overflow-hidden"
        >
          <div
            className="relative"
            style={{
              transform: `scale(${zoom / 100}) rotateY(${rotation}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            {/* 3D Model Placeholder - This would be replaced with actual 3D model */}
            <div className="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              <svg
                width="300"
                height="500"
                viewBox="0 0 300 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="suit-preview"
              >
                {/* This is a placeholder for the 3D model */}
                {/* In a real implementation, this would be replaced with a 3D model renderer */}
                <path
                  d="M75 50 L75 350 L225 350 L225 50 C225 50, 175 80, 150 80 C125 80, 75 50, 75 50 Z"
                  fill={designData?.color || "#f8f5f2"}
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Different pose visualization based on selected pose */}
                {selectedPose === "standing" && (
                  <>
                    <rect
                      x="100"
                      y="370"
                      width="40"
                      height="120"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <rect
                      x="160"
                      y="370"
                      width="40"
                      height="120"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                  </>
                )}

                {selectedPose === "walking" && (
                  <>
                    <path
                      d="M100 370 L80 490 L120 490 L140 370"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M160 370 L180 430 L220 430 L200 370"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                  </>
                )}

                {selectedPose === "sitting" && (
                  <>
                    <path
                      d="M100 370 L100 420 L200 420 L200 370"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M100 420 L100 490 L140 490 L140 420"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M160 420 L160 490 L200 490 L200 420"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                  </>
                )}

                {selectedPose === "formal" && (
                  <>
                    <path
                      d="M100 370 L90 490 L130 490 L140 370"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                    <path
                      d="M160 370 L170 490 L210 490 L200 370"
                      fill={designData?.color || "#f8f5f2"}
                      stroke="#333"
                      strokeWidth="2"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* 3D Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
            <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>

            <Slider value={[zoom]} min={50} max={150} step={1} className="w-24" onValueChange={handleZoomChange} />

            <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Rotation Control */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
            <span className="text-xs text-slate-600">Rotation:</span>
            <Slider
              value={[rotation]}
              min={-180}
              max={180}
              step={5}
              className="w-32"
              onValueChange={handleRotationChange}
            />
            <Button variant="outline" size="icon" onClick={() => setRotation(0)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Pose Indicator */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md">
            <p className="text-sm font-medium">
              {poses.find((pose) => pose.id === selectedPose)?.name || "Standing"} Pose
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4 gap-4">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset View
          </Button>
        </div>
      </div>

      {/* Right Panel - 3D Controls */}
      <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Model Poses</h3>
          <div className="space-y-2">
            {poses.map((pose) => (
              <div
                key={pose.id}
                className={`border border-slate-200 rounded p-2 cursor-pointer hover:bg-slate-50 ${
                  selectedPose === pose.id ? "ring-2 ring-rose-500" : ""
                }`}
                onClick={() => setSelectedPose(pose.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center">
                    {/* Pose icon placeholder */}
                    <span className="text-xs text-slate-500">{pose.id.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{pose.name}</p>
                    <p className="text-xs text-slate-500">View your design in {pose.name.toLowerCase()} position</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">View Settings</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-600">Background</label>
              <Select defaultValue="studio">
                <SelectTrigger>
                  <SelectValue placeholder="Select background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-600">Lighting</label>
              <Select defaultValue="soft">
                <SelectTrigger>
                  <SelectValue placeholder="Select lighting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="bright">Bright</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cool">Cool</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Design Information</h3>
          {designData ? (
            <div className="bg-slate-50 p-3 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Fabric:</span>
                <span className="text-xs font-medium">{designData.fabric || "Cotton"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Color:</span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full border border-slate-300"
                    style={{ backgroundColor: designData.color }}
                  ></div>
                  <span className="text-xs font-medium">{designData.color || "#f8f5f2"}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Neckline:</span>
                <span className="text-xs font-medium">{designData.neckline || "Round"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-600">Sleeves:</span>
                <span className="text-xs font-medium">{designData.sleeves || "Full"}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No design data available. Customize your suit first.</p>
          )}
        </div>
      </div>
    </div>
  )
}
