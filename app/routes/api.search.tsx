import { json } from '@remix-run/node';
import { searchEverything } from '~/util/db';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (!query || query.length < 3) {
    return json({ professors: [], courses: [], resources: [] });
  }
  const results = await searchEverything(query);
  console.log(results);
  return json(results);
}