import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { AlignRight } from "lucide-react"
import { useState } from "react"
import useLogoutMutation from "@/hooks/useLogoutMutation"


const MobileNav = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const logoutMutation = useLogoutMutation()
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-8 w-full gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <AlignRight />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-[200px] p-4 text-xl flex flex-col space-y-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={cn(
              "transition-colors hover:text-foreground/80",
              location.pathname === "/"
                ? "text-foreground"
                : "text-foreground/80"
            )}>
            Blogs
          </Link>

          {!isLoggedIn && <Link
            to={"/login"}
            onClick={() => setOpen(false)}>
            Login
          </Link>}

          {isLoggedIn && <Link
            to={"/user"}
            onClick={() => setOpen(false)}>
            Your Blogs
          </Link>}

          {isLoggedIn && <Link
            to={"/create"}
            onClick={() => setOpen(false)}>
            Create Blog
          </Link>}


          {isLoggedIn && <Button onClick={() => {
            setOpen(false)
            logoutMutation.mutate()
          }} variant={"destructive"}>Logout</Button>}
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default MobileNav
