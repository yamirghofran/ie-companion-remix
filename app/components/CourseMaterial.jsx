import React, {useState, useEffect} from 'react';
import supabase from '@/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

function CourseMaterial({courseId}) {
    const [courseMaterial, setCourseMaterial] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchCourseMaterialData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('course_material').select('*').eq('course_id', courseId)
        if (error) throw error;
        setCourseMaterial(data);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching course material data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (courseId) {
        fetchCourseMaterialData();
      }
    }, [courseId]);

    if (!courseMaterial && !isLoading) return <div>No course material found</div>;
    
    if (isError) return <div>Error</div>;
  if (courseMaterial.length === 0) return null;
  return (
    <div className="w-full h-full my-4">
    <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Course Material</h3>
    <div className="w-full h-full flex md:flex-row flex-wrap flex-col items-center gap-x-4 gap-y-8">
        {isLoading ? <div>Loading...</div> : 
        courseMaterial.map((materialItem) => (
            <Card key={materialItem.id} className="w-full md:w-fit max-w-lg m-0 p-0flex flex-col justify-between">
                <CardHeader className="m-0 px-4 pt-2 pb-0 ">
                    <CardTitle className="text-lg font-semibold">{materialItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 mb-2 pb-0 ">
                    <p className="text-slate-800 text-sm">{materialItem.description}</p>
                </CardContent>
                <CardFooter className="px-4 pt-2 pb-0 w-full flex flex-col gap-y-2 mb-2 items-end ">
                    <Link className='w-full' to={materialItem.url}>
                        <Button className="w-full h-8">View</Button>
                    </Link>
                    {/* <Button className="w-full h-8" variant="outline" onClick={() => {
                      fetch(materialItem.url, {
                        method: 'GET',
                        headers: {},
                      })
                      .then(response => response.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = materialItem.title || 'download';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(() => alert('Could not download the file.'));
                    }}>Download</Button> */}
                </CardFooter>
            </Card>
      ))}
    </div>
    </div>
    
  )
}

export default CourseMaterial