"use client";

import { useState, type FormEvent } from "react";
import { packagingCodeCategories, nonTabularFields } from "@/lib/packaging-code-data";

type Result = {
  key: string;
  label: string;
  tableRef: string;
  code: string;
  description: string | null;
  options?: string[];
  notes?: string[];
};

function splitSentences(text: string): string[] {
  const sentences = text.split(/(?<=[a-z0-9)]{2}[.!?])\s+(?=[A-Z])/);
  return sentences.length > 1 ? sentences : [text];
}

function EntryDetail({
  description,
  options,
  notes,
}: {
  description: string;
  options?: string[];
  notes?: string[];
}) {
  const sentences = splitSentences(description);

  return (
    <>
      <div className="space-y-2">
        {sentences.map((sentence, index) => (
          <p key={index} className="text-sm leading-relaxed text-milpaq-dark/80">
            {sentence}
          </p>
        ))}
      </div>
      {options && (
        <ol className="mt-2 space-y-1.5 text-sm leading-relaxed text-milpaq-dark/80">
          {options.map((option, index) => (
            <li key={index} className="flex gap-2">
              <span className="shrink-0 font-semibold text-milpaq-olive">
                {String.fromCharCode(97 + index)}.
              </span>
              <span>{option}</span>
            </li>
          ))}
        </ol>
      )}
      {notes && (
        <div className="mt-3 space-y-1 border-t border-milpaq-border/70 pt-3">
          {notes.map((note, index) => (
            <p key={index} className="text-xs leading-relaxed text-milpaq-dark/60">
              {note}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export function PackagingCodeLookup() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Result[] | null>(null);

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const next: Result[] = [];
    for (const category of packagingCodeCategories) {
      const raw = values[category.key]?.trim();
      if (!raw) continue;
      const match = category.entries.find(
        (entry) => entry.code.toLowerCase() === raw.toLowerCase()
      );
      next.push({
        key: category.key,
        label: category.label,
        tableRef: category.tableRef,
        code: raw,
        description: match ? match.description : null,
        options: match?.options,
        notes: match?.notes,
      });
    }
    setResults(next);
  }

  function handleReset() {
    setValues({});
    setResults(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-milpaq-tan bg-white p-6 sm:p-8"
      >
        <div>
          <h3 className="font-display text-lg font-semibold text-milpaq-dark">
            Enter Packaging Codes
          </h3>
          <p className="mt-1 text-sm text-milpaq-dark/70">
            Enter the codes shown on your contract or packaging specification, then get the
            decoded requirement for each. Leave fields blank if not applicable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {packagingCodeCategories.map((category) => (
            <label key={category.key} className="block text-sm font-medium text-milpaq-dark">
              {category.label}
              <input
                type="text"
                value={values[category.key] ?? ""}
                onChange={(e) => handleChange(category.key, e.target.value)}
                placeholder={category.placeholder}
                className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal uppercase placeholder:normal-case placeholder:text-milpaq-dark/40"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
          >
            Get Packaging Data
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-milpaq-tan px-6 py-3 text-sm font-semibold text-milpaq-dark hover:bg-milpaq-tan-light"
          >
            Clear
          </button>
        </div>

        {results && (
          <div className="space-y-3 border-t border-milpaq-border pt-6">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-milpaq-sage">
              Results
            </h4>
            {results.length === 0 ? (
              <p className="text-sm text-milpaq-dark/70">
                Enter at least one code above, then select Get Packaging Data.
              </p>
            ) : (
              <ul className="space-y-3">
                {results.map((result) => (
                  <li
                    key={result.key}
                    className="rounded-md border border-milpaq-border bg-milpaq-cream p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
                      {result.label} - Code {result.code.toUpperCase()}
                    </p>
                    {result.description ? (
                      <div className="mt-2">
                        <EntryDetail
                          description={result.description}
                          options={result.options}
                          notes={result.notes}
                        />
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-red-700">
                        Code not recognized in {result.tableRef}. Double-check the code or
                        contact MILPAQ for interpretation.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </form>

      <aside className="space-y-4">
        <div className="rounded-lg border border-milpaq-tan bg-milpaq-tan-light p-6">
          <h3 className="font-display text-lg font-semibold text-milpaq-dark">
            Don&apos;t know your code?
          </h3>
          <p className="mt-2 text-sm text-milpaq-dark/70">
            Browse the full reference tables below to look up a code by category.
          </p>
        </div>

        <div className="max-h-[36rem] space-y-2 overflow-y-auto rounded-lg border border-milpaq-tan bg-white p-4">
          {packagingCodeCategories.map((category) => (
            <details key={category.key} className="rounded-md border border-milpaq-border p-3">
              <summary className="cursor-pointer text-sm font-medium text-milpaq-dark">
                {category.label}{" "}
                <span className="text-xs font-normal text-milpaq-dark/50">
                  ({category.tableRef})
                </span>
              </summary>
              <ul className="mt-2 space-y-4 border-t border-milpaq-border pt-2">
                {category.entries.map((entry) => (
                  <li key={entry.code} className="text-xs leading-relaxed text-milpaq-dark/70">
                    <span className="font-semibold text-milpaq-dark">{entry.code}</span>
                    <div className="mt-1 space-y-1.5">
                      {splitSentences(entry.description).map((sentence, index) => (
                        <p key={index}>{sentence}</p>
                      ))}
                    </div>
                    {entry.options && (
                      <ol className="mt-1.5 space-y-1 pl-4">
                        {entry.options.map((option, index) => (
                          <li key={index} className="flex gap-1.5">
                            <span className="shrink-0 font-semibold text-milpaq-olive">
                              {String.fromCharCode(97 + index)}.
                            </span>
                            <span>{option}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}

          <div className="rounded-md border border-milpaq-border bg-milpaq-cream p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-milpaq-sage">
              Contract-specific fields
            </p>
            <ul className="mt-2 space-y-2">
              {nonTabularFields.map((field) => (
                <li key={field.key} className="text-xs text-milpaq-dark/70">
                  <span className="font-semibold text-milpaq-dark">{field.label}</span>
                  {" - "}
                  {field.note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
