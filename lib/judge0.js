// lib/piston.js

const PISTON_LANGUAGE_MAP = {
  PYTHON: { language: "python", version: "3.10.0" },
  JAVASCRIPT: { language: "javascript", version: "18.15.0" },
  JAVA: { language: "java", version: "15.0.2" },
  CPP: { language: "c++", version: "10.2.0" },
  GO: { language: "go", version: "1.16.2" },
};

export function getPistonLanguage(language) {
  return PISTON_LANGUAGE_MAP[language?.toUpperCase()] || null;
}

export async function getJudgeResults(submissions) {
  // submissions = [{ source_code, language, stdin, expected_output }]

  const results = await Promise.all(
    submissions.map(async (sub, i) => {
      const lang = getPistonLanguage(sub.language);
      if (!lang) throw new Error(`Unsupported language: ${sub.language}`);

      const response = await fetch("http://172.25.144.1:2000/api/v2/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: lang.language,
          version: lang.version,
          files: [{ content: sub.source_code }],
          stdin: sub.stdin ?? "",
        }),
      });

      const data = await response.json();
      // console.log("Piston response:", data);

      const stdout = data.run?.stdout?.trim() ?? "";
      const stderr = data.run?.stderr?.trim() ?? "";
      const compileError = data.compile?.stderr?.trim() ?? "";
      const code = data.run?.code;
      const signal = data.run?.signal;
      const expected = sub.expected_output?.trim() ?? "";

      let status = "";

      // 🔴 Compile Error
      if (compileError) {
        status = "Compile Error";
      }

      // 🔥 Time Limit Exceeded
      else if (signal === "SIGKILL") {
        status = "Time Limit Exceeded";
      }

      // 🔴 Runtime Error
      else if (code !== 0) {
        status = "Runtime Error";
      }

      // 🔴 Wrong Answer
      else if (stdout !== expected) {
        status = "Wrong Answer";
      }

      // 🟢 Accepted
      else {
        status = "Accepted";
      }

      const meomery =
        data.run?.memory != null ? Math.round(data.run.memory / 1024) : null; // KB

      const time = data.run?.wall_time ?? null;
      const passed = expected === stdout;

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected,
        stderr,
        compileOutput: compileError,
        meomery: meomery ? `${meomery} KB` : undefined,
        time: time ? `${time} ms` : undefined,
        status,
      };
    }),
  );

  return results;
}

// Piston is synchronous — no polling needed
// This is a drop-in replacement for pollJudgeResults
export async function pollJudgeResults(results) {
  // results are already complete from getJudgeResults
  // just return them directly — no polling needed with Piston
  return results;
}
