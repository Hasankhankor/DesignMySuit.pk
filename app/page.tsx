import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scissors, Palette, Shirt, Sparkles, Star } from "lucide-react"
import SiteHeader from "@/components/site-header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f5f2] to-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-5 z-0"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
                Design Your Perfect <span className="text-rose-600">Pakistani Suit</span> Online
              </h1>
              <p className="text-lg text-slate-600 max-w-lg">
                Create custom Pakistani suits with our interactive designer. Choose fabrics, styles, and embroidery to
                craft your unique cultural attire.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/customizer">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                    Start Designing <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src="/images/suit-design-interface.png"
                  alt="Pakistani Suit Design Interface"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <p className="text-sm font-medium mt-1">Loved by 10,000+ customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Pakistani Suit Cultural Heritage</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the rich history and cultural significance of Pakistani suits in South Asian fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f8f5f2] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Historical Significance</h3>
              <p className="text-slate-600">
                Pakistani suits have evolved over centuries, blending Mughal, Persian, and indigenous influences to
                create distinctive styles that reflect the region's rich cultural heritage.
              </p>
            </div>
            <div className="bg-[#f8f5f2] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Regional Variations</h3>
              <p className="text-slate-600">
                From Punjabi suits to Sindhi embroidery, each region in Pakistan has contributed unique elements to suit
                design, creating a diverse tapestry of styles and techniques.
              </p>
            </div>
            <div className="bg-[#f8f5f2] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Modern Evolution</h3>
              <p className="text-slate-600">
                Today's Pakistani suits blend traditional craftsmanship with contemporary fashion trends, making them
                popular not just in South Asia but globally for their elegance and versatility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-[#f8f5f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Customizer Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our advanced customizer gives you complete control over every aspect of your Pakistani suit design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Fabric Selection</h3>
              <p className="text-slate-600">
                Choose from premium cotton, lawn, silk, chiffon, and georgette fabrics with realistic texture previews.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Scissors className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Style Customization</h3>
              <p className="text-slate-600">
                Personalize necklines, sleeves, trouser styles, and dupatta options to create your perfect ensemble.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Embroidery & Details</h3>
              <p className="text-slate-600">
                Add beautiful embroidery patterns, borders, lace, and buttons to enhance your design with traditional
                elements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <Shirt className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">3D Visualization</h3>
              <p className="text-slate-600">
                See your design come to life with our 3D model viewer, allowing you to view your suit from multiple
                angles and poses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Preview Teaser */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Experience Your Design in 3D</h2>
              <p className="text-lg text-slate-600 mb-6">
                Our advanced 3D model viewer lets you see your customized suit from every angle. Rotate, zoom, and
                change poses to visualize exactly how your creation will look in real life.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-rose-600" />
                  </div>
                  <span className="text-slate-700">Multiple viewing angles</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-rose-600" />
                  </div>
                  <span className="text-slate-700">Different model poses</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-rose-600" />
                  </div>
                  <span className="text-slate-700">Realistic fabric rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-rose-600" />
                  </div>
                  <span className="text-slate-700">Interactive zoom and rotation</span>
                </li>
              </ul>
              <Link href="/customizer">
                <Button className="bg-rose-600 hover:bg-rose-700">Try 3D Viewer Now</Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-[#f8f5f2] p-4 rounded-lg shadow-lg">
                <img
                  src="/images/suit-design-interface.png"
                  alt="Suit Design Interface"
                  className="w-full rounded-lg"
                />
                <div className="mt-4 flex justify-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img src="/placeholder.svg?height=50&width=50" alt="Standing Pose" className="w-10 h-10" />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img src="/placeholder.svg?height=50&width=50" alt="Walking Pose" className="w-10 h-10" />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img src="/placeholder.svg?height=50&width=50" alt="Sitting Pose" className="w-10 h-10" />
                  </div>
                  <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img src="/placeholder.svg?height=50&width=50" alt="Formal Pose" className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ready to Create Your Custom Suit?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Start designing your perfect Pakistani suit today and experience the joy of wearing a garment that's
            uniquely yours.
          </p>
          <Link href="/customizer">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              Start Designing Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DesignMySuit.pk</h3>
              <p className="text-rose-100">
                Creating beautiful, personalized Pakistani suits with our interactive online designer.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/customizer" className="text-rose-100 hover:text-white">
                    Suit Customizer
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-rose-100 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Help & Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    Sizing Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-rose-100 hover:text-white">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-rose-700 rounded-full flex items-center justify-center hover:bg-rose-800"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-rose-700 rounded-full flex items-center justify-center hover:bg-rose-800"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-rose-700 rounded-full flex items-center justify-center hover:bg-rose-800"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-rose-100">Subscribe to our newsletter for updates and special offers.</p>
            </div>
          </div>
          <div className="border-t border-rose-500 mt-8 pt-8 text-center text-sm text-rose-100">
            <p>© {new Date().getFullYear()} DesignMySuit.pk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
