"use client"
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";

import { useGetAllUserQuery } from "@/src/redux/features/user";

// Define User type
interface IUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage: string;
}

// Define a type for the valid colors
type ChipColor =
  | "default"
  | "success"
  | "primary"
  | "secondary"
  | "warning"
  | "danger";

// Mapping roles to colors
const statusColorMap: Record<IUser["role"], ChipColor> = {
  user: "default",
  admin: "success",
};

const UserManagement: React.FC = () => {
  const { data } = useGetAllUserQuery({});
  const allUsers: IUser[] = data?.data || [];

  // Render cell content based on column
  const renderCell = (user: IUser, columnKey: keyof IUser | "actions") => {
    // Check if columnKey is 'actions' first to avoid type error
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              {/* Add icon here for Details */}
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              {/* Add icon here for Edit */}
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              {/* Add icon here for Delete */}
            </span>
          </Tooltip>
        </div>
      );
    }

    // For other keys, access the property normally
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profileImage }}
            description={user.email}
            name={user.name}
          />
        );
      case "role":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.role]} // This guarantees the correct type
            size="sm"
            variant="flat"
          >
            {user.role}
          </Chip>
        );
      case "email":
        return cellValue; // For the email, return it directly
      default:
        return cellValue; // Fallback
    }
  };

  // Define the table columns
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <div>
      <Table aria-label="User management table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={allUsers}>
          {(user: IUser) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(user, columnKey as keyof IUser | "actions")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
