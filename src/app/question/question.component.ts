import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = ""
  public questionList: any = []
  public currentQuestion: number = 0
  public points: number = 0
  counter = 60
  correctAnswer : number = 0
  inCorrectAnswer : number = 0
  interval$ : any
  progress: string = "0"
  isQuizCompleted: boolean = false


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!
    this.getAllQuestions()
    this.startCounter()
  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
    .subscribe( res => {
      console.log(res)
      this.questionList = res.question
    })
  }

  nextQuestion() {
    this.currentQuestion++
  }

  prevQuestion() {
    this.currentQuestion--
  }

  resetQuestion(){
    
    this.resetCounter()
    this.getAllQuestions()
    this.currentQuestion = 0
    this.points = 0
    this.counter = 60
    this.progress = "0"
  }

  answer(currentQno: number, option: any){

    if (currentQno === this.questionList.length){
      setTimeout( () => {
        this.isQuizCompleted = true
      }, 1000 )
      this.stopCounter()
    }

    if (option.currect) {
      this.points += 10
      this.correctAnswer++

      setTimeout( () => {
      this.currentQuestion++
      this.resetCounter()
      this.getProgressPercent()
      }, 500 )

    }
    else {
      this.inCorrectAnswer++
      setTimeout( () => {
        this.currentQuestion++
        this.resetCounter()
        this.getProgressPercent()
        }, 500 )
      this.points -=10
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
    .subscribe(val => {
      this.counter--
      if(this.counter === 0) {
        this.currentQuestion++
        this.counter = 60
        this.points -= 10
      }
    })

    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000)
  }

  stopCounter() {
    this.interval$.unsubscribe()
    this.counter = 0
  }

  resetCounter() {
    this.stopCounter()
    this.counter = 60
    this.startCounter()
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString()
    return this.progress
  }


}
