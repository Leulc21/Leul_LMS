"use client";
import AvatarPeople from "@/components/avatar_people";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Star } from "lucide-react";
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

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 text-sm px-4  bg-primary/5 ">
            <Star className="mr-2 h-4 w-4" />
            The Future of Online Learning
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Transform Learning with
            <span className="text-primary block">Smart LMS</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Empower your organization with our cutting-edge Learning Management
            System. Create, deliver, and track educational content with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="text-base px-8 py-4">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <AvatarPeople />
        </div>
      </div>
    </section>
  );
}
