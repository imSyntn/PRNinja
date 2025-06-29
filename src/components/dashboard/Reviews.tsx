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
import Modal from "./Modal";
import { useFetch } from "@/hooks/useFetch";

const Reviews = ({ id }: { id: number }) => {
  const {
    loading,
    data,
    error,
  }: { loading: boolean; data: PRReviewDataType[]; error: boolean } = useFetch(
    `/api/user/pr-reviews?userId=${id}`
  );

  return (
    <div id="pr-reviews" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">PR Reviews</h2>
      {!loading && !error && data ? (
        data.length > 0 ? (
          <Table>
            <TableCaption>A list of your recent reviews.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Repo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Files Changed</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="text-center">Suggestions</TableHead>
                <TableHead className="text-center">Link</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id || "say4545"}>
                  <TableCell>{item.repo}</TableCell>
                  <TableCell>{item.title.slice(0, 15)}</TableCell>
                  <TableCell className="text-center">{item.filesChanged}</TableCell>
                  <TableCell className="">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <Modal content={item.suggestions} />
                  </TableCell>
                  <TableCell className="text-center">
                    <a
                      className="flex justify-center"
                      href={item.link}
                      target="_blank"
                    >
                      <ExternalLink color="#155dfc" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">{item.date ? new Date(item.date).toISOString().slice(0, 19).replace("T", " ") : "Current"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center my-5">No data available.</p>
        )
      ) : loading && !error ? (
        <p className="text-center my-5">Loading...</p>
      ) : (
        <p className="text-center my-5">Error</p>
      )}
    </div>
  );
};

export default Reviews;
