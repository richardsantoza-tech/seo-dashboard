import { getSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function SettingsPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage your account and preferences.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900">Account</h2>
          {user && (
            <p className="mt-1 text-sm text-gray-500">
              Signed in as {user.email}
            </p>
          )}
          <form action={signOut} className="mt-4">
            <button
              type="submit"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Get notified when your scans complete. Coming soon.
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900">Billing</h2>
          <p className="mt-1 text-sm text-gray-500">
            Billing options will appear here in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
