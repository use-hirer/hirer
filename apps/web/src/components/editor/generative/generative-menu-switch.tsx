import { Button } from "@hirer/ui/button";
import { Editor } from "@tiptap/react";
import { Fragment, useEffect, type ReactNode } from "react";
import Magic from "../icons/magic";
import { removeAIHighlight } from "./ai-highlight";
import { AISelector } from "./ai-selector";
import EditorBubble from "./editor-bubble";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
  editor,
}: GenerativeMenuSwitchProps) => {
  useEffect(() => {
    if (!open) removeAIHighlight(editor);
  }, [editor, open]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && (
        <AISelector open={open} onOpenChange={onOpenChange} editor={editor} />
      )}
      {!open && (
        <Fragment>
          <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
