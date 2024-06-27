import React from 'react'
import { Card, CardHeader, CardContent } from './ui/card'

function CourseCard() {
  return (
    <Card>
        <CardHeader className='p-4'>
            <h3 className='text-xl'>Calculus 0</h3>
        </CardHeader>
    </Card>
  )
}

export default CourseCard