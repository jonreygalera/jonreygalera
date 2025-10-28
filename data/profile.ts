import IProfile from "./interface/iprofile";

export const PROFILE: IProfile & { ideas?: { link1: string; link2: string } } = {
  firstName: "Jon Rey",
  lastName: "Galera",
  dateStarted: '',
  resume: {
    type:  "link",
    url:  "https://drive.google.com/file/d/16qiyoyIfhW0vOEsPRaC1fdFP5Q5jNEV-/view?usp=sharing"
  },
  ideas: {
    link1: '',
    link2: 'https://mrey-ai.vercel.app'
  }
} 
