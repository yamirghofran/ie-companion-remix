import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "~/components/ui/avatar"
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card"
  import { Link } from "react-router-dom";
import { Professor } from "~/types/Professor";

  function ProfessorItem({ professor }: { professor: Professor }) {
    return (
        <Link to={`/professors/${professor.id}`} className="my-0 py-0">
        <div className="flex items-center gap-4 hover:text-primary hover:cursor-pointer">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-1">
              <p className="text-sm font-medium leading-none">{professor.name}</p>
              <p className="text-sm text-muted-foreground">
                {professor.email}
              </p>
            </div>
          </div>
          </Link>
    )
  }

  export default function CourseProfessorsCard({ professors }: { professors: Professor[] }) {
    return (
      <Card className='w-full md:max-w-xs  md:mr-16 mt-6 md:mt-0 h-fit'>
        <CardHeader>
          <CardTitle>{professors.length > 1 ? 'Course Professors' : 'Course Professor'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            {professors.map((professor, index) => <ProfessorItem professor={professor} key={professor.id} />)}
        </CardContent>
      </Card>
    )
  }
  