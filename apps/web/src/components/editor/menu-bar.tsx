"use client";

import { cn } from "@hirer/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import {
  ArrowUUpLeft,
  ArrowUUpRight,
  Code,
  CodeBlock,
  Highlighter,
  Icon,
  KeyReturn,
  ListBullets,
  ListNumbers,
  Minus,
  Paragraph,
  Quotes,
  TextB,
  TextHOne,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextTSlash,
} from "@phosphor-icons/react";
import { Editor } from "@tiptap/react";
import { Fragment, createElement } from "react";

interface MenuItemProps {
  icon?: Icon;
  title?: string;
  action?: any;
  isActive?: any;
  type?: string;
}

const MenuItem = ({
  icon,
  title,
  action,
  isActive = null,
  type,
}: MenuItemProps) => {
  if (type === "divider") {
    return <div className="bg-white h-5 ml-2 mr-3 w-px opacity-25" />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            type="button"
            className={cn([
              "bg-transparent border-none rounded-md flex items-center justify-center text-white cursor-pointer h-7 mr-1 p-1 w-7",
              "hover:bg-[#303030]",
              isActive && isActive() ? "bg-[#303030]" : "",
            ])}
            onClick={action}
            title={title}
          >
            {icon && createElement(icon)}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div>{title}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface MenuBarProps {
  editor: Editor;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const items = [
    {
      icon: TextB,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: TextItalic,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: TextStrikethrough,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: Code,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: Highlighter,
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: TextHOne,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: TextHTwo,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Paragraph,
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: ListBullets,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: ListNumbers,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: CodeBlock,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: Quotes,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: Minus,
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "divider",
    },
    {
      icon: KeyReturn,
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: TextTSlash,
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    {
      icon: ArrowUUpLeft,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: ArrowUUpRight,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex items-center bg-gray-900 border-b-3 rounded-t-md flex-none flex-wrap p-1">
      {items.map((item, index) => (
        <Fragment key={index}>
          <MenuItem {...item} />
        </Fragment>
      ))}
    </div>
  );
};

export default MenuBar;
