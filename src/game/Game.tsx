import React from "react";
import AppBar from "../components/appbar/AppBar";
import GameComponent from '../components/gameComponents/GameComponent'
import { shuffleArray } from '../utils/arrayUtils';
import { Question } from "../types/quiz";

const getQuestions = () => {
    const data = {
        response_code: 0,
        results: [
            {
                question: '第一關：家庭分配-家庭理財分工</br>1.月光族夫妻怎麼理財?',
                correct_answer: '先記帳並存錢',
                incorrect_answers: ['增加收入', '超級節省']
            },
            {
                question: '第二關：人生保障-建立人生保障最低限度</br>2.保險怎麼挑，才不踩雷？',
                correct_answer: '先找到自己的需求',
                incorrect_answers: ['保費最低', '保額最高']
            },
            {
                question: '第三關：維持關係-平衡家與成員間的幸福感</br>3.夫妻間怎麼談錢？',
                correct_answer: '輕鬆談到未來夢想',
                incorrect_answers: ['沒工作的人不敢表示意見', '等對方開口']
            },
            {
                question: '第四關：學著開源-增加被動收入減輕金錢負擔</br>4.上班族怎麼做投資？',
                correct_answer: '挑選合理的投資工具',
                incorrect_answers: ['AII  in  ETF就好', '投資很危險，放銀行就好']
            },
            {
                question: '第五關：資產分配-正確布局資產將利益最大化</br>5.如果有一桶金，怎麼配置？',
                correct_answer: '分散風險到不同資產',
                incorrect_answers: ['本多終勝', '全買台積電']
            }
        ]
    };
    console.log(data);

    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }));
};

const Game = () => {
    const questions = getQuestions();

    return (
        <div>
            <AppBar game={true}/>
        <div className="bg-[#B3D9D0] flex text-center justify-center items-center -mt-3">
            <GameComponent questions={questions} totalQuestions={5}/>
        </div>
        </div>
    )
}

export default Game