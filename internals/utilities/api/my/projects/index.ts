import {NGHBR} from "internals/images"

export default class Projects {
    constructor(links: {
        NGHBRLink: URL
    }) {
        const { NGHBRLink } = links
        this.links = links
        this.list = [
            {
                link: NGHBRLink,
                image: NGHBR,
                title: "NGHBR",
                caption: "A React Native app built with Expo",
                description: ""
            }
        ]
    }
    links
    list
}