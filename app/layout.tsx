import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Molecular Spectroscopy Virtual Laboratory', description: 'Interactive Hooke law, IR and UV-visible spectroscopy learning laboratory.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
