"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const wards = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
];

const createAreaSchema = z.object({
  code: z.string().min(1, "Area code is required"),
  wardNumber: z.number().int().min(1, "Ward number is required"),
});

const CreateAreaPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createArea = api.area.createArea.useMutation();

  const form = useForm<z.infer<typeof createAreaSchema>>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      code: "0",
      wardNumber: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createAreaSchema>) {
    console.log(values);
    //@ts-expect-error: code needs to be parsed as an integer
    values.code = parseInt(values.code as unknown as string);
    setIsLoading(true);
    try {
      //@ts-expect-error: code needs to be parsed as an integer
      await createArea.mutateAsync(values);
      toast.success("Area created successfully");
      router.push("/dashboard/area");
    } catch (error) {
      toast.error("Failed to create area");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader className="space-y-2">
        <CardTitle>Create New Area</CardTitle>
        <CardDescription>Fill the details to create a new area</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <div>
                      <FormLabel>Area Code</FormLabel>
                      <Input type="number" {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="wardNumber">Ward Number</Label>
                <Controller
                  name="wardNumber"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      required
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select your ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {wards.map((ward) => {
                            return (
                              <SelectItem key={ward.value} value={ward.value}>
                                {ward.label}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingButton /> : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAreaPage;
