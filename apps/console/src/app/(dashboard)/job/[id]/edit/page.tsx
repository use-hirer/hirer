"use client";

import JobEditForm from "@console/components/forms/job-edit-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@console/components/ui/breadcrumb";
import { Button } from "@console/components/ui/button";
import { Input } from "@console/components/ui/input";
import { Label } from "@console/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@console/components/ui/select";
import { Separator } from "@console/components/ui/separator";
import { useState } from "react";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar" },
];

export default function JobEditPage() {
  const [payFrequency, setPayFrequency] = useState("yearly");

  const handlePayFrequencyChange = (value: string) => {
    setPayFrequency(value);
  };

  const getMinSalaryLabel = () => {
    switch (payFrequency) {
      case "hourly":
        return "Minimum Hourly Rate";
      case "daily":
        return "Minimum Daily Rate";
      case "weekly":
        return "Minimum Weekly Rate";
      case "monthly":
        return "Minimum Monthly Rate";
      case "yearly":
      default:
        return "Minimum Yearly Salary";
    }
  };

  const getMaxSalaryLabel = () => {
    switch (payFrequency) {
      case "hourly":
        return "Maximum Hourly Rate";
      case "daily":
        return "Maximum Daily Rate";
      case "weekly":
        return "Maximum Weekly Rate";
      case "monthly":
        return "Maximum Monthly Rate";
      case "yearly":
      default:
        return "Maximum Yearly Salary";
    }
  };

  const getMinSalaryPlaceholder = () => {
    switch (payFrequency) {
      case "hourly":
        return "15.00";
      case "daily":
        return "120.00";
      case "weekly":
        return "600.00";
      case "monthly":
        return "2500.00";
      case "yearly":
      default:
        return "30000.00";
    }
  };

  const getMaxSalaryPlaceholder = () => {
    switch (payFrequency) {
      case "hourly":
        return "25.00";
      case "daily":
        return "200.00";
      case "weekly":
        return "1000.00";
      case "monthly":
        return "4000.00";
      case "yearly":
      default:
        return "50000.00";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="py-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/job">Software Engineer</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Separator className="my-2" />
        <div className="font-extrabold text-xl py-2">
          Edit: Software Engineer
        </div>
        <Separator className="my-2" />
        <div className="my-4">
          <h3 className="text-md font-semibold">Information</h3>
          <p className="text-sm text-muted-foreground">
            Job position information, this is what candidates will first see.
          </p>
        </div>
        <div className="my-4 text-sm">
          <JobEditForm />
        </div>
        <Separator className="my-2" />
        <div className="my-4">
          <h3 className="text-md font-semibold">Salary</h3>
          <p className="text-sm text-muted-foreground">
            Pay/Salary range & details for the job position.
          </p>
          <div className="mt-4">
            <div>
              <Label>Pay Frequency</Label>
              <Select
                defaultValue="yearly"
                onValueChange={handlePayFrequencyChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-full max-w-sm items-center gap-1.5">
                <Label>{getMinSalaryLabel()}</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </span>
                  <Input
                    type="number"
                    className="pl-7"
                    placeholder={getMinSalaryPlaceholder()}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="w-full max-w-sm items-center gap-1.5">
                <Label>{getMaxSalaryLabel()}</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </span>
                  <Input
                    type="number"
                    className="pl-7"
                    placeholder={getMaxSalaryPlaceholder()}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="w-full max-w-sm items-center gap-1.5">
                <Label>Currency</Label>
                <Select defaultValue="USD">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button>Save Job</Button>
            </div>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="my-4">
          <h3 className="text-md font-semibold">
            Allowed and Restricted Countries
          </h3>
          <p className="text-sm text-muted-foreground">
            Salary range for the job position.
          </p>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}
