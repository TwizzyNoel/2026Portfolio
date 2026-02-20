<?php
session_start();
require_once '../database/connection.php';
require_once '../controllers/quizController.php';

$quizController = new QuizController();

if (isset($_POST['new_game'])) {
    $_SESSION = [];
    session_destroy();
    session_start();
}

$questions = $quizController->getQuestions();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !isset($_POST['new_game'])) {
    // Calculate and store the score
    $quizController->calculateScore($questions);
}

$score = $_SESSION['score'] ?? 0;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz</title>
    <link rel="stylesheet" href="css/styles.css">
    <script>
        function showAnswer(questionId, isCorrect) {
            var answer = document.getElementById('answer-' + questionId);
            if (isCorrect) {
                answer.classList.add('correct');
                answer.textContent = 'Correct!';
            } else {
                answer.classList.add('incorrect');
                answer.textContent = 'Incorrect!';
            }
            answer.classList.remove('hidden');
        }
    </script>
    <style>
        .answer-option {
            display: block;
            margin: 5px 0;
            cursor: pointer;
        }

        .answer-option input {
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <h1>Tietovisa!</h1>

    <form action="index.php" method="post">
        <?php foreach ($questions as $question): ?>
            <?php if (!empty($question['options'])): ?>
                <fieldset>
                    <legend><?php echo htmlspecialchars($question['question_text']); ?></legend>
                    <?php foreach ($question['options'] as $option): ?>
                        <label class="answer-option">
                            <input type="radio" name="question_<?php echo $question['id']; ?>" 
                                   value="<?php echo $option['id']; ?>" 
                                   onclick="showAnswer(<?php echo $question['id']; ?>, <?php echo $option['is_correct'] ? 'true' : 'false'; ?>)">
                            <?php echo htmlspecialchars($option['option_text']); ?>
                        </label>
                    <?php endforeach; ?>
                    <div id="answer-<?php echo $question['id']; ?>" class="hidden"></div>
                </fieldset>
            <?php endif; ?>
        <?php endforeach; ?>

        <input type="submit" value="Submit">
    </form>

    <form action="index.php" method="post">
        <input type="hidden" name="new_game" value="1">
        <input type="submit" value="Start New Game">
    </form>

    <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' && !isset($_POST['new_game'])): ?>
        <h2>Your Score: <?php echo $score; ?> / <?php echo count($questions); ?></h2>
        <?php
        if ($score >= 8) {
            echo "<p>Olet todellinen tietäjä!</p>";
        } elseif ($score >= 5) {
            echo "<p>Hyvin tehty! Tiedät melko paljon.</p>";
        } else {
            echo "<p>Tämä aihepiiri taitaa olla sinulle aika vieras.</p>";
        }
        ?>
        <?php unset($_SESSION['score']); ?>
    <?php endif; ?>
</body>
</html>
