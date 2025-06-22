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
import { Button } from "../ui/button";
import { ConnectedRepoType } from "@/types/dashboard";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import AlertButton from "./AlertButton";

const data: ConnectedRepoType[] = [
  {
    id: 1296269,
    name: "Hello-World",
    description: "This your first repo!",
    full_name: "octocat/Hello-World",
    permissions: {
      pulls: "write",
      metadata: "read",
    },
    private: true,
  },
  {
    id: 1296270,
    name: "Another-Repo",
    description: "This your first repo!",
    full_name: "octocat/Another-Repo",
    permissions: {
      pulls: "read",
      metadata: "read",
    },
    private: false,
  },
];

const Integrations = () => {
  return (
    <div id="integrations" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">Integrations</h2>
      <h3 className="text-xl font-semibold my-4">
        Connected Repositories
      </h3>
      <Table>
        <TableCaption>A list of your recent connected repositories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>description</TableHead>
            <TableHead className="text-center">Private</TableHead>
            <TableHead className="text-center">Link</TableHead>
            <TableHead className="text-right w-28"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-center">
                <Badge>{item.private.toString()}</Badge>
              </TableCell>
              <TableCell className="text-center">
                <a
                  className="flex justify-center"
                  href={`https://github.com/${item.full_name}`}
                  target="_blank"
                >
                  <ExternalLink color="#155dfc" />
                </a>
              </TableCell>
              <TableCell className="text-right w-28">
                <AlertButton text="Disconnect" description="If disconnected, you can connect the repository again." />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex justify-center my-5">
        <Button size="sm" className="cursor-pointer">Connect New Repository</Button>
      </div>
    </div>
  );
};

export default Integrations;
