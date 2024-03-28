import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";

enum CrosswalkState {
  SemDesgaste = "SEM_DESGASTE",
  DesgasteModerado = "DESGASTE_MODERADO",
  DesgasteSevero = "DESGASTE_SEVERO",
}

const crosswalkDialogSchema = z.object({
  state: z.string({
    required_error: "Please select an option.",
  }),
  street: z.string(),
});

type CrosswalkDialogSchema = z.infer<typeof crosswalkDialogSchema>;

export function NewDetection() {
  const form = useForm<CrosswalkDialogSchema>({
    resolver: zodResolver(crosswalkDialogSchema),
    defaultValues: {
      state: CrosswalkState.SemDesgaste,
      street: "",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/comments?_limit=10").then(
        (res) => res.json()
      ),
    queryKey: ["comments"],
  });

  function onSubmit(values: CrosswalkDialogSchema) {
    console.log("Creating detection...");
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={CrosswalkState.SemDesgaste}>
                          Sem desgaste
                        </SelectItem>
                        <SelectItem value={CrosswalkState.DesgasteModerado}>
                          Desgaste moderado
                        </SelectItem>
                        <SelectItem value={CrosswalkState.DesgasteSevero}>
                          Desgaste severo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Street Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
