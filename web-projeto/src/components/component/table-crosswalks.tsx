import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TableCrosswalksProps } from "@/pages/dashboard";
import { ArrowLeft, ArrowRight, CheckIcon } from "lucide-react";
import { ConfirmDialog } from "../confirm-dialog";
import ReactPaginate from "react-paginate";

export function TableCrosswalks({
  crosswalks,
  filteredCrosswalks,
  handleDetectionRepair,
  setPage,
  maxItems,
}: TableCrosswalksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crosswalks</CardTitle>
        <CardDescription>Manage detected crosswalks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCrosswalks &&
              filteredCrosswalks.map((crosswalk) => (
                <TableRow key={crosswalk.id}>
                  <TableCell className="font-medium">
                    {crosswalk.id.slice(0, 8).concat("...")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("bg-cyan-50", {
                        "bg-red-300": crosswalk.state === "DESGASTE_SEVERO",
                        "bg-green-300": crosswalk.state === "SEM_DESGASTE",
                        "bg-yellow-300":
                          crosswalk.state === "DESGASTE_MODERADO",
                      })}
                    >
                      {crosswalk.state}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {" "}
                    {crosswalk.city}{" "}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {(() => {
                      const createdAt = new Date(
                        crosswalk.createdAt.seconds * 1000 +
                          crosswalk.createdAt.nanoseconds / 1000000
                      );
                      return createdAt.toUTCString();
                    })()}
                  </TableCell>
                  <TableCell>
                    <ConfirmDialog
                      handleDetectionRepair={() =>
                        handleDetectionRepair(crosswalk.id)
                      }
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-green-200 group relative"
                      >
                        <CheckIcon className="h-4 w-4" />
                        <span className="hidden group-hover:block absolute bg-gray-100 p-2 rounded-md shadow-md top-full">
                          Mark as repaired
                        </span>
                      </Button>
                    </ConfirmDialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center">
        <ReactPaginate
          className="flex items-center space-x-3 text-zinc-700"
          onPageChange={(event) =>
            event.selected !== undefined && setPage?.(event.selected)
          }
          pageCount={Math.ceil((crosswalks?.length ?? 0) / (maxItems ?? 1))}
          breakLabel="..."
          previousLabel={<ArrowLeft className="size-6" />}
          nextLabel={<ArrowRight />}
        />
      </CardFooter>
    </Card>
  );
}
