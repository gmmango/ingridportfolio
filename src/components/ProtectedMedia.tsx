"use client";

import { ReactNode, useState, MouseEvent } from 'react';

interface ProtectedMediaProps {
  children: ReactNode;
  className?: string;
}

export default function ProtectedMedia({ children, className = '' }: ProtectedMediaProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [noticePosition, setNoticePosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    // Position the notice at cursor location
    setNoticePosition({
      x: e.clientX,
      y: e.clientY,
    });

    setShowNotice(true);

    // Hide notice after 3 seconds
    setTimeout(() => {
      setShowNotice(false);
    }, 3000);
  };

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`select-none ${className}`}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
      >
        {/* Content protection overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" />

        {children}
      </div>

      {/* Copyright notice popup */}
      {showNotice && (
        <div
          style={{
            position: 'fixed',
            top: noticePosition.y,
            left: noticePosition.x,
            zIndex: 2147483647,
          }}
          className="bg-black/90 text-white px-4 py-3 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-in"
        >
          This content is Copyright © {new Date().getFullYear()} Ingrid Sayuri. All rights reserved.
        </div>
      )}
    </>
  );
}
