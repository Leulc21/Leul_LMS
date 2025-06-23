"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import RichTextEditor from "@/components/Editor/rich_text";
import { createCourseSchema } from "@/lib/createCourseSchema";
import { SparkleIcon } from "lucide-react";

type CreateCourseInput = z.infer<typeof createCourseSchema>;

export default function CreateCoursePage() {
  const router = useRouter();

  const form = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      slug: "",
      smallDescription: "",
      description: "",
      price: 0,
      duration: 0,
      level: "BEGINNER",
      category: "",
      fileKey: "",
      status: "DRAFT",
    },
  });

  const generateSlug = () => {
    const title = form.getValues("title");
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    form.setValue("slug", slug);
  };

  const onSubmit = async (values: CreateCourseInput) => {
    console.log("✅ Course Created", values);
    router.push("/admin/courses");
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Create Course</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Learn React" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug + generate */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="auto-generated-slug" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end pt-6">
              <Button type="button" onClick={generateSlug}>
                <SparkleIcon />
                Generate
              </Button>
            </div>
          </div>

          {/* Small Description */}
          <FormField
            control={form.control}
            name="smallDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. A quick intro to React" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  {/* <Textarea
                    rows={5}
                    {...field}
                    placeholder="Detailed course description..."
                  /> */}
                  <RichTextEditor
                    content={field.value}
                    onChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="fileKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL / File Key</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. thumbnails/react.png" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Web Development" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-end">
            {/* Level Select - takes full width on mobile, half on md+ */}

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Select - takes full width on mobile, half on md+ */}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (hours)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="e.g. 10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="e.g. 29.99" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Create Course
          </Button>
        </form>
      </Form>
    </div>
  );
}
