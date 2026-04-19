"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/modules/home/components/ModeToggle";
import { executeProblem, getProblemById } from "@/modules/problems/actions";
import {
  Code2Icon,
  Lightbulb,
  MoveLeft,
  Play,
  Rocket,
  Sheet,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area";
import SubmissionDetails from "@/modules/problems/components/SubmissionDetails";
import TestCaseTable from "@/modules/problems/components/TestCaseTable";

const items = [
  { label: "JAVA", value: "JAVA" },
  { label: "PYTHON", value: "PYTHON" },
  { label: "JAVASCRIPT", value: "JAVASCRIPT" },
];

const page = ({ params }) => {
  // const userRole = await getUserRole();
  // const user = await currentUser();
  // console.log(userRole, "userrole");

  // if (userRole !== "ADMIN") {
  //   redirect("/");
  // }

  const [problemData, setProblemData] = useState({});
  const [language, setLanguage] = useState("JAVA");
  const [isRunning, setIsRunning] = useState(false);
  const [executionResponse, setExecutionResponse] = useState({});
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const param = await params;
        const { data, success, error, message } = await getProblemById(
          param.id,
        );
        if (mounted && success) {
          setProblemData(data);
        } else if (!success && error) {
          toast.warning(message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [params]);

  const {
    title,
    difficulty,
    tags,
    examples,
    description,
    constraints,
    codeSnippets,
    testCases,
    editorial,
    hints,
  } = problemData;

  console.log(problemData, "problemdata");

  const [code, setCode] = useState(codeSnippets?.[language]);

  useEffect(() => {
    setCode(codeSnippets?.[language] || "");
  }, [language, codeSnippets]);

  const handleRun = async () => {
    try {
      setIsRunning(true);
      // submissions = [{ source_code, language, stdin, expected_output }]
      const submissions = testCases.map((t) => ({
        stdin: t.input,
        expected_output: t.output,
        source_code: code,
        language: language,
      }));
      const param = await params;
      const result = await executeProblem(submissions, param.id);

      console.log(result, "handleRun");
      setExecutionResponse(result.data);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error("error ruunning code", error);
      toast.error(error.message);
    } finally {
      setIsRunning(false);
    }
  };

  console.log(executionResponse, "executionResponse");

  const difficultyColor = {
    HARD: "bg-red-400 p-1 border-1 border-red-500 ml-4 rounded-xl",
    MEDIUM: "bg-yellow-400 p-1 border-1 border-yellow-500 ml-4 rounded-xl",
    EASY: "bg-green-400 p-1 border-1 border-green-500 ml-4 rounded-xl",
  };

  return (
    <div className="flex justify-around px-40 flex-col items-center my-5 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <Link className="inline-block" href="/problems">
            <MoveLeft />
          </Link>
          <h1 className="text-md inline-block align-top pl-5">
            {title}
            <span className={cn(difficultyColor[difficulty])}>
              {difficulty}
            </span>
          </h1>
        </div>
        <ModeToggle />
      </div>
      <div className="w-full text-left mt-4">
        {tags?.map((tags, i) => (
          <Badge className="mx-1 p-3" variant="secondary" key={i}>
            {tags}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-2 grid-flow-col w-full mt-6 gap-x-6">
        <div className="grid gap-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                <Code2Icon className="inline-block mb-1" /> Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{description}</p>
              <h2 className="mt-3">Example:</h2>
              <div className="border rounded-2xl p-4 mt-2">
                <div className="py-2">
                  <p>
                    <span className="text-yellow-400 mr-2">Input:</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md">
                      {examples?.JAVA.input}
                    </span>
                  </p>
                </div>
                <div className="py-2">
                  <p>
                    <span className="text-yellow-400 mr-2">Output:</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md">
                      {examples?.JAVA.output}
                    </span>
                  </p>
                </div>
                <div className="py-2">
                  <p>
                    <span className="mr-2">Explanation:</span>
                    <span>{examples?.JAVA.explanation}</span>
                  </p>
                </div>
              </div>
              <h2 className="mt-3">Constraints:</h2>
              <div className="border rounded-2xl p-4">
                <div className="py-2">
                  <p className="whitespace-pre-line text-gray-400">
                    {constraints}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="border rounded-2xl p-4 mt-2 h-full">
            <Tabs defaultValue="submissions" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="submissions">
                  <Trophy /> Submissions
                </TabsTrigger>
                <TabsTrigger value="editorial">
                  <Sheet /> Editorial
                </TabsTrigger>
                <TabsTrigger value="hints">
                  <Lightbulb /> Hints
                </TabsTrigger>
              </TabsList>
              <TabsContent value="submissions">
                <Card className="h-auto">
                  <CardHeader>
                    <CardTitle>Submissions</CardTitle>
                    <CardDescription>
                      View your key metrics and recent project activity. Track
                      progress across all your active projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    You have 12 active projects and 3 pending tasks.
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="editorial">
                <Card>
                  <CardHeader>
                    <CardTitle>Editorial</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {editorial}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hints">
                <Card>
                  <CardHeader>
                    <CardTitle>Hints</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {hints}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="grid grid-flow-row gap-y-6">
          <Card className="w-full h-full">
            <CardHeader className="flex justify-between">
              <CardTitle>
                <Code2Icon className="inline-block mb-1" /> Code Editor
              </CardTitle>
              <div>
                <Select
                  items={items}
                  defaultValue={language}
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Language</SelectLabel>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Editor
                height="400px"
                width="100%"
                language={language.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
              />
              <div className="mt-4">
                <Button className="p-3" onClick={handleRun}>
                  <Play />
                  Run Code
                </Button>
                <Button className="p-3 ml-3" variant="outline">
                  <Rocket />
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <ScrollArea className="w-full h-[280px]">
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
                <CardDescription>
                  Run your code against these test cases to validate your
                  solution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testCases?.map((testCase, index) => (
                  <div key={index} className="border rounded-2xl p-4 mt-2">
                    <div className="py-2">
                      <p>
                        <span className="mr-2">Input:</span>
                        <span className="bg-gray-800 px-2 py-1 rounded-md">
                          {testCase.input.trim() || `"${testCase.input}"`}
                        </span>
                      </p>
                    </div>
                    <div className="py-2">
                      <p>
                        <span className="mr-2">Output:</span>
                        <span className="bg-gray-800 px-2 py-1 rounded-md">
                          {testCase.output}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>

          {executionResponse && executionResponse?.testCases?.length && (
            <>
              <SubmissionDetails executionResponse={executionResponse} />
              <TestCaseTable testCases={executionResponse.testCases} />
            </>
          )}
        </div>
      </div>
      {/* <CreateProblemForm /> */}
    </div>
  );
};

export default page;
