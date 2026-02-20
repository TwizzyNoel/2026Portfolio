<?php
class QuizController {
    private $pdo;

    public function __construct() {
        $this->pdo = connectDB();
    }

    public function getQuestions() {
        $questions = [];
        $questionsWithOptions = [];
    
        while (count($questionsWithOptions) < 10) {
            $stmt = $this->pdo->query("SELECT id, question_text FROM questions ORDER BY RAND() LIMIT 20");
            $batchQuestions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            foreach ($batchQuestions as $question) {
                if (isset($questions[$question['id']])) {
                    continue;
                }
    
                $stmt = $this->pdo->prepare("SELECT id, option_text, is_correct FROM options WHERE question_id = ?");
                $stmt->execute([$question['id']]);
                $options = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
                if (!empty($options)) {
                    $question['options'] = $options;
                    $questions[$question['id']] = $question;
                    $questionsWithOptions[] = $question;
    
                    if (count($questionsWithOptions) >= 10) {
                        break 2;
                    }
                }
            }
        }
    
        return $questionsWithOptions;
    }     
    
    public function calculateScore($questions) {
        $score = 0;
    
        foreach ($questions as $question) {
            $selectedOptionId = $_POST['question_' . $question['id']] ?? null;
    
            if ($selectedOptionId) {
                $stmt = $this->pdo->prepare("SELECT is_correct FROM options WHERE id = ?");
                $stmt->execute([$selectedOptionId]);
                $isCorrect = $stmt->fetchColumn();
    
                if ($isCorrect) {
                    $score++;
                }
            }
        }
    
        $_SESSION['score'] = $score;
    }
}    