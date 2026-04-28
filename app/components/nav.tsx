'use client'

import Link from 'next/link'
import { useState } from 'react'
import LoadingIndicator from './loading'

const navItems = {
  '/': {
    name: 'home',
  },
  '/gallery': {
    name: 'gallery',
  },
  '/contact': {
    name: 'contact me',
  },
}

export function Navbar() {
  const [active, setActive] = useState(false)
  return (
    <div className="lg:sticky lg:top-20">
      <nav
        className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <div className="flex flex-row space-x-0">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                prefetch={active ? null : false}
                onMouseEnter={() => setActive(true)}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 font-mono"
              >
                {name} <LoadingIndicator />
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}