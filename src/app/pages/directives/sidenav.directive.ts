import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSidenav]'
})
export class SidenavDirective {

  constructor() { }

  @HostListener('click',['$event'])
  onClick(e){
      let className = e.target.parentElement.parentElement.className;
      if(className=='main-ul')
        this.collapsAllSubMenu();
      if(e.target.className=='sidenav-menu'){
        e.target.nextSibling.nextElementSibling.style.display = 'block';
      }
  }

  private collapsAllSubMenu(){
    let dom = document.getElementById('sidenav').getElementsByTagName("div");
    for (let i = 0; i < dom.length; i++) {
      dom[i].style.display = "none";
    }
  }

}
