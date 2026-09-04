import React from "react";

import LeftSidebar from "@/src/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/src/components/shared/sidebar/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#F2F1EB] px-4 lg:px-6">
      <div className="flex h-screen">
        <LeftSidebar />

        <main className="flex-1 lg:ml-[304px] lg:mr-[344px] overflow-y-auto">
          <div className="max-w-[680px] mx-auto py-6">
            {children}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;
