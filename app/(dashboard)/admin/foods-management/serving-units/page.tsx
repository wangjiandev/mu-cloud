import ServingUnitCard from './_components/ServingUnitCard';
import { ServingUnitFormDialog } from './_components/ServingUnitFormDialog';

export default function Page() {
  return (
    <>
      <div className="flex h-24 items-center justify-between px-4">
        <h1 className="font-bold text-2xl">Serving Units</h1>
        <ServingUnitFormDialog />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ServingUnitCard />
      </div>
    </>
  );
}
