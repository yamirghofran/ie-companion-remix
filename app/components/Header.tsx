import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import MoreDropdown from '~/components/MoreDropdown'
import { Button } from '~/components/ui/button'
import { Link } from '@remix-run/react'
import { useReviewModal } from '~/context/ReviewModalContext'
import SimpleDialog from '~/components/SimpleDialog'
import ReviewModal from '~/components/ReviewModal'
import Search from '~/components/Search'

const navigation = [
  { name: 'Professors', href: '/professors' },
  { name: 'Courses', href: '/courses' },
  { name: 'Resources', href: '/resources' },
]

const secondaryNavigation = [
  { name: 'Request a Professor', href: '/request-professor' },
  { name: 'Request a Course', href: '/request-course' },
  { name: 'Add Info for Professor', href: '/add-info-professor' },
  { name: 'Add Info for Course', href: '/add-info-course' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setOpen: setReviewModalOpen } = useReviewModal();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between md:px-8 px-2 py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <h1 className='text-lg font-semibold'>IE Companion</h1>
            
          </a>
        </div>
        <div className="flex items-center gap-x-2 lg:hidden">
        <ReviewModal />
        <Search open={searchOpen} setOpen={setSearchOpen} />
        <button className="flex justify-between items-center w-48 border rounded-md px-2 my-2 hover:cursor-pointer hover:bg-slate-100 hover:text-black text-slate-500 ease-in-out duration-75" onClick={() => setSearchOpen(true)} >
            <p className="text-sm">Search...</p>
            <div className="text-sm rounded-sm bg-slate-50 w-4 text-center h-6 border shadow-sm">/</div>
          </button>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
          <ReviewModal />
          <button className="flex justify-between items-center w-48 border rounded-md px-2 my-2 hover:cursor-pointer hover:bg-slate-100 hover:text-black text-slate-500 ease-in-out duration-75" onClick={() => setSearchOpen(true)} >
            <p className="text-sm">Search...</p>
            <div className="text-sm rounded-sm bg-slate-50 w-4 text-center h-6 border shadow-sm">/</div>
          </button>
          <MoreDropdown />
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className='text-lg font-semibold'>IE Companion</h1>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2 py-6">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
