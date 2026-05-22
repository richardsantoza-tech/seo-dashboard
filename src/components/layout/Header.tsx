import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function Header() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          SiteClarity
        </Link>
        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                href="/settings"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Settings
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth?mode=login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/auth"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
