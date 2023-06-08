import My from "internals/utilities/api/my"
import useNavLinks from "./useNavLinks"
export default function useProjects(): any[] {
    const { NGHBRLink } = useNavLinks()
    const projectLinks = {
     NGHBRLink
    }
    const projects = new My.Projects(projectLinks).list
    return projects
}