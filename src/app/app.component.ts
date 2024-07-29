import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NamesService } from './names.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // inject the mname service
  nameSvc = inject(NamesService);
  
  private item = signal('first signal variable');



  get firstSignal() {
    return this.item();
  }

  handleClick() {
    console.log(this.nameSvc.names());
    // console.log(this.readOnlyNames());
  }

  lastName = computed(() => {
    // Note slice returns an array with the last element, [0] is used to access that single element from the array.
    return this.nameSvc.names().slice(-1)[0];
  });


  // reactive signal  and untracked / non-reactive
  consoleLogEffect = effect(() => {
    console.log(this.nameSvc.names(), untracked( () => {
      this.nameFilter();
    }));
  })

  consoleLogEffect2 = effect(() => {
    console.log(this.nameSvc.names(), 
      this.nameFilter()
    );
  })

  nameFilter = signal('');

  // update the nameFilter signal
  updateNameFilter($event : Event){
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
    // this.nameFilter.set('new');
    // this.nameFilter.update( prev => `new ${prev}`);
  }


 

  newName = signal('');
  updateNewName($event: Event){
    this.newName.set((($event.target) as HTMLInputElement)['value'])
  }





  // name filter signal
  filteredNames = computed(() => {
    // case-sensitive
    // return this.names().filter( name => name.name.includes(this.nameFilter()));

    // case-insensitive
    // first check uppercase or lowercase
    const nameFilter = this.nameFilter().toLowerCase();
    return this.nameSvc.names().filter((name) =>
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
  // readOnlyNames = this.nameSvc.names.asReadonly



}
