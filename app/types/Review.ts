import { Professor } from "./Professor";
import { Course } from "./Course";

export interface Review {
    id: number;
    professorId: number;
    courseId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewWithNames extends Review {
    professorName: string;
    courseName: string;
}

export interface ReviewWithRelations extends Review {
    course: Course;
    professor: Professor;
  };