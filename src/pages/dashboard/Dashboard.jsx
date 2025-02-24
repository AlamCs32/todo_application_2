import AddTodoSheet from "@/components/common/todo/AddTodoSheet";
import { KpiCard } from "@/components/common/Card";
import { todoApiActions } from "@/stores/apiSlice/todoApiSlice";
import get from "lodash.get";
import TableTodo from "@/components/common/todo/TableTodo";
import { useEffect, useState, useCallback } from "react";
import PaginationComponent from "@/components/common/Pagination";
import Input from "@/components/common/Input";
import { debounce } from "lodash";
import { format } from "date-fns";
import DatePicker from "@/components/common/DatePicker";

const Dashboard = () => {
    const [search, setSearch] = useState("");
    const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
    const [queryParams, setQueryParams] = useState({
        pageNo: 1,
        pageSize: 10,
        search: "",
        status: "Total",
        sortBy: "updatedAt",
        sortType: "desc",
        dueDate: false,
        fromDate: "",
        toDate: ""
    });
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [tempRange, setTempRange] = useState({ from: null, to: null });
    // RTk
    const { data: todoStatusData = [], isLoading: todoStatusIsLoading } = todoApiActions.getTodoStatus({
        fromDate: queryParams.fromDate,
        toDate: queryParams.toDate,
    });
    const { data: todos = [], isLoading: todoIsLoading, refetch } = todoApiActions.getTodo(queryParams);
    const [updateTodoStatus, { isLoading: updateTodoStatusIsLoading }] = todoApiActions.updateTodoStatus();
    const [deleteTodo, { isLoading: deleteTodoIsLoading }] = todoApiActions.deleteTodo();

    // Variables
    const kpiStatus = [
        { title: "Total", value: get(todoStatusData, "totalCounts", 0), status: "Total" },
        { title: "Completed", value: get(todoStatusData, "completed", 0), status: "COMPLETED" },
        { title: "Pending", value: get(todoStatusData, "pending", 0), status: "PENDING" },
        { title: "Due Date", value: get(todoStatusData, "dueDate", 0), status: "dueDate" },
    ]

    const columns = [
        { key: "Sr.No", label: "Sr.No", sortable: false },
        { key: "todoId", label: "Todo Id", sortable: true },
        { key: "title", label: "Title", sortable: false },
        { key: "description", label: "Description", sortable: false },
        { key: "dueDate", label: "Due Date", sortable: false },
        { key: "status", label: "Status", sortable: false },
        { key: "createdAt", label: "Created At", sortable: true },
        { key: "updatedAt", label: "Updated At", sortable: true },
        { key: "actions", label: "Actions", sortable: false },
    ];

    // Re-fetch on queryParams or dueDate change
    useEffect(() => {
        refetch();
    }, [queryParams, refetch]);

    // Delete Handler
    const onDeleteHandler = useCallback((todoId) => {
        deleteTodo({ todoId }).unwrap();
    }, [deleteTodo]);

    // Status Update Handler
    const onStatusUpdateHandler = useCallback((todoId) => {
        updateTodoStatus({ todoId }).unwrap();
    }, [updateTodoStatus]);

    // Sort Handler
    const onSortHandler = useCallback((column) => {
        setQueryParams((prev) => ({
            ...prev,
            sortBy: column,
            sortType: prev.sortBy === column && prev.sortType === "desc" ? "asc" : "desc",
        }));
    }, []);

    // Debounced Search Handler
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setQueryParams((prev) => ({
                ...prev,
                search: searchValue,
                pageNo: 1, // Reset to first page on new search
            }));
        }, 500),
        []
    );

    // Handle Input Change (Calls Debounced Function)
    const onSearchChangeHandler = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    const onPageChangeHandler = (newPage) => setQueryParams({ ...queryParams, pageNo: newPage })

    // Handle KPIs Changes
    const kpiOnClickHandler = (status) => {
        if (status == "dueDate") {
            setQueryParams(prev => ({
                ...prev,
                dueDate: !prev.dueDate,
                pageNo: 1
            }))
        } else if (status === queryParams.status) {
            setQueryParams(prev => ({
                ...prev,
                status: "Total",
                pageNo: 1
            }))
        } else {
            setQueryParams(prev => ({
                ...prev,
                status,
                pageNo: 1
            }))
        }
    }

    // Handle Date Selection (Temporary)
    const onTempDateSelectHandler = (range) => {
        setTempRange(range);
    };

    // Apply Date Filter
    const onApplyDateFilter = () => {
        setSelectedRange(tempRange);
        setQueryParams(prev => ({
            ...prev,
            fromDate: tempRange.from ? format(tempRange.from, "yyyy-MM-dd") : "",
            toDate: tempRange.to ? format(tempRange.to, "yyyy-MM-dd") : ""
        }));
        setIsPopoverOpen(false); // Close popover after applying
    };

    const onClearDateFilter = () => {
        setTempRange({ from: null, to: null });
        setSelectedRange({ from: null, to: null });
        setQueryParams(prev => ({
            ...prev,
            fromDate: "",
            toDate: ""
        }));
        setIsPopoverOpen(false); // Close popover after clearing
    };

    return (
        <div>
            {/* Kpi Cards With filteration */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-9">
                {
                    kpiStatus.map((status) => (
                        <KpiCard
                            key={status.title}
                            title={status.title}
                            value={status.value}
                            status={status.status} onClick={kpiOnClickHandler}
                            className={status.status === queryParams.status || (status.status === "dueDate" && queryParams.dueDate) ? " bg-secondary text-secondary-foreground " : ""}
                        />
                    ))
                }
            </div>

            {/* Add Todo Button */}
            <div className="flex items-center justify-end mt-5">
                <AddTodoSheet />
            </div>

            {/* Filteration Components */}
            <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-2 mt-5">
                {/* Search Input */}
                <div className="flex items-center w-[280px] sm:w-[400px] border border-gray-300 rounded-md overflow-hidden ">
                    <Input
                        type="search"
                        className="flex-1 px-4 py-2 border-none outline-none focus:ring-0"
                        placeholder="Search..."
                        value={search}
                        onChange={onSearchChangeHandler}
                    />
                    <button
                        className="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition"
                        onClick={() => debouncedSearch(search)}
                    >
                        Search
                    </button>
                </div>
                {/* Date Range Picker */}
                <DatePicker
                    isPopoverOpen={isPopoverOpen}
                    setIsPopoverOpen={setIsPopoverOpen}
                    tempRange={tempRange}
                    selectedRange={selectedRange}
                    onTempDateSelectHandler={onTempDateSelectHandler}
                    onApplyDateFilter={onApplyDateFilter}
                    onClearDateFilter={onClearDateFilter}
                />
            </div>

            {/* Show Todos */}
            <div className="mt-5 overflow-x-auto">
                <TableTodo
                    columns={columns}
                    data={todos.rows}
                    isLoading={todoIsLoading}
                    sortBy={queryParams.sortBy}
                    sortType={queryParams.sortType}
                    onSort={onSortHandler}
                    onDelete={onDeleteHandler}
                    onStatusUpdate={onStatusUpdateHandler}
                />

                {/* Pagination Components */}
                <PaginationComponent
                    totalPages={Math.max(1, Math.ceil(get(todos, "rowsCount", 0) / queryParams.pageSize))}
                    currentPage={queryParams.pageNo}
                    onPageChange={onPageChangeHandler}
                />
            </div>
        </div>
    );
};

export default Dashboard;
