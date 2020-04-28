export class Task {
    constructor(
        private id: string,
        private text: string,
        private day: TaskDay,
        private completed: boolean,
        private user_id: string 
    ){}

    public getId(): string{
        return this.id;
    }

    public setId(id: string): void{
        this.id = id;
    }

    public getText(): string{
        return this.text;
    }

    public setText(text: string): void{
        this.text = text;
    }

    public getDay(): TaskDay{
        return this.day;
    }

    public setDay(day: TaskDay): void{
        this.day = day;
    }

    public getCompleted(): boolean{
        return this.completed;
    }

    public setCompleted(completed: boolean): void{
        this.completed = completed;
    }

    public getUser_id(): string{
        return this.user_id;
    }

    public setUser_id(user_id: string): void{
        this.user_id = user_id;
    }
}

export enum TaskDay {
    SEGUNDA = "Segunda",
    TERCA = "Terça",
    QUARTA = "Quarta",
    QUINTA = "Quinta",
    SEXTA = "Sexta",
    SABADO = "Sábado",
    DOMINGO = "Domingo"
}