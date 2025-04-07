import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components//ui/label"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import useCreateBlogMutation from "@/hooks/useCreateBlogMutation"
import { useParams } from "react-router"
import useBlogByIdQuery from "@/hooks/useBlogByIdQuery"
import useEditBlogMutation from "@/hooks/useEditBlogMutation"

export default function BlogForm() {
  const params = useParams<{ blogId: string }>()
  const { data } = useBlogByIdQuery(params.blogId!)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState(false)
  useEffect(() => {
    if (data?.data) {
      setTitle(data.data.title)
      setContent(data.data.content)
    }
  }, [data])
  const createBlogMutation = useCreateBlogMutation()
  const editBlogMutation = useEditBlogMutation(params.blogId!)

  const isPending = params.blogId ? editBlogMutation.isPending : createBlogMutation.isPending
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      setError(true)
      return
    }
    if (params.blogId) {
      const formData = { title, content, userId: data?.data?.userId._id }
      editBlogMutation.mutate(formData)
    } else {
      const formData = { title, content }
      createBlogMutation.mutate(formData)
      setTitle("")
      setContent("")
    }
    setError(false)
  }
  return (
    <div className={"w-full flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Let world know your story</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter Title"
                  required
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setError(true)
                    } else {
                      setError(false)
                    }
                    setTitle(e.target.value)
                  }}
                />
                {error && <Label className="text-destructive">Title Required</Label>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  className="h-52"
                  id="content"
                  placeholder="Enter your syntax story"
                  value={content}
                  onChange={(e) => {
                    if (e.target.value.trim() === "") {
                      setError(true)
                    } else {
                      setError(false)
                    }
                    setContent(e.target.value)
                  }}
                  required />
                {error && <Label className="text-destructive">Content Required</Label>}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

