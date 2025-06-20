"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const router = useRouter();

  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isOtpPending, startOtpTransition] = useTransition();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    startOtpTransition(async () => {
      e.preventDefault();
      const fullOtp = otp.join("");
      await authClient.signIn.emailOtp({
        email: email,
        otp: fullOtp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("OTP verified successfully! Redirecting...");
            router.push("/");
          },
          onError: (error) => {
            toast.error(`Error verifying OTP: ${error.error.message}`);
          },
        },
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Please Check Your Email</CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            We have sent a verification code to{" "}
            <span className="font-medium">{email}</span>. Copy and paste the
            code below to continue.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm font-medium text-center">
              Enter 6-digit code
            </p>

            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Backspace" && handleBackspace(index)
                  }
                  ref={(el) => {
                    inputRefs.current[index] = el!;
                  }}
                  className="w-12 text-center text-lg font-mono"
                />
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isOtpPending}>
              {isOtpPending ? (
                <>
                  <span className="loader mr-2" /> Verifying...
                </>
              ) : (
                "Continue"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center px-2">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
