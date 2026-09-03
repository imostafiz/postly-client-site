import React from "react";

import LeftSidebar from "@/src/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/src/components/shared/sidebar/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-950">
      <LeftSidebar />

      <main className="flex-1 lg:ml-[280px] lg:mr-[320px] overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 lg:px-0">
          {children}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
};

export default Layout;
