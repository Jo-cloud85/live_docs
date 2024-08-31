'use client';

import Loader from '@/components/Loader';
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense';

const Provider = ({ children } : { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint={ '/api/iveblocks-auth' }>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider