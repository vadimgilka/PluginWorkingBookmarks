import dotenv from 'dotenv';
import express from 'express';
import prisma from './db.js'; 
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors'
const serv = express();
const port = 3000;

serv.use(cookieParser());


serv.use(express.json());

async function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  
  if (typeof token === 'string') {
    try {
      const bearerToken = token.split(' ')[1];
      const data = jwt.verify(bearerToken, process.env.SECRET);
      
      if (!data || typeof data !== 'object') {
        throw new createHttpError.Unauthorized();
      }
      
      req.body.user = {
        id: data.id
      };
      
      next();
    } catch (error) {
      next(new createHttpError.Unauthorized());
    }
  } else {
    next(new createHttpError.Unauthorized());
  }
}

function createToken(data) {
  if (!process.env.SECRET) {
    throw new Error('SECRET environment variable is not defined');
  }
  return jwt.sign(data, process.env.SECRET, { expiresIn: '1d' })
}

function setToken(res, data) {
  const token = createToken(data)
  res.cookie('token', `Bearer ${token}`, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: false,
    signed: false,
    secure: false
  })
  res.sendStatus(200)
}


serv.use(express.json())
serv.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  }),
)

serv.get('/categories', verifyToken, async (req, res) => {
  try { 
    const userId = req.body.user?.id
    const categs = await prisma.category.findMany({
      where: {
        userId: userId
      }
    });
    res.json(categs);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.get('/notes', verifyToken,  async (req, res) => {
  try { 
    const userId = req.body.user?.id
    const notes = await prisma.note.findMany({
      where: {
        userId: userId
      }
    });
    res.json(notes);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.get('/user', verifyToken,  async (req, res) => {
  try { 
    const userId = req.body.user?.id
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
   res.json(user);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.put('/user/edit', verifyToken,  async (req, res) => {

 const { name, email, password } = req.body;

  try {
    const userId = req.body.user?.id
    // Попытка найти элемент в базе данных
   const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    // Если элемент не найден, возвращаем ошибку
    if (!user) {
      return res.status(404).json({ error: 'Элемент не найден' });
    }

    // Обновление элемента в базе данных
    const updatedItem = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name, 
        email, 
        password
      }
    });

    // Отправка ответа об успешном обновлении
    res.status(200).json({ message: 'Элемент успешно обновлен', updatedItem });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при обновлении элемента:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении элемента' });
  }
});

serv.post('/addcateg', verifyToken, async (req, res) => {
  try {
    const userId = req.body.user?.id
    // Получаем данные из запроса
    const { name } = req.body;

    // Добавляем новую запись в базу данных
    const newCategory  = await prisma.category.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    res.status(201).json(newCategory );
  } catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.delete('/notes/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Попытка найти элемент в базе данных
    const item = await prisma.note.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    // Если элемент не найден, возвращаем ошибку
    if (!item) {
      return res.status(404).json({ error: 'Элемент не найден' });
    }

    // Удаление элемента из базы данных
    await prisma.note.delete({
      where: {
        id: parseInt(id)
      }
    });

    // Отправка ответа об успешном удалении
    res.status(200).json({ message: 'Элемент успешно удален' });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при удалении элемента:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении элемента' });
  }
});

serv.put('/notes/edit/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.body.user?.id
  const { name, url, description, isread, readdate, categoryId } = req.body;

  try {
    // Попытка найти элемент в базе данных
    const item = await prisma.note.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    // Если элемент не найден, возвращаем ошибку
    if (!item) {
      return res.status(404).json({ error: 'Элемент не найден' });
    }

    // Обновление элемента в базе данных
    const updatedItem = await prisma.note.update({
      where: {
        id: parseInt(id),
        userId: userId
      },
      data: {
        name, 
        url, 
        description, 
        isread, 
        readdate, 
        categoryId
      }
    });

    // Отправка ответа об успешном обновлении
    res.status(200).json({ message: 'Элемент успешно обновлен', updatedItem });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при обновлении элемента:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении элемента' });
  }
});

serv.post('/notes/add', verifyToken, async (req, res) => {
  const { name, url, description, isread, readdate,  categoryId } = req.body;
  const userId = req.body.user?.id
  try {
      // Создание новой записи в базе данных
      const newItem = await prisma.note.create({
          data: {
              name,
              url,
              description,
              isread,
              readdate,
              userId,
              categoryId
          }
      });

      // Отправка ответа об успешном создании новой записи
      res.status(201).json({ message: 'Новая запись успешно добавлена', newItem });
  } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при добавлении новой записи:', error);
      res.status(500).json({ error: 'Произошла ошибка при добавлении новой записи' });
  }
});

serv.post('/notif/add', verifyToken, async (req, res) => {
  const { text, noteId, type } = req.body;
  const userId = req.body.user?.id
  try {
      // Создание новой записи в базе данных
      const newItem = await prisma.notification.create({
          data: {
              text,
              userId,
              noteId,
              type
          }
      });

      // Отправка ответа об успешном создании новой записи
      res.status(200).json({ message: 'Новая запись успешно добавлена', newItem });
  } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при добавлении новой записи:', error);
      res.status(500).json({ error: 'Произошла ошибка при добавлении новой записи' });
  }
});

serv.get('/notifs', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  try { 
    const notifs = await prisma.notification.findMany({
      where: {
        userId: userId
      }
    });
    res.status(201).json(notifs);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.delete('/notifs/delete/:noteId', async (req, res) => {
  const { noteId } = req.params;

  try {
    // Попытка найти элемент в базе данных
    const items = await prisma.notification.findMany({
      where: {
        noteId: parseInt(noteId)
      }
    });

    // Если элемент не найден, возвращаем ошибку
    if (!items || items.length === 0) {
      return res.status(404).json({ error: 'Элементы не найдены' });
    }

    // Удаление элемента из базы данных
    await prisma.notification.deleteMany({
      where: {
        noteId: parseInt(noteId)
      }
    });

    // Отправка ответа об успешном удалении
    res.status(200).json({ message: 'Элемент успешно удален' });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при удалении элемента:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении элемента' });
  }
});

serv.get('/maps', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  try { 
    const maps = await prisma.map.findMany({
      where: {
        userId: userId
      }
    });
    res.json(maps);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});


serv.post('/login', async (req, res) => {
  const { email, password } =  req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  if (!user) {
    return res.status(404).json({ error: 'Элемент не найден' });
  }
  const isPasswordValid = await bcrypt.compare(password.toString(), user.password)
  if (!isPasswordValid) {
    return res.status(500).json({ error: 'Ошибка авторизации' });
  }
  console.log("login id: ",user.id)
  setToken(res, {
    id: user.id
  })
})

serv.post('/logout', verifyToken, async (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200)
})

serv.post('/signup', async (req, res) => {
  const { email, password, name } = req.body
  const emailuser = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  if(emailuser)
    {
      return res.status(500).json({ error: 'Такой пользователь уже есть' });
    }

  const passHash = await  bcrypt.hash(password.toString(), 10)
  const user = await prisma.user.create({
    data: {
      email: email,
      password: passHash.toString(),
      name: name
    },
  })
  setToken(res, {
    id: user.id
  })
})

serv.put('/user/edit', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const { name} = req.body;

  try {
    // Попытка найти элемент в базе данных
    const item = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    // Если элемент не найден, возвращаем ошибку
    if (!item) {
      return res.status(404).json({ error: 'Элемент не найден' });
    }

    // Обновление элемента в базе данных
    const updatedItem = await prisma.user.update({
      where: {
        userId: userId
      },
      data: {
        name: name
      }
    });

    // Отправка ответа об успешном обновлении
    res.status(200).json({ message: 'Элемент успешно обновлен', updatedItem });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при обновлении элемента:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении элемента' });
  }
});

serv.get('/mapnotes/:id', verifyToken, async (req, res) => {
  const { mapId } = req.params;
  try { 
    const notes = await prisma.mapNotes.findMany({
      where: {
        mapId: mapId
      }
    });
    res.json(notes);
  } 
  
  catch (error) {
    console.error('Ошибка запроса:', error);
    res.status(500).json({ error: 'Ошибка запроса к базе данных' });
  }
});

serv.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

export default serv;
