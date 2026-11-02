import { Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ExpandablePhoto({ src, alt, title }: { src: string; alt: string; title: string }) {
  return <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="photo-trigger" aria-label={`Enlarge ${title} photo`} title={`Enlarge ${title} photo`}>
        <img src={src} alt={alt} />
        <span className="photo-expand"><Expand size={16} /></span>
      </Button>
    </DialogTrigger>
    <DialogContent className="photo-viewer">
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription className="sr-only">Enlarged view of {alt}</DialogDescription>
      <img className="photo-viewer-image" src={src} alt={alt} />
    </DialogContent>
  </Dialog>;
}