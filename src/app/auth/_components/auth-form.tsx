"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { Github, Loader, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function AuthFormUI() {
  const router = useRouter();
  const [isGithubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  async function SigniInWithGithub() {
    startGithubTransition(async () => {
      const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in With GitHub, redirecting...");
          },
          onError: (error) => {
            toast.error(`Error signing in with GitHub: ${error.error.message}`);
          }, // Set to true if you want to redirect after sign-in
        },
      });
    });
  }
  async function SignInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in", // or "signup" based on your requirement
        fetchOptions: {
          onSuccess: () => {
            toast.success("email sent successfully! Please check your inbox.");
            router.push("/auth/check-email?email=" + encodeURIComponent(email));
          },
          onError: (error) => {
            toast.error(`Error signing in with Email: ${error.error.message}`);
          }, // Set to true if you want to redirect after sign-in
        },
      });
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Authentication</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* GitHub Sign In */}
          <Button
            disabled={isGithubPending}
            onClick={SigniInWithGithub}
            variant="outline"
            className="w-full"
          >
            {isGithubPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                {" "}
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Tabs */}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <Button
                  onClick={SignInWithEmail}
                  type="submit"
                  className="w-full"
                  disabled={emailPending}
                >
                  {emailPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Continue with Email
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <Button
                  onClick={SignInWithEmail}
                  type="submit"
                  className="w-full"
                  disabled={emailPending}
                >
                  {emailPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Sign Up with Email
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
