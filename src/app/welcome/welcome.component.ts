import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('name') nameKey !: ElementRef

  public routeGame: string = ""
  
  constructor() { }

  ngOnInit(): void {
  }

  startGame() {
    if (this.nameKey.nativeElement.value.trim() === ""){
      alert("Please ente your name")
      this.routeGame = "welcome"
    }
  
    this.routeGame = "question"
    localStorage.setItem("name", this.nameKey.nativeElement.value)
  
    
  }

}
