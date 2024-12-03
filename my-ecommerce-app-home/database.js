const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define database path
const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Помилка підключення до бази даних:', err.message);
    } else {
        console.log('Підключено до бази даних SQLite.');
        db.run(
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                price REAL,
                category TEXT,
                additional_info TEXT,
                image_url TEXT
            )`,
            (err) => {
                if (err) {
                    console.error('Помилка створення таблиці products:', err.message);
                } else {
                    db.run(
                        `CREATE TABLE IF NOT EXISTS product_variants (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            product_id INTEGER,
                            label TEXT,  
                            value TEXT,  
                            quantity INTEGER, 
                            FOREIGN KEY(product_id) REFERENCES products(id)
                        )`,
                        (err) => {
                            if (err) {
                                console.error('Помилка створення таблиці product_variants:', err.message);
                            } else {
                                // If both tables are created, seed the database
                                seedDatabase();
                            }
                        }
                    );
                }
            }
        );

        // Таблиця користувачів (відсутня у твоєму коді)
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Помилка при створенні таблиці users:", err.message);
            } else {
                console.log("Таблиця users створена або вже існує.");
            }
        });

        // Таблиця кошиків (відсутня у твоєму коді)
        db.run(`CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE, -- Додаємо унікальне обмеження
            cart_data TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`, (err) => {
            if (err) {
                console.error("Помилка при створенні таблиці carts:", err.message);
            } else {
                console.log("Таблиця carts створена або вже існує.");
            }
        });
    }
});

// Insert product into the 'products' table
const insertProduct = (name, description, price, category, additionalInfo, imageUrl, variants) => {
    db.get(`SELECT COUNT(*) AS count FROM products WHERE name = ?`, [name], (err, row) => {
        if (err) {
            console.error('Помилка при перевірці продукту:', err.message);
        } else if (row.count === 0) {
            db.run(
                `INSERT INTO products (name, description, price, category, additional_info, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
                [name, description, price, category, additionalInfo, imageUrl],
                function (err) {
                    if (err) {
                        console.error('Помилка вставки продукту:', err.message);
                    } else {
                        console.log(`Продукт "${name}" успішно доданий.`);

                        // Додаємо варіанти для продукту
                        variants.forEach(variant => {
                            db.run(
                                `INSERT INTO product_variants (product_id, label, value, quantity) VALUES (?, ?, ?, ?)`,
                                [this.lastID, variant.label, variant.value, variant.quantity],
                                (err) => {
                                    if (err) {
                                        console.error('Помилка при додаванні варіанту продукту:', err.message);
                                    } else {
                                        console.log(`Варіант ${variant.label} для продукту ${name} успішно додано.`);
                                    }
                                }
                            );
                        });
                    }
                }
            );
        } else {
            console.log(`Продукт "${name}" вже існує, пропускаємо.`);
        }
    });
};

// Seed the database with example products and variants
const seedDatabase = () => {
    console.log('Виконується заповнення бази даних...');

    insertProduct('Pride and Prejudice', 'A timeless romance novel by Jane Austen.', 180, 'Books', 'Author: Jane Austen', 'books.jpg', [
        { label: 'Hardcover', value: 'hardcover', quantity: 15 },
        { label: 'Paperback', value: 'paperback', quantity: 30 },
        { label: 'E-book', value: 'ebook', quantity: 50 }
    ]);

    // Квитки на літературний фестиваль
    insertProduct('Literary Festival Ticket', 'Access to a three-day literary festival.', 50, 'Book Events', 'Date: July 15-17, 2024', 'book-event.jpg', [
        { label: 'General Admission', value: 'general', quantity: 100 },
        { label: 'VIP Access', value: 'vip', quantity: 20 },
        { label: 'Online Streaming', value: 'online', quantity: 50 }
    ]);

    // Підписка на аудіокниги
    insertProduct('Audiobook Subscription', 'Monthly subscription for unlimited audiobooks.', 20, 'Audiobooks', 'Duration: 1 month', 'audiobooks.jpg', [
        { label: '1 Month', value: '1_month', quantity: 200 },
        { label: '3 Months', value: '3_months', quantity: 150 },
        { label: '6 Months', value: '6_months', quantity: 80 }
    ]);

    // Журнали
    insertProduct('Travel Magazine', 'A monthly publication featuring travel stories and photography.', 15, 'Magazines', 'Category: Travel, Issue: January 2024', 'magazines.jpg', [
        { label: 'Single Issue', value: 'single_issue', quantity: 100 },
        { label: 'Subscription (6 months)', value: '6_months', quantity: 50 }
    ]);

    // Електронні книги
    insertProduct('The Catcher in the Rye', 'A classic novel by J.D. Salinger.', 10, 'E-Books', 'Author: J.D. Salinger', 'books.jpg', [
        { label: 'PDF Version', value: 'pdf', quantity: 150 },
        { label: 'EPUB Version', value: 'epub', quantity: 120 }
    ]);

    // Квитки на події
    insertProduct('Meet & Greet with Author', 'Get an exclusive meet & greet with your favorite author.', 30, 'Book Events', 'Date: August 20, 2024', 'book-event.jpg', [
        { label: 'General Admission', value: 'general', quantity: 200 },
        { label: 'VIP Admission', value: 'vip', quantity: 50 }
    ]);
    
    insertProduct('Signed Photo of J.K. Rowling', 'Exclusive signed photograph of J.K. Rowling.', 300, 'Author Signs', 'Limited Edition: 1 of 50', 'sign-writer.jpg', [
        { label: 'Framed', value: 'framed', quantity: 10 },
        { label: 'Unframed', value: 'unframed', quantity: 40 }
    ]);
    
    insertProduct('Signed Copy of "The Hobbit"', 'Signed edition of J.R.R. Tolkien\'s "The Hobbit".', 500, 'Author Signs', 'Limited Edition: 1 of 100', 'sign-writer.jpg', [
        { label: 'Hardcover', value: 'hardcover', quantity: 50 },
        { label: 'Paperback', value: 'paperback', quantity: 30 }
    ]);
};

seedDatabase()
module.exports = db;
