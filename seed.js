require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe_app';

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Recipe.deleteMany({});
        console.log('Cleared existing data');

        // Create a sample user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        const user = await User.create({
            username: 'chef_aditi',
            email: 'aditi@example.com',
            password: hashedPassword
        });
        console.log('Created sample user:', user.username);

        // Create sample vegetarian recipes
        const recipes = await Recipe.insertMany([
            {
                title: 'Paneer Tikka Masala',
                description: 'Creamy Indian curry with soft paneer and aromatic spices',
                ingredients: [
                    '500g paneer, cubed',
                    '1 cup yogurt',
                    '3 tbsp tikka paste',
                    '1 can coconut milk',
                    '1 can crushed tomatoes',
                    '1 onion, diced',
                    '3 cloves garlic, minced',
                    '1 tbsp ginger, minced',
                    '2 tbsp oil',
                    '1 tsp cumin',
                    '1 tsp coriander',
                    'Fresh cilantro for garnish',
                    'Salt and pepper to taste'
                ],
                instructions: 'Marinate paneer cubes in yogurt and tikka paste for 30 minutes. Heat oil in a skillet and cook paneer until golden on all sides. Make sauce by sautéing onion, garlic, and ginger, then add coconut milk, crushed tomatoes, and spices. Add cooked paneer to sauce and simmer for 15 minutes. Garnish with fresh cilantro and serve over rice or with naan.',
                imageUrl: 'https://indianfoods.co.in/paneer-tikka-masala-recipe/',
                createdBy: user._id
            },
            {
                title: 'Vegetable Biryani',
                description: 'Aromatic rice dish with layered vegetables and fragrant spices',
                ingredients: [
                    '2 cups basmati rice',
                    '3 cups mixed vegetables (carrot, peas, beans, potatoes)',
                    '2 onions, sliced',
                    '4 cloves garlic, minced',
                    '1 tbsp ginger, minced',
                    '1/4 cup yogurt',
                    '4 tbsp ghee or oil',
                    '2 tsp biryani masala',
                    '1 tsp turmeric',
                    '4 green cardamom pods',
                    '2 black cardamom pods',
                    '1 inch cinnamon stick',
                    '4 cloves',
                    '2 bay leaves',
                    'Fresh mint and cilantro',
                    'Salt to taste'
                ],
                instructions: 'Soak rice for 30 minutes. Cook vegetables in boiling water until 70% done. Fry half the onions in ghee until golden and set aside. In a pot, heat remaining ghee and fry remaining onions, then add ginger-garlic paste. Add yogurt and cooked vegetables, then spices. Layer soaked rice over vegetables. Garnish with fried onions, mint, and cilantro. Cover and cook on high heat for 3 minutes until steam forms, then low heat for 15 minutes.',
                imageUrl: 'https://images.unsplash.com/photo-1584622714792-993192ce3325?w=600&h=400&fit=crop',
                createdBy: user._id
            },
            {
                title: 'Dal Makhani (Creamy Lentil Curry)',
                description: 'Rich and creamy black lentil curry with kidney beans',
                ingredients: [
                    '1 cup black lentils (urad dal)',
                    '1/4 cup kidney beans',
                    '4 tbsp butter',
                    '2 tbsp cream',
                    '1 onion, finely chopped',
                    '3 cloves garlic, minced',
                    '1 tbsp ginger, minced',
                    '2 tbsp tomato paste',
                    '1 can crushed tomatoes',
                    '1 tsp cumin seeds',
                    '1 tsp garam masala',
                    '1/2 tsp turmeric',
                    '1/2 tsp red chili powder',
                    'Fresh cilantro',
                    'Salt to taste'
                ],
                instructions: 'Cook lentils and kidney beans until soft and creamy. In a separate pan, heat butter and add cumin seeds. Add onions and cook until golden, then add ginger-garlic paste. Add tomato paste and cook for 2 minutes. Add crushed tomatoes and spices, simmer for 5 minutes. Pour this tempering into cooked lentils and mix well. Add cream and simmer for 10 minutes. Garnish with fresh cilantro. Serve hot with rice or bread.',
                imageUrl: 'https://images.unsplash.com/photo-1568166206062-49259f900895?w=600&h=400&fit=crop',
                createdBy: user._id
            },
            {
                title: 'Vegetable Fried Rice',
                description: 'Quick and colorful stir-fried rice with mixed vegetables',
                ingredients: [
                    '3 cups cooked rice (day-old)',
                    '2 eggs, beaten',
                    '1 cup mixed vegetables (peas, carrot, corn, beans)',
                    '3 cloves garlic, minced',
                    '2 green onions, chopped',
                    '3 tbsp soy sauce',
                    '1 tbsp sesame oil',
                    '1 tbsp vegetable oil',
                    '1 tsp ginger, minced',
                    '1/2 cup cashews or peanuts',
                    'Red chili flakes to taste',
                    'Salt and pepper to taste'
                ],
                instructions: 'Heat vegetable oil in a wok or large skillet over high heat. Scramble eggs and set aside. Add more oil, then stir-fry ginger and garlic for 30 seconds. Add mixed vegetables and cook for 2 minutes. Add cold rice, breaking up clumps, and stir-fry for 3-4 minutes. Add soy sauce and sesame oil, mix well. Return eggs to pan, add green onions and nuts. Toss everything together and serve hot.',
                imageUrl: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b4?w=600&h=400&fit=crop',
                createdBy: user._id
            },
            {
                title: 'Mushroom Risotto',
                description: 'Creamy Italian rice with sautéed mushrooms and Parmesan',
                ingredients: [
                    '2 cups arborio rice',
                    '300g mixed mushrooms, sliced',
                    '1 onion, finely diced',
                    '3 cloves garlic, minced',
                    '1/2 cup white wine',
                    '4-5 cups vegetable broth, warm',
                    '1/2 cup Parmesan cheese, grated',
                    '2 tbsp butter',
                    '2 tbsp olive oil',
                    '2 tbsp fresh parsley, chopped',
                    '1 tsp thyme',
                    'Salt and pepper to taste'
                ],
                instructions: 'Heat olive oil in a pan and sauté mushrooms with garlic until golden. Set aside. In the same pan, melt butter and sauté onion until softened. Add rice and stir for 1-2 minutes. Pour in white wine and stir until absorbed. Add warm broth one ladle at a time, stirring frequently and waiting for each addition to be absorbed before adding more. After 18-20 minutes, rice should be creamy and al dente. Stir in mushrooms, Parmesan, thyme, and parsley. Season with salt and pepper. Serve immediately.',
                imageUrl: 'https://images.unsplash.com/photo-1399577577141-2b5f73bfbf1d?w=600&h=400&fit=crop',
                createdBy: user._id
            }
        ]);

        console.log(`Created ${recipes.length} sample recipes`);
        console.log('\nSample User Credentials:');
        console.log('Email: aditi@example.com');
        console.log('Password: password123');
        
        await mongoose.connection.close();
        console.log('\nDatabase seeded successfully!');
    } catch (error) {
        console.error('Seeds error:', error);
        process.exit(1);
    }
}

seedDatabase();
