import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkMinusIcon, BookmarkPlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TextCardProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  saved?: boolean;
}

interface ImageCardProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  saved?: boolean;
}

export default function MyCard(props: Partial<TextCardProps & ImageCardProps>) {
  const handleSave = () => {
    const savedCards = JSON.parse(localStorage.getItem("savedCards") || "[]");

    if (
      savedCards.find(
        (card: TextCardProps & ImageCardProps) => card.title === props.title
      )
    ) {
      toast.warning("Post Already Saved!", {
        description: props.title,
      });
      return;
    }
    savedCards.push(props);
    localStorage.setItem("savedCards", JSON.stringify(savedCards));
    toast.success("Post Saved!", {
      description: props.title,
      action: {
        label: "View Saved ",
        onClick: () => {
          window.location.href = "/saved";
        },
      },
    });
  };

  const handleDelete = () => {
    const savedCards = JSON.parse(localStorage.getItem("savedCards") || "[]");

    toast.info("Removing Post...", {
      description: "Dismiss to cancel",
      onAutoClose: () => {
        const newSavedCards = savedCards.filter(
          (card: TextCardProps & ImageCardProps) => card.title !== props.title
        );
        localStorage.setItem("savedCards", JSON.stringify(newSavedCards));
        toast.success("Post Removed!", {
          description: props.title,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      onDismiss: () => {
        toast.info("Removal Cancelled!");
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {props.thumbnailUrl && handleImage(props as ImageCardProps)}
        {props.body && handleText(props as TextCardProps)}
      </CardContent>
      <CardFooter>
        {props.saved ? (
          <Button variant={"outline"} className="w-full" onClick={handleDelete}>
            <BookmarkMinusIcon className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant={"outline"} className="w-full" onClick={handleSave}>
            <BookmarkPlusIcon className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function handleImage({ id, albumId, title, thumbnailUrl }: ImageCardProps) {
  if (!thumbnailUrl) {
    return null;
  }
  return (
    <div className="aspect-[16/9] w-full overflow-hidden">
      <div className="p-4 flex-1 grid gap-2">
        <Image
          alt={title}
          about={id.toString() + "-" + albumId.toString()}
          className="flex flex-auto pb-2 object-cover "
          height={225}
          src={thumbnailUrl}
          priority
          width={400}
        />
      </div>
    </div>
  );
}

function handleText({ body }: TextCardProps) {
  if (!body) {
    return null;
  }

  return (
    <div className="p-4 flex-1 grid gap-2">
      <p className="text-sm text-muted-foreground dark:text-muted-foreground-contrast">
        {body}
      </p>
    </div>
  );
}
