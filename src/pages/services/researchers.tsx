import React, {useEffect} from 'react';

export default function ResearchersRedirectPage(): React.JSX.Element {
  useEffect(() => {
    window.location.replace('/services/ai-first-researcher');
  }, []);

  return <meta httpEquiv="refresh" content="0; url=/services/ai-first-researcher" />;
}
