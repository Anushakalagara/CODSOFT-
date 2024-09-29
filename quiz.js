const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${q.question}</h3>
            ${q.options.map(option => `
                <label>
                    <input type="radio" name="question${index}" value="${option}" /> ${option}
                </label>
            `).join('')}
        `;
        quizContainer.appendChild(div);
    });
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    document.getElementById("result").innerText = `Your score: ${score} out of ${questions.length}`;
}

document.getElementById("submit").addEventListener("click", submitQuiz);
loadQuiz();
