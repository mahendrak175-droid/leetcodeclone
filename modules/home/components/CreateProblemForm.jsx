"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // or 'zod/v4'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CopyIcon,
  Delete,
  FileCodeIcon,
  LucideDelete,
  Trash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const examplesData = {
  JAVASCRIPT: {
    input: "",
    output: "",
    explanation: "",
  },
  PYTHON: {
    input: "",
    output: "",
    explanation: "",
  },
  JAVA: {
    input: "",
    output: "",
    explanation: "",
  },
};

const stringProblemExample = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
    const fs = require("fs");
    const input = fs.readFileSync(0, "utf-8").trim();

    function isPalindrome(s) {
      const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
      let left = 0;
      let right = cleaned.length - 1;

      while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
      }

      return true;
    }

    console.log(isPalindrome(input) ? "true" : "false");
  `,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const dpProblemExample = {
  title: "Climbing Stairs",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 step or 2 steps. Return the number of distinct ways to reach the top.",

  difficulty: "EASY",

  tags: ["dynamic-programming", "dp"],

  testCases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "5",
      output: "8",
    },
  ],

  codeSnippets: {
    JAVASCRIPT: `function climbStairs(n) {
  // write your code here
}`,
    PYTHON: `def climbStairs(n):
    # write your code here
    pass`,
    JAVA: `class Solution {
  public int climbStairs(int n) {
    // write your code here
  }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `function climbStairs(n) {
  if (n <= 2) return n;

  let prev1 = 1;
  let prev2 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev1 = prev2;
    prev2 = curr;
  }

  return prev2;
}`,
    PYTHON: `def climbStairs(n):
    if n <= 2:
        return n

    a, b = 1, 2

    for _ in range(3, n + 1):
        a, b = b, a + b

    return b`,
    JAVA: `class Solution {
  public int climbStairs(int n) {
    if (n <= 2) return n;

    int a = 1;
    int b = 2;

    for (int i = 3; i <= n; i++) {
      int temp = a + b;
      a = b;
      b = temp;
    }

    return b;
  }
}`,
  },

  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation: "You can climb (1+1) or (2).",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation: "Possible ways: (1+1+1), (1+2), (2+1).",
    },
    JAVA: {
      input: "n = 5",
      output: "8",
      explanation: "This follows Fibonacci pattern.",
    },
  },

  constraints: `
1 <= n <= 45
`,

  hints: "This problem follows Fibonacci pattern.",

  editorial:
    "Let dp[i] represent the number of ways to reach step i. dp[i] = dp[i-1] + dp[i-2].",
};

const emptyForm = {
  title: "",
  description: "",
  difficulty: "EASY", // or undefined if you allow
  tags: [],
  testCases: [{ input: "", output: "" }],
  codeSnippets: {
    JAVASCRIPT: "",
    PYTHON: "",
    JAVA: "",
  },
  referenceSolutions: {
    JAVASCRIPT: "",
    PYTHON: "",
    JAVA: "",
  },
  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
  },
  constraints: "",
  hints: "",
  editorial: "",
};

const languages = ["JAVASCRIPT", "PYTHON", "JAVA"];

const codeSnippetsData = {
  JAVASCRIPT: "",
  PYTHON: "",
  JAVA: "",
};

const referenceSolutionsData = {
  JAVASCRIPT: "",
  PYTHON: "",
  JAVA: "",
};

const schema = z.object({
  title: z.string().min(1, { message: "title is Required" }),
  description: z.string().min(1, { message: "Description isRequired" }),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    message: "Select Difficulty",
  }),
  tags: z.array(z.string().min(1, { message: "Tag is Required" })).min(1, {
    message: "Select at least one tag",
  }),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, { message: "input is required" }),
        output: z.string().min(1, { message: "output is required" }),
      }),
    )
    .min(1, { message: "add atleast one test case" }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, { message: "code snippet is required" }),
    PYTHON: z.string().min(1, { message: "code snippet is required" }),
    JAVA: z.string().min(1, { message: "code snippet is required" }),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z
      .string()
      .min(1, { message: "Reference Solution is required" }),
    PYTHON: z.string().min(1, { message: "Reference Solution is required" }),
    JAVA: z.string().min(1, { message: "Reference Solution is required" }),
  }),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, { message: "input is required" }),
      output: z.string().min(1, { message: "output is required" }),
      explanation: z.string().min(1, { message: "explanation is required" }),
    }),
    PYTHON: z.object({
      input: z.string().min(1, { message: "input is required" }),
      output: z.string().min(1, { message: "output is required" }),
      explanation: z.string().min(1, { message: "explanation is required" }),
    }),
    JAVA: z.object({
      input: z.string().min(1, { message: "input is required" }),
      output: z.string().min(1, { message: "output is required" }),
      explanation: z.string().min(1, { message: "explanation is required" }),
    }),
  }),
  constraints: z.string().min(1, { message: "constraints is required" }),
  hints: z.string().optional(),
  editorial: z.string().optional(),
});

