"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SuitCustomizer from "@/components/suit-customizer"
import TryOn from "@/components/try-on"

export default function TryOnPage() {
  const [designData, setDesignData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("customize")

  // Load saved designs from localStorage
  useEffect(() => {
    const savedDesigns = localStorage.getItem("savedDesigns")
    if (savedDesigns) {
      const designs = JSON.parse(savedDesigns)
      if (designs.length > 0) {
        setDesignData(designs[designs.length - 1].data)
      }
    }
  }, [])

  const handleDesignUpdate = (data: any) => {
    setDesignData(data)
  }

  return (
    <main className="min-h-screen bg-[#f8f5f2]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-700 mb-8">Pakistani Suit Customizer</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customize">Customize Suit</TabsTrigger>
            <TabsTrigger value="try-on">Try On</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="mt-0">
            <SuitCustomizer onDesignUpdate={handleDesignUpdate} />
          </TabsContent>

          <TabsContent value="try-on" className="mt-0">
            <TryOn designData={designData} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
