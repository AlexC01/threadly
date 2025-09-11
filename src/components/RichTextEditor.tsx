// in components/RichTextEditor.tsx

"use client";

import CharacterCount from "@tiptap/extension-character-count";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	Bold,
	Code,
	Italic,
	List,
	ListOrdered,
	SquareTerminal,
	Strikethrough,
	TextQuote,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface ToolbarProps {
	editor: Editor | null;
}

// The "Controls"
const Toolbar = ({ editor }: ToolbarProps) => {
	if (!editor) {
		return null;
	}
	return (
		<div className="border border-input bg-transparent rounded-md p-1 flex gap-1">
			<Toggle
				size="sm"
				className="cursor-pointer"
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("strike")}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("code")}
				onPressedChange={() => editor.chain().focus().toggleCode().run()}
			>
				<Code className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("codeBlock")}
				onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<SquareTerminal />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("heading", { level: 1 })}
				onPressedChange={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
			>
				H1
			</Toggle>{" "}
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("heading", { level: 2 })}
				onPressedChange={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
			>
				H2
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("heading", { level: 3 })}
				onPressedChange={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
			>
				H3
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("heading", { level: 4 })}
				onPressedChange={() =>
					editor.chain().focus().toggleHeading({ level: 4 }).run()
				}
			>
				H4
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
			<Toggle
				className="cursor-pointer"
				size="sm"
				pressed={editor.isActive("blockquote")}
				onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<TextQuote className="h-4 w-4" />
			</Toggle>
		</div>
	);
};

interface TipTapEditorProps {
	onChange: (richText: string) => void;
	content: string;
	limit: number;
}

export const TiptapEditor = ({
	onChange,
	content,
	limit,
}: TipTapEditorProps) => {
	// The "Brain"
	const editor = useEditor({
		extensions: [StarterKit.configure(), CharacterCount.configure({ limit })],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "rounded-md border min-h-[150px] border-input bg-background p-4",
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
		content: content,
	});

	return (
		<div className="flex flex-col gap-2">
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};
