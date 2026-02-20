CREATE DATABASE noekiv23_harj9;

USE quiz;

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL
);

CREATE TABLE options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    option_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Lisää kysymykset ja vastausvaihtoehdot
INSERT INTO questions (question_text) VALUES
('What is the real name of Ruby da Cherry?'),
('What year was the album "I Want to Die in New Orleans" released?'),
('What is the name of the $uicideboy$ album that features the track "Paris"?');

INSERT INTO options (question_id, option_text, is_correct) VALUES
(1, 'Aristos Petrou', TRUE),
(1, 'Scott Arceneaux Jr.', FALSE),
(1, 'George Petrou', FALSE),
(1, 'Sam King', FALSE),

(2, '2016', FALSE),
(2, '2017', FALSE),
(2, '2018', TRUE),
(2, '2019', FALSE),

(3, 'My Liver Will Handle What My Heart Can’t', FALSE),
(3, 'High Tide in the Snake’s Nest', FALSE),
(3, 'Eternal Grey', FALSE),
(3, 'Kill Yourself Part III', TRUE);


-- Kuntosali-kysymykset
INSERT INTO questions (question_text) VALUES
('Who is known as the "King of Bodybuilding"?'),
('Which exercise primarily targets the chest muscles?'),
('What does the acronym "HIIT" stand for in fitness?'),
('Which protein source is considered complete and high-quality?'),
('What is the recommended number of rest days per week for muscle recovery?'),
('Which type of training focuses on increasing strength with low repetitions?');

-- Kuntosali-vastausvaihtoehdot
INSERT INTO options (question_id, option_text, is_correct) VALUES
(4, 'Arnold Schwarzenegger', TRUE),
(4, 'Ronnie Coleman', FALSE),
(4, 'Jay Cutler', FALSE),
(4, 'Dorian Yates', FALSE),

(5, 'Bench Press', TRUE),
(5, 'Squat', FALSE),
(5, 'Deadlift', FALSE),
(5, 'Pull-up', FALSE),

(6, 'High-Intensity Interval Training', TRUE),
(6, 'High-Intensity Internal Training', FALSE),
(6, 'High Internal Intensity Training', FALSE),
(6, 'High Interval Internal Training', FALSE),

(7, 'Eggs', TRUE),
(7, 'Whey Protein', FALSE),
(7, 'Beef', FALSE),
(7, 'Chicken Breast', FALSE),

(8, '2-3 days', FALSE),
(8, '1-2 days', FALSE),
(8, '3-4 days', TRUE),
(8, '4-5 days', FALSE),

(9, 'Powerlifting', TRUE),
(9, 'Bodybuilding', FALSE),
(9, 'CrossFit', FALSE),
(9, 'Endurance Training', FALSE),

-- $uicideboy$-kysymykset
INSERT INTO questions (question_text) VALUES
('What is the real name of Ruby da Cherry?'),
('What year was the album "I Want to Die in New Orleans" released?'),
('What is the name of the $uicideboy$ album that features the track "Paris"?'),
('Which member of $uicideboy$ is known for the stage name "Ski Mask"?'),
('Which $uicideboy$ album features the track "Kill Yourself Part III"?'),
('What is the name of the record label founded by $uicideboy$?');

-- $uicideboy$-vastausvaihtoehdot
INSERT INTO options (question_id, option_text, is_correct) VALUES
(10, 'Aristos Petrou', TRUE),
(10, 'Scott Arceneaux Jr.', FALSE),
(10, 'George Petrou', FALSE),
(10, 'Sam King', FALSE),

(11, '2016', FALSE),
(11, '2017', FALSE),
(11, '2018', TRUE),
(11, '2019', FALSE),

(12, 'My Liver Will Handle What My Heart Can’t', FALSE),
(12, 'High Tide in the Snake’s Nest', FALSE),
(12, 'Eternal Grey', FALSE),
(12, 'Kill Yourself Part III', TRUE),

(13, 'Ski Mask', FALSE),
(13, 'Kill Yourself', TRUE),
(13, 'Eternal Grey', FALSE),
(13, 'My Liver Will Handle What My Heart Can’t', FALSE),

(14, 'Kill Yourself Part III', TRUE),
(14, 'Eternal Grey', FALSE),
(14, 'High Tide in the Snake’s Nest', FALSE),
(14, 'My Liver Will Handle What My Heart Can’t', FALSE),

(15, 'G*59 Records', TRUE),
(15, 'Suicide Squad', FALSE),
(15, 'Dark Side Records', FALSE),
(15, 'Lost Souls', FALSE);

