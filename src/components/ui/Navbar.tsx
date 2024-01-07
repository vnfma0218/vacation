import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="border-b fixed z-50 top-0 left-0 right-0 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-5 px-10">
        <h2 className="text-2xl font-bold text-red-500">
          <Link href={'/'}>Vacation</Link>
        </h2>
        <ul>
          <li>
            <Link href={'/confirm'}>예약조회</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
