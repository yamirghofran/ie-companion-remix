import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { CreateResourceInput, CreateResourceItemInput } from '~/types/Resource';

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

/* importReviews().catch((e) => {
  console.error(e);
  process.exit(1);
});
 */

async function importResource(resourceData: CreateResourceInput) {
  try {
    const resource = await prisma.resource.create({
      data: {
        name: resourceData.name,
        description: resourceData.description,
        content: resourceData.content,
        type: resourceData.type,
      },
    });
    console.log(`Resource created successfully with id: ${resource.id}`);
    return resource;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
}

async function importResourceItem(itemData: CreateResourceItemInput) {
  try {
    const resourceItem = await prisma.resourceItem.create({
      data: {
        name: itemData.name,
        description: itemData.description,
        url: itemData.url,
        type: itemData.type,
        resourceId: itemData.resourceId,
      },
    });
    console.log(`ResourceItem created successfully with id: ${resourceItem.id}`);
    return resourceItem;
  } catch (error) {
    console.error('Error creating resource item:', error);
    throw error;
  }
}


const newResource = await importResource({
  name: 'Academic Calender 2024-2025',
  description: 'Academic Calender for the year 2024-2025',
  content: '',
  type: 'document',
});

const newResourceItem = await importResourceItem({
  name: 'Academic Calender 2024-2025',
  description: 'Academic Calender for the year 2024-2025',
  url: 'https://d3mm5s1n33q4os.cloudfront.net/IEU-Academic-Calendar-2024-2025.pdf',
  type: 'pdf',
  resourceId: newResource.id,
});
