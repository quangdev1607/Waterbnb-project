// import { createDescription } from "@/app/actions";
import { createDescription } from "@/app/_actions/home";
import Counter from "@/app/_components/Counter";
import CreationBottomBar from "@/app/_components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h1>
      </div>

      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto mb-36 mt-10 flex w-3/5 flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              required
              id="title"
              name="title"
              placeholder="short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="description your home here..."
              name="description"
              required
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
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" required id="image" name="image" />
          </div>
          <Card>
            <CardHeader className="flex select-none flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold underline">Guests</h2>
                  <p className="text-sm italic text-muted-foreground ">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold underline">Rooms</h2>
                  <p className="text-sm italic text-muted-foreground ">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold underline">Bathrooms</h2>
                  <p className="text-sm italic text-muted-foreground ">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
