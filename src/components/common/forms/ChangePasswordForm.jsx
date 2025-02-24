import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userApiAction } from "@/stores/apiSlice/userApiSlice";

// ✅ Zod Schema for Validation
const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ChangePasswordForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  const [changePasswordHandler, { }] = userApiAction.changePassword()


  // ✅ Handle Password Change
  const onSubmit = async (data) => {
    await changePasswordHandler({ ...data }).unwrap()
    reset();
    onClose(); // Close dialog after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Old Password */}
      <Input
        type="password"
        placeholder="Old Password"
        {...register("oldPassword")}
      />
      {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}

      {/* New Password */}
      <Input
        type="password"
        placeholder="New Password"
        {...register("newPassword")}
      />
      {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

      {/* Confirm Password */}
      <Input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

      <div className="flex justify-end gap-3 mt-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
