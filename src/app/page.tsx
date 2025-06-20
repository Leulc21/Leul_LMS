"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isSignOutPending, startSignOutTransition] = useTransition();
  const [isSignInPending, startSignInTransition] = useTransition();
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
  async function SignIn() {
    startSignInTransition(async () => {
      router.push("/auth");
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
          <Button disabled={isSignInPending} onClick={SignIn}>
            {isSignInPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <span className=" pl-4 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
}
