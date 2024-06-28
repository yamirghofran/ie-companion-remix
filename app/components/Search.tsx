import { useState, useEffect } from 'react'
import { useFetcher } from '@remix-run/react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '~/components/ui/command';
import { Link, useNavigate } from '@remix-run/react';
import { Professor } from '~/types/Professor';
import { Course } from '~/types/Course';
import { Resource } from '~/types/Resource';

type SearchResults = {
  professors: Professor[];
  courses: Course[];
  resources: Resource[];
}

function Search({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const fetcher = useFetcher<SearchResults>();

  useEffect(() => {
    if (searchQuery.length >= 2 || searchQuery.length === 0) {
      fetcher.load(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const { professors = [], courses = [], resources = [] } = fetcher.data || {};

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for a teacher/course..." value={searchQuery} onValueChange={setSearchQuery} />
      <CommandList>
        <CommandEmpty>
          {fetcher.state === "loading" 
            ? "Loading..." 
            : searchQuery.length >= 3 
              ? "No results found" 
              : "Start typing 3+ characters to search for a teacher/course..."}
        </CommandEmpty>
        {professors.length >= 1 && (
          <CommandGroup heading="Professors">
          {professors.map((professor) => (
            <Link to={`/professors/${professor.id}`} onClick={() => setOpen(false)} key={professor.id}>
              <CommandItem onSelect={() => {navigate(`/professors/${professor.id}`); setOpen(false);}} >
                {professor.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      )}
      <CommandSeparator />
        {courses.length >= 1 && (
          <CommandGroup heading="Courses">
          {courses.map((course) => (
            <Link to={`/courses/${course.id}`} onClick={() => setOpen(false)} key={course.id}>
              <CommandItem value={course.id.toString()} onSelect={() => {navigate(`/courses/${course.id}`); setOpen(false);}} >
                {course.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      )}
      <CommandSeparator />
        {resources.length >= 1 && (
          <CommandGroup heading="Resources">
          {resources.map((resource) => (
            <Link to={`/resources/${resource.id}`} onClick={() => setOpen(false)} key={resource.id}>
              <CommandItem value={resource.id.toString()} onSelect={() => {navigate(`/resources/${resource.id}`); setOpen(false);}} >
                {resource.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      )}
      </CommandList>
    </CommandDialog>
  )
}

export default Search