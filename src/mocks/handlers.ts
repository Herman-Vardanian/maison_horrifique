import { http, HttpResponse } from "msw";

interface User {
  username: string;
  password: string;
  email: string;
}
const users: User[] = [
  { username: "admin", password: "password", email: "admin@domain.com" },
];

interface Employee {
  id: number;
  nom: string;
  email: string;
  role: string;
}
let employees: Employee[] = [
  { id: 1, nom: "Dupont", email: "dupont@example.com", role: "Manager" },
  { id: 2, nom: "Durand", email: "durand@example.com", role: "Assistant" },
];
let nextEmpId = employees.length + 1;

export const handlers = [
  http.get("/api/v1/sessions", () => {
    return HttpResponse.json(
      [
        {
          id: "1",
          title: "La Maison Hantée",
          difficulty: "Facile",
          maxPlayers: 6,
          duration: 60,
          description: "Une expérience terrifiante dans une maison abandonnée...",
          price: 25,
          image: "./img/maison_hantee.png",
        },
        {
          id: "2",
          title: "Le Cimetière Maudit",
          difficulty: "Moyen",
          maxPlayers: 4,
          duration: 45,
          description: "Explorez un ancien cimetière où les morts ne reposent pas en paix...",
          price: 30,
          image: "./img/cimetiere_maudit.png",
        },
        {
          id: "3",
          title: "L'Asile Abandonné",
          difficulty: "Difficile",
          maxPlayers: 8,
          duration: 75,
          description: "Infiltrez-vous dans un asile psychiatrique abandonné...",
          price: 35,
          image: "./img/asile_abandonne.png",
        },
        {
          id: "4",
          title: "Le Labyrinthe Sombre",
          difficulty: "Expert",
          maxPlayers: 4,
          duration: 90,
          description: "Perdez-vous dans un labyrinthe où la sortie n'existe peut-être pas...",
          price: 40,
          image: "./img/labyrinthe_sombre.png",
        },
        {
          id: "5",
          title: "La Chambre du Docteur Fou",
          difficulty: "Expert",
          maxPlayers: 3,
          duration: 60,
          description: "Échappez-vous du laboratoire d'un scientifique dérangé...",
          price: 45,
          image: "./img/chambre_docteur_fou.png",
        },
      ],
      { headers: { "Content-Type": "application/json" } }
    );
  }),

  http.get('/api/v1/sessions/:id', ({ params }) => {
    const { id } = params;
    const sessions = [
      {
        id: '1',
        title: 'La Maison Hantée',
        difficulty: 'Facile',
        maxPlayers: 6,
        duration: 60,
        description: 'Une expérience terrifiante dans une maison abandonnée...',
        price: 25,
        image: './img/maison_hantee.png',
      },
      {
        id: '2',
        title: 'Le Cimetière Maudit',
        difficulty: 'Moyen',
        maxPlayers: 4,
        duration: 45,
        description: 'Explorez un ancien cimetière où les morts ne reposent pas en paix...',
        price: 30,
        image: './img/cimetiere_maudit.png',
      },
      {
        id: '3',
        title: "L'Asile Abandonné",
        difficulty: 'Difficile',
        maxPlayers: 8,
        duration: 75,
        description: 'Infiltrez-vous dans un asile psychiatrique abandonné...',
        price: 35,
        image: './img/asile_abandonne.png',
      },
      {
        id: '4',
        title: 'Le Labyrinthe Sombre',
        difficulty: 'Expert',
        maxPlayers: 4,
        duration: 90,
        description: "Perdez-vous dans un labyrinthe où la sortie n'existe peut-être pas...",
        price: 40,
        image: './img/labyrinthe_sombre.png',
      },
      {
        id: '5',
        title: 'La Chambre du Docteur Fou',
        difficulty: 'Expert',
        maxPlayers: 3,
        duration: 60,
        description: "Échappez-vous du laboratoire d'un scientifique dérangé...",
        price: 45,
        image: './img/chambre_docteur_fou.png',
      },
    ];

    const session = sessions.find(s => s.id === id);
    
    if (!session) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(session, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.post('/api/v1/sessions', async ({ request }) => {
    const newSession = await request.json();
    return HttpResponse.json(
      { ...newSession, id: Date.now().toString() },
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  }),

  http.put('/api/v1/sessions/:id', async ({ request, params }) => {
    const updatedSession = await request.json();
    return HttpResponse.json(
      { ...updatedSession, id: params.id },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }),

  http.delete('/api/v1/sessions/:id', ({ params }) => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Authentication endpoints
  http.post("/api/v1/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return HttpResponse.json({
        user: { username: user.username, email: user.email },
        message: "Login successful",
      });
    } else {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  }),

  http.post("/api/v1/register", async ({ request }) => {
    const { username, password, email } = (await request.json()) as User;

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return HttpResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const newUser: User = { username, password, email };
    users.push(newUser);

    return HttpResponse.json({
      user: { username: newUser.username, email: newUser.email },
      message: "Registration successful",
    });
  }),

  // Employee management endpoints
  http.get("/api/v1/employees", () => {
    return HttpResponse.json(employees);
  }),

  http.post("/api/v1/employees", async ({ request }) => {
    const { nom, email, role } = (await request.json()) as Omit<Employee, "id">;
    const newEmployee: Employee = {
      id: nextEmpId++,
      nom,
      email,
      role,
    };
    employees.push(newEmployee);
    return HttpResponse.json(newEmployee, { status: 201 });
  }),

  http.put("/api/v1/employees/:id", async ({ request, params }) => {
    const id = parseInt(params.id as string);
    const updates = (await request.json()) as Partial<Employee>;
    
    const empIndex = employees.findIndex((emp) => emp.id === id);
    if (empIndex === -1) {
      return HttpResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    employees[empIndex] = { ...employees[empIndex], ...updates };
    return HttpResponse.json(employees[empIndex]);
  }),

  http.delete("/api/v1/employees/:id", ({ params }) => {
    const id = parseInt(params.id as string);
    const empIndex = employees.findIndex((emp) => emp.id === id);
    
    if (empIndex === -1) {
      return HttpResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    employees.splice(empIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
