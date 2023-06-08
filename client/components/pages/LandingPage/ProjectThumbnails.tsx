import { ProjectThumbnail } from "components/elements";
import { useProjects } from "internals/hooks";
import React from "react";

export default function LandingPageProjectThumbnails() {
    const projects = useProjects()
    function renderProjects() {
        return projects.map(project => <ProjectThumbnail {...project} />)
    }
    return (
        <React.Fragment>
            <div
                className='font-bold text-2xl'
                style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex"
                }}>
                <h3>
                    My Projects
                </h3>
            </div>
            <div
                style={{
                    width: "100%",
                    alignItems: 'center',
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    padding: 20,
                    boxSizing: "border-box",
                }}
            >
                {
                    renderProjects()
                }
            </div>
        </React.Fragment>
    )
}