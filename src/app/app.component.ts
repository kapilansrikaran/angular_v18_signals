import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  
  private item = signal('first signal variable');

  names = signal([
    { id: 1, name: 'Kapilan' },
    { id: 2, name: 'Nimal' },
    { id: 3, name: 'Rani' },
  ]);

  get firstSignal() {
    return this.item();
  }

  handleClick() {
    console.log(this.names());
    console.log(this.readOnlyNames());
  }

  lastName = computed(() => {
    // Note slice returns an array with the last element, [0] is used to access that single element from the array.
    return this.names().slice(-1)[0];
  });


  nameFilter = signal('');

  // update the nameFilter signal
  updateNameFilter($event : Event){
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
    // this.nameFilter.set('new');
    // this.nameFilter.update( prev => `new ${prev}`);
  }


  // update the value of the names signal
  // Whenever updating the object value we should do it in an immutable manner 
  // that's why passing new reference to new created object and ofcource array is an object
  // other wise if mutable value of an object, angular not reflect change for instence not update the single value,
  // Single value update have to be a apply in an immutable manner, in other words, It a value in an object we should create a modified copy of the object
  //  (Signal and template are not consistency)
  // Solving this , Single value update have to be a apply in an immutable manner.
  clearNames(){
    this.names.set([]);
  }

  newName = signal('');
  updateNewName($event: Event){
    this.newName.set((($event.target) as HTMLInputElement)['value'])
  }

  // Add new element to the array
  append(name: string){
    this.names.update((prev) => [...prev, {id: prev.length + 1, name}]);
  }



  // name filter signal
  filteredNames = computed(() => {
    // case-sensitive
    // return this.names().filter( name => name.name.includes(this.nameFilter()));

    // case-insensitive
    // first check uppercase or lowercase
    const nameFilter = this.nameFilter().toLowerCase();
    return this.names().filter((name) =>
      name.name.toLowerCase().includes(nameFilter)
    );
  });


  ascOrder = signal(false);

  // Dsplay the name list order with asc order or/ desc
  visibleNames = computed(()=>{
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredNames().sort((a,b) => {
      return a.name.localeCompare(b.name) * order;
    })
  });



  // make an Signal readOnly
  // asReadonly holds the value as original Singal
  // whenever original signal get updates the asReadonly signal get updated
  readOnlyNames = this.names.asReadonly



}
