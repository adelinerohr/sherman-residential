import * as React from "react";

import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedParagraphNode,
  type DefaultTypedEditorState,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
  JSXConverters,
} from "@payloadcms/richtext-lexical/react";

import type {
  CallToActionBlock as CTABlockProps,
  MasonryGridBlock as MasonryGridBlockProps,
} from "@/payload-types";
import { cn } from "@/lib/utils";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MasonryGridBlockProps>;

/**
 * Node Converters
 */

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw Error("Expected value to be an object");
  }

  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const paragraphConverter: JSXConverters<SerializedParagraphNode> = {
  paragraph: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");
    return <p className="leading-[2]">{text}</p>;
  },
};

const unorderedListItemConverter: JSXConverters<SerializedListItemNode> = {
  listitem: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");
    return <li className="mb-1 text-sm leading-[1.75]">{text}</li>;
  },
};

const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).join("");

    if (node.tag === "h4") {
      return (
        <h4 className="mt-6 mb-2 font-bold font-display text-primary text-sm tracking-wide">
          {text}
        </h4>
      );
    }
  },
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
  ...paragraphConverter,
  ...unorderedListItemConverter,
});

/**
 * Rich Text Converter
 */

type RichTextProps = React.HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
};

export function RichText(props: RichTextProps) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;

  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}
