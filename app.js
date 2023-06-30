const path = require("path");
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

// Путь к директории файлов ресурсов (css, js, images)
app.use(express.static("public"));+

// Настройка шаблонизатора
app.set("view engine", "ejs");

// Путь к директории файлов отображения контента
app.set("views", path.join(__dirname, "views"));

// Обработка POST-запросов из форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Запуск веб-сервера по адресу http://localhost:3000
app.listen(3000);

/**
 * Маршруты
 */
app.get("/", async (req, res) => {
    const items = await prisma.item.findMany({
        include: {
            location: true,
        }
    });

    res.render("home", {
        items: items,
    });
});

app.get("/items/:id", async (req, res) => {
    const { id } = req.params;

    const item = await prisma.item.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            location: true,
            categories: {
                include: {
                    category: true,
                }
            },
        }
    });

    res.render("item", {
        item: (item) ? item : {},
    });
});

app.post("/store", async (req, res) => {
    const { title, image } = req.body;

    await prisma.item.create({
        data: {
            title,
            image,
        }
    });

    res.redirect("/");
});

app.get('/example-m-n', async (req, res) => {
    await prisma.ItemRelCategory.create({
        data: {
            item_id: Number(2),
            category_id: Number(1),
        }
    });

    res.redirect("/");
});

app.get("/add", async(req, res) => {
    const location = await prisma.location.findMany()
    console.log(location)
    res.render("add", {
        'location': location
    });
});
