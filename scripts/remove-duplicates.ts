import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function removeDuplicates() {
  try {
    await prisma.$transaction(async (tx) => {
      // Remove duplicate professors
      const professors = await tx.professor.groupBy({
        by: ['name', 'email'],
        _count: { id: true },
        having: { id: { _count: { gt: 1 } } },
      });
      console.log(`Found ${professors.length} duplicates for professors`);
      for (const prof of professors) {
        console.log(`Removing duplicates for professor: ${prof.name}`);
        const duplicates = await tx.professor.findMany({
          where: { name: prof.name, email: prof.email },
          orderBy: { id: 'asc' },
        });

        if (duplicates.length > 1) {
          const [keep, ...remove] = duplicates;
          for (const dup of remove) {
            // Update related records
            await tx.professorCourse.updateMany({
              where: { professorId: dup.id },
              data: { professorId: keep.id },
            });
            await tx.review.updateMany({
              where: { professorId: dup.id },
              data: { professorId: keep.id },
            });
            // Delete duplicate
            await tx.professor.delete({ where: { id: dup.id } });
          }
        }
      }

      // Remove duplicate courses
      const courses = await tx.course.groupBy({
        by: ['name'],
        _count: { id: true },
        having: { id: { _count: { gt: 1 } } },
      });
      console.log(`Found ${courses.length} duplicates for courses`);

      for (const course of courses) {
        console.log(`Removing duplicates for course: ${course.name}`);
        const duplicates = await tx.course.findMany({
          where: { name: course.name },
          orderBy: { id: 'asc' },
        });

        if (duplicates.length > 1) {
          console.log(`Removing duplicates for course: ${course.name}`);
          const [keep, ...remove] = duplicates;
          for (const dup of remove) {
            // Update related records
            await tx.professorCourse.updateMany({
              where: { courseId: dup.id },
              data: { courseId: keep.id },
            });
            await tx.review.updateMany({
              where: { courseId: dup.id },
              data: { courseId: keep.id },
            });
            // Delete duplicate
            await tx.course.delete({ where: { id: dup.id } });
          }
        }
      }
    });

    console.log('Duplicate removal completed successfully.');
  } catch (error) {
    console.error('Error removing duplicates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicates();
