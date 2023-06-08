import { CustomEditor } from "components/v1/Cms/TextEditor/Elements";
import { Bool } from "components/v1/Cms/TextEditor/EventHandler/bool";
import { Descendant } from "slate";

export function Ats(editor: CustomEditor, value: Descendant[]) {
  if (Bool.ast(editor)) {
    const content = JSON.stringify(value);
    localStorage.setItem("content", content);
  }
}

export const OnChangeEvents = function (
  value: Descendant[],
  editor: CustomEditor
) {
  Ats(editor, value);
};
