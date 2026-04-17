"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getAllProblems = async () => {
  try {
    const user = await currentUser();

    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    const problems = await prisma.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: getUser.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!problems) {
      return {
        success: false,
        error: error.message,
        message: "unable to get problems",
      };
    }
    return {
      success: true,
      data: problems,
    };
  } catch (error) {
    console.error("error getting problems", error.message);
    return {
      success: false,
      error: error.message,
      message: "unable to get problems",
    };
  }
};

export const getProblemById = async (id) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
    });
    return {
      success: true,
      data: problem,
    };
  } catch (error) {
    console.error("error getting problem", error.message);
    return {
      success: false,
      error: error.message,
      message: "unable to get problem",
    };
  }
};

export const deleteProblem = async (id) => {
  //get admin rights;
  try {
    const user = await currentUser();

    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
        role: "ADMIN",
      },
      select: {
        id: true,
      },
    });
    if (!getUser.id) {
      return {
        success: false,
        message: "not an admin to perform this operation",
      };
    }

    await prisma.problem.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/problems");

    return {
      success: true,
      message: "deleted Successfully",
    };
  } catch (error) {
    console.error("error deleting problem", error.message);
    return {
      success: false,
      message: "unable to delete problem",
      error: error.message,
    };
  }
};
