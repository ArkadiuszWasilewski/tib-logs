//thats server component what supposed to fetch data from the server

import { DataTable } from "@/components/Tables/data-table";
import { data, User } from "@/lib/rankingData";
import { columns } from "@/components/Tables/rankings/columns";




export default function RankingsPage() {
    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <DataTable<User, any> columns={columns} data={data} />
        </div>
    );
    }