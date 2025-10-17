import Link from "next/link";

export default function Home() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1>Main</h1>
      <p className="text-muted-foreground text-sm">
        Don&apos;t have an account? <Link href="/auth/register">Register</Link>
      </p>
      <p className="text-muted-foreground text-sm">
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>

    </div>
  );
}
