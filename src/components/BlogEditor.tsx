"use client";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import blogSchemaClient from "@/lib/utils/validators/blogPostValidator";
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
import Editor, { EditorRef } from "./editor";
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
import { deleteImageById, uploadImage } from "@/lib/services/server/utils";
import usePreventNavigation from "@/hooks/use-prevent-navigation";

type Props<R> = {
  submitAction: (data: BlogEditorType) => Promise<AppResponseType<R | null>>;
  defaultValues: BlogEditorType;
  onSuccess?: (res: AppResponseType<R>) => void;
  onFail?: (res: AppResponseType<null>) => void;
};

function BlogEditor<R>({
  defaultValues,
  submitAction,
  onSuccess,
  onFail,
}: Props<R>) {
  const { toast } = useToast();
  const editorRef = useRef<EditorRef | null>(null);
  usePreventNavigation();
  const imgPreviewRef = useRef<IRef | null>(null);
  const form = useForm<z.infer<typeof blogSchemaClient>>({
    resolver: zodResolver(blogSchemaClient),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      image: "",
      descImgsIds: defaultValues.descImgsIds,
    },
  });
  const { isSubmitting } = form.formState;
  const saveToLocal = () => {
    console.log("i am saved");
  };
  const onSubmit = async (v: z.infer<typeof blogSchemaClient>) => {
    const image = imgPreviewRef.current!.imgPreview.img;
    let imgUrl = defaultValues.image;
    let imgPubId = defaultValues.imagePubId;

    if (!image && !defaultValues.image) {
      form.setError(
        "image",
        { message: "Invalid image file", type: "required" },
        { shouldFocus: true }
      );
      return;
    }
    toast({
      title: "Submit Post",
      description: "Post submittion in progress...",
    });

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
      // upload image
      const fd = new FormData();
      fd.append("image", image);
      const imgRes = await uploadImage(fd, "image");
      if (imgRes.err) {
        toast({
          title: "Submit Post",
          description: "Something went wrong while uploading thumbnail image",
          className: "text-red-400",
        });
        console.log(imgRes.err);
        return;
      }
      // set img url and add to pubId
      const { url, pubId } = imgRes.data!;
      imgUrl = url;
      imgPubId = pubId;
    }
    // add desc imgs ids
    const descImgsIds: string[] = [];
    editorRef.current!.traverser((node) => {
      if (node.type.name === "image" && node.attrs["pubId"]) {
        descImgsIds.push(node.attrs["pubId"]);
      }
    })();

    const res = await submitAction({
      ...v,
      descImgsIds,
      image: imgUrl,
      imagePubId: imgPubId,
    });
    if (res.err) {
      toast({
        title: "Submit Post",
        description: res.err,
        className: "text-red-400",
      });
      if (onFail) {
        onFail(res as AppResponseType<null>);
      }
      return;
    } else {
      toast({
        title: "Submit Post",
        description: "Post submitted successfully",
      });
      // delete all the pubImgIds that are uploaded but deleted by user
      const idsToBeDeleted = editorRef.current?.imgPubIds.filter(
        (i) => !descImgsIds.includes(i)
      );
      idsToBeDeleted?.map((id) => deleteImageById(id));

      if (onSuccess) {
        onSuccess(res as AppResponseType<R>);
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
                      imgPreviewRef.current?.imgPreview.setImg(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImagePreview
            image={imgPreviewRef.current?.imgPreview.img || defaultValues.image}
            ref={imgPreviewRef}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    description={field.value}
                    onChange={field.onChange}
                    ref={editorRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              disabled={isSubmitting}
              type="button"
              onClick={saveToLocal}
              variant="outline"
            >
              Save to Local
            </Button>
            <Button disabled={isSubmitting} className="w-20">
              {isSubmitting ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

type IProps = {
  image?: File | string | undefined;
};
type IRef = {
  imgPreview: ReturnType<typeof useImagePreview>;
};
const ImagePreview = forwardRef(({ image }: IProps, ref: Ref<IRef>) => {
  const data = useImagePreview(image);
  const { isLoading, url } = data;
  useImperativeHandle(ref, () => ({ imgPreview: data }));
  const ImageComp = (
    props: ComponentPropsWithoutRef<"img"> & { src: string }
  ) => (
    //@ts-expect-error
    <Image
      {...props}
      sizes="700px"
      fill
      alt="preview-image"
      className="object-contain transition hover:scale-105"
    />
  );
  return (
    <div
      className={
        "relative  aspect-video w-80 rounded-sm mx-auto border flex justify-center items-center overflow-hidden"
      }
    >
      {isLoading ? (
        <>Loading....</>
      ) : !image ? (
        <>No Preview</>
      ) : typeof image == "string" ? (
        <ImageComp src={url!} />
      ) : (
        <ImageComp src={url!} />
      )}
    </div>
  );
});

export default BlogEditor;
