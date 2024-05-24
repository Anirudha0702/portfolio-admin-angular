export interface IProject{
    id:string,
    description: string;
    title: string;
    github: string;
    image: string;
    techStack: string[];
    live: string;
}
export interface IUser{
    uid:string;
    username:string;
    email:string;
    photoURL:string;
}