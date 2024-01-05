import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto flex justify-between py-5 px-10">
        <h2 className="text-2xl font-bold text-red-500">
          <Link href={'/'}>Vacation</Link>
        </h2>
        <ul>
          <li>
            <Link href={'/confirm'}>에약조회</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
