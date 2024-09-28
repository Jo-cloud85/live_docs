import Header from '@/components/Header'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

const Home = async() => {

    const clerkUser = await currentUser();

    if (!clerkUser) redirect('/sign-in');

    const documents = [];

    return (
        <main className='home-container'>
            <Header className='sticky left-0 top-0'>
                <div className='flex items-center gap-2 lg:gap-4'>
                    Notification
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Header>

            {/* This div will be different depending how many documents we have. */}
            {documents.length > 0 ? (
                <div>
                    
                </div>
            ): (
                <div className='document-list-empty'>
                    <Image 
                        src="/assets/icons/doc.svg"
                        alt="Document"
                        width={40}
                        height={40}
                        className="mx-auto"
                    />
                    {/* Here we need to know who is the user creating this account */}
                    <AddDocumentBtn
                        userId={clerkUser.id}
                        email={clerkUser.emailAddresses[0].emailAddress}
                    />
                </div>
            )}
        </main>
    )
}

export default Home