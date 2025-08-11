import prisma from '@/lib/prisma';

/**
 * Server component that fetches all users from the database and renders their names.
 *
 * Fetches users with `prisma.user.findMany()` on the server and returns a JSX element
 * containing a grid where each user's name is rendered. Database errors are not caught
 * here and will propagate to the caller.
 *
 * @returns A JSX element that renders the list of users.
 */
export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
