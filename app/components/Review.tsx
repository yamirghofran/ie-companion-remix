import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "~/components/ui/card";
import { Star as StarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Skeleton } from "~/components/ui/skeleton";

import { ReviewWithRelations } from "~/types/Review";

function ReviewComponent({
  professorId,
  courseId,
  professor,
  course,
  createdAt,
  rating,
  comment
}: ReviewWithRelations) {
  
  const reviewDate = createdAt ? createdAt : new Date();
  const formattedDate = format(reviewDate, "PPP");
  return (
    <Card className="w-full border">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="grid gap-1">
          <Link to={`/professors/${professorId}`}><CardTitle className="text-base">{professor.name}</CardTitle></Link>
          <Link to={`/courses/${courseId}`}><CardDescription className="text-xs">{course.name}</CardDescription></Link>
        </div>
        <div className="flex items-center gap-2 text-primary">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className={`w-4 h-4 ${index < rating ? "text-primary" : "text-white"}`}
            fill="currentColor"
            stroke={index < rating ? "currentColor" : "black"}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="text-sm pb-4">
        <p>{comment}</p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </p>
      </CardContent>
    </Card>
  );
}

export default ReviewComponent;
