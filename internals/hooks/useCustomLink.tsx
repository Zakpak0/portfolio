import Link from "next/link";
import React from "react";

export default function useCustomLink({ download, href, ref }: { download: string, href: URL, ref: React.RefObject<HTMLAnchorElement> }) {
    function HiddenDownloadLink() {
        return <Link
            download={download}
            href={href}
            ref={ref as React.RefObject<HTMLAnchorElement>}
            style={{ display: "hidden" }}
        />
    }
    return HiddenDownloadLink
}