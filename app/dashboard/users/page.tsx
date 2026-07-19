"use client";

import UserCard from "@/app/components/dashboard/userRoute/UserCard";
import { UserManagementSection } from "@/app/components/dashboard/userRoute/UserManagment";

export default function UsersPage() {


    return (
        <div className="">
            <UserCard/>
          <UserManagementSection/>
        </div>
    );
}