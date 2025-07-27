import React, { useState } from 'react';
import { Sparkles, Heart, Star, Rocket, Crown, Camera, Stethoscope, Palette, Music, Code, Plane, Trophy, Brain, Zap, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  professions: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Te gusta ayudar a las personas cuando están enfermas?",
    professions: ["doctor", "doctora", "enfermero", "enfermera", "veterinario", "veterinaria"]
  },
  {
    id: 2,
    text: "¿Te encanta dibujar, pintar o crear cosas bonitas?",
    professions: ["artista", "diseñador", "diseñadora", "arquitecto", "arquitecta"]
  },
  {
    id: 3,
    text: "¿Te gusta cantar, tocar instrumentos o escuchar música?",
    professions: ["músico", "música", "cantante", "compositor", "compositora"]
  },
  {
    id: 4,
    text: "¿Te fascina la tecnología y las computadoras?",
    professions: ["programador", "programadora", "ingeniero", "ingeniera", "científico", "científica"]
  },
  {
    id: 5,
    text: "¿Sueñas con volar por el cielo o viajar por el espacio?",
    professions: ["piloto", "pilota", "astronauta", "capitán", "capitana"]
  },
  {
    id: 6,
    text: "¿Te gusta tomar fotos y capturar momentos especiales?",
    professions: ["fotógrafo", "fotógrafa", "periodista", "reportero", "reportera"]
  },
  {
    id: 7,
    text: "¿Te emociona hacer deporte y competir?",
    professions: ["deportista", "entrenador", "entrenadora", "atleta"]
  },
  {
    id: 8,
    text: "¿Te gusta enseñar cosas nuevas a otros niños?",
    professions: ["maestro", "maestra", "profesor", "profesora", "educador", "educadora"]
  },
  {
    id: 9,
    text: "¿Te gustaría proteger a las personas y mantener la paz?",
    professions: ["policía", "bombero", "bombera", "soldado", "soldada"]
  },
  {
    id: 10,
    text: "¿Te encanta cocinar y crear comidas deliciosas?",
    professions: ["chef", "cocinero", "cocinera", "panadero", "panadera"]
  }
];

const professionIcons: { [key: string]: React.ReactNode } = {
  doctor: <Stethoscope className="w-12 h-12" />,
  doctora: <Stethoscope className="w-12 h-12" />,
  enfermero: <Heart className="w-12 h-12" />,
  enfermera: <Heart className="w-12 h-12" />,
  veterinario: <Heart className="w-12 h-12" />,
  veterinaria: <Heart className="w-12 h-12" />,
  artista: <Palette className="w-12 h-12" />,
  diseñador: <Palette className="w-12 h-12" />,
  diseñadora: <Palette className="w-12 h-12" />,
  arquitecto: <Palette className="w-12 h-12" />,
  arquitecta: <Palette className="w-12 h-12" />,
  músico: <Music className="w-12 h-12" />,
  música: <Music className="w-12 h-12" />,
  cantante: <Music className="w-12 h-12" />,
  compositor: <Music className="w-12 h-12" />,
  compositora: <Music className="w-12 h-12" />,
  programador: <Code className="w-12 h-12" />,
  programadora: <Code className="w-12 h-12" />,
  ingeniero: <Code className="w-12 h-12" />,
  ingeniera: <Code className="w-12 h-12" />,
  científico: <Brain className="w-12 h-12" />,
  científica: <Brain className="w-12 h-12" />,
  piloto: <Plane className="w-12 h-12" />,
  pilota: <Plane className="w-12 h-12" />,
  astronauta: <Rocket className="w-12 h-12" />,
  capitán: <Plane className="w-12 h-12" />,
  capitana: <Plane className="w-12 h-12" />,
  fotógrafo: <Camera className="w-12 h-12" />,
  fotógrafa: <Camera className="w-12 h-12" />,
  periodista: <Camera className="w-12 h-12" />,
  reportero: <Camera className="w-12 h-12" />,
  reportera: <Camera className="w-12 h-12" />,
  deportista: <Trophy className="w-12 h-12" />,
  entrenador: <Trophy className="w-12 h-12" />,
  entrenadora: <Trophy className="w-12 h-12" />,
  atleta: <Trophy className="w-12 h-12" />,
  maestro: <Star className="w-12 h-12" />,
  maestra: <Star className="w-12 h-12" />,
  profesor: <Star className="w-12 h-12" />,
  profesora: <Star className="w-12 h-12" />,
  educador: <Star className="w-12 h-12" />,
  educadora: <Star className="w-12 h-12" />,
  policía: <Crown className="w-12 h-12" />,
  bombero: <Crown className="w-12 h-12" />,
  bombera: <Crown className="w-12 h-12" />,
  soldado: <Crown className="w-12 h-12" />,
  soldada: <Crown className="w-12 h-12" />,
  chef: <Heart className="w-12 h-12" />,
  cocinero: <Heart className="w-12 h-12" />,
  cocinera: <Heart className="w-12 h-12" />,
  panadero: <Heart className="w-12 h-12" />,
  panadera: <Heart className="w-12 h-12" />
};

