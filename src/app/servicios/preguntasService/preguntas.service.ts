import { Injectable } from '@angular/core';
import { collection, collectionData } from '@angular/fire/firestore';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(
    private firestore: Firestore
  ) { }

  obtenerPreguntas(): Observable<[]>{
    const preguntas = collection(this.firestore, 'preguntasyrespuestas')
    return collectionData(preguntas) as Observable<[]>
  }
}
