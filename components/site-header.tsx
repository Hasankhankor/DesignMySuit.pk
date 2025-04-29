import Link from "next/link"

export default function SiteHeader() {
  return (
    <header className="bg-rose-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            DesignMySuit.pk
          </Link>
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="hover:text-rose-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/customizer" className="hover:text-rose-100">
                  Customizer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-100">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-rose-100">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
