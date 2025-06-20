import Navbar from "@/app/(public)/_components/navbar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default layout;
