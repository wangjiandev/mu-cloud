import CategoryCard from './_components/CategoryCard';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="font-bold text-2xl">Categories List</h1>
      <CategoryCard />
    </div>
  );
}
