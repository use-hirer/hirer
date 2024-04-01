import { CommandGroup, CommandItem, CommandSeparator } from "@hirer/ui/command";
import {
  ArrowClockwise,
  Checks,
  SkipForward,
  TrendDown,
  TrendUp,
} from "@phosphor-icons/react";
import { Editor } from "@tiptap/react";

const options = [
  {
    value: "improve",
    label: "Improve writing",
    icon: ArrowClockwise,
  },

  {
    value: "fix",
    label: "Fix grammar",
    icon: Checks,
  },
  {
    value: "shorter",
    label: "Make shorter",
    icon: TrendDown,
  },
  {
    value: "longer",
    label: "Make longer",
    icon: TrendUp,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
  editor: Editor;
}

const AISelectorCommands = ({ onSelect, editor }: AISelectorCommandsProps) => {
  return (
    <>
      <CommandGroup heading="Edit or review selection">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            const text = editor.storage.markdown.getMarkdown();
            onSelect(text, "continue");
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <SkipForward className="h-4 w-4 text-purple-500" />
          Continue writing
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
