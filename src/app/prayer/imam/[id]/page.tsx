
"use client";

import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OldImamProfileRedirect() {
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        if (id) {
            redirect(`/creators/${id}`);
        }
    }, [id]);

    return null; // Or a loading spinner
}
