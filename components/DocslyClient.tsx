'use client';
import Docsly from '@docsly/react';
import '@docsly/react/styles.css';
import { usePathname } from 'next/navigation';

export default function DocslyClient() {
  const pathname = usePathname();
  return (
    <Docsly
      publicId="private_0MCxZgVn2bQmBJMJblMtPq9SHz9UFAIgMuZDQ24NlZpLtofmayv6PoD1LzYCGUnj"
      pathname={pathname}
    />
  );
}
