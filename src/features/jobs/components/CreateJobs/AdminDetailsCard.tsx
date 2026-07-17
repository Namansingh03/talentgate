"use client";

import Image from "next/image";
import { Building2, Globe, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Button,
  CardTitle,
} from "@/src/shared";
import Link from "next/link";

type AdminDetailType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CompanyDetailsType = {
  slug: string | null;
  name: string | null;
  location: string | null;
};

interface AdminCardProps {
  admin: AdminDetailType | null;
  company: CompanyDetailsType | null;
}

function getInitials(name?: string | null) {
  if (!name) return "AD";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const AdminDetailsCard = ({ admin, company }: AdminCardProps) => {
  return (
    <Card className="shadow-lg border border-indigo-300">
      <CardTitle className="p-4 bg-indigo-900 text-white font-semibold text-xl">
        Admin Details
      </CardTitle>
      <CardHeader className="flex flex-row items-center gap-2 ">
        <Avatar className="h-16 w-16 border">
          {admin?.image ? (
            <AvatarImage asChild src={admin.image}>
              <Image
                src={admin.image}
                alt={admin?.name ?? "Admin avatar"}
                width={64}
                height={64}
                className="object-cover"
              />
            </AvatarImage>
          ) : null}
          <AvatarFallback className="text-sm font-medium">
            {getInitials(admin?.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0.5">
          <h3 className="text-base font-semibold leading-none">
            {admin?.name ?? "Unnamed Admin"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {admin?.email ?? "No email provided"}
          </p>
        </div>
      </CardHeader>

      {company && (
        <>
          <Separator />
          <CardContent className="space-y-2 ">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium">
                {company.name ?? "No company name"}
              </span>
            </div>

            {company.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {company.location}
                </span>
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default AdminDetailsCard;
