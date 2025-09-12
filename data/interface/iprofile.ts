type resumeType = 'link' | 'file';

export default interface IProfile {
  firstName: string;
  lastName: string;
  resume: { type: resumeType; url:string };
}