type GameState = 'start' | 'playing' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [name, setName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [guessedProfession, setGuessedProfession] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const startGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setGameState('playing');
      setCurrentQuestionIndex(0);
      setAnswers([]);
    }
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Simular que la IA está "pensando"
      setIsThinking(true);
      setTimeout(() => {
        const profession = calculateProfession(newAnswers);
        setGuessedProfession(profession);
        setGameState('result');
        setIsThinking(false);
      }, 2000);
    }
  };

  const calculateProfession = (userAnswers: boolean[]): string => {
    const professionScores: { [key: string]: number } = {};
    
    // Calcular puntuaciones basadas en las respuestas
    userAnswers.forEach((answer, index) => {
      if (answer) {
        questions[index].professions.forEach(profession => {
          professionScores[profession] = (professionScores[profession] || 0) + 1;
        });
      }
    });

    // Encontrar la profesión con mayor puntuación
    let maxScore = 0;
    let bestProfession = 'artista'; // profesión por defecto
    
    Object.entries(professionScores).forEach(([profession, score]) => {
      if (score > maxScore) {
        maxScore = score;
        bestProfession = profession;
      }
    });

    return bestProfession;
  };

  const resetGame = () => {
    setGameState('start');
    setName('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGuessedProfession('');
    setIsThinking(false);
  };

  const getRandomIcon = () => {
    return professionIcons[guessedProfession] || <Star className="w-12 h-12" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-600 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-bounce">
          <Brain className="w-8 h-8 text-yellow-300" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Zap className="w-6 h-6 text-pink-300" />
        </div>
        <div className="absolute bottom-20 left-20 animate-spin" style={{ animationDuration: '3s' }}>
          <Sparkles className="w-10 h-10 text-cyan-300" />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <Rocket className="w-8 h-8 text-orange-300" />
        </div>
        <div className="absolute top-1/2 left-5 animate-pulse" style={{ animationDelay: '2s' }}>
          <Star className="w-6 h-6 text-yellow-300" />
        </div>
        <div className="absolute top-1/3 right-5 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-red-300" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {gameState === 'start' && (
          /* Pantalla de inicio */
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 animate-pulse">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                ¡Hola pequeño soñador!
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Soy tu amiga Clarividencia y voy a adivinar
              </p>
              <p className="text-xl font-bold text-purple-600">
                ¿Qué quieres ser cuando seas grande? 🤖✨
              </p>
            </div>

            <form onSubmit={startGame} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-500" />
                  Primero, ¿cómo te llamas?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 text-lg transition-all duration-300 bg-purple-50"
                  placeholder="Escribe tu nombre aquí..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center space-x-2"
              >
                <Brain className="w-6 h-6" />
                <span>¡Empezar el juego!</span>
              </button>
            </form>
          </div>
        )}

        {gameState === 'playing' && !isThinking && (
          /* Pantalla de preguntas */
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-4 animate-bounce">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                ¡Hola {name}! 👋
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Responde mis preguntas y adivinaré tu futuro
              </p>
              <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-full p-2 mb-4">
                <p className="text-sm font-semibold text-gray-600">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-dashed border-orange-300 mb-8">
              <p className="text-2xl font-bold text-gray-700 text-center animate-pulse">
                {questions[currentQuestionIndex].text}
              </p>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => handleAnswer(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl text-xl flex items-center space-x-3"
              >
                <CheckCircle className="w-8 h-8" />
                <span>¡SÍ!</span>
              </button>
              
              <button
                onClick={() => handleAnswer(false)}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-red-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl text-xl flex items-center space-x-3"
              >
                <XCircle className="w-8 h-8" />
                <span>No</span>
              </button>
            </div>

            {/* Barra de progreso */}
            <div className="mt-8">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {isThinking && (
          /* Pantalla de "pensando" */
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-6 animate-spin">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4 animate-pulse">
              🤖 Analizando...
            </h2>
            <p className="text-xl text-gray-600 animate-bounce">
              ¡Estoy procesando tus respuestas!
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {gameState === 'result' && (
          /* Resultado final */
          <div className="text-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-2xl transform">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-6 animate-spin" style={{ animationDuration: '2s' }}>
                  {getRandomIcon()}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-700 animate-pulse">
                  🎉 ¡LO ADIVINÉ! 🎉
                </h2>
                
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-4 border-rainbow animate-pulse">
                  <p className="text-2xl text-gray-700 mb-4 font-semibold">
                    ¡Hola {name}!
                  </p>
                  
                  <p className="text-xl text-gray-600 mb-4">
                    Según mis cálculos de IA, tú serás un/a increíble:
                  </p>
                  
                  <p className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-bounce" style={{ animationDelay: '1s' }}>
                    {guessedProfession.toUpperCase()}
                  </p>
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
                  <Brain className="w-8 h-8 text-purple-500 animate-pulse" />
                  <Zap className="w-8 h-8 text-blue-500 animate-bounce" />
                </div>

                <p className="text-xl text-gray-600 font-medium animate-pulse" style={{ animationDelay: '1.5s' }}>
                  ¡La IA nunca se equivoca! 🤖✨
                </p>

                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-2xl hover:from-green-600 hover:to-blue-600 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center space-x-2"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>¡Jugar de nuevo!</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;