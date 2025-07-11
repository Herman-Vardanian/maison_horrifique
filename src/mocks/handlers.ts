import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/api/v1/sessions', () => {
    return HttpResponse.json(
      [
        {
          id: '1',
          title: 'La Maison Hantée',
          difficulty: 'Moyen',
          maxPlayers: 6,
          duration: 60,
          description: 'Explorez une vieille demeure où règnent des présences malveillantes.',
          theme: 'Horreur',
          availability: true,
          image: './img/maison_hantee.png',
        },
        {
          id: '2',
          title: 'Asile Abandonné',
          difficulty: 'Difficile',
          maxPlayers: 5,
          duration: 75,
          description: 'Vous êtes enfermés dans un asile hanté, déjouez ses secrets pour vous échapper.',
          theme: 'Horreur',
          availability: false,
          image: './img/asile_abandonne.png',
        },
        {
          id: '3',
          title: 'Cimetière Maudit',
          difficulty: 'Facile',
          maxPlayers: 4,
          duration: 45,
          description: 'Affrontez les esprits qui errent dans un cimetière sombre.',
          theme: 'Horreur',
          availability: true,
          image: './img/cimetiere_maudit.png',
        },
        {
          id: '4',
          title: 'Labyrinthe Sombre',
          difficulty: 'Moyen',
          maxPlayers: 8,
          duration: 90,
          description: 'Perdez-vous dans un labyrinthe où la peur guette à chaque tournant.',
          theme: 'Horreur',
          availability: true,
          image: './img/labyrinthe_sombre.png',
        },
        {
          id: '5',
          title: 'Chambre du Docteur Fou',
          difficulty: 'Difficile',
          maxPlayers: 3,
          duration: 60,
          description: 'Échappez aux expérimentations macabres du docteur fou.',
          theme: 'Horreur',
          availability: false,
          image: './img/chambre_docteur_fou.png',
        },
      ],
      { headers: { 'Content-Type': 'application/json' } }
    )
  }),
  http.get('/api/v1/sessions/:id', ({ params }) => {
    const { id } = params;
    const sessions = [
      {
        id: '1',
        title: 'La Maison Hantée',
        difficulty: 'Moyen',
        maxPlayers: 6,
        duration: 60,
        description: 'Explorez une vieille demeure où règnent des présences malveillantes.',
        theme: 'Horreur',
        availability: true,
        image: './img/maison_hantee.png',
      },
      {
        id: '2',
        title: 'Asile Abandonné',
        difficulty: 'Difficile',
        maxPlayers: 5,
        duration: 75,
        description: 'Vous êtes enfermés dans un asile hanté, déjouez ses secrets pour vous échapper.',
        theme: 'Horreur',
        availability: false,
        image: './img/asile_abandonne.png',
      },
      {
        id: '3',
        title: 'Cimetière Maudit',
        difficulty: 'Facile',
        maxPlayers: 4,
        duration: 45,
        description: 'Affrontez les esprits qui errent dans un cimetière sombre.',
        theme: 'Horreur',
        availability: true,
        image: './img/cimetiere_maudit.png',
      },
      {
        id: '4',
        title: 'Labyrinthe Sombre',
        difficulty: 'Moyen',
        maxPlayers: 8,
        duration: 90,
        description: 'Perdez-vous dans un labyrinthe où la peur guette à chaque tournant.',
        theme: 'Horreur',
        availability: true,
        image: './img/labyrinthe_sombre.png',
      },
      {
        id: '5',
        title: 'Chambre du Docteur Fou',
        difficulty: 'Difficile',
        maxPlayers: 3,
        duration: 60,
        description: 'Échappez aux expérimentations macabres du docteur fou.',
        theme: 'Horreur',
        availability: false,
        image: './img/chambre_docteur_fou.png',
      },
    ];

    const session = sessions.find((s) => s.id === id);

    if (!session) {
      return new HttpResponse('Session non trouvée', { status: 404 });
    }

    return HttpResponse.json(session);
  }),
  http.post('/api/v1/sessions', async ({ request }) => {
    const newSession = await request.json();
    return HttpResponse.json(
      {
        message: 'Session créée avec succès',
        session: newSession,
      },
      { status: 201 }
    );
  }),
  http.put('/api/v1/sessions/:id', async ({ request, params }) => {
    const updatedSession = await request.json();
    const { id } = params;

    return HttpResponse.json(
      {
        message: `Session ${id} modifiée avec succès`,
        session: { ...(typeof updatedSession === 'object' && updatedSession !== null ? updatedSession : {}), id },
      },
      { status: 200 }
    );
  }),
]