import React, {useEffect} from 'react';

export default function WorkshopRedirectPage(): React.JSX.Element {
  useEffect(() => {
    window.location.replace('/services/ai-first-student');
  }, []);

  return <meta httpEquiv="refresh" content="0; url=/services/ai-first-student" />;
}
