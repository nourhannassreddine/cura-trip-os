import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  back?: string;
  eyebrow?: string;
  title?: string;
  right?: React.ReactNode;
  className?: string;
}

export const TopBar = ({ back, eyebrow, title, right, className }: Props) => {
  return (
    <header className={cn("flex items-center justify-between px-5 pt-4 pb-3", className)}>
      <div className="flex items-center gap-3 min-w-0">
        {back ? (
          <Link to={back} aria-label="Back" className="-ml-1 p-1 hover:opacity-70">
            <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          </Link>
        ) : (
          <div className="font-serif text-xl tracking-tight">CURA</div>
        )}
        <div className="min-w-0">
          {eyebrow && <div className="editorial-eyebrow text-muted-foreground">{eyebrow}</div>}
          {title && <h1 className="font-serif text-lg leading-none truncate">{title}</h1>}
        </div>
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
};
