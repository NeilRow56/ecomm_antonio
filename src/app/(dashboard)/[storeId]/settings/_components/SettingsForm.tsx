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
import { Loader2, Save, Trash } from "lucide-react";
import React, { useState, useTransition } from "react";
import { UpdateStoreSchema, UpdateStoreValues } from "@/schemas/stores";
import { Input } from "@/components/ui/input";
import Heading from "@/components/shared/Heading";
import { Store } from "@prisma/client";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<UpdateStoreValues>({
    resolver: zodResolver(UpdateStoreSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: UpdateStoreValues) => {
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
        <Button
          disabled={isPending}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
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
                    <Input
                      placeholder="Store name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-[150px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4" /> Processing
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Update
              </>
            )}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SettingsForm;
