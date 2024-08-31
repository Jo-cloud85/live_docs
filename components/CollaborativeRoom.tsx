'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import React from 'react'
import Header from '@/components/Header'
import { Editor } from '@/components/editor/Editor'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
            <div className="collaborative-room">
                <Header>
                    <p className='text-white'>Test</p>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Header>
                <Editor />
            </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom