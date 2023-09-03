import React, { useState } from "react";
// Components
import QuestionCard from '../questionCard/QuestionCard';
import Button from '../Button';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
// Types
import { QuestionsState } from '../../types/quiz';

import useWindowSize from '../../hook/useWindowSize';

type Props = {
    questions: QuestionsState;
    totalQuestions: number;
};

const GameComponent = ({ questions, totalQuestions }: Props) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [rule, setRule] = useState(false);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);
    const size = useWindowSize();
    const [counting, setCounting] = useState(false);

    const onVisibilityChange = (isVisible: boolean) => {
        if (isVisible) {
            setCounting(true);
        }
    };

    const isMobile = size.width <= 768;

    const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;


    const handleOnAnswerClick = (answer: string, currentQuestionIndex: number) => {
        // If user has already answered, do nothing
        if (isQuestionAnswered) return;
        // Check answer against correct answer
        const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
        // Add score if answer is correct
        if (isCorrect) setScore(prev => prev + 5);
        // Save the answer in the object for user answers
        setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
    };

    const handleChangeQuestion = (step: number) => {
        const newQuestionIndex = currentQuestionIndex + step;
        if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
        setCurrentQuestionIndex(newQuestionIndex);
    };
    console.log(size);

    return (
        <div className={`text-black max-w-[800px] container mx-auto ${end ? '' : ''} flex flex-col justify-center`}>
            {start && (
                <div className="bg-local flex flex-col text-center aspect-[756/1042] justify-end w-full"
                    style={{
                        backgroundImage: "url(/image/game/3_game.jpg)",
                        backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className={`text-white p-4`}>
                        <p className=' font-bold text-[20px]'>得分: {score}</p>
                        <p className=' font-bold text-[16px] pb-4'>
                            當前第 {currentQuestionIndex + 1} 題  共 {totalQuestions} 題
                        </p>
                        <div className="">
                            <QuestionCard
                                currentQuestionIndex={currentQuestionIndex}
                                question={questions[currentQuestionIndex].question}
                                answers={questions[currentQuestionIndex].answers}
                                userAnswer={userAnswers[currentQuestionIndex]}
                                correctAnswer={questions[currentQuestionIndex].correct_answer}
                                onClick={handleOnAnswerClick}
                            />
                        </div>
                        <div className='flex justify-center justify-even mt-5 gap-6 md:mb-40'>
                            <Button text='上一題' onClick={() => handleChangeQuestion(-1)} />
                            <Button
                                text={currentQuestionIndex === totalQuestions - 1 ? '結束' : '下一題'}
                                onClick={currentQuestionIndex === totalQuestions - 1 ? () => {
                                    setEnd(true)
                                    setStart(false)
                                } : () => handleChangeQuestion(1)}
                            />
                        </div>
                    </div>
                </div>
            )
            }
            {
                !rule && (
                    <div className="bg-local flex flex-col text-center items-center aspect-[756/1042] justify-end w-full "
                        style={{
                            backgroundImage: "url(/image/game/1_game.jpg)",
                            backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                        }}
                    >
                        <div className="flex flex-col justify-end items-center max-w-[150px] lg:max-w-[220px] md:mb-[1vw] mx-auto"
                            onClick={() => setRule(true)}
                        >
                            <img src='/image/game/button/rule_button.png' alt='rule-button'/>
                        </div>
                    </div>
                )
            }
            {
                rule && !start && !end && (
                    <div className="bg-local flex flex-col text-center items-center aspect-[756/1042] justify-end w-full "
                        style={{
                            backgroundImage: "url(/image/game/2_game.jpg)",
                            backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                        }}
                    >
                        <div className="flex flex-col justify-end items-center max-w-[150px] md:max-w-[220px] md:mb-[1vw] mx-auto"
                            onClick={() => setStart(true)}
                        >
                            <img src='/image/game/button/start_button.png' />
                        </div>
                    </div>
                )
            }
            {
                end && (
                    <div className="bg-local flex flex-col text-center items-center aspect-[756/4254] justify-end w-full "
                        style={{
                            backgroundImage: `url(/image/game/score/game_${score}_score.jpg)`,
                            backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat"
                        }}
                    >
                        <a href="/" className="absolute w-[150px] mb-[10vw] md:mb-[5vw] flex flex-col items-center">
                            <img src="/image/game/button/back_button.png" className="w-[80px] md:w-[150px]"></img>
                        </a>
                        <img src="/image/lil_banner6.png" className="max-w-[230px] md:max-w-[400px] m-3"></img>
                        <span className="text-base md:text-2xl mb-[13vw] md:mb-50">
                            自我們成立以來，已經服務了超過
                            <VisibilitySensor onChange={onVisibilityChange}>
                                {({ isVisible }: { isVisible: boolean }) => (
                                    <span className="text-red-600 font-bold">
                                        {counting ? <CountUp start={0} end={5298726} duration={1000} separator="," /> : '0'}
                                    </span>
                                )}
                            </VisibilitySensor>
                            人。
                        </span>
                        <div className="flex flex-col text-base md:text-lg  text-white text-center items-center mb-[38vw] md:mb-[540px]">
                            {isMobile
                                ? (
                                    <span className="font-semibold">
                                        理財周刊即是你最佳的投資理財夥伴<br />
                                        致力於提供高品質的理財知識和投資報告，<br />
                                        希望能夠幫助更多的人實現財務自由和幸福生活。
                                    </span>
                                ) : (
                                    <span className="font-bold">
                                        理財周刊即是你最佳的投資理財夥伴<br />
                                        致力於提供高品質的理財知識和投資報告，<br />
                                        希望能夠幫助更多的人實現財務自由和幸福生活。
                                    </span>
                                )
                            }
                            <img src="/image/banner-overlay-img-about-word.png" className="w-[305px] md:w-[500px] my-4 md:my-6"></img>
                            {isMobile
                                ? (
                                    <span className="font-semibold">
                                        學會正確地投資和管理財務，<br />
                                        從而穩健地營造自己的生活。<br />
                                        我們鼓勵您訂閱我們的雜誌，<br />
                                        以獲得最新的理財資訊、專家觀點和投資建議。<br />
                                        謝謝您的支持，我們期待與您一起建立一個<br />
                                        理財、理善、理健康的全民理財幸福島！
                                    </span>
                                ) : (
                                    <span className="font-bold">
                                        學會正確地投資和管理財務，<br />
                                        從而穩健地營造自己的生活。<br />
                                        我們鼓勵您訂閱我們的雜誌，<br />
                                        以獲得最新的理財資訊、專家觀點和投資建議。<br />
                                        謝謝您的支持，我們期待與您一起建立一個<br />
                                        理財、理善、理健康的全民理財幸福島！
                                    </span>
                                )
                            }
                            <a href="https://pse.is/56zyed" target="_blank" className={`absolute ${isMobile ? 'top-[135vw]' : ''} w-[150px] md:w-[280px] md:top-[1030px]`}>
                                <img src="/image/button.png"></img>
                            </a>
                            <a href="https://pse.is/587egy" target="_blank" className={`absolute ${isMobile ? 'top-[181vw] right-[60vw]' : ''} w-[38px] md:top-[1400px] md:transform md:translate-x-[-110px] md:w-[80px]`}>
                                <img src="/image/icon-FB.png"></img>
                            </a>
                            <a href="https://pse.is/58en9p" target="_blank" className={`absolute ${isMobile ? 'top-[181vw]' : ''} w-[38px] md:top-[1400px] md:w-[80px]`}>
                                <img src="/image/icon-ig.png"></img>
                            </a>
                            <a href="https://lin.ee/C5fnsgJ" target="_blank" className={`absolute ${isMobile ? 'top-[181vw] right-[30vw]' : ''} w-[38px] md:transform md:translate-x-[110px] md:top-[1400px] md:w-[80px]`}>
                                <img src="/image/icon-line.png"></img>
                            </a>
                            <a href={score == 0
                                ? `https://www.moneyweekly.com.tw/ArticleData/Info/Article/127224`
                                : score == 5
                                    ? 'https://www.moneyweekly.com.tw/ArticleData/Info/Article/127220'
                                    : score == 10
                                        ? 'https://www.moneyweekly.com.tw/ArticleData/Info/Article/127224'
                                        : score == 15
                                            ? 'https://www.moneyweekly.com.tw/ArticleData/Info/Article/123502'
                                            : score == 20
                                                ? 'https://www.moneyweekly.com.tw/ArticleData/Info/Article/127223'
                                                : 'https://www.moneyweekly.com.tw/ArticleData/Info/Article/126986'
                                }
                                target="_blank" className={`absolute ${isMobile ? 'top-[282vw]' : ''} w-[138px] md:w-[230px] md:top-[2230px]`}>
                                <img src="/image/game/button/go_button.png"></img>
                            </a>
                            <a href="https://www.moneyweekly.com.tw/Magazine/Info/%E7%90%86%E8%B2%A1%E5%91%A8%E5%88%8A/38582" target="_blank" className={`absolute ${isMobile ? 'top-[330vw]' : ''} w-[250px] md:w-[400px] md:top-[2560px]`}>
                                <img src="/image/game/game_article1.png"></img>
                            </a>
                            <a href="https://www.moneyweekly.com.tw/ArticleData/Info/Article/125177" target="_blank" className={`absolute ${isMobile ? 'top-[345vw]' : ''} w-[250px] md:w-[400px] md:top-[2680px]`}>
                                <img src="/image/game/game_article2.png"></img>
                            </a>
                            <a href="https://www.moneyweekly.com.tw/ArticleData/Info/Article/127224" target="_blank" className={`absolute ${isMobile ? 'top-[360vw]' : ''} w-[250px] md:w-[400px] md:top-[2800px]`}>
                                <img src="/image/game/game_article3.png"></img>
                            </a>
                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default GameComponent