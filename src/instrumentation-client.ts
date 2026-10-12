// Runs once in the browser before the app starts (Next.js file convention).
// Records UTM / ad-click attribution from the landing URL for form submissions.
import { captureAttribution } from "@/lib/attribution";

captureAttribution();
