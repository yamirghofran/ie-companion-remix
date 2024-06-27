import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"

function ComboBox({ name, placeholder, options, value, setValue }: { 
  name: string, 
  placeholder: string, 
  options: { id: string, label: string }[] | undefined, 
  value: string,
  setValue: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    return options?.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [options, searchTerm]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  const selectedOption = options?.find(option => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption
            ? selectedOption.label.slice(0, 30) + (selectedOption.label.length > 30 ? "..." : "")
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}...`} 
            onValueChange={handleSearch} 
          />
          <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.id}
                value={option.label}
                onSelect={() => {
                  setValue(option.id === value ? '' : option.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
      <input type="hidden" name={name} value={value || ''} />
    </Popover>
  )
}

export default ComboBox;
