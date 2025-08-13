//thats server component what supposed to fetch data from the server

import { DataTable } from "@/components/Tables/data-table";
import { dataExample } from "@/lib/rankingData";
import { columns } from "@/components/Tables/rankings/columns";
import { ReportData } from "@/components/DataForm/types";

export default function RankingsPage() {
  return (
    <div className="w-full mx-auto p-4 text-center">
      <DataTable<ReportData, any> columns={columns} data={dataExample} />
    </div>
  );
}
