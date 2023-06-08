import { Editor } from "slate";
import { CustomEditor } from "../Elements";

export class Bool {
  static bold(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });
    return Boolean(!!match);
  }
  static code(editor: CustomEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
      universal: true,
    });
    return Boolean(!!match);
  }
  static ast(editor: CustomEditor) {
    const change = editor.operations.some(function (operation) {
      return operation.type !== "set_selection";
    });
    return change;
  }
}
