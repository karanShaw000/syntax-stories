import { Link } from "react-router"
import MainNav from "@/components/MainNav"
import MobileNav from "@/components/MobileNav"

const SiteHeader = () => {
  return (
    <header className="px-4 w-full border-b bg-primary backdrop-blur ">
      <div className="flex h-14 items-center justify-between gap-2 md:gap-4">
        <div className="md:text-xl">
          <Link to="/">SyntaxStories</Link>
        </div>
        <div>
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
