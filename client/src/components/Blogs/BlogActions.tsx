import { useNavigate } from "react-router"
import { Button } from "../ui/button"
import DeleteButton from "./DeleteButton"
import { ExternalLink } from "lucide-react"

const BlogActions = ({ blogId }: { blogId: string }) => {
  const navigate = useNavigate()
  return (
    <div className="space-x-4">
      <Button onClick={() => navigate(`/edit/${blogId}`)} size={"icon"}><ExternalLink /></Button>
      <DeleteButton blogId={blogId} />
    </div>
  )
}

export default BlogActions
