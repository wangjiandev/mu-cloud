import CategoryCard from './_components/CategoryCard';
import { CategoryFormDialog } from './_components/CategoryFormDialog';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-2xl">Categories List</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCard />
    </div>
  );
}
