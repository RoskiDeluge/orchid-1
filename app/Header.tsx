import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="p-5 bg-blue-500">
        <p>Orchid One | <Link href="https://github.com/RoskiDeluge/orchid-0" target="_blank">About</Link></p>
    </header>
  )
}
