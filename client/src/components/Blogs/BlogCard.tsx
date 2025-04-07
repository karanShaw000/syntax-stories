import { PopulatedBlog } from "@/lib/types"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import timer from "@/lib/timer"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"
import BlogActions from "./BlogActions"

const BlogCard = ({ _id, userId, edited, updatedAt, title, createdAt, isUserBlog }: PopulatedBlog) => {
  const navigate = useNavigate()
  return (
    <Card className="border-white">
      <CardContent>
        <div>
          <h3 className=" font-bold text-2xl  mb-2">{title}</h3>
          <div className="flex flex-col gap-1">
            <p>{`Posted by: ${userId.username}`}</p>
            {
              edited && <p>edited {timer(updatedAt ? updatedAt : createdAt)} </p>
            }
            {
              !edited && <p>created {timer(createdAt)} </p>
            }
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button onClick={() => navigate(`/blog/${_id}`)}>
          Read
        </Button>
        {
          isUserBlog && <BlogActions blogId={_id} />
        }
      </CardFooter>
    </Card>
  )
}

export default BlogCard
