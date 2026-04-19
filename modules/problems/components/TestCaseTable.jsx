import React from "react";

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
import { Badge } from "@/components/ui/badge";
import { Check, CrossIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TestCaseTable = ({ testCases }) => {
  const testCaseAccepted = (flag) => {
    return flag
      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
      : "";
  };
  console.log(testCases);
  return (
    <div className="border rounded-2xl">
      <Table>
        <TableCaption className="border-t py-3 m-0">
          A list of your test cases.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Case #</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Meomery</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Output</TableHead>
            <TableHead>Expected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((testCase) => (
            <TableRow key={testCase.id}>
              <TableCell>{testCase.testCase}</TableCell>
              <TableCell>
                <Badge
                  className={cn(testCaseAccepted(testCase.passed))}
                  variant={testCase.passed ? "default" : "destructive"}
                >
                  {testCase.passed ? <Check /> : <CrossIcon />}
                  {testCase.status}
                </Badge>
              </TableCell>
              <TableCell>{testCase.meomery}</TableCell>
              <TableCell>{testCase.time}</TableCell>
              <TableCell>{testCase.stdout}</TableCell>
              <TableCell>{testCase.expected}</TableCell>
              {/* <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell >
                {invoice.totalAmount}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestCaseTable;
