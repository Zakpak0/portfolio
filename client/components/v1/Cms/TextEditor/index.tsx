// Import React dependencies.
import { ChildComponent } from "components/v1/types";
import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import { BaseEditor, Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";

// Import the Slate components and React plugin.
import { CustomEditor, CustomElement, CustomText, RenderElement, RenderLeaf } from "components/v1/Cms/TextEditor/Elements";
import { KeyDownEvents } from "components/v1/Cms/TextEditor/EventHandler/keydown";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { OnChangeEvents } from "./EventHandler/onchange";


declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]
export interface TextEditorProps extends ChildComponent {

}


export const TextEditor = function ({ mq: { enumX, enumCss } }: TextEditorProps) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact<CustomEditor>(withHistory(createEditor() as CustomEditor)));
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    return KeyDownEvents(event, editor)
  }
  function onChange(value: Descendant[]) {
    return OnChangeEvents(value, editor)
  }
  const element = useCallback(RenderElement, [])
  const leaf = useCallback(RenderLeaf, [])
  // Render the Slate context.
  return (
    <Slate
      editor={editor}
      onChange={onChange}
      initialValue={initialValue}>
      <Editable
        renderElement={element}
        renderLeaf={leaf}
        onKeyDown={onKeyDown}
        style={{
          height: enumCss({ mobile: "300px", tablet: "300px", web: "300px", tv: "300px" }),
          width: enumCss({ mobile: "100%", tablet: "100%", web: "100%", tv: "100%" }),
          border: enumCss({ mobile: "1px solid black", tablet: "1px solid black", web: "1px solid black", tv: "1px solid black" }),
        }}
      />
    </Slate>
  )
}
