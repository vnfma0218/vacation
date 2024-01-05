import CategoryList from '@/components/CategoryList';
import MainSection from '@/components/MainSection';
import PopularList from '@/components/hotel/PopularList';
import SaleList from '@/components/hotel/SaleList';

export default function Home() {
  return (
    <main className="">
      <MainSection />
      <div className="max-w-6xl mx-auto px-10">
        <CategoryList />
        <PopularList />
        <SaleList />
      </div>
    </main>
  );
}
