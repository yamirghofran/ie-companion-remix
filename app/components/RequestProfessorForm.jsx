import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function RequestProfessorForm() {
  return (
    <div className="w-full flex justify-center mt-16 lg:mt-8">
      <Card className="w-full max-w-sm lg:max-w-[600px]">
      <CardHeader>
        <CardTitle>Request a Professor</CardTitle>
        <CardDescription>Give us some information about the professor so we can add them.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Professor Name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Professor Email</Label>
          <Input id="email" placeholder="Professor Email" type="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="subject">Course(s) Taught</Label>
          <Input id="subject" placeholder="The course(s) the professor teaches" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="subject">Degree + Year</Label>
          <Input id="subject" placeholder="The degree and year you have the professor in." />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Additional Information</Label>
          <Textarea className="min-h-[100px]" id="message" placeholder="Enter additional information" />
        </div>
        <Button>Request Professor</Button>
      </CardContent>
    </Card>
    </div>
    
  )
}