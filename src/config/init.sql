CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- inserta 10 usurios de ejemplo
INSERT INTO Users (username, password, email) VALUES
('user1', 'password1', 'user1@gmail.com'),
('user2', 'password2', 'user2@gmail.com'),
('user3', 'password3', 'user3@gmail.com'),
('user4', 'password4', 'user4@gmail.com'),
('user5', 'password5', 'user5@gmail.com'),
('user6', 'password6', 'user6@gmail.com');

CREATE TABLE IF NOT EXISTS Recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Recipes (title, description, ingredients, instructions) VALUES
('Spaghetti Carbonara', 'A classic Italian pasta dish.', 'Spaghetti, Eggs, Parmesan cheese, Pancetta, Black pepper', 'Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with pepper.'),
('Chicken Curry', 'A spicy and flavorful chicken dish.', 'Chicken, Curry powder, Coconut milk, Onions, Garlic', 'Cook onions and garlic. Add chicken and curry powder. Pour in coconut milk and simmer.'),
('Vegetable Stir Fry', 'A quick and healthy vegetable dish.', 'Mixed vegetables, Soy sauce, Ginger, Garlic', 'Stir fry vegetables with ginger and garlic. Add soy sauce to taste.');

CREATE TABLE IF NOT EXISTS UserLikes (
    id SERIAL PRIMARY KEY,
    user_if INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL REFERENCES Recipes(id) ON DELETE CASCADE
);

INSERT INTO UserLikes (user_if, recipe_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 2),
(2, 1),
(3, 1),
(1, 3),
(2, 3),
(3, 2);

CREATE TABLE IF NOT EXISTS UserSaves (
    id SERIAL PRIMARY KEY,
    user_if INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL REFERENCES Recipes(id) ON DELETE CASCADE
);

INSERT INTO UserSaves (user_if, recipe_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 2),
(2, 1),
(3, 1),
(1, 3),
(2, 3),
(3, 2);

CREATE TABLE IF NOT EXISTS Rewiews (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    comment TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Rewiews (title, comment, rating) VALUES
('Great Recipe!', 'I loved the Spaghetti Carbonara. It was delicious!', 5),
('Not Bad', 'The Chicken Curry was okay, but a bit too spicy for my taste.', 3),
('Quick and Easy', 'The Vegetable Stir Fry was quick to make and very healthy.', 4);

CREATE TABLE IF NOT EXISTS UserRewiews (
    id SERIAL PRIMARY KEY,
    user_if INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL REFERENCES Recipes(id) ON DELETE CASCADE,
    rewiew_id INTEGER NOT NULL REFERENCES Rewiews(id) ON DELETE CASCADE
);

INSERT INTO UserRewiews (user_if, recipe_id, rewiew_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(1, 2, 1),
(2, 1, 2),
(3, 1, 3),
(1, 3, 1),
(2, 3, 2),
(3, 2, 3),
(1, 1, 3),
(2, 2, 1),
(3, 3, 2);

CREATE TABLE IF NOT EXISTS Cuisines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Cuisines (name) VALUES
('Italian'),
('Chinese'),
('Indian'),
('Mexican'),
('French'),
('Japanese'),
('Mediterranean'),
('American'),
('Thai'),
('Spanish');

CREATE TABLE IF NOT EXISTS CuisinesInRecipes (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES Recipes(id) ON DELETE CASCADE,
    cuisine_id INTEGER NOT NULL REFERENCES Cuisines(id) ON DELETE CASCADE
);

INSERT INTO CuisinesInRecipes (recipe_id, cuisine_id) VALUES
(1, 1), -- Spaghetti Carbonara - Italian
(2, 3), -- Chicken Curry - Indian
(3, 2), -- Vegetable Stir Fry - Chinese
(1, 2), -- Spaghetti Carbonara - Chinese
(2, 1), -- Chicken Curry - Italian
(3, 3), -- Vegetable Stir Fry - Indian
(1, 3), -- Spaghetti Carbonara - Indian
(2, 2), -- Chicken Curry - Chinese
(3, 1); -- Vegetable Stir Fry - Italian





