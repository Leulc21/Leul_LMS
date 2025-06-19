// /app/auth/check-email/page.tsx
"use client";

import OtpForm from "../_components/OtpForm";

// move form to its own file if needed

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <OtpForm />
    </div>
  );
}
