import { Link, useLocation } from "react-router"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components//ui/label"
import { FormEvent, useState } from "react"
import useLoginMutation from "@/hooks/useLoginMutation"
import useRegisterMutation from "@/hooks/useRegisterMutation"
import { Button } from "@/components/ui/button"

export function AuthForm() {
  const location = useLocation()
  const loginMutation = useLoginMutation()
  const registerMutation = useRegisterMutation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const authHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError(true)
      return
    }
    const formData = { username, password }
    setError(false)
    setUsername("")
    setPassword("")
    if (location.pathname === "/login") {
      loginMutation.mutate(formData)
    } else if (location.pathname === "/register") {
      registerMutation.mutate(formData)
    } else {
      return
    }
  }
  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to SyntaxStories</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={authHandler}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setError(true)
                    } else {
                      setError(false)
                    }
                    setUsername(e.target.value)
                  }}
                />
                {error && <Label className="text-destructive">Username Required</Label>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setError(true)
                    } else {
                      setError(false)
                    }
                    setPassword(e.target.value)
                  }}
                  required />
                {error && <Label className="text-destructive">Password Required</Label>}
              </div>
              <Button type="submit" className="w-full">
                {location.pathname === "/login" && (loginMutation.isPending ?"Logining..." :  "Login")}
                {location.pathname === "/register" && (registerMutation.isPending ?"Registering..." :  "Register")}
              </Button>

            </div>

            {location.pathname === "/login" &&
              <div className="text-center text-sm mt-3">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            }

            {location.pathname === "/register" &&
              <div className="text-center text-sm mt-3">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            }
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

