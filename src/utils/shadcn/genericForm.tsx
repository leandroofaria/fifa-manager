"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Path } from "react-hook-form"
import { z, ZodType } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/utils/shadcn/form"
import { Input } from "@/utils/shadcn/input"
import { Button } from "@/utils/shadcn/button"

type GenericFormProps<T extends ZodType<any, any>> = {
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (values: z.infer<T>) => void
  fields: {
    name: Path<z.infer<T>>
    label: string
    placeholder?: string
    description?: string
  }[]
}

export function GenericForm<T extends ZodType<any, any>>({
  schema,
  defaultValues,
  onSubmit,
  fields,
}: GenericFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={String(field.name)}
            control={form.control}
            name={field.name}
            render={({ field: controllerField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input placeholder={field.placeholder} {...controllerField} />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}
