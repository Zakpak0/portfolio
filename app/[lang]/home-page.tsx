'use client';
import { useNavLinks, useButton, useCustomLink } from "internals/hooks"
import { My } from 'internals/utilities/api';
import { Container, CourseThumbnails, Header, MainContentContainer, Overview, ProjectsContainer, ProjectThumbnails } from 'components/pages/LandingPage'
export type SSP = {
    pluralsight: []
}
export const HomePage = function ({ pluralsight }: SSP) {
    const { downloadLink } = useNavLinks()
    const { buttonRef: downloadResumeRef, clickButton: downloadResume } = useButton()
    const HiddenDownloadLink = useCustomLink({
        download: 'Zakhary Oliver Resume',
        href: downloadLink,
        ref: downloadResumeRef as React.RefObject<HTMLAnchorElement>
    })
    const me = new My(downloadResume).profile
    return (
        <Container>
            <Overview />
            <MainContentContainer>
                <HiddenDownloadLink />
                <Header {...me} />
                <ProjectsContainer>
                    <ProjectThumbnails />
                </ProjectsContainer>
                <CourseThumbnails pluralsight={pluralsight} />
            </MainContentContainer>
        </Container>
    )
}