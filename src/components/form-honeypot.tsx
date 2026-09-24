// Hidden spam trap: bots fill every input, people never see this one.
// /api/forms silently drops any submission where it has a value.
export function FormHoneypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
