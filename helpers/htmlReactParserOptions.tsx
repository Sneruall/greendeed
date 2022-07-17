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
      if (domNode.attribs.class === 'h1') {
        return (
          <h3 className="mt-8 text-4xl font-bold leading-relaxed">
            {domToReact(domNode.children, options)}
          </h3>
        );
      }
      if (domNode.attribs.class === 'h2') {
        return (
          <h2 className="mt-6 text-3xl font-bold leading-relaxed">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }
      if (domNode.attribs.class === 'h3') {
        return (
          <h3 className="mt-4 font-bold">
            {domToReact(domNode.children, options)}
          </h3>
        );
      }
      if (domNode.name === 'ul') {
        return (
          <ul className="list-outside list-disc">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
      if (domNode.name === 'ol') {
        return (
          <ul className="list-outside list-decimal">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
      if (domNode.name === 'em') {
        return (
          <p className="italic">{domToReact(domNode.children, options)}</p>
        );
      }
    }
  },
};
