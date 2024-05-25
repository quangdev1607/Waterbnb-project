import { FileQuestion } from "lucide-react";
type iAppProps = {
  title: string;
  description: string;
};

export default function NoItems({ title, description }: iAppProps) {
  return (
    <div className="mt-10 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <span className="mt-6 text-xl font-bold">{title}</span>
      <span className="mt-2 text-sm font-normal italic text-muted-foreground">
        {description}
      </span>
    </div>
  );
}
