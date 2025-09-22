import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const MenuButton = ({ onClick, isActive, children }: any) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <div className="flex items-center gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          >
            <ListOrdered className="h-4 w-4" />
          </MenuButton>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
          >
            <AlignLeft className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
          >
            <AlignCenter className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
          >
            <AlignRight className="h-4 w-4" />
          </MenuButton>
        </div>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[150px] prose max-w-none" />
    </div>
  );
};

export default RichTextEditor;