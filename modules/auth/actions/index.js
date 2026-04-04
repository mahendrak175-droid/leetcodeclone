"use server";
import prisma from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }
    const { firstName, lastName, id, imageUrl, emailAddresses } = user;

    const newUser = await prisma.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || "",
        lastName: lastName || "",
        email: emailAddresses[0]?.emailAddress || "",
        imageUrl: imageUrl || "",
      },
      create: {
        clerkId: id,
        firstName: firstName || "",
        lastName: lastName || "",
        email: emailAddresses[0]?.emailAddress || "",
        imageUrl: imageUrl || "",
      },
    });

    return {
      success: true,
      user: newUser,
      message: "user onboarded successfully",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return {
      success: false,
      error: "Failed to onboard user",
    };
  }
};

export const getUserRole = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: "user is not authenticated",
      };
    }
    const { id } = user;
    const userRole = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });
    return userRole.role;
  } catch (error) {
    console.error("error finding role", error);
    return {
      success: false,
      error: "failed to fetch user role",
    };
  }
};
