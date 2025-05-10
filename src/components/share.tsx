"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CopyButton from "./copy-button";
import { Share } from "lucide-react";

export function ShareButton() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Share />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this snippet</DialogTitle>
          <DialogDescription>
            Copy the link below to share this snippet with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input type="text" value={currentUrl} readOnly className="input" />
          <CopyButton value={currentUrl} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
