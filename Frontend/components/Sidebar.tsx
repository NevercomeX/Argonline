import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  CircleUser,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  Package,
  NotebookText,
  User,
  PawPrint,
  Axe,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className='bg-secondary rounded-none'>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <CommandItem>
            <CircleUser className='mr-2 h-4 w-4' />
            <Link href='/characters'>Character</Link>
          </CommandItem>
          <CommandItem>
            <Axe className='mr-2 h-4 w-4' />
            <Link href='/equipment'>Equipment</Link>
          </CommandItem>
          <CommandItem>
            <Package className='mr-2 h-4 w-4' />
            <Link href='/inventory'>Inventory</Link>
          </CommandItem>
          <CommandItem>
            <NotebookText className='mr-2 h-4 w-4' />
            <Link href='/mobs'>Stats</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className='mr-2 h-4 w-4' />
            <Link href='/items'>Items</Link>
          </CommandItem>
          <CommandItem>
            <PawPrint className='mr-2 h-4 w-4' />
            <Link href='/mobs'>Monsters</Link>
          </CommandItem>

        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings'>
          <CommandItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
