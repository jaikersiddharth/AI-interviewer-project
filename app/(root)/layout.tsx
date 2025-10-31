import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated(); 
  if(!authenticated) { 
    redirect('/sign-in');
  }
  return (
    <div>
        <nav className="p-6">
            <Link href = "/" className = "flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="PrepWise Logo"
                width={38}
                height={32}
              />
              <h2 className="text-primary-100">PrepWise</h2>
            </Link>
        </nav>
        {children}
    </div>
  )
}