const CreateProblemForm = () => {
  const [toggleValue, setToggleValue] = useState("Dp problem");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: emptyForm,
  });

  //   useEffect(() => {
  //     register("tags");
  //   }, [register]);
  const tags = watch("tags");

  const testCases = watch("testCases");

  const codeSnippets = watch("codeSnippets");

  const referenceSolutions = watch("referenceSolutions");

  const examples = watch("examples");

  const addTag = (tag) => {
    if (!tag.trim()) return;

    if (!tags.includes(tag)) {
      setValue("tags", [...tags, tag], { shouldValidate: true });
    }
  };

  const removeTag = (tag) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  const addTestCaseInput = (input, id) => {
    if (!input.trim) return;

    setValue(
      "testCases",
      testCases.map((tc, i) => (i === id ? { ...tc, input } : tc)),
      { shouldValidate: true },
    );
  };

  const addTestCaseOutput = (output, id) => {
    if (!output.trim) return;

    setValue(
      "testCases",
      testCases.map((tc, i) => (i === id ? { ...tc, output } : tc)),
      { shouldValidate: true },
    );
  };

  const removeTestCase = (id) => {
    setValue(
      "testCases",
      testCases.filter((_, i) => i !== id),
    );
  };

  const onHandleSubmit = async (data) => {
    try {
      const postProblem = await fetch("/api/create-problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Problem created successfully");
      router.push("/problems");
    } catch (error) {
      console.error("error on creating", error);
      toast.warning("Problem not created");
    }

    reset();
  };

  const handleEditorChange = (value, event, language) => {
    if (!value.trim()) {
      return;
    }

    setValue(
      "codeSnippets",
      {
        ...codeSnippets,
        [language]: value,
      },
      { shouldValidate: true },
    );
  };

  const handleReferenceSolutions = (value, event, language) => {
    if (!value.trim()) {
      return;
    }

    setValue(
      "referenceSolutions",
      {
        ...referenceSolutions,
        [language]: value,
      },
      { shouldValidate: true },
    );
  };

  const handleExampleInput = (value, language) => {
    if (!value.trim()) {
      return;
    }

    setValue(
      "examples",
      {
        ...examples,
        [language]: {
          ...examples[language],
          input: value,
        },
      },
      { shouldValidate: true },
    );
  };
  const handleExampleOutput = (value, language) => {
    if (!value.trim()) {
      return;
    }

    setValue(
      "examples",
      {
        ...examples,
        [language]: {
          ...examples[language],
          output: value,
        },
      },
      { shouldValidate: true },
    );
  };
  const handleExampleExplanation = (value, language) => {
    if (!value.trim()) {
      return;
    }

    setValue(
      "examples",
      {
        ...examples,
        [language]: {
          ...examples[language],
          explanation: value,
        },
      },
      { shouldValidate: true },
    );
  };

  const handleLoadData = () => {
    if (toggleValue.length) {
      if (toggleValue === "String Problem") {
        reset(stringProblemExample);
      } else {
        reset(dpProblemExample);
      }
    } else {
      reset(emptyForm);
    }
  };
  return (
    <div className="max-w-7xl mx-auto w-full mt-6">
      <Card size="2xl">
        <CardHeader className="flex justify-between w-full">
          <CardTitle>Create a problem</CardTitle>
          <CardDescription>
            <ToggleGroup
              type="single"
              defaultValue={toggleValue}
              variant="outline"
              onValueChange={(value) => {
                setToggleValue(value);
              }}
            >
              <ToggleGroupItem value="Dp problem" aria-label="Toggle top">
                Dp problem
              </ToggleGroupItem>
              <ToggleGroupItem
                value="String Problem"
                aria-label="Toggle bottom"
              >
                String Problem
              </ToggleGroupItem>
              <Button className="ml-4" onClick={handleLoadData}>
                {toggleValue ? "Load Data" : "Reset All"}
              </Button>
            </ToggleGroup>
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form onSubmit={handleSubmit((d) => onHandleSubmit(d))}>
            <FieldGroup className="max-full">
              <Field>
                <FieldLabel htmlFor="block-start-input">Title</FieldLabel>
                <InputGroup className="h-auto">
                  <InputGroupInput
                    id="title"
                    placeholder="Enter problem title"
                    {...register("title")}
                  />
                </InputGroup>
                {errors.title?.message && (
                  <p className="text-red-300 text-sm">
                    {errors.title?.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="block-start-textarea">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="description"
                    placeholder="console.log('Hello, world!');"
                    className="font-mono text-sm"
                    {...register("description")}
                  />
                </InputGroup>
                {errors.description?.message && (
                  <p className="text-red-300 text-sm">
                    {errors.description?.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Difficulty</FieldLabel>

                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Difficulty</SelectLabel>

                          <SelectItem value="EASY">Easy</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HARD">Hard</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty?.message && (
                  <p className="text-red-300 text-sm">
                    {errors.difficulty.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Tags</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    placeholder="Type tag and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </InputGroup>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-muted rounded-md flex items-center gap-2"
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-red-300 text-sm">{errors.tags.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel className="flex justify-between">
                  Test Case{" "}
                  <Button
                    onClick={() =>
                      setValue("testCases", [
                        ...testCases,
                        { input: "", output: "" },
                      ])
                    }
                  >
                    Add test case
                  </Button>
                </FieldLabel>

                {testCases.map((tc, id) => (
                  <Card key={id}>
                    <CardHeader className="flex justify-end">
                      <Button onClick={() => removeTestCase(id)}>
                        <Trash />
                      </Button>
                    </CardHeader>
                    <CardContent className="flex justify-between gap-7">
                      <Field>
                        <FieldLabel htmlFor="block-start-textarea">
                          Input
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={`input#${id}`}
                            placeholder="console.log('Hello, world!');"
                            className="font-mono text-sm"
                            value={tc.input}
                            onChange={(e) => {
                              addTestCaseInput(e.target.value, id);
                            }}
                          />
                        </InputGroup>
                        {errors.testCases?.[id]?.input?.message && (
                          <p className="text-red-300 text-sm">
                            {errors.testCases[id]?.input.message}
                          </p>
                        )}
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="block-start-textarea">
                          Output
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id={`output#${id}`}
                            placeholder="console.log('Hello, world!');"
                            className="font-mono text-sm"
                            value={tc.output}
                            onChange={(e) => {
                              addTestCaseOutput(e.target.value, id);
                            }}
                          />
                        </InputGroup>
                        {errors.testCases?.[id]?.output?.message && (
                          <p className="text-red-300 text-sm">
                            {errors.testCases[id]?.output.message}
                          </p>
                        )}
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </Field>
              {languages.map((language) => (
                <Card>
                  <CardHeader>{language}</CardHeader>
                  <CardContent>
                    <Field className="border rounded-lg p-3 my-3 bg-gray-700">
                      <FieldLabel htmlFor="block-start-textarea">
                        Starter Code Template
                      </FieldLabel>
                      <Editor
                        height="200px"
                        width="100%"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        defaultValue="// some comment"
                        value={codeSnippets[language]}
                        onChange={(value, e) =>
                          handleEditorChange(value, e, language)
                        }
                      />
                      {errors.codeSnippets?.[language]?.message && (
                        <p className="text-red-300 text-sm">
                          {errors.codeSnippets[language].message}
                        </p>
                      )}
                    </Field>
                    <Field className="border rounded-lg p-3 my-3 bg-lime-950">
                      <FieldLabel htmlFor="block-start-textarea">
                        Reference Solution
                      </FieldLabel>
                      <Editor
                        height="200px"
                        width="100%"
                        language={language.toLowerCase()}
                        theme="vs-dark"
                        value={referenceSolutions[language]}
                        defaultValue="// some comment"
                        onChange={(value, e) =>
                          handleReferenceSolutions(value, e, language)
                        }
                      />
                      {errors.referenceSolutions?.[language]?.message && (
                        <p className="text-red-300 text-sm">
                          {errors.referenceSolutions[language].message}
                        </p>
                      )}
                    </Field>
                    <Field className="border rounded-lg p-3 my-3 bg-cyan-950">
                      <p>Examples</p>

                      <>
                        <FieldLabel htmlFor="block-start-textarea">
                          Input
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id="input"
                            placeholder="console.log('Hello, world!');"
                            className="font-mono text-sm"
                            value={examples[language]?.input}
                            onChange={(e) =>
                              handleExampleInput(e.target.value, language)
                            }
                          />
                        </InputGroup>
                        {errors.examples?.[language]?.input?.message && (
                          <p className="text-red-300 text-sm">
                            {errors.examples?.[language]?.input.message}
                          </p>
                        )}

                        <FieldLabel htmlFor="block-start-textarea">
                          Output
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id="output"
                            placeholder="console.log('Hello, world!');"
                            className="font-mono text-sm"
                            value={examples[language]?.output}
                            onChange={(e) =>
                              handleExampleOutput(e.target.value, language)
                            }
                          />
                        </InputGroup>
                        {errors.examples?.[language]?.output?.message && (
                          <p className="text-red-300 text-sm">
                            {errors.examples?.[language]?.output.message}
                          </p>
                        )}

                        <FieldLabel htmlFor="block-start-textarea">
                          Explanation
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            id="Explanation"
                            placeholder="console.log('Hello, world!');"
                            className="font-mono text-sm"
                            value={examples[language]?.explanation}
                            onChange={(e) =>
                              handleExampleExplanation(e.target.value, language)
                            }
                          />
                        </InputGroup>
                        {errors.examples?.[language]?.explanation?.message && (
                          <p className="text-red-300 text-sm">
                            {errors.examples?.[language]?.explanation.message}
                          </p>
                        )}
                      </>
                    </Field>
                  </CardContent>
                </Card>
              ))}
              <Card>
                <CardHeader>Additional Information</CardHeader>
                <CardContent>
                  <Field className="py-2">
                    <FieldLabel htmlFor="block-start-textarea">
                      Constraints
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id="constraints"
                        placeholder="console.log('Hello, world!');"
                        className="font-mono text-sm"
                        {...register("constraints")}
                      />
                    </InputGroup>
                    {errors.constraints?.message && (
                      <p className="text-red-300 text-sm">
                        {errors.constraints?.message}
                      </p>
                    )}
                  </Field>
                  <Field className="py-2">
                    <FieldLabel htmlFor="block-start-textarea">
                      Hints (optional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id="hints"
                        placeholder="console.log('Hello, world!');"
                        className="font-mono text-sm"
                        {...register("hints")}
                      />
                    </InputGroup>
                    {errors.hints?.message && (
                      <p className="text-red-300 text-sm">
                        {errors.hints?.message}
                      </p>
                    )}
                  </Field>
                  <Field className="py-2">
                    <FieldLabel htmlFor="block-start-textarea">
                      Editorial (optional)
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        id="editorial"
                        placeholder="console.log('Hello, world!');"
                        className="font-mono text-sm"
                        {...register("editorial")}
                      />
                    </InputGroup>
                    {errors.editorial?.message && (
                      <p className="text-red-300 text-sm">
                        {errors.editorial?.message}
                      </p>
                    )}
                  </Field>
                </CardContent>
              </Card>
            </FieldGroup>

            <Separator className="my-6" />

            <Button className="mt-2 p-5" type="submit" variant="outline">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProblemForm;

//javascript python and java
// started code template
// reference solution
// example -> input, ouuput and explanation

// //additional information
// contstaints
// hints optional
// editorial optional

// {
// JAVASCRIPT: {
//   codeSnippets: monacoeditor to stringify;
//   referenceSolutions: monacoeditor to stringify;
//   examples: {
//     (input, output, explanation);
//   }
// }
// }
