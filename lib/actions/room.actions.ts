'use server'

/* Since this whole file is from server action so this await will only be happening on the server
because liveblocks this instance is from @liveblocks/node which means it runs on server not on 
client side, you have to add 'use server' directive to make sure that this code runs on the server */

import { revalidatePath } from 'next/cache';
import { liveblocks } from '../liveblocks';
import { nanoid } from 'nanoid';
import { parseStringify } from '../utils';

// We are not creating a room here, but a document synonymous with a room
export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: 'Untitled'
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        // Taken from https://liveblocks.io/docs/authentication/id-token/nextjs

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: []
        });

        // By adding this, a new doc will be added to the frontend whenever we create a new room
        revalidatePath('/');

        // Whenever we are returning stuff from the server action, you have parse and stringify it
        return parseStringify(room)
    } catch (error) {
        console.log(`Error happened while creating a room: ${error}`);
    }
}