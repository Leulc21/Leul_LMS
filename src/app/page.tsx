"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isSignOutPending, startSignOutTransition] = useTransition();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function SignOut() {
    startSignOutTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            toast.success("Signed out successfully!");
          },
        },
      });
    });
  }
  return (
    <>
      {session ? (
        <div className="flex justify-between px-4 py-8">
          <p className="text-center text-2xl font-bold">
            Welcome back, {session.user.name}!
          </p>
          <Button
            disabled={isSignOutPending}
            variant="destructive"
            onClick={SignOut}
          >
            {isSignOutPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Signing out...
              </>
            ) : (
              <>
                <span className=" pl-4 h-4 w-4" />
                Sign Out
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex justify-between px-4 py-8">
          <p className="text-center text-2xl font-bold">Welcome to the LMS!</p>{" "}
          <Button
            onClick={() => {
              router.push("/auth");
            }}
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}
