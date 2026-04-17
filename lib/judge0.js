export function getJudge0LanguageId(language) {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    GO: 60,
  };

  return languageMap[language.toUpperCase()];
}

export async function getJudgeResults(submissions) {
  const result = await fetch(
    "http://172.25.144.1:2358/submissions/batch?base64_encoded=false",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submissions }),
    },
  );
  const data = await result.json(); // ✅ parse it here
  return data;
}

export async function pollJudgeResults(tokens) {
  let attempts = 0;
  const MAX_RETIES = 20;
  while (attempts < MAX_RETIES) {
    const response = await fetch(
      `http://172.25.144.1:2358/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false`,
    );

    const data = await response.json();

    const results = data.submissions;

    const isAllDone = results.every(
      (r) => r.status.id !== 1 && r.status.id !== 2,
    );

    if (isAllDone) {
      return results;
    }

    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Judge0 polling timeout");
}
