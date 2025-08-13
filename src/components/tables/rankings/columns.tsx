// Structure of the table columns for rankings
// | Ranking | Character Name | Level | Vocation | World | Raw XP/Hour | Damage/Hour | Hunt Duration (HH:MM) | Upload Date | Comments | Flag for exploit |
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { formatTimeSession, formatDate } from "@/lib/utils";
import DefaultHeader from "./default-header";
import CommentHoverPopover from "@/components/ui/CommentHoverPopover";

import { ReportData } from "@/components/DataForm/types";

const columnHelper = createColumnHelper<ReportData>();
export const columns = [
  columnHelper.display({
    id: "Ranking",
    header: () => "Rank",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  }),
  columnHelper.accessor("user", {
    header: (info) => <DefaultHeader info={info} name="Character Name" />,
    id: "user",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("characterLevel", {
    header: (info) => <DefaultHeader info={info} name="Level" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("characterVocation", {
    header: () => "Vocation",
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("characterWorld", {
  //     header: () => "World",
  //     cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("sessionData.Balance", {
    header: (info) => <DefaultHeader info={info} name="Balance" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sessionData.Damage", {
    header: (info) => <DefaultHeader info={info} name="Damage" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sessionData.Damage/h", {
    header: (info) => <DefaultHeader info={info} name="Damage/Hour" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sessionData.Raw XP/h", {
    header: (info) => <DefaultHeader info={info} name="Raw XP/Hour" />,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sessionData.Session length", {
    header: (info) => <DefaultHeader info={info} name="Time Session " />,
    cell: (info) => info.getValue(), // Sesssion lenght is in string type, change it later
  }),
  columnHelper.accessor("createdAt", {
    header: (info) => <DefaultHeader info={info} name="Date" />,
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor("reportDescription", {
    header: () => "Comments",
    cell: (info) =>
      info.getValue() ? (
        <CommentHoverPopover tooltip={info.getValue() || "No comments"} />
      ) : (
        ""
      ),
  }),
];
