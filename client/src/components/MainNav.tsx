import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import useLogoutMutation from "@/hooks/useLogoutMutation"

const MainNav = () => {
  const location = useLocation()
  const logoutMutation = useLogoutMutation()
  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
          to="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            location.pathname === "/"
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Blogs
        </Link>
        {!localStorage.getItem("isLoggedIn") && <Link to={"/login"}>Login</Link>}
        {localStorage.getItem("isLoggedIn") && <Link to={"/user"}>Your Blogs</Link>}
        {localStorage.getItem("isLoggedIn") && <Link to={"/create"}>Create Blog</Link>}
        {localStorage.getItem("isLoggedIn") && <Button onClick={() => { logoutMutation.mutate() }} variant={"destructive"}>Logout</Button>}
      </nav>
    </div>
  )
}

export default MainNav
