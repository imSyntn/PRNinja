import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarkdownViewer from "./MarkdownViewer";

export default function Modal({ data }: { data: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-[90vw] !h-[90vh] overflow-hidden flex flex-col justify-center">
        <DialogHeader className="h-[20px]">
          <DialogTitle>Suggestions</DialogTitle>
        </DialogHeader>

        <div className="h-full overflow-auto p-4">
          <MarkdownViewer />
        </div>

        <DialogFooter className="mt-4 h-[20px]">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
