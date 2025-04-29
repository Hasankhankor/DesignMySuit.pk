"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SuitCustomizer from "@/components/suit-customizer"
import TryOn from "@/components/try-on"
import ModelViewer3D from "@/components/model-viewer-3d"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function CustomizerPage() {
  const [designData, setDesignData] = useState<any>(null)

  const handleDesignUpdate = (data: any) => {
    setDesignData(data)
  }

  return (
    <main className="min-h-screen bg-[#f8f5f2]">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-700">DesignMySuit.pk</h1>
        </div>

        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="customize">Customize Suit</TabsTrigger>
            <TabsTrigger value="3d-view">3D View</TabsTrigger>
            <TabsTrigger value="try-on">Try On</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="mt-0">
            <SuitCustomizer onDesignUpdate={handleDesignUpdate} />
          </TabsContent>

          <TabsContent value="3d-view" className="mt-0">
            <ModelViewer3D designData={designData} />
          </TabsContent>

          <TabsContent value="try-on" className="mt-0">
            <TryOn designData={designData} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
