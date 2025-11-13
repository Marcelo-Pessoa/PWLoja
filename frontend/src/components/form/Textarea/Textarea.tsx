import { Textarea as FBTextarea, HelperText, Label } from "flowbite-react";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (s: string) => void;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string;
}

function Textarea({
  name,
  value,
  label,
  onChange,
  placeholder,
  rows,
  error,
}: TextInputProps) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={name} color={error ? "failure" : "default"}>
          {label}
        </Label>
      </div>
      <FBTextarea
        id={name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder ?? ""}
        rows={rows ?? 4}
        color={error ? "failure" : "default"}
        shadow
      />
      {error && <HelperText color="failure">{error}</HelperText>}
    </div>
  );
}

export default Textarea;
