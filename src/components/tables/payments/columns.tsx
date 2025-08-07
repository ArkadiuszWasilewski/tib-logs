import { createColumnHelper } from "@tanstack/react-table";
import DefaultHeader from "./default-header";
import { User } from "@/lib/data";

const columnHelper = createColumnHelper<User>();
export const columns = [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                className="select-checkbox"
                onChange={table.getToggleAllRowsSelectedHandler()}
                checked={table.getIsAllRowsSelected()}
            />
        ),
        cell: ({ row }) => (
       <input
                type="checkbox"
                className="select-checkbox"
                onChange={row.getToggleSelectedHandler()}
                checked={row.getIsSelected()}
            />
        ),  
    }),
    columnHelper.accessor("firstName", {
        header: (info) =>  <DefaultHeader info={info} name="First Name" />,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
        header: () => "Last Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
        header: (info) => <DefaultHeader info={info} name="Age" />,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("comments", {
        header: () => "Comments",
        cell: (info) => info.getValue(),
    }),

]