import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

interface ReviewRow {
  id: string;
  professor_id: string;
  course_id: string;
  rating: string;
  comment: string;
  created_at: string;
}

async function importReviews() {
  const reviews: ReviewRow[] = [];

  fs.createReadStream(path.join(__dirname, '../data/reviews_rows.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (row: ReviewRow) => {
      reviews.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      for (const review of reviews) {
        await prisma.review.create({
          data: {
            id: parseInt(review.id),
            professorId: parseInt(review.professor_id),
            courseId: parseInt(review.course_id),
            rating: parseInt(review.rating),
            comment: review.comment,
            createdAt: new Date(review.created_at),
            updatedAt: new Date(review.created_at), // Using created_at for updatedAt as well
          },
        });
      }

      console.log('Reviews imported successfully');
      await prisma.$disconnect();
    });
}

importReviews().catch((e) => {
  console.error(e);
  process.exit(1);
});
