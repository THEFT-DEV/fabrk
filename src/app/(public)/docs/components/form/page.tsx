'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

function BasicFormExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">&gt; SUBMIT</Button>
      </form>
    </Form>
  );
}

export default function FormPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.40]"
      category="Components"
      title="Form"
      description="Building forms with react-hook-form and zod validation. Provides automatic validation, error handling, and accessibility."
      importCode={`import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";`}
      mainPreview={{
        preview: <BasicFormExample />,
        code: `const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

function Example() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">&gt; SUBMIT</Button>
      </form>
    </Form>
  );
}`,
      }}
      variants={[
        {
          title: 'Form Structure',
          description: 'Basic structure of a form with FormItem components.',
          preview: (
            <div className="space-y-4 p-4 font-mono text-sm">
              <div className="text-muted-foreground">
                <span className="text-primary">&gt;</span> Form Component Structure
              </div>
              <div className="text-muted-foreground space-y-2 pl-4">
                <div>
                  <span className="text-success">&gt;</span> Form (Provider)
                </div>
                <div className="pl-4">
                  <span className="text-success">&gt;</span> FormField (Controller)
                </div>
                <div className="pl-8">
                  <span className="text-success">&gt;</span> FormItem (Container)
                </div>
                <div className="pl-12">
                  <span className="text-success">&gt;</span> FormLabel
                </div>
                <div className="pl-12">
                  <span className="text-success">&gt;</span> FormControl
                </div>
                <div className="pl-12">
                  <span className="text-success">&gt;</span> FormDescription
                </div>
                <div className="pl-12">
                  <span className="text-success">&gt;</span> FormMessage
                </div>
              </div>
            </div>
          ),
          code: `<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Description</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`,
        },
        {
          title: 'Validation Example',
          description: 'Form with comprehensive validation rules.',
          preview: (
            <div className="space-y-4 p-4 font-mono text-sm">
              <div className="border-border flex items-center border-b pb-2">
                <span className="text-muted-foreground text-xs">[ VALIDATION ] validation.ts</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-muted-foreground">
                  <span className="text-primary">const</span> schema{' '}
                  <span className="text-primary">=</span> z.object(&#123;
                </div>
                <div className="text-muted-foreground pl-4">
                  username: z.string()
                  <span className="text-warning">.min</span>(3)
                </div>
                <div className="text-muted-foreground pl-4">
                  email: z.string()
                  <span className="text-warning">.email</span>()
                </div>
                <div className="text-muted-foreground pl-4">
                  password: z.string()
                  <span className="text-warning">.min</span>(12)
                </div>
                <div className="text-muted-foreground">&#125;);</div>
              </div>
            </div>
          ),
          code: `const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});`,
        },
      ]}
      props={[
        {
          name: 'control',
          type: 'Control<TFieldValues>',
          default: '-',
          description: 'Form control object from useForm hook.',
        },
        {
          name: 'name',
          type: 'FieldPath<TFieldValues>',
          default: '-',
          description: 'Name of the field in the form schema.',
        },
        {
          name: 'render',
          type: '({ field }) => ReactElement',
          default: '-',
          description: 'Render function that receives field props.',
        },
      ]}
      accessibility={[
        'Integrates with react-hook-form for full accessibility support',
        'FormLabel automatically associates with inputs via htmlFor',
        'FormMessage announces errors with proper ARIA attributes',
        'FormDescription provides additional context for screen readers',
        'aria-invalid automatically set on fields with errors',
        'FormControl manages focus and keyboard navigation',
        'Validation errors announced via aria-live regions',
      ]}
      previous={{ title: 'Footer', href: '/docs/components/footer' }}
      next={{ title: 'Form Error', href: '/docs/components/form-error' }}
    />
  );
}
