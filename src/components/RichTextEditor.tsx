// in components/RichTextEditor.tsx

"use client";

import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from '@tiptap/extension-character-count';
import { Bold, Italic, Strikethrough } from "lucide-react";
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
		</div>
	);
};

interface TipTapEditorProps {
	onChange: (richText: string) => void;
	content: string;
	limit: number;
}

export const TiptapEditor = ({ onChange, content, limit }: TipTapEditorProps) => {
	// The "Brain"
	const editor = useEditor({
		extensions: [StarterKit.configure(), CharacterCount.configure({limit})],
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
