import { getHomeDetail } from "@/app/_actions/home";
import { EditForm } from "@/app/_components/EditPage";
import { unstable_noStore as noStore } from "next/cache";

export default async function EditHomePage({
  params: { id },
}: {
  params: { id: string };
}) {
  noStore();
  const product = await getHomeDetail(id);

  return (
    <>
      <div className="mx-auto mt-4 w-3/5">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Edit your home here
        </h1>
        <EditForm product={product} />
      </div>
    </>
  );
}
