import { CourseThumbnail } from "components/elements";
import React from "react";

export default function LandingPageCourseThumbnails({ pluralsight }: any) {
    function renderCourses() {
        return pluralsight.map((course: any) => <CourseThumbnail {...course} />)
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
                <h3
                    style={{
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                    }}
                >Some of the Courses I've completed</h3>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr 1fr",
                    gap: "10px 10px",
                    maxHeight: 500,
                    width: "100%",
                    overflowY: "scroll",
                    alignItems: "center",
                    justifyItems: "center",
                    padding: 30
                }}
            >
                {renderCourses()}
            </div>
        </React.Fragment>
    )
}