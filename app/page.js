import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl mb-8">FITHUB</h1>
      <Link href="/home/">
        
          Go to Home
        
      </Link>
    </div>
  );
}