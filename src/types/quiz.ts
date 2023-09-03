export type Question = {
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
  };
  
  export type QuestionsState = Array<Question & { answers: Array<string> }>;
  