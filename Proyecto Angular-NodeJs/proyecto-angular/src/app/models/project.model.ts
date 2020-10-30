export class Project{
    constructor(
        public _id:string,
        public name:string,
        public description:String,
        public category:string,
        public year:string,
        public langs:string[],
        public image:string
    ){

    }
}