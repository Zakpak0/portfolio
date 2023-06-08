import { CustomEditor } from "components/v1/Cms/TextEditor/Elements";
import { Toggle } from "components/v1/Cms/TextEditor/EventHandler/toggle";
export class CtrlEvents {
  static "`" = Toggle.code;
  static b = Toggle.bold;
}
export const KeyDownEvents = function (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: CustomEditor
) {
  if (event.ctrlKey) {
    const handle = CtrlEvents?.[event?.key as keyof typeof CtrlEvents] as (
      editor: CustomEditor
    ) => void;
    if (handle) {
      event.preventDefault();
      handle(editor);
    }
  }
};
