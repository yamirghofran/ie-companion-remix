import { Professor } from "~/types/Professor";
import { Review } from "~/types/Review";

export interface Course {
    id: number;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CourseWithRelations extends Course {
    professors: { professor: Professor }[];
    reviews: Review[];
}