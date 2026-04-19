import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CodeIcon, CpuIcon, CrossIcon, TimerIcon } from "lucide-react";
import React from "react";

const SubmissionDetails = ({ executionResponse }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h1>Sumission Details</h1>
          <Badge
            variant={
              executionResponse.status === "Wrong Answer"
                ? "destructive"
                : "default"
            }
          >
            {executionResponse.status === "Wrong Answer" ? (
              <CrossIcon />
            ) : (
              <Check />
            )}
            {executionResponse.status}
          </Badge>
        </CardTitle>
        <CardDescription>
          Submitted at {executionResponse?.createdAt.toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex flex-row items-center justify-center">
          <div>
            <CodeIcon />
          </div>
          <div className="ml-3">
            <h2>Language</h2>
            <p className="first-letter:uppercase">
              {executionResponse.language.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div>
            <CpuIcon />
          </div>
          <div className="ml-3">
            <h2>Meomery (avg)</h2>
            <p className="first-letter:uppercase">
              {`${JSON.parse(executionResponse.meomery).reduce(
                (acc, cur) => parseInt(cur.split(" KB")[0]) + acc,
                0,
              )} KB`}
              KB
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div>
            <TimerIcon />
          </div>
          <div className="ml-3">
            <h2>Time (avg)</h2>
            <p className="first-letter:uppercase">
              {`${JSON.parse(executionResponse.time).reduce(
                (acc, cur) => parseInt(cur.split(" ms")[0]) + acc,
                0,
              )} ms`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionDetails;
