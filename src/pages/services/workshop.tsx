import React, {useEffect} from 'react';

export default function WorkshopRedirectPage(): React.JSX.Element {
  useEffect(() => {
    window.location.replace('/programs');
  }, []);

  return <meta httpEquiv="refresh" content="0; url=/programs" />;
}
