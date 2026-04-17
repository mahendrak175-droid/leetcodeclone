import { getUserRole } from "@/modules/auth/actions";
import CreateProblemForm from "@/modules/home/components/CreateProblemForm";
import { ModeToggle } from "@/modules/home/components/ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userRole = await getUserRole();
  const user = await currentUser();
  console.log(userRole, "userrole");

  if (userRole !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex justify-around px-40 flex-col items-center my-5 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <Link href="/">
          <MoveLeft />
        </Link>
        <h1 className="text-xl">Create Problem</h1>
        <ModeToggle />
      </div>
      <h1 className="flex justify-start w-full py-6 text-lg">
        Admin: {user.firstName} {user.lastName}
      </h1>
      <CreateProblemForm />
    </div>
  );
};

export default page;
