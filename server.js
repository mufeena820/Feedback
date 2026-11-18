const express = require('express');
const db = require('./database');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.post('/feedback', (req, res) => {
    const {
        studentName,
        department,
        category,
        rating,
        message
    } = req.body;

    try {
        const insert = db.prepare(`
            INSERT INTO feedback
            (studentName, department, category, rating, feedback)
            VALUES (?, ?, ?, ?, ?)
        `);

        insert.run(
            studentName,
            department,
            category,
            rating,
            message
        );

        console.log('Feedback saved to database!');

        res.json({
            message: 'Feedback Submitted Successfully!'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Unable to save feedback!'
        });
    }
});
app.get('/feedback-list', (req, res) => {
    try {
        const feedbacks = db.prepare(
            'SELECT * FROM feedback ORDER BY id DESC'
        ).all();

        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to load feedback!'
        });
    }
});
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);

})