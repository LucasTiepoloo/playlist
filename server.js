// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  { id: 1, nome: "Mc Kevin", pais: "Brasil" },
  { id: 2, nome: "Maneva", pais: "Brasil" },
  { id: 3, nome: "O Rappa", pais: "Brasil" },
  { id: 4, nome: "Mc IG", pais: "Brasil" },
];

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----
const musicas = [
  { id: 1, titulo: "Cavalo de Troia", artistaId: 1, duracao: "225" },
  { id: 2, titulo: "Luz que me traz paz", artistaId: 2, duracao: "225" },
  { id: 3, titulo: "o Destino Não quis", artistaId: 2, duracao: "225" },
  { id: 4, titulo: "Anjos(pra quem tem fé)", artistaId: 3, duracao: "225" },
  { id: 5, titulo: "Madrugada", artistaId: 4, duracao: "225" },
  { id: 6, titulo: "Feriado", artistaId: 4, duracao: "225" },
];

// 1) LISTAR ARTISTAS
app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// 2) LISTAR MUSICAS (juntando cada musica com o seu artista)
app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);

    return {
      id: m.id,
      titulo: m.titulo,
      duracao: m.duracao,
      artista: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-",
    };
  });

  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doArtista = musicas
    .filter((m) => m.artistaId === id)
    .map((m) => ({
      id: m.id,
      titulo: m.titulo,
      duracao: m.duracao,
    }));

  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
});


