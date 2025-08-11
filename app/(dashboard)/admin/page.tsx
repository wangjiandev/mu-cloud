export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1>Dashboard</h1>
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          className="aspect-video h-12 w-full rounded-lg bg-muted/50"
          key={index}
        />
      ))}
    </div>
  );
}
