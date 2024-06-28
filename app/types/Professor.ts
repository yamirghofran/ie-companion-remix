import { Course } from "./Course";
import { Review } from "./Review";

export interface Professor {
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ProfessorWithRelations extends Professor {
    courses: { course: Course }[];
    reviews: Review[];
}

export type CreateProfessorInput = Omit<Professor, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProfessorInput = Partial<CreateProfessorInput>;

export type CreateProfessorWithRelationsInput = Omit<ProfessorWithRelations, 'id' | 'createdAt' | 'updatedAt' | 'courses' | 'reviews'>;
export type UpdateProfessorWithRelationsInput = Partial<CreateProfessorWithRelationsInput>;