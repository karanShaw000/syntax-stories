import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

interface MyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BlogsPagination({ currentPage, totalPages, onPageChange }: MyPaginationProps) {
  const renderPageNumbers = () => {
    const pageButtons = []

    const startPage = Math.max(currentPage - 2, 1)
    const endPage = Math.min(currentPage + 2, totalPages)

    if (startPage > 1) {
      pageButtons.push(
        <PaginationItem key={1}>
          <Button variant="outline" onClick={() => onPageChange(1)}>1</Button>
        </PaginationItem>,
        <PaginationItem key="start-dots">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PaginationItem key={i}>
          <Button
            variant={i === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <PaginationItem key="end-dots">
          <PaginationEllipsis />
        </PaginationItem>,
        <PaginationItem key={totalPages}>
          <Button variant="outline" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </PaginationItem>
      )
    }

    return pageButtons
  }

  return (
    <Pagination className="flex items-center justify-center gap-2">
      <PaginationContent className="flex gap-1">
        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </PaginationItem>

        {renderPageNumbers()}

        <PaginationItem>
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

