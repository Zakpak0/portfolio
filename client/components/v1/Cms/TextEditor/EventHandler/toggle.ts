import {
  CustomEditor,
  CustomElement,
} from "components/v1/Cms/TextEditor/Elements";
import { Bool } from "components/v1/Cms/TextEditor/EventHandler/bool";
import { Editor, Transforms } from "slate";

export class Toggle {
  static bold(editor: CustomEditor) {
    Transforms.setNodes(
      editor,
      { bold: Bool.bold(editor) ? undefined : true },
      { split: true }
    );
  }
  static code(editor: CustomEditor) {
    Transforms.setNodes(
      editor,
      { type: Bool.code(editor) ? undefined : "code" },
      { match: (n) => Editor.isBlock(editor, n as CustomElement) }
    );
  }
}
