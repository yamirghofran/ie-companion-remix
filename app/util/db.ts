import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourse = async (courseId: number) => {
    return await prisma.course.findUnique({
    where: {
            id: courseId
        },
        include: {
            professors: {
            include: {
                professor: true
            }
        },
        reviews: {
            include: {
                course: true,
                professor: true
            }
        }
    }
});
}

export const getProfessor = async (professorId: number) => {
    return await prisma.professor.findUnique({
    where: {
        id: professorId
    },
    include: {
        courses: {
            include: {
                course: true
            }
        },
        reviews: {
            include: {
                course: true,
                professor: true
            }
        }
    },
})
}

export const getAllProfessors = async () => {
    return await prisma.professor.findMany({
        include: {
            courses: {
                include: {
                    course: true
                }
            }
        }
    });
}

export const getAllCourses = async () => {
    return await prisma.course.findMany({
        include: {
            professors: {
                include: {
                    professor: true
                }
            }
        }
    });
}

export const createReview = async (
    professorId: number,
    courseId: number,
    rating: number,
    comment: string
) => {
    return await prisma.review.create({
        data: {
            professorId,
            courseId,
            rating,
            comment
        },
        include: {
            professor: true,
            course: true
        }
    });
}
