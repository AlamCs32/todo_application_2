import React from "react";
import { CheckIcon, Trash2Icon, EditIcon } from "lucide-react";
import UpdateTodoSheet from "./UpdateTodoSheet";

const UpdateActions = ({ data = {}, onStatusUpdate, onDelete }) => {
    const isCompleted = data?.status === "COMPLETED";
    return (
        <div className="flex items-center gap-2">
            <button
                className="rounded-full p-2 hover:bg-green-200 transition"
                onClick={() => onStatusUpdate(data.todoId)}
                disabled={isCompleted}
            >
                <CheckIcon className="text-green-600" />
            </button>

            <button
                className="rounded-full p-2 hover:bg-red-200 transition"
                onClick={() => onDelete(data.todoId)}
            >
                <Trash2Icon className="text-red-600" />
            </button>

            <UpdateTodoSheet defaultValues={data} bottonTitle={
                <button
                    className="rounded-full p-2 hover:bg-primary/25 transition"
                >
                    <EditIcon className="text-primary" />
                </button>} />
        </div>
    );
};

export default React.memo(UpdateActions);
