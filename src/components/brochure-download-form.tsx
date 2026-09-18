"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconDownload } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const BROCHURE_URL = "/downloads/milpaq-brochure.pdf";

export function BrochureDownloadForm({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (submitted) {
      downloadLinkRef.current?.click();
    }
  }, [submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSubmitted(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={
          triggerClassName ??
          "flex w-full items-center justify-center gap-2 rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
        }
      >
        <IconDownload className="h-4 w-4 stroke-current fill-none" />
        Download the MILPAQ Brochure
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-lg border border-milpaq-tan bg-white p-6 text-milpaq-dark ring-0 sm:max-w-md">
        {submitted ? (
          <div className="py-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-milpaq-olive text-white">
              <IconDownload className="h-6 w-6 stroke-current fill-none" />
            </div>
            <h3 className="font-display mt-4 text-xl font-semibold text-milpaq-dark">Your download is starting</h3>
            <p className="mt-2 text-sm text-milpaq-dark/80">
              If it doesn&apos;t start automatically, use the link below.
            </p>
            <a
              ref={downloadLinkRef}
              href={BROCHURE_URL}
              download
              className="mt-5 inline-block rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
            >
              Download the MILPAQ Brochure
            </a>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-milpaq-dark">
                Download the MILPAQ Brochure
              </DialogTitle>
              <DialogDescription className="text-milpaq-dark/70">
                Tell us a bit about you and the download will start right away.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-2 space-y-4">
              <label className="block text-sm font-medium text-milpaq-dark">
                Full Name <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium text-milpaq-dark">
                Company Name <span className="text-red-600">*</span>
                <input
                  type="text"
                  name="company"
                  required
                  className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium text-milpaq-dark">
                Email <span className="text-red-600">*</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-medium text-milpaq-dark">
                Phone <span className="text-red-600">*</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
                />
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
              >
                <IconDownload className="h-4 w-4 stroke-current fill-none" />
                Download Brochure
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
