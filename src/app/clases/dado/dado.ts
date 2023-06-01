export class Dado {
  valor!:number;
  imagen!:string;
  repeticiones : number = 0;

  constructor(valor:number, imagen:string){
    this.valor = valor;
    this.imagen = imagen;
  }
}
