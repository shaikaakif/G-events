'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, FileText, Ticket, User, Users, Settings, ClipboardList } from 'lucide-react';
import type { UserRole } from '@/lib/types';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  participant: [
    { href: '/participant', label: 'Home', icon: <Home size={22} /> },
    { href: '/participant/schedule', label: 'Schedule', icon: <Calendar size={22} /> },
    { href: '/participant/challenge', label: 'Challenge', icon: <FileText size={22} /> },
    { href: '/participant/tickets', label: 'Tickets', icon: <Ticket size={22} /> },
    { href: '/participant/profile', label: 'Profile', icon: <User size={22} /> },
  ],
  volunteer: [
    { href: '/volunteer', label: 'Home', icon: <Home size={22} /> },
    { href: '/volunteer/schedule', label: 'Schedule', icon: <Calendar size={22} /> },
    { href: '/volunteer/tickets', label: 'Tickets', icon: <Ticket size={22} /> },
    { href: '/volunteer/profile', label: 'Profile', icon: <User size={22} /> },
  ],
  coordinator: [
    { href: '/coordinator', label: 'Home', icon: <Home size={22} /> },
    { href: '/coordinator/tickets', label: 'Tickets', icon: <ClipboardList size={22} /> },
    { href: '/coordinator/schedule', label: 'Schedule', icon: <Calendar size={22} /> },
    { href: '/coordinator/profile', label: 'Profile', icon: <User size={22} /> },
  ],
  principal: [
    { href: '/principal', label: 'Home', icon: <Home size={22} /> },
    { href: '/principal/events', label: 'Events', icon: <Settings size={22} /> },
    { href: '/principal/tickets', label: 'Tickets', icon: <ClipboardList size={22} /> },
    { href: '/principal/members', label: 'People', icon: <Users size={22} /> },
    { href: '/principal/profile', label: 'Profile', icon: <User size={22} /> },
  ],
};

export function BottomNav({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = NAV_ITEMS[role];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== `/${role}` && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
