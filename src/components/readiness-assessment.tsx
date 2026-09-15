"use client";

import { useState } from "react";
import Link from "next/link";

const yesNoQuestions = [
  "Is your business registered as a legal entity?",
  "Are you registered in SAM.gov?",
  "Do you have a CAGE Code?",
  "Have you bid on a government contract before?",
  "Do you currently manufacture the product(s) you want to sell?",
  "Do you currently sell your product(s) commercially?",
];

const goalOptions = [
  "Win Contracts",
  "Find Opportunities",
  "Packaging Support",
  "Manufacturing Partnership",
  "Government Expansion",
];

type Result = "Beginner" | "Developing" | "Ready" | "Advanced";

function scoreToResult(score: number): Result {
  if (score <= 1) return "Beginner";
  if (score <= 3) return "Developing";
  if (score <= 5) return "Ready";
  return "Advanced";
}

const resultCopy: Record<Result, string> = {
  Beginner:
    "You're at the earliest stage of government contracting. Start with entity setup, SAM registration, and a CAGE Code before pursuing bids.",
  Developing:
    "You have some foundational pieces in place. Focus on building your first government track record and packaging/compliance readiness.",
  Ready:
    "You have the core requirements in place. You're positioned to actively pursue contracts with the right packaging and compliance support.",
  Advanced:
    "You have significant government contracting experience. A Strategic Growth Retainer can help you scale further.",
};

export function ReadinessAssessment() {
  const [answers, setAnswers] = useState<boolean[]>(Array(yesNoQuestions.length).fill(false));
  const [answered, setAnswered] = useState<boolean[]>(Array(yesNoQuestions.length).fill(false));
  const [goal, setGoal] = useState<string>(goalOptions[0]);
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answered.every(Boolean);
  const score = answers.filter(Boolean).length;
  const result = scoreToResult(score);

  if (submitted) {
    return (
      <div className="rounded-lg border border-milpaq-olive bg-milpaq-tan-light p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-milpaq-olive">
          Your Result
        </p>
        <h3 className="font-display mt-2 text-2xl font-bold text-milpaq-dark">{result}</h3>
        <p className="mt-3 text-milpaq-dark/80">{resultCopy[result]}</p>
        <p className="mt-3 text-sm text-milpaq-dark/70">Primary goal: {goal}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/services/strategic-growth-retainer#book"
            className="rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark"
          >
            Book Consultation
          </Link>
          <Link
            href="/resource-store"
            className="rounded-md border border-milpaq-olive px-6 py-3 text-sm font-semibold text-milpaq-dark hover:bg-milpaq-tan"
          >
            Download Resource
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-milpaq-tan bg-white p-8">
      <div className="space-y-6">
        {yesNoQuestions.map((question, index) => (
          <div key={question}>
            <p className="text-sm font-medium text-milpaq-dark">
              {index + 1}. {question}
            </p>
            <div className="mt-2 flex gap-3">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => {
                    const nextAnswers = [...answers];
                    nextAnswers[index] = value;
                    const nextAnswered = [...answered];
                    nextAnswered[index] = true;
                    setAnswers(nextAnswers);
                    setAnswered(nextAnswered);
                  }}
                  className={`rounded-md border px-4 py-1.5 text-sm font-medium ${
                    answered[index] && answers[index] === value
                      ? "border-milpaq-olive bg-milpaq-olive text-white"
                      : "border-milpaq-tan text-milpaq-dark hover:bg-milpaq-tan-light"
                  }`}
                >
                  {value ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="text-sm font-medium text-milpaq-dark">7. What is your primary goal?</p>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-2 rounded-md border border-milpaq-tan px-3 py-2 text-sm"
          >
            {goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className="mt-8 w-full rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        See My Result
      </button>
    </div>
  );
}
