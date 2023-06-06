import { Zakhary, Discord, Github, Linkedin } from "internals/images"
import Projects from "./projects"

export default class My{
    constructor(downloadResume: () => void) {
        this.resume = downloadResume
        this.profile = {
            name: My.fullname,
            skills: My.skills,
            image: My.image,
            occupation: My.occupation,
            location: My.location,
            resume: downloadResume,
            socials: My.socials
        }
    }
    static fullname = "Zakhary Oliver"
    static skills = ["React", "React Native", "Node.js"]
    static image = Zakhary
    static occupation = "Software Developer"
    static location = "Maui, Hawai'i"
    resume
    static socials = [
      { link: 'https://github.com/Zakpak0', icon: Github },
      { link: 'https://discord.com/users/Zakpak0#5264', icon: Discord },
      { link: 'https://www.linkedin.com/in/zakhary-oliver-81141b211/', icon: Linkedin },
    ]
    profile
    static Projects = Projects
}