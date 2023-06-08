import { Text, chakra } from "@chakra-ui/react";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export const RenderElement = function (props: { element: CustomElement }) {
  const El = Elements[props.element.type] || Elements.default
  return <El {...props} />
}
export const RenderLeaf = function (props: any) {
  return <Leaf {...props} />
}
export const DefaultElement = function (props: any) {
  return <Text {...props.attributes}>{props.children}</Text>
}
export const CodeElement = function (props: any) {
  return (
    <chakra.pre {...props.attributes}>
      <chakra.code>{props.children}</chakra.code>
    </chakra.pre>
  )
}
export const Elements: Element = {
  default: DefaultElement,
  code: CodeElement,
}
export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}
export type CodeElement = {
  type: 'code'
  children: CustomText[]
}
export const Leaf = function (props: any) {
  return (
    <chakra.span
      {...props.attributes}
      fontWeight={props.leaf.bold ? 'bold' : 'normal'}
    >
      {props.children}
    </chakra.span>
  )
}

export type Element = {
  [key: string]: (props: any) => JSX.Element
}
export type DefaultElement = ParagraphElement
export type CustomElement = ParagraphElement | HeadingElement | CodeElement

export type FormattedText = { text: string; bold?: true };
export type CustomText = FormattedText
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
