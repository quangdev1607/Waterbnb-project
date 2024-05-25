import { createCategory } from "@/app/_actions/home";
import CreationBottomBar from "@/app/_components/CreationBottomBar";
import { SelectedCategory } from "@/app/_components/SelectedCategory";

export default function StructurePage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mx-auto w-3/5">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your home?
        </h2>
      </div>
      <form action={createCategory}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
