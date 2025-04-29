"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Check, X } from "lucide-react"

export default function TryOn({ designData }: { designData?: any }) {
  const [photo, setPhoto] = useState<string | null>(null)
  const [croppedFace, setCroppedFace] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(false)
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhoto(event.target?.result as string)
        setIsCropping(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCropPosition({
      x,
      y,
      width: 100,
      height: 100,
    })
  }

  const handleCropComplete = () => {
    if (!photo || !imageRef.current) return

    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")

    if (!tempCtx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Calculate the actual crop coordinates based on the image's natural size
      const scaleX = img.naturalWidth / imageRef.current!.clientWidth
      const scaleY = img.naturalHeight / imageRef.current!.clientHeight

      const actualX = cropPosition.x * scaleX
      const actualY = cropPosition.y * scaleY
      const actualWidth = cropPosition.width * scaleX
      const actualHeight = cropPosition.height * scaleY

      tempCanvas.width = actualWidth
      tempCanvas.height = actualHeight

      tempCtx.drawImage(img, actualX, actualY, actualWidth, actualHeight, 0, 0, actualWidth, actualHeight)

      setCroppedFace(tempCanvas.toDataURL("image/png"))
      setIsCropping(false)
    }
    img.src = photo
  }

  const handleCancelCrop = () => {
    setIsCropping(false)
    setPhoto(null)
  }

  useEffect(() => {
    if (!canvasRef.current || !croppedFace || !designData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the suit design
    const suitImg = new Image()
    suitImg.crossOrigin = "anonymous"
    suitImg.onload = () => {
      ctx.drawImage(suitImg, 0, 0, canvas.width, canvas.height)

      // Draw the face
      if (croppedFace) {
        const faceImg = new Image()
        faceImg.crossOrigin = "anonymous"
        faceImg.onload = () => {
          // Position the face at the top of the suit
          ctx.drawImage(faceImg, canvas.width / 2 - 50, 10, 100, 100)
        }
        faceImg.src = croppedFace
      }
    }

    // Create a data URL from the SVG
    const svgString = document.querySelector(".suit-preview")?.outerHTML
    if (svgString) {
      const blob = new Blob([svgString], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      suitImg.src = url
    }
  }, [croppedFace, designData])

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-lg bg-white min-h-[600px]">
      {!photo && !croppedFace && (
        <>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Try On Your Design</h2>
          <p className="text-slate-600 mb-6 text-center max-w-md">
            Upload your photo to see how your customized suit would look on you.
          </p>
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="photo-upload"
              className="flex items-center justify-center px-6 py-3 bg-rose-500 text-white rounded-md cursor-pointer hover:bg-rose-600 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Your Photo
            </label>
            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <p className="text-sm text-slate-500">Supported formats: JPG, PNG (Max 5MB)</p>
          </div>
        </>
      )}

      {photo && isCropping && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Crop Your Face</h2>
          <p className="text-slate-600 mb-4 text-sm">Click and drag to position the crop area over your face.</p>

          <div className="relative border border-slate-300 mb-4 cursor-crosshair" onClick={handleCropStart}>
            <img ref={imageRef} src={photo || "/placeholder.svg"} alt="Uploaded photo" className="w-full h-auto" />

            {isCropping && (
              <div
                className="absolute border-2 border-rose-500 bg-rose-500/20"
                style={{
                  left: `${cropPosition.x}px`,
                  top: `${cropPosition.y}px`,
                  width: `${cropPosition.width}px`,
                  height: `${cropPosition.height}px`,
                }}
              ></div>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={handleCancelCrop}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleCropComplete}>
              <Check className="mr-2 h-4 w-4" /> Crop Face
            </Button>
          </div>
        </div>
      )}

      {croppedFace && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Your Custom Suit</h2>

          <div className="border border-slate-300 rounded-lg overflow-hidden mb-4">
            <canvas ref={canvasRef} width={400} height={600} className="w-full h-auto"></canvas>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setCroppedFace(null)
                setPhoto(null)
              }}
            >
              Try Another Photo
            </Button>
            <Button>Save Image</Button>
          </div>
        </div>
      )}
    </div>
  )
}
