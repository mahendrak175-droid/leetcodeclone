"use server";

import prisma from "@/lib/db";
import { getJudgeResults } from "@/lib/judge0";
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

export const executeProblem = async (submissions, problemId) => {
  // submissions = [{ source_code, language, stdin, expected_output }]
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

    const input = submissions.map((s) => s.stdin);
    const output = submissions.map((s) => s.expected_output);

    if (input.length !== output.length) {
      return {
        success: false,
        message: "invalid testcases",
      };
    }

    // check testcases insubmissions array
    // check all the testcases passed for the given languaage
    // save the submission in db in the submissions table
    // also save the testcase details in testcases table

    const result = await getJudgeResults(submissions);
    // gives the resultt of test cases
    //     [{
    //     "testCase": 1,
    //     "passed": false,
    //     "stdout": "",
    //     "expected": "true",
    //     "stderr": "file0.code.java:10: error: missing return statement\n    }\n    ^\n1 error\nerror: compilation failed",
    //     "compileOutput": "",
    //     "meomery": "74203 KB",
    //     "time": "996 ms",
    //     "status": "Runtime Error"
    // }]

    let allPassed = true;

    result.forEach((result) => {
      if (!result.passed) {
        allPassed = false;
      }
    });

    const sourceCode = submissions?.[0].source_code || "";
    const language = submissions?.[0].language || "";

    const submission = await prisma.submission.create({
      data: {
        userId: getUser.id,
        problemId: problemId,
        sourceCode: sourceCode,
        language: language,
        stdin: input.join("\n"),
        stdout: JSON.stringify(result.map((r) => r.stdout)),
        stderr: result.some((r) => r.stderr)
          ? JSON.stringify(result.map((r) => r.stderr))
          : null,
        compileOutput: result.some((r) => r.compileOutput)
          ? JSON.stringify(result.map((r) => r.compileOutput))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        meomery: result.some((r) => r.meomery)
          ? JSON.stringify(result.map((r) => r.meomery))
          : null,
        time: result.some((r) => r.time)
          ? JSON.stringify(result.map((r) => r.time))
          : null,
      },
    });

    if (allPassed) {
      await prisma.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId: getUser.id,
            problemId: problemId,
          },
        },
        update: {},
        create: {
          userId: getUser.id,
          problemId: problemId,
        },
      });
    }

    //     "testCase": 1,
    //     "passed": false,
    //     "stdout": "",
    //     "expected": "true",
    //     "stderr": "file0.code.java:10: error: missing return statement\n    }\n    ^\n1 error\nerror: compilation failed",
    //     "compileOutput": "",
    //     "meomery": "74203 KB",
    //     "time": "996 ms",
    //     "status": "Runtime Error"
    const testCaseResultsData = result.map((r) => ({
      submissionId: submission.id,
      testCase: r.testCase,
      passed: r.passed,
      stdout: r.stdout,
      expected: r.expected,
      stderr: r.stderr,
      compileOutput: r.compileOutput,
      meomery: r.meomery,
      time: r.time,
      status: r.status,
    }));

    await prisma.testCaseResult.createMany({
      data: testCaseResultsData,
    });

    const submissionWithTestCases = await prisma.submission.findUnique({
      where: { id: submission.id },
      include: { testCases: true },
    });

    return {
      success: true,
      data: submissionWithTestCases,
      message: "Problem Successfully Executed",
    };

    //     userId        String
    // problemId     String
    // sourceCode    Json
    // language      String
    // status        String // accepted, wrong answer, time limit exceeded, etc.
    // stdin         String?
    // stdout        String?
    // stderr        String?
    // compileOutput String?
    // meomery       String?
    // time          String?
  } catch (error) {
    console.error("error", error);
    return {
      success: false,
      error: "Unable to execute the problem",
      message: "Problem not Executed",
    };
  }
};
