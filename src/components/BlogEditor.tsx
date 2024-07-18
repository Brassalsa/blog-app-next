"use client";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Editor from "./editor";
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
} from "./ui/select";
import { AppResponseType, BlogEditorType } from "@/types";
import Image from "next/image";
import { useImagePreview } from "@/hooks/image-preview";
import { validateImageFile } from "@/lib/utils/validators/image";
import { FileConfig } from "@/lib/config/files";

type Props = {
  submitAction: (formData: FormData) => Promise<AppResponseType<any>>;
  defaultValues: BlogEditorType;
  afterSubmit?: () => void;
};

function BlogEditor({ defaultValues, submitAction, afterSubmit }: Props) {
  const { toast } = useToast();
  const [image, setImage] = useState<File>();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    mode: "onChange",
    defaultValues: { ...defaultValues, image: "" },
  });

  const onSubmit = async (v: z.infer<typeof blogSchema>) => {
    const formData = new FormData();

    const keys = Object.keys(v);

    for (let i of keys) {
      if (i !== "image") {
        formData.append(i, v[i as keyof typeof v]);
        continue;
      }

      // if image and defaultValues.image are null
      if (!image && !defaultValues.image) {
        form.setError(
          "image",
          { message: "Invalid image file", type: "required" },
          { shouldFocus: true }
        );
        return;
      }

      // validate image if exists
      if (image && image instanceof File) {
        if (!validateImageFile(image)) {
          form.setError(
            "image",
            {
              message: `Invalid image file or file size is greater then ${FileConfig.maxSize}MB`,
              type: "maxLength",
            },
            { shouldFocus: true }
          );

          return;
        }
        formData.append("image", image);
      }

      // if image is null
      if (!image) {
        formData.append("image", defaultValues.image);
      }
    }

    toast({
      title: "Submit Post",
      description: "Post submittion in progress...",
    });

    const res = await submitAction(formData);
    if (res.err) {
      toast({
        title: "Submit Post",
        description: res.err,
        className: "text-red-400",
      });
    } else {
      toast({
        title: "Submit Post",
        description: "Post submitted successfully",
      });

      if (afterSubmit) {
        afterSubmit();
      }
    }
  };

  const onInvalid = (v: any) => {
    if (!v) {
      return;
    }

    const keys = Object.keys(v);
    toast({
      title: "Submit Post",
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
              <FormItem className="flex gap-3 flex-wrap items-center">
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
          <ImagePreview image={image || defaultValues.image} />
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

type IProps = {
  image?: File | string | undefined;
};
const ImagePreview = ({ image }: IProps) => {
  const imgData = useImagePreview(image);
  return (
    <div
      className={
        "relative  aspect-video w-80 rounded-sm mx-auto border flex justify-center items-center overflow-hidden"
      }
    >
      {!image && <>No Preview</>}
      {image && typeof image == "string" && (
        <Image
          src={image}
          sizes="700px"
          fill
          alt="preview-image"
          className="object-contain transition hover:scale-105"
        />
      )}

      {image && typeof image === "object" && (
        <Image
          src={imgData}
          sizes="700px"
          fill
          alt="preview-image"
          className="object-contain transition hover:scale-105"
        />
      )}
    </div>
  );
};

export default BlogEditor;
