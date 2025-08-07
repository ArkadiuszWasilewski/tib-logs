//thats server component what supposed to fetch data from the server

import { DataTable } from "@/components/tables/payments/data-table";
import { data, User } from "@/lib/data";
import { columns } from "@/components/tables/payments/columns";




export default function PaymentsPage() {
    return (
        <div className=" mx-auto p-4">
        <DataTable<User, any> columns={columns} data={data} />
        </div>
    );
    }