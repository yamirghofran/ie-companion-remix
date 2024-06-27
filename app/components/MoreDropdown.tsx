import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu"
  import { Link } from "@remix-run/react"
  import { Button } from '~/components/ui/button'
  import { ChevronDown as ChevronDownIcon } from "lucide-react"
  
  function MoreDropdown() {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-md border px-1.5 h-8 inline-flex items-center">
              <span className="text-sm">More</span>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuLabel>Professors</DropdownMenuLabel>
          <Link to="/request-professor"><DropdownMenuItem>Request Professor</DropdownMenuItem></Link>

          <Link to="/add-info-professor"><DropdownMenuItem>Add info for professor</DropdownMenuItem></Link>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Courses</DropdownMenuLabel>
          <Link to="/request-course"><DropdownMenuItem>Request Course</DropdownMenuItem></Link>
          <Link to="/add-info-course"><DropdownMenuItem>Add info for course</DropdownMenuItem></Link>


        </DropdownMenuContent>
      </DropdownMenu>
      
    )
  }
  
  export default MoreDropdown