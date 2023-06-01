import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(
    private firestore: Firestore
  ) { }

  obtenerDados(): Observable<[]>{
    const dados = collection(this.firestore, 'dados')
    return collectionData(dados) as Observable<[]>
  }
}
