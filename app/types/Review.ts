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

export type CreateReviewInput = Omit<Review, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReviewInput = Partial<CreateReviewInput>;

export type CreateReviewWithNamesInput = Omit<ReviewWithNames, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReviewWithNamesInput = Partial<CreateReviewWithNamesInput>;

export type CreateReviewWithRelationsInput = Omit<ReviewWithRelations, 'id' | 'createdAt' | 'updatedAt' | 'course' | 'professor'>;
export type UpdateReviewWithRelationsInput = Partial<CreateReviewWithRelationsInput>;