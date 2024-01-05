import PriceFilter from './PriceFilter';
import TypeFilter from './TypeFilter';

type FiltersProps = {
  type: string;
  price: {
    min: number;
    max: number;
  };
  isPriceLimited: boolean;

  changeType: (type: string) => void;
  changePrice: (price: number[]) => void;
};

const Filters = ({
  type,
  changeType,
  changePrice,
  price,
  isPriceLimited,
}: FiltersProps) => {
  return (
    <section className="basis-1/4 h-screen">
      <p className="font-semibold text-lg">필터</p>
      {/* type */}
      <TypeFilter type={type} changeType={changeType} />

      {/* price */}
      <PriceFilter
        changePrice={changePrice}
        price={price}
        isPriceLimited={isPriceLimited}
      />
    </section>
  );
};

export default Filters;
