import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import ComboBox from "@/components/ComboBox"
import { useState } from "react"

export default function AddInfoProfessorForm({professors}) {
    const [professorId, setProfessorId] = useState(null);
  return (
    <div className="w-full flex justify-center mt-16 lg:mt-8">
      <Card className="w-full max-w-sm lg:max-w-[600px]">
      <CardHeader>
        <CardTitle>Add Professor Information</CardTitle>
        <CardDescription>Give us some information about the professor so we can add it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
        <Label className="text-sm font-medium" htmlFor="manager">
                Professor
        </Label>
        <ComboBox placeholder="Select professor" list={professors} value={professorId} setValue={setProfessorId} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Information</Label>
          <Textarea className="min-h-[100px]" id="message" placeholder="Enter additional information you want to add" />
        </div>
        {/* <div className="space-y-1">
            <Label htmlFor="attachments">Attachments</Label>
            <Input id="attachments" type="file" multiple />
        </div> */}
        <Button>Add Information</Button>
      </CardContent>
    </Card>
    </div>
    
  )
}