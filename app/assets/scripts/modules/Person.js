class Person{
    constructor(name, favoriteColor){
        this.name = name;
        this.favoriteColor = favoriteColor;

    }

greet(){
    console.log("hello my name is " + this.name + " and my favorite color is " + this.favoriteColor);
}

}

    export default Person