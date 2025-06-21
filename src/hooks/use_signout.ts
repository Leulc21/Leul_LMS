"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();
  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully!");
        },
        onError: (error) => {
          toast.error(`Error signing out: ${error.error.message}`);
        },
      },
    });
  }
  return signOut;
}
