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

export type CreateCourseInput = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCourseInput = Partial<CreateCourseInput>;

export type CreateCourseWithRelationsInput = Omit<CourseWithRelations, 'id' | 'createdAt' | 'updatedAt' | 'professors' | 'reviews'>;
export type UpdateCourseWithRelationsInput = Partial<CreateCourseWithRelationsInput>;