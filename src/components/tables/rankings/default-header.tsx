import { HeaderContext } from "@tanstack/react-table";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuContent,
} from "@/components/ui/context-menu";

import { ReportData } from "@/components/DataForm/types";

interface DefaultHeaderProps<T> {
  info: HeaderContext<ReportData, T>;
  name: string;
}

export function DefaultHeader<T>({ info, name }: DefaultHeaderProps<T>) {
  const sorted = info.column.getIsSorted();
  const { table } = info;

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onPointerDown={(e) => {
          e.preventDefault();
          if (e.button === 2) return; // Prevent right-click context menu
          info.column.toggleSorting(info.column.getIsSorted() === "asc");
        }}
      >
        {name}
        {sorted === "asc" && <span className="ml-2">🔼</span>}
        {sorted === "desc" && <span className="ml-2">🔽</span>}
        {sorted === false && <span className="ml-2">↕️</span>}
      </ContextMenuTrigger>
      <ContextMenuContent>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ContextMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => {
                console.log(`Toggling column ${column.id} to ${value}`);
                column.toggleVisibility(!!value);
              }}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DefaultHeader;
