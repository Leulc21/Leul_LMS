"use client";
import { ModeToggle } from "@/components/theme_toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Notification from "./notification";
import UserDropdown from "./userDropdown";

function navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2 px-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold">LearnHub</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isPending ? null : session ? (
            <div>
              <Notification />
              <UserDropdown
                name={session.user.name}
                email={session.user.email}
                image={session.user.image ?? ""}
              />
            </div>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Button size="sm">Start Free Trial</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default navbar;
