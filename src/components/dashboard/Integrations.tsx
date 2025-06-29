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
import { ConnectedRepoType, UserDataType } from "@/types/dashboard";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import AlertButton from "./AlertButton";
import { useFetch } from "@/hooks/useFetch";

const RenderTable = ({
  repo,
  onClick,
}: {
  repo: ConnectedRepoType[];
  onClick: () => void;
}) => {
  return (
    <Table>
      <TableCaption>A list of your connected repositories.</TableCaption>
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
        {repo.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description || "No description."}</TableCell>
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
              <AlertButton
                text="Disconnect"
                description="If disconnected, you can connect the repository again."
                onClick={onClick}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Integrations = ({ userData }: { userData: UserDataType }) => {
  const { data, loading, error } = useFetch(
    `/api/user/integrations?installationId=${userData.installationId}`
  );

  const handleDisconnectRepo = () => {
    const url = `https://github.com/settings/installations/${userData.installationId}`
    window.open(url, "_blank")
  };

  return (
    <div id="integrations" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">Integrations</h2>
      <h3 className="text-xl font-semibold my-4">Connected Repositories</h3>
      {!loading && !error && data ? (
        <>
          {data.data.total_count !== 0 ? (
            <RenderTable
              repo={data.data.repositories}
              onClick={handleDisconnectRepo}
            />
          ) : (
            <p className="text-center my-5">No repositories added.</p>
          )}
          {data.data.repository_selection !== "all" && (
            <div className="w-full flex justify-center my-5">
              <Button size="sm" className="cursor-pointer">
                Connect New Repository
              </Button>
            </div>
          )}
        </>
      ) : loading && !error ? (
        <p className="text-center my-5">Loading...</p>
      ) : (
        <p className="text-center my-5">Error</p>
      )}
    </div>
  );
};

export default Integrations;
