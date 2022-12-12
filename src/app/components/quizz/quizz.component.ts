import { Component } from '@angular/core';
import quizzQuestions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {
  title:string = ""
  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""
  questionIndex:number = 0
  questionMaxIndex:number = 0
  finished:boolean = false

  buttonPress(alias:string){
    this.answers.push(alias)
    this.nextStep()
  }
  async nextStep(){
    this.questionIndex += 1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const final:string = await this.checkResults(this.answers)
      this.finished = true
      this.answerSelected = quizzQuestions.results[final as keyof typeof quizzQuestions.results]
    }
  }

  async checkResults(answers:string[]){
    const result = answers.reduce((previous,current,i,arr)=>{
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length){
        return previous
      }else{
        return current
      }
    })
    return result
  }

  ngOnInit(){
    if(quizzQuestions){
      this.finished = false
      this.title = quizzQuestions.title
      this.questions = quizzQuestions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }
}
