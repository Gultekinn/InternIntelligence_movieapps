"use client";

import { Menu as MenuIcon, Bell, User, Search, X as XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=e6199d4a2ef9eb0080b02488fa05e890&query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.results || []))
        .catch((error) => console.error(error));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <span className="sr-only">Open main menu</span>
              <MenuIcon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
              <XIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <div className="flex shrink-0 items-center">
              <span className="text-white font-bold text-xl">Flixor</span>
            </div>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? 'text-red-500' // Aktif sayfa kırmızı
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block relative group">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-64 md:w-96 px-4 py-2 text-gray-900 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              />
              <Search className="absolute top-2 right-2 h-5 w-5 text-gray-400" />
            </div>

            {/* Search Results */}
            <div className="absolute left-0 w-full bg-gray-700 mt-1 rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {searchResults.length > 0 &&
                searchResults.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="block px-4 py-2 text-white hover:bg-gray-600">
                    {movie.title}
                  </Link>
                ))}
            </div>
          </div>

          {/* Profile and Notifications */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <Bell aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <User aria-hidden="true" className="h-8 w-8 rounded-full" />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none transition-all duration-200 ease-out">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation & Search */}
      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* Mobile Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-900 rounded-md bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            />
            <Search className="absolute top-2 right-2 h-5 w-5 text-gray-400" />
          </div>

          {/* Mobile Search Results */}
          {searchResults.length > 0 &&
            searchResults.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="block px-4 py-2 text-white hover:bg-gray-600">
                {movie.title}
              </Link>
            ))}

          {/* Navigation Links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href ? 'text-red-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
