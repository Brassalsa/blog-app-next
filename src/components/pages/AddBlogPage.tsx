"use client";
import type { Session } from "next-auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import blogSchema from "@/lib/utils/validators/blogPostValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Editor from "../editor";
import { addBlogPost } from "@/lib/services/server/blog.controller";
import { useToast } from "@/hooks/use-toast";
import { ALL_CATEGORIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  session: Session;
};

function AddBlogPage({ session }: Props) {
  const { toast } = useToast();
  const [image, setImage] = useState<File>();
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      about: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (v: z.infer<typeof blogSchema>) => {
    const formData = new FormData();
    Object.keys(v).forEach((i) => {
      if (i === "image") {
        if (!image) return;
        formData.append("image", image);
      } else {
        formData.append(i, v[i as keyof typeof v]);
      }
    });

    toast({
      title: "Add Post",
      description: "Post submittion in progress...",
    });

    const res = await addBlogPost(formData);
    if (res.err) {
      toast({
        title: "Add Post",
        description: res.err,
        className: "text-red-400",
      });
    } else {
      toast({
        title: "Add Post",
        description: "Post submitted successfully",
      });
    }
    console.log(res);
  };

  const onInvalid = (v: any) => {
    if (!v) {
      return;
    }

    const keys = Object.keys(v);
    toast({
      title: "Add Post",
      description: v[keys[0]].message,
      className: "text-red-400",
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[200px] capitalize">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="capitalize">
                        <SelectLabel>{field.name}</SelectLabel>
                        {Object.values(ALL_CATEGORIES).map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Short Summary..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    onChange={(e) => {
                      field.onChange(e);
                      const file = e.target.files?.[0];
                      setImage(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor description={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AddBlogPage;
