"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/use-modal";
import { Modal } from "@/components/shared/Modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateStoreSchema, CreateStoreValues } from "@/schemas/stores";
import { useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { store_creation } from "@/actions/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const StoreModal = () => {
  const storeModal = useModal();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CreateStoreValues>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CreateStoreSchema>) => {
    startTransition(() => {
      store_creation(data)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }

          if (data?.success) {
            form.reset();
            toast.success(data.success);
            router.push("/");
            router.refresh();
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      {" "}
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              className="gap-3 space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="flex w-full">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        name="name"
                        placeholder="Great New Store"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="max-w-[150px]">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4" /> Processing
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Continue
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