-- Kysymykset
INSERT INTO questions (question_text) VALUES
('What is the real name of Ruby da Cherry?'),
('What year was the album "I Want to Die in New Orleans" released?'),
('What is the name of the $uicideboy$ album that features the track "Paris"?'),
('What is the main exercise for building chest muscles?'),
('Which $uicideboy$ track features the lyrics "I just want to die"?'),
('Who is known as the founder of bodybuilding?'),
('Which gym equipment is used primarily for leg exercises?'),
('What year did the first $uicideboy$ album release?'),
('Which exercise targets the biceps most effectively?'),
('What is the name of the $uicideboy$ album that includes "Kill Yourself Part IV"?'),
('What is the main benefit of using free weights compared to machines?'),
('Who is the current head trainer of the professional bodybuilder Phil Heath?');

-- Vastausvaihtoehdot
INSERT INTO options (question_id, option_text, is_correct) VALUES
(1, 'Aristos Petrou', TRUE),
(1, 'Scott Arceneaux Jr.', FALSE),
(1, 'George Petrou', FALSE),
(1, 'Sam King', FALSE),

(2, '2016', FALSE),
(2, '2017', FALSE),
(2, '2018', TRUE),
(2, '2019', FALSE),

(3, 'My Liver Will Handle What My Heart Can’t', FALSE),
(3, 'High Tide in the Snake’s Nest', FALSE),
(3, 'Eternal Grey', FALSE),
(3, 'Kill Yourself Part III', TRUE),

(4, 'Bench Press', TRUE),
(4, 'Squats', FALSE),
(4, 'Deadlifts', FALSE),
(4, 'Pull-Ups', FALSE),

(5, 'Paris', FALSE),
(5, 'Memoirs of a Medicated Child', TRUE),
(5, 'Wavy Bones', FALSE),
(5, 'Jungle', FALSE),

(6, 'Arnold Schwarzenegger', TRUE),
(6, 'Lou Ferrigno', FALSE),
(6, 'Ronnie Coleman', FALSE),
(6, 'Jay Cutler', FALSE),

(7, 'Treadmill', FALSE),
(7, 'Elliptical', FALSE),
(7, 'Leg Press Machine', TRUE),
(7, 'Rowing Machine', FALSE),

(8, '2015', TRUE),
(8, '2016', FALSE),
(8, '2017', FALSE),
(8, '2018', FALSE),

(9, 'Bicep Curls', TRUE),
(9, 'Tricep Extensions', FALSE),
(9, 'Bench Press', FALSE),
(9, 'Shoulder Press', FALSE),

(10, 'Grey Day', FALSE),
(10, 'Eternal Grey', FALSE),
(10, 'Kill Yourself Part IV', TRUE),
(10, 'High Tide in the Snake’s Nest', FALSE),

(11, 'Increased strength', TRUE),
(11, 'Cost-effectiveness', FALSE),
(11, 'Ease of use', FALSE),
(11, 'Less space requirement', FALSE),

(12, 'Chris Cormier', FALSE),
(12, 'Hany Rambod', TRUE),
(12, 'George Farah', FALSE),
(12, 'Neil Hill', FALSE);


-- Add more sample questions
INSERT INTO questions (question_text) VALUES
('What is the capital of France?'),
('Who wrote "To Kill a Mockingbird"?'),
('What is the largest planet in our solar system?'),
('Which element has the chemical symbol "O"?'),
('What year did World War II end?'),
('Who painted the Mona Lisa?'),
('What is the longest river in the world?'),
('What is the smallest prime number?'),
('Who developed the theory of relativity?'),
('What is the hardest natural substance on Earth?');

-- Add corresponding options for these questions
INSERT INTO options (question_id, option_text, is_correct) VALUES
(16, 'Paris', TRUE),
(16, 'London', FALSE),
(16, 'Rome', FALSE),
(16, 'Berlin', FALSE),

(17, 'Harper Lee', TRUE),
(17, 'J.K. Rowling', FALSE),
(17, 'George Orwell', FALSE),
(17, 'Mark Twain', FALSE),

(18, 'Jupiter', TRUE),
(18, 'Earth', FALSE),
(18, 'Mars', FALSE),
(18, 'Saturn', FALSE),

(19, 'Oxygen', TRUE),
(19, 'Gold', FALSE),
(19, 'Silver', FALSE),
(19, 'Iron', FALSE),

(20, '1945', TRUE),
(20, '1944', FALSE),
(20, '1943', FALSE),
(20, '1942', FALSE),

(21, 'Leonardo da Vinci', TRUE),
(21, 'Vincent van Gogh', FALSE),
(21, 'Pablo Picasso', FALSE),
(21, 'Claude Monet', FALSE),

(22, 'Nile', TRUE),
(22, 'Amazon', FALSE),
(22, 'Yangtze', FALSE),
(22, 'Mississippi', FALSE),

(23, '2', TRUE),
(23, '1', FALSE),
(23, '3', FALSE),
(23, '5', FALSE),

(24, 'Albert Einstein', TRUE),
(24, 'Isaac Newton', FALSE),
(24, 'Galileo Galilei', FALSE),
(24, 'Niels Bohr', FALSE),

(25, 'Diamond', TRUE),
(25, 'Ruby', FALSE),
(25, 'Sapphire', FALSE),
(25, 'Emerald', FALSE);
