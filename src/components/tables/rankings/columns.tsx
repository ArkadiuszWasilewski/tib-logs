// Structure of the table columns for rankings
// | Ranking | Character Name | Level | Vocation | World | Raw XP/Hour | Damage/Hour | Hunt Duration (HH:MM) | Upload Date | Comments | Flag for exploit |
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"; 
import { formatTimeSession } from "@/lib/utils";
import DefaultHeader from "./default-header";
import { User } from "@/lib/rankingData";

const columnHelper = createColumnHelper<User>();
export const columns = [
    columnHelper.display({
    id: "Ranking",
    header: () => "Rank",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    }),
    columnHelper.accessor("characterName", {
        header: (info) => <DefaultHeader info={info} name="Character Name" />,
        id: "characterName",
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
    columnHelper.accessor("characterWorld", {
        header: () => "World",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rawXpHour", {
        header: (info) => <DefaultHeader info={info} name="Raw XP/Hour" />,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dmgHour", {
        header: (info) => <DefaultHeader info={info} name="Damage/Hour" />,
        cell: (info) => info.getValue(),
    }), 
    columnHelper.accessor("huntDuration", {
        header: (info) => <DefaultHeader info={info} name="Time Session " />,
        cell: (info) => formatTimeSession(info.getValue()),
    }),    
    columnHelper.accessor("uploadDate", {
        header: (info) => <DefaultHeader info={info} name="Date" />,
        cell: (info) => info.getValue().toLocaleDateString("en-GB" , {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
    }),
    columnHelper.accessor("comments", {
        header: () => "Comments",
        cell: (info) => info.getValue(),
    }),
]



