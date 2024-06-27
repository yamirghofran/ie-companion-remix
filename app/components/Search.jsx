import {useState, useEffect} from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';
import { useQuery } from 'react-query';
import { fetchSearchResults } from '../util/db';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '@/supabase';


function Search({open, setOpen}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false);



  async function searchProfessorsAndCourses(searchTerm) {
    setLoading(true);
    // Query professors
    const { data: professors, error: professorsError } = await supabase
      .from('professors')
      .select('id, name')
      .ilike('name', `%${searchTerm}%`)
      .limit(5);
  
    // Handle error for professors query
    if (professorsError) {
      console.error('Error fetching professors', professorsError);
      return;
    }
  
    // Query courses
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, name')
      .ilike('name', `%${searchTerm}%`)
      .limit(5);
  
    // Handle error for courses query
    if (coursesError) {
      console.error('Error fetching courses', coursesError);
      return;
    }
  
    // Combine results with 'type' property added
    const combinedResults = [
      ...professors.map(prof => ({ ...prof, type: 'professor' })),
      ...courses.map(course => ({ ...course, type: 'course' }))
    ];
    setSearchResults(combinedResults);
    setLoading(false);
    return combinedResults;
  }

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      searchProfessorsAndCourses(searchQuery);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);

  const professors = searchResults ? searchResults.filter(result => result.type === "professor") : [];
  const courses = searchResults ? searchResults.filter(result => result.type === "course") : [];


  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for a teacher/course..." value={searchQuery} onValueChange={setSearchQuery} />
      <CommandList>
        <CommandEmpty>{loading ? "Loading search results..." : searchQuery.length >= 2 ? "No results found" : "Start typing 3+ characters to search for a teacher/course..."}</CommandEmpty>
        {professors.length >= 1 && (
          <CommandGroup heading="Professors">
          {professors.map((professor) => (
            <Link to={`/professors/${professor.id}`} onClick={() => setOpen(false)}><CommandItem key={professor.id} value={professor.id} onSelect={() => {navigate(`/professors/${professor.id}`); setOpen(false);}} >{professor.name}</CommandItem></Link> // Adjust according to your data structure
          ))}
        </CommandGroup>
      )}
      <CommandSeparator />
        {courses.length >= 1 && (
          <CommandGroup heading="Courses">
          {courses.map((course) => (
            <Link to={`/courses/${course.id}`} onClick={() => setOpen(false)} ><CommandItem key={course.id} value={course.id} onSelect={() => {navigate(`/courses/${course.id}`); setOpen(false);}} >{course.name}</CommandItem></Link>
          ))}
        </CommandGroup>
      )}
      </CommandList>
    </CommandDialog>
  )
}

export default Search