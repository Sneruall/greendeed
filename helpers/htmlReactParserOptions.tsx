import { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.attribs.class === 'ql-size-small') {
        return (
          <span className="text-[0.75rem]">
            {domToReact(domNode.children, options)}
          </span>
        );
      }
      if (domNode.attribs.class === 'ql-size-large') {
        return (
          <span className="text-[1.5rem]">
            {domToReact(domNode.children, options)}
          </span>
        );
      }
      if (domNode.attribs.class === 'ql-size-huge') {
        return (
          <span className="text-[2.5rem]">
            {domToReact(domNode.children, options)}
          </span>
        );
      }
      if (domNode.name === 'ul') {
        return (
          <ul className="list-inside list-disc">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
      if (domNode.name === 'ol') {
        return (
          <ul className="list-inside list-decimal">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
    }
  },
};
