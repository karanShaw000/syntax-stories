import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import useDeleteBlogMutation from "@/hooks/useDeleteBlogMutation"


const DeleteButton = ({ blogId }: { blogId: string }) => {
  const [open, setOpen] = useState(false)
  const { isPending, mutate } = useDeleteBlogMutation()
  return (
    <Dialog open={open} onOpenChange={setOpen} >

      <DialogTrigger asChild >
        <Button variant={"destructive"} size={"icon"}><Trash2 /></Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this blog from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            disabled={isPending}
            onClick={() => {
              mutate(blogId)
              if (!isPending) {
                setOpen(false)
              }
            }}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default DeleteButton
