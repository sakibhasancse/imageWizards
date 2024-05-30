import { Helmet } from 'react-helmet-async';

import ProcessView from 'src/sections/process/view/process-view';

export default function ProcessPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <ProcessView />
    </>
  );
}
