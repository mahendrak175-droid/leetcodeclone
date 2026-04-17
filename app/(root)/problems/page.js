import { getUserRoleAndId } from "@/modules/auth/actions";
import { getAllProblems } from "@/modules/problems/actions";
import ProblemsTable from "@/modules/problems/components/ProblemsTable";
import React from "react";

const page = async () => {
  const user = await getUserRoleAndId();
  const { data: problems, error, message } = await getAllProblems();
  console.log(user, problems, error);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-32">
      {/* <p>{user.role}</p> */}
      {/* <p>{user.id}</p> */}
      {/* <p>{JSON.stringify(problems)}</p> */}
      <ProblemsTable user={user} problems={problems} />
    </div>
  );
};

export default page;
