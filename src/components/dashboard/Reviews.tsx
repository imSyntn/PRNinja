import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PRReviewDataType } from "@/types/dashboard";
import { ExternalLink } from "lucide-react";

export const prReviews: PRReviewDataType[] = [
  {
    id: "1",
    repo: "prninja/core-api",
    title: "Fix user auth & token refresh",
    status: "Issues Found",
    suggestions: 4,
    link:"#",
    date: "2025-06-21",
  },
  {
    id: "2",
    repo: "sayantan66/test-repo",
    title: "Add ESLint and Prettier config",
    status: "Reviewed",
    suggestions: 0,
    link:"#",
    date: "2025-06-19",
  },
  {
    id: "3",
    repo: "prninja/client-ui",
    title: "Improve dark mode contrast",
    status: "Pending",
    suggestions: 0,
    link:"#",
    date: "2025-06-22",
  },
  {
    id: "4",
    repo: "company/payments-gateway",
    title: "Fix currency conversion bug",
    status: "Issues Found",
    suggestions: 2,
    link:"#",
    date: "2025-06-18",
  },
  {
    id: "5",
    repo: "prninja/review-service",
    title: "Refactor AI comment generation",
    status: "Reviewed",
    suggestions: 1,
    link:"#",
    date: "2025-06-17",
  },
];

const Reviews = () => {
  return (
    <div id="pr-reviews" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">PR Reviews</h2>
      <Table>
        <TableCaption>A list of your recent reviews.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Repo</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="text-center">Suggestions</TableHead>
            <TableHead className="text-center">Link</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prReviews.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.repo}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className="">{item.status}</TableCell>
              <TableCell className="text-center">{item.suggestions}</TableCell>
              <TableCell className="text-center">
                <a
                  className="flex justify-center"
                  href={`https://github.com/${item.link}`}
                  target="_blank"
                >
                  <ExternalLink color="#155dfc" />
                </a>
              </TableCell>
              <TableCell className="text-right">{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reviews;
