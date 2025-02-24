import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateActions from "./UpdateActions";

const TableTodo = ({ columns, data, isLoading, onSort, sortBy, sortType, onStatusUpdate, onDelete }) => {
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            {/* Scrollable Container */}
            <div className="overflow-x-auto">
                <Table className="w-full min-w-[800px] bg-white">
                    {/* Table Header */}
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={cn(
                                        "py-3 px-4 text-left font-semibold text-gray-700 uppercase",
                                        column.sortable && "cursor-pointer hover:text-gray-900"
                                    )}
                                    onClick={() => column.sortable && onSort(column.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.label}
                                        {sortBy === column.key && (
                                            sortType === "desc"
                                                ? <ArrowDown className="h-4 w-4 text-gray-600" />
                                                : <ArrowUp className="h-4 w-4 text-gray-600" />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center p-10">
                                    <Loader className="animate-spin inline-block mr-2 text-blue-600" />
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data?.length ? (
                            data.map((row, index) => (
                                <TableRow
                                    key={row.todoId}
                                    className={cn(
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white",
                                        "hover:bg-gray-100 transition"
                                    )}
                                >
                                    <TableCell className="py-3 px-4">{index + 1}</TableCell>
                                    <TableCell className="py-3 px-4">{row.todoId}</TableCell>
                                    <TableCell className="py-3 px-4 font-medium text-gray-900">{row.title}</TableCell>
                                    <TableCell className="py-3 px-4 text-gray-700">{row.description}</TableCell>
                                    <TableCell className="py-3 px-4 text-gray-600">
                                        {row.dueDate ? format(new Date(row.dueDate), "yyyy-MM-dd") : "N/A"}
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <span className={cn(
                                            row.status === "PENDING"
                                                ? "bg-red-500 text-white"
                                                : "bg-green-500 text-white",
                                            "font-bold px-3 py-1 rounded-full text-xs"
                                        )}>
                                            {row.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3 px-4 text-gray-500">
                                        {format(new Date(row.createdAt), "yyyy-MM-dd HH:mm")}
                                    </TableCell>
                                    <TableCell className="py-3 px-4 text-gray-500">
                                        {format(new Date(row.updatedAt), "yyyy-MM-dd HH:mm")}
                                    </TableCell>
                                    <TableCell className="py-3 px-4">
                                        <UpdateActions
                                            data={row}
                                            onStatusUpdate={onStatusUpdate}
                                            onDelete={onDelete}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
                                    No Data Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableTodo;
