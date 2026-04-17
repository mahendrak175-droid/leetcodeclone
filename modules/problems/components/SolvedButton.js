"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect, useState } from "react";

export function SolvedButton({ userId, problemSolved, problemId }) {
  const [solved, setSolved] = useState(false);

  function checkProblemSolved() {
    return problemSolved.find(
      (problem) => problem.problemId === problemId && problem.userId === userId,
    );
  }
  console.log(!!checkProblemSolved(), solved);

  useEffect(() => {
    setSolved(!!checkProblemSolved());
  }, [problemSolved]);

  return (
    <FieldGroup>
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          disabled={!solved}
        />
      </Field>
    </FieldGroup>
  );
}
