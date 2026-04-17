import {
  getJudge0LanguageId,
  getJudgeResults,
  pollJudgeResults,
} from "@/lib/judge0";
import { getCurrentUser, getUserRole } from "@/modules/auth/actions";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const userRole = await getUserRole();
    const user = await getCurrentUser();
    if (userRole !== "ADMIN") {
      return NextResponse.json(
        {
          error: "unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolutions
    ) {
      return NextResponse.json(
        {
          error: "missing required fields",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        {
          error: "at least one test case is required",
        },
        {
          status: 400,
        },
        {
          status: 400,
        },
      );
    }

    if (!referenceSolutions || typeof referenceSolutions !== "object") {
      return NextResponse.json(
        {
          error: "reference solution is required for alll supported languages",
        },
        { status: 400 },
      );
    }
    const allResults = [];
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return NextResponse.json(
          {
            error: `unsupported language ${language}`,
          },
          { status: 400 },
        );
      }

      const submission = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const data = await getJudgeResults(submission);
      const tokens = data.map((res) => res.token);

      const results = await pollJudgeResults(tokens);
      allResults.push({ language, results });
    }
    console.log(JSON.stringify(allResults), "all results");

    try {
      const newProblem = await prisma.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testCases,
          codeSnippets,
          referenceSolutions,
          userId: user.id,
        },
      });
      return NextResponse.json(
        {
          success: true,
          message: "problem created successfully",
          data: newProblem,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("validation error", error);
      return NextResponse.json(
        {
          error: `validation error ${error.message}`,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("database error", error);
    return NextResponse.json(
      {
        error: "failed to save problem to database",
      },
      { status: 500 },
    );
  }
}
