import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function RequestCourseForm() {
  return (
    <div className="w-full flex justify-center mt-16 lg:mt-8">
      <Card className="w-full max-w-sm lg:max-w-[600px]">
      <CardHeader>
        <CardTitle>Request a Course</CardTitle>
        <CardDescription>Give us some information about the course so we can add it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Course Name</Label>
          <Input id="name" placeholder="Full name of the course" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Course Professor</Label>
          <Input id="professor" placeholder="Course professor" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="subject">Degree + Year</Label>
          <Input id="subject" placeholder="The degree and year you have the course in." />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Additional Information</Label>
          <Textarea className="min-h-[100px]" id="message" placeholder="Enter additional information" />
        </div>
        <Button>Request Course</Button>
      </CardContent>
    </Card>
    </div>
    
  )
}