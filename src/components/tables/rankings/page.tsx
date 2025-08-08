//thats server component what supposed to fetch data from the server

import { DataTable } from "@/components/tables/data-table";
import { data, User } from "@/lib/rankingData";
import { columns } from "@/components/tables/rankings/columns";




export default function RankingsPage() {
    return (
        <div className=" mx-auto p-4">
        <DataTable<User, any> columns={columns} data={data} />
        </div>
    );
    }