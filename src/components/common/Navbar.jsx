import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { resetAuthorization } from "@/stores/slices/authSlice";
import { todoApiActions } from "@/stores/apiSlice/todoApiSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@/assets/images/logo2.png";
import profileImg from "@/assets/images/profile.png";
import ChangePasswordForm from "./forms/ChangePasswordForm";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

    // Handle Logout
    const handleLogout = () => {
        dispatch(resetAuthorization());
        dispatch(todoApiActions.resetApiState());
    };

    // Handle Password Change
    const handleChangePassword = () => {
        console.log("Changing Password:", passwords);
        setIsDialogOpen(false); // Close dialog after submission
    };

    return (
        <div className="bg-primary h-[70px] flex items-center justify-between px-6 shadow-md text-lg">
            {/* Logo */}
            <Link to="/dashboard" className="text-xl text-primary-foreground font-bold flex items-center gap-2">
                <img src={logoImg} alt="Logo" className="h-11 w-11" /> To-Do Application
            </Link>

            {/* Profile Avatar & Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger aria-label="User menu">
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={profileImg} alt="Profile" />
                        <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-lg text-lg">
                    {/* Show Username */}
                    <div className="p-3 text-gray-700 font-semibold">{user?.username || "Guest"}</div>
                    <DropdownMenuSeparator />

                    {/* Change Password Button */}
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        Change Password
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* <ChangePasswordForm onClose={() => setIsDialogOpen(false)}/> */}

            {/* Change Password Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>

                    {/* Render ChangePasswordForm */}
                    <ChangePasswordForm onClose={() => setIsDialogOpen(false)} />
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default Navbar;
