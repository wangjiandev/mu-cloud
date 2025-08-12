import { CircleOff } from 'lucide-react';
import { Button } from './ui/button';

type NoItemsFoundProps = {
  onClick: () => void;
};

const NoItemsFound = ({ onClick }: NoItemsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CircleOff className="mb-2 text-primary" />
      <h3 className="font-medium text-lg">No items found</h3>
      <p className="mt-1 text-foreground/60 text-sm">Try add new items</p>
      <Button className="mt-4" onClick={onClick} variant="outline">
        Add New Item
      </Button>
    </div>
  );
};

export { NoItemsFound };
