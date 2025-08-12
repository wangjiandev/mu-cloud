import CategoryCard from './_components/CategoryCard';
import { CategoryFormDialog } from './_components/CategoryFormDialog';

export default function Page() {
  return (
    <>
      <div className="flex h-24 items-center justify-between px-4">
        <h1 className="font-bold text-2xl">Categories</h1>
        <CategoryFormDialog />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <CategoryCard />
      </div>
    </>
  );
}
