const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/posts', require('./routes/post.route'));
app.use('/api/likes', require('./routes/like.route'));
app.use('/api/comments', require('./routes/comment.route'));

module.exports = app; 