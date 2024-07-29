import { effect, Injectable, signal, untracked } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  constructor() { 
    
  }


  

  #names = signal([
    { id: 1, name: 'Kapilan' },
    { id: 2, name: 'Nimal' },
    { id: 3, name: 'Rani' },
  ]);



  names = this.#names.asReadonly();

  // update the value of the names signal
  // Whenever updating the object value we should do it in an immutable manner 
  // that's why passing new reference to new created object and ofcource array is an object
  // other wise if mutable value of an object, angular not reflect change for instence not update the single value,
  // Single value update have to be a apply in an immutable manner, in other words, It a value in an object we should create a modified copy of the object
  //  (Signal and template are not consistency)
  // Solving this , Single value update have to be a apply in an immutable manner.
  clearNames(){
    this.#names.set([]);
  }

    // Add new element to the array
    append(name: string){
      this.#names.update((prev) => [...prev, {id: prev.length + 1, name}]);
    }
}
