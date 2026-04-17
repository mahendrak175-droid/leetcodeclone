"use client";
import React, { use, useEffect, useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SolvedButton } from "./SolvedButton";
import { Badge } from "@/components/ui/badge";
import { Bookmark, FilterIcon, Pencil, Trash2 } from "lucide-react";
import { deleteProblem } from "../actions";
import { toast } from "sonner";
import { SearchIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProblemsTable = ({ problems, user }) => {
  const [tag, selectedTag] = useState("All Tags");
  const [difficultyLevel, setDifficultyLevel] = useState("All");
  const [problemsFiltered, setProblemsFiltered] = useState(() => problems);
  const [tags, setTags] = useState([{ label: "All Tags", value: "All Tags" }]);
  const difficulty = [
    { label: "All", value: "All" },
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ];
  const [text, setText] = useState("");

  useEffect(() => {
    const set = new Set();

    const tags = problems.flatMap((problem) => problem.tags);
    tags.forEach((tag) => set.add(tag));
    setTags((prev) => {
      return [
        ...prev,
        ...Array.from(set).map((tag) => {
          return { label: tag, value: tag };
        }),
      ];
    });
  }, [problems]);

  useEffect(() => {
    let filtered = problems;

    if (tag !== "All Tags") {
      filtered = filtered.filter((p) => p.tags.includes(tag));
    }

    if (text) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(text.toLowerCase()),
      );
    }

    if (difficultyLevel !== "All") {
      filtered = filtered.filter(
        (p) => p.difficulty === difficultyLevel.toUpperCase(),
      );
    }

    setProblemsFiltered(filtered);
  }, [tag, text, problems, difficultyLevel]);

  console.log(problems, user);

  const handleProblemDelete = async (id) => {
    const { error, message, success } = await deleteProblem(id);
    if (success) {
      toast.success(message);
      setProblemsFiltered((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error(error);
    }
  };
  console.log(tags, "tags");

  return (
    <div>
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Problems</h1>
          <p>Manage and solve coding problems</p>
        </div>
        <Button>Create Playlist</Button>
      </div>

      <div className="bg-gray-950 border outline-0 rounded-xl my-5 shadow-none p-4">
        <p className="text-xl mb-4">
          <FilterIcon className="inline-block align-middle" />
          <span className="pl-3">Filter</span>
        </p>
        <Field className="flex justify-around flex-row">
          <InputGroup>
            <InputGroupInput
              id="inline-start-input"
              placeholder="Search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>

          <Select
            items={tags}
            value={tag}
            onValueChange={(value) => selectedTag(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Tags</SelectLabel>
                {tags.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={difficulty}
            value={difficultyLevel}
            onValueChange={(value) => setDifficultyLevel(value)}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Difficulty</SelectLabel>
                {difficulty.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      {!problemsFiltered.length && (
        <p className="p-5 text-center w-full">Start adding problems to solve</p>
      )}
      {problemsFiltered.length > 0 && (
        <Table className="bg-gray-950 border outline-0 shadow-none">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Solved</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problemsFiltered.map(
              ({ id, title, solvedBy, tags, difficulty }) => (
                <TableRow key={id}>
                  <TableCell>
                    <SolvedButton
                      userId={user.id}
                      problemId={id}
                      problemSolved={solvedBy}
                    />
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t, i) => (
                        <Badge
                          key={i}
                          className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{difficulty}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        className="bg-red-400 hover:bg-red-500 text-white"
                        onClick={() => handleProblemDelete(id)}
                      >
                        <Trash2 />
                      </Button>
                      <Button className="bg-gray-400 hover:bg-gray-500 text-white">
                        <Pencil />
                      </Button>
                      <Button className="bg-gray-400 hover:bg-gray-500 text-white">
                        <Bookmark /> Save
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      )}
    </div>
  );
};

export default ProblemsTable;
