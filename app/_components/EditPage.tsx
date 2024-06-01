// import { createDescription } from "@/app/actions";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { updateHome } from "../_actions/home";
import { CategoryBox } from "./CategoryBox";
import { UpdateHomeSubmitBtn } from "./CreationSubmit";

export function EditForm({ product }: { product: AdvancedHome | null }) {
  return (
    <>
      <form action={updateHome}>
        <input type="hidden" name="homeId" value={product?.id} />
        <input
          type="hidden"
          name="previousImg"
          value={product?.photo as string}
        />
        <div className="mx-auto mb-36 mt-10 flex w-3/5 flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              required
              id="title"
              name="title"
              placeholder="short and simple..."
              defaultValue={product?.title as string}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="description your home here..."
              name="description"
              required
              defaultValue={product?.description as string}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              required
              id="price"
              name="price"
              placeholder="price per night in USD"
              min={0}
              defaultValue={product?.price as number}
            />
          </div>

          <div className="flex items-center justify-between gap-x-6">
            <div className="flex items-center gap-x-2">
              <Label htmlFor="guests">Guests:</Label>
              <Input
                type="number"
                required
                id="guests"
                name="guests"
                min={0}
                max={30}
                defaultValue={product?.guests as string}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Label htmlFor="guests">Bedrooms:</Label>
              <Input
                type="number"
                required
                id="bedrooms"
                name="bedrooms"
                min={0}
                max={10}
                defaultValue={product?.bedrooms as string}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Label htmlFor="bathrooms">Bathrooms:</Label>
              <Input
                type="number"
                required
                id="bathrooms"
                name="bathrooms"
                min={0}
                max={10}
                defaultValue={product?.bathrooms as string}
              />
            </div>
          </div>
          <CategoryBox categoryName={product?.category_name as string} />
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" />
          </div>
          <div className="flex items-center justify-between">
            <Button variant={"destructive"} size={"default"} asChild>
              <Link href={"/my-list"}>Cancel</Link>
            </Button>
            <UpdateHomeSubmitBtn />
          </div>
        </div>
      </form>
    </>
  );
}
