import { MediaQueryHook } from "lib/v1/Theme";

export interface ChildComponent {
  mq: MediaQueryHook;
  dict: Record<string, string>;
}
