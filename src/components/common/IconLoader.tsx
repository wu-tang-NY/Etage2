"use client";

// Load icons synchronously at module level to ensure they're available before components render
// Import icons directly to ensure they're loaded synchronously when this module is imported
import "@/lib/icons";

// Component to ensure icons are loaded (no-op, icons are loaded at module level)
export default function IconLoader() {
  return null;
}
