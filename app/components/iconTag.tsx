'use client'

import Image from "next/image"

export default function iconTag({ iconData }) {
    return (
        <div className="inline-flex items-center w-fit py-1 px-1">
            <Image src={`/icons/${iconData.path}`} alt={iconData.title} width={32} height={32} className="dark:invert pr-1" />
            <span>{iconData.title}</span>
        </div>
    )
}

