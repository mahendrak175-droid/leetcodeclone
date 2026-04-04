import { getUserRole } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/Navbar";
import React from "react";

const layout = async ({ children }) => {
  const role = await getUserRole();
  return (
    <main
      className="flex flex-col min-h-screen max-h-screen absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#00000020_1px,transparent_1px)]
  dark:bg-[radial-gradient(#ffffff25_1px,transparent_1px)] bg-size-[20px_20px]"
    >
      <div className="flex-1 flex flex-col pb-4">
        <Navbar userRole={role} />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default layout;
