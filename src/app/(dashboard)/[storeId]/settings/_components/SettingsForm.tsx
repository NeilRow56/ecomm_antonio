"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { UpdateStoreSchema } from "@/schemas/stores";
import { Input } from "@/components/ui/input";
import Heading from "@/components/shared/Heading";
import { Store } from "@prisma/client";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof UpdateStoreSchema>>({
    resolver: zodResolver(UpdateStoreSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: z.infer<typeof UpdateStoreSchema>) => {
    console.log(values);
    //TODO Update Store
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage your settings preferences "
        />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
          <Trash />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SettingsForm;
