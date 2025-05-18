"use client";

import { toast } from "sonner";

export function Toast({ message }: { message: string }) {
  toast.dismiss();
  toast.success(message);
  return <></>;
}
