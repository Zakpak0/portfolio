import useHost from "./useHost"
export default function useNavLinks(): {
    downloadLink: URL
    NGHBRLink: URL
    homeLink: URL
} {
    const host = useHost()
    const downloadLink = host.resolved ? new URL(host.name + "files/Resume.pdf") : "" as any
    const NGHBRLink = host.resolved ? new URL(host.name + "nghbr") : "" as any
    const homeLink = host.resolved ? new URL(host.name) : "" as any
    return {
        downloadLink,
        NGHBRLink,
        homeLink
    }
}