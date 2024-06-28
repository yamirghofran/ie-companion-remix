import { PrismaClient, Prisma } from "@prisma/client";
import { toast } from "sonner";

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
    try {
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
    } catch (error) {
        toast.error('Error creating review');
    }
}

export const getAllResources = async () => {
    return await prisma.resource.findMany({
        include: {
            items: true
        }
    });
}

export const getResourceById = async (resourceId: number) => {
    return await prisma.resource.findUnique({
        where: {
            id: resourceId
        },
        include: {
            items: true
        }
    });
}

export const searchEverything = async (searchTerm: string) => {
    const professors = await prisma.professor.findMany({
        where: {
            name: {
                contains: searchTerm,
            }
        },
        select: {
            id: true,
            name: true
        },
        take: 5
    });

    const courses = await prisma.course.findMany({
        where: {
            name: {
                contains: searchTerm,
            }
        },
        select: {
            id: true,
            name: true
        },
        take: 5
    });

    const resources = await prisma.resource.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchTerm,
                    }
                },
                {
                    items: {
                        some: {
                            name: {
                                contains: searchTerm,
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true
        },
        take: 5
    });

    return {
        professors: professors.map(prof => ({ ...prof, type: 'professor' })),
        courses: courses.map(course => ({ ...course, type: 'course' })),
        resources: resources.map(resource => ({ ...resource, type: 'resource' }))
    };
};
