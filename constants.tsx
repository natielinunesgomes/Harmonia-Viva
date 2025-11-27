import React from 'react';
import { Lesson, Track } from './types';
import { TipBox, WarningBox, Step, LinkBtn } from './components/LessonContent';
import { Music, DollarSign } from 'lucide-react';

const CREATION_LESSONS: Lesson[] = [
  {
    id: 'intro',
    trackId: 'creation',
    title: '1. O Início da Revolução Musical',
    description: 'Entenda o que é o Suno AI, modelos de IA e prepare seu terreno para criar hits.',
    duration: '8 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p>
          O <strong>Suno AI</strong> não é apenas um gerador de sons; é uma DAW (Digital Audio Workstation) generativa completa. 
          Diferente de outras IAs, o Suno compõe a melodia, a harmonia, escreve a letra (se você pedir) e ainda canta com vozes hiper-realistas.
        </p>
        
        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Os Modelos: v3 vs v3.5</h3>
        <p>Atualmente, o Suno opera com dois modelos principais que você pode escolher:</p>
        <ul className="space-y-3 mt-4 mb-8">
          <li className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <strong className="text-pink-400">Modelo v3:</strong> Mais criativo e "alucinado". Gera clipes de até 2 minutos. Ótimo para estilos experimentais.
          </li>
          <li className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
            <strong className="text-violet-400">Modelo v3.5 (Recomendado):</strong> Gera clipes de até 4 minutos. Tem melhor estrutura de música (verso-refrão) e qualidade de áudio superior.
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Sua Conta e Créditos</h3>
        <p>Para começar, acesse <LinkBtn href="https://suno.com">suno.com</LinkBtn> e crie sua conta.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gray-700 text-xs px-2 py-1 rounded-bl">Iniciante</div>
            <h4 className="font-bold text-green-400 mb-2">Plano Basic</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• 50 créditos/dia (Grátis)</li>
              <li>• ~10 músicas diárias</li>
              <li>• <strong>Sem uso comercial</strong></li>
              <li>• Fila de espera lenta</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-pink-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs px-2 py-1 rounded-bl font-bold">Popular</div>
            <h4 className="font-bold text-pink-400 mb-2">Plano Pro</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• 2.500 créditos/mês</li>
              <li>• 500 músicas</li>
              <li>• <strong>Uso Comercial Liberado</strong></li>
              <li>• Gerações rápidas</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-violet-400 mb-2">Plano Premier</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• 10.000 créditos/mês</li>
              <li>• 2.000 músicas</li>
              <li>• Uso Comercial Liberado</li>
              <li>• Prioridade máxima</li>
            </ul>
          </div>
        </div>

        <TipBox>
          <strong>Dica Pro:</strong> Você pode começar no plano gratuito para aprender. Se criar um hit viral, você pode assinar o Pro <em>antes</em> de monetizar para garantir os direitos futuros, mas o ideal é já estar no Pro no momento da criação (veja a Lição 7).
        </TipBox>
      </>
    )
  },
  {
    id: 'interface',
    trackId: 'creation',
    title: '2. Navegando e Criando (Modo Simples)',
    description: 'A interface do Suno e como criar sua primeira música sem complicação.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p>A interface do Suno pode parecer intimidadora, mas foca em três abas principais no menu esquerdo:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
          <li><strong>Create:</strong> Onde a mágica acontece.</li>
          <li><strong>Library:</strong> Onde ficam suas músicas salvas.</li>
          <li><strong>Explore:</strong> Para ouvir o que outros criadores estão fazendo (ótimo para copiar prompts!).</li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Modo Simples (Simple Mode)</h3>
        <p>Ao clicar em <strong>Create</strong>, certifique-se de que a chavinha "Custom Mode" no topo está <strong>DESLIGADA</strong>. Isso ativa o Modo Simples.</p>
        <p>O Modo Simples é como conversar com um amigo. Você só tem um campo: <strong>Song Description</strong>.</p>

        <Step number={1} title="Descreva a Vibe e o Tema">
          <p>Não precisa ser técnico. Fale sobre sentimento e estilo.</p>
          <p className="mt-2 text-sm bg-black/40 p-2 rounded border-l-2 border-green-500"><em>Ex: "Uma música eletrônica energética para academia, estilo anos 90, motivadora."</em></p>
        </Step>
        <Step number={2} title="Instrumental (Opcional)">
          Marque a caixa "Instrumental" se você quer apenas a batida, sem ninguém cantando. Ótimo para música de fundo de vídeos (background music).
        </Step>
        <Step number={3} title="Gerar">
          Clique em "Create". O Suno criará <strong>duas variações</strong> da música. Ele vai inventar um nome, uma letra e uma capa para o álbum.
        </Step>

        <WarningBox>
          O Modo Simples é "caixa preta". Você não escolhe a letra exata nem a estrutura. Use-o para ter ideias rápidas ou quando estiver com bloqueio criativo. Para controle total, precisamos do Custom Mode.
        </WarningBox>
      </>
    )
  },
  {
    id: 'custom_mode',
    trackId: 'creation',
    title: '3. Engenharia de Prompts (Custom Mode)',
    description: 'Domine o "Style of Music" e separe a Letra do Estilo.',
    duration: '15 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>Ative a chave <strong>Custom Mode</strong>. Agora você tem o painel de controle de um produtor musical. Temos dois campos cruciais:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-gray-800 p-5 rounded-xl border-t-4 border-pink-500">
            <h4 className="text-xl font-bold text-white mb-2">1. Lyrics (Letra)</h4>
            <p className="text-gray-400 text-sm">Cole sua letra aqui. O Suno canta em qualquer idioma (Português, Inglês, Japonês, Latim...). Você também pode clicar em "Generate Lyrics" para a IA escrever para você sobre um tema.</p>
          </div>
          <div className="bg-gray-800 p-5 rounded-xl border-t-4 border-violet-500">
            <h4 className="text-xl font-bold text-white mb-2">2. Style of Music</h4>
            <p className="text-gray-400 text-sm">Onde você define a sonoridade. É aqui que a maioria das pessoas erra.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">A Fórmula do Style Prompt</h3>
        <p>O campo "Style of Music" não entende frases longas poéticas. Ele entende <strong>Tags</strong> (palavras-chave). A melhor estrutura é:</p>
        
        <div className="bg-black/50 p-6 rounded-xl border border-gray-700 text-center my-6">
          <span className="text-green-400 font-bold">[Gênero Base]</span>, <span className="text-blue-400 font-bold">[Sub-gênero]</span>, <span className="text-yellow-400 font-bold">[Vibe/Emoção]</span>, <span className="text-purple-400 font-bold">[Instrumentos Específicos]</span>, <span className="text-pink-400 font-bold">[Voz]</span>, <span className="text-gray-400 font-bold">[BPM]</span>
        </div>

        <h4 className="font-bold text-white mb-2">Exemplo Prático:</h4>
        <p className="mb-4">Em vez de escrever: <em>"Quero uma música triste tipo Linkin Park"</em> (O Suno pode bloquear nomes de bandas), escreva:</p>
        <p className="font-mono bg-gray-900 p-3 rounded text-green-300 text-sm">
          Nu-metal, Rap rock, emotional, distorted electric guitars, heavy drums, sad piano intro, male vocals, angsty, 90bpm
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Elementos que funcionam bem:</h3>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <li>• <strong>Décadas:</strong> 80s, 90s, 2000s</li>
          <li>• <strong>Qualidade:</strong> Lo-fi, Studio Quality, Live Recording</li>
          <li>• <strong>Vozes:</strong> Male, Female, Choir, Autotune, Whispering</li>
          <li>• <strong>Velocidade:</strong> Slow, Fast, Upbeat, 140bpm</li>
        </ul>

        <TipBox>
          Use o <strong>Gerador de Prompts</strong> no menu desta plataforma! Ele já aplica essa fórmula automaticamente para você.
        </TipBox>
      </>
    )
  },
  {
    id: 'metatags',
    trackId: 'creation',
    title: '4. Metatags: O Maestro da IA',
    description: 'Controle a estrutura da música: Solos, Intros, Duetos e finais perfeitos.',
    duration: '20 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          Se você colar apenas a letra, o Suno vai tentar adivinhar onde é o refrão e o verso. Muitas vezes ele erra.
          Para "maestrar" a IA, usamos <strong>Metatags</strong> dentro do campo Lyrics. São comandos entre colchetes <code className="text-yellow-400">[]</code>.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Estrutura Básica</h3>
        <div className="space-y-3 font-mono text-sm">
          <div className="bg-gray-800 p-2 rounded flex gap-3"><span className="text-yellow-400 w-24 shrink-0">[Intro]</span> <span>Começo instrumental (10-20s).</span></div>
          <div className="bg-gray-800 p-2 rounded flex gap-3"><span className="text-yellow-400 w-24 shrink-0">[Verse]</span> <span>Conta a história. Energia mais baixa.</span></div>
          <div className="bg-gray-800 p-2 rounded flex gap-3"><span className="text-yellow-400 w-24 shrink-0">[Chorus]</span> <span>O Refrão. Parte mais energética e repetitiva.</span></div>
          <div className="bg-gray-800 p-2 rounded flex gap-3"><span className="text-yellow-400 w-24 shrink-0">[Bridge]</span> <span>Ponte. Uma mudança de melodia antes do final.</span></div>
          <div className="bg-gray-800 p-2 rounded flex gap-3"><span className="text-yellow-400 w-24 shrink-0">[Outro]</span> <span>Finalização da música.</span></div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tags Avançadas (O Segredo)</h3>
        <p className="mb-4">Quer elevar o nível? Use estas tags para forçar comportamentos específicos:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <h4 className="font-bold text-pink-400 mb-2">Instrumentais</h4>
            <ul className="text-sm space-y-2">
              <li><code className="bg-gray-800 px-1 rounded">[Guitar Solo]</code> - Força um solo.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Bass Drop]</code> - Para eletrônica.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Instrumental Break]</code> - Pausa na voz.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Silence]</code> - Pausa dramática.</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <h4 className="font-bold text-violet-400 mb-2">Vocais & Emoção</h4>
            <ul className="text-sm space-y-2">
              <li><code className="bg-gray-800 px-1 rounded">[Spoken Word]</code> - Fala falada, não cantada.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Whisper]</code> - Sussurro.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Shout]</code> - Grito/Voz alta.</li>
              <li><code className="bg-gray-800 px-1 rounded">[Choir]</code> - Coro/Vozes de fundo.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Exemplo de Estrutura Completa</h3>
        <pre className="bg-gray-950 p-4 rounded-xl text-xs md:text-sm text-gray-300 border border-gray-800 overflow-x-auto">
{`[Intro]
(Melodic Piano)

[Verse 1]
Hoje o dia amanheceu cinza...

[Pre-Chorus]
Mas eu sinto que vai mudar...

[Chorus]
(Power Vocals)
O sol vai brilhar outra vez!
Sim, ele vai brilhar!

[Guitar Solo]

[Bridge]
Nada pode me parar agora...

[Chorus]
O sol vai brilhar outra vez!

[Outro]
(Fade out to silence)`}
        </pre>

        <WarningBox>
          Metatags não são garantia de 100%. Às vezes a IA ignora. Se ignorar, tente gerar novamente ou mude ligeiramente a posição da tag.
        </WarningBox>
      </>
    )
  },
  {
    id: 'workflow_extend',
    trackId: 'creation',
    title: '5. Workflow Profissional: Extend & Get Whole Song',
    description: 'Como criar músicas de 3 a 5 minutos juntando as melhores partes.',
    duration: '18 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          O erro número 1 dos iniciantes é tentar gerar a música inteira de uma vez. O Suno gera blocos de 2 a 4 minutos. 
          Para fazer uma música completa e coesa, você deve usar a função <strong>Extend</strong>.
        </p>

        <Step number={1} title="Gere a Primeira Parte (Parte 1)">
          Crie a música focando na <strong>[Intro]</strong> e no <strong>[Verse 1]</strong> e talvez o primeiro <strong>[Chorus]</strong>.
          Não coloque a letra inteira aqui! Coloque apenas o primeiro minuto de letra.
        </Step>

        <Step number={2} title="Escolha a Melhor e Clique em EXTEND">
          Gostou de uma das versões? Não baixe ainda. Clique nos três pontinhos (...) e selecione <strong>Extend</strong>.
          <br/><br/>
          O que muda?
          <ul className="list-disc list-inside mt-2 text-gray-400">
            <li>O campo "Style of Music" fica travado (para manter a consistência).</li>
            <li>O campo "Extension From" mostra de onde a música vai continuar.</li>
            <li>O campo "Lyrics" fica limpo para você colocar a <strong>próxima parte</strong> da letra (Verso 2, Solo, etc).</li>
          </ul>
        </Step>

        <Step number={3} title="Continue Extendendo">
          Gere a extensão (Parte 2). Se gostar, clique em Extend <em>nesta Parte 2</em> para criar a Parte 3 (Final).
          <br/>
          Na última parte, certifique-se de usar a tag <strong>[End]</strong> ou <strong>[Outro]</strong> para a IA saber que deve parar.
        </Step>

        <Step number={4} title="Get Whole Song (Juntar Tudo)">
          Quando você tiver todas as partes (Parte 1 + Parte 2 + Parte 3), vá na última parte gerada (a final), clique nos três pontinhos e selecione <strong>Get Whole Song</strong>.
          <br/><br/>
          O Suno vai "costurar" todas as partes em um único arquivo de áudio perfeito, sem cortes audíveis. Essa é sua música final.
        </Step>

        <TipBox>
          <strong>Dica de Mestre:</strong> No campo "Extension From", você pode mudar o tempo exato de onde a música continua. Se o final da Parte 1 ficou estranho, volte o contador alguns segundos para a IA refazer a transição.
        </TipBox>
      </>
    )
  },
  {
    id: 'brazilian_styles',
    trackId: 'creation',
    title: '6. Estilos Brasileiros e Prompts Prontos',
    description: 'Como criar Sertanejo, Funk, MPB e Rock Nacional com perfeição.',
    duration: '12 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>O Suno foi treinado com muita música brasileira. Você pode conseguir resultados impressionantes usando os termos certos em inglês e português.</p>

        <div className="space-y-6 mt-6">
          
          <div className="bg-gray-800/50 p-4 rounded-xl border-l-4 border-green-500 hover:bg-gray-800 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">🎸 Sertanejo Universitário</h4>
            <p className="text-gray-400 text-sm mb-2">Evite "Gusttavo Lima". Descreva os instrumentos.</p>
            <div className="bg-black/40 p-3 rounded font-mono text-green-400 text-sm break-words">
              Sertanejo universitário, acoustic guitar, accordion (sanfona), male vocals, romantic lyrics, upbeat pop sertanejo, 120bpm, energetic chorus
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-xl border-l-4 border-yellow-500 hover:bg-gray-800 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">🏖️ Bossa Nova / MPB</h4>
            <div className="bg-black/40 p-3 rounded font-mono text-yellow-400 text-sm break-words">
              Bossa nova, MPB, soft female vocals, nylon string guitar, piano jazz, subtle percussion, relaxing beach vibe, Rio de Janeiro style, sophisticated harmony
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-xl border-l-4 border-purple-500 hover:bg-gray-800 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">🥁 Funk Carioca / Mandelão</h4>
            <p className="text-gray-400 text-sm mb-2">Use "Phonk" para ajudar a IA a entender a distorção do grave.</p>
            <div className="bg-black/40 p-3 rounded font-mono text-purple-400 text-sm break-words">
              Brazilian Funk, Funk Carioca, heavy bass, rhythmic percussion, repetitive vocal samples, party atmosphere, energetic, dance, favela funk
            </div>
          </div>

          <div className="bg-gray-800/50 p-4 rounded-xl border-l-4 border-red-500 hover:bg-gray-800 transition-colors">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">🤘 Rock Nacional 80s</h4>
            <div className="bg-black/40 p-3 rounded font-mono text-red-400 text-sm break-words">
              Brazilian Rock, Post-punk influence, 80s vibe, distorted guitars, energetic drums, male vocals, rebellious, poetic lyrics, Legião Urbana style
            </div>
          </div>

        </div>

        <TipBox>
          Para o forró e piseiro, use termos como <strong>"accordion centric"</strong>, <strong>"electronic keyboard"</strong> e <strong>"syncopated rhythm"</strong>.
        </TipBox>
      </>
    )
  },
  {
    id: 'legal',
    trackId: 'creation',
    title: '7. Direitos Autorais e Termos de Uso',
    description: 'O que você PODE e NÃO PODE fazer (Baseado nos Termos Oficiais).',
    duration: '10 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="text-lg mb-6">
          Esta é a parte mais importante para quem quer levar a música a sério. 
          As regras abaixo são baseadas nos <LinkBtn href="https://suno.com/terms">Termos de Serviço Oficiais do Suno</LinkBtn>.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Quem é o dono da música?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-900/10 border border-red-500/30 p-6 rounded-xl">
            <h4 className="font-bold text-red-400 mb-3 text-lg">Plano Gratuito (Free)</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">❌ <strong>Você NÃO é dono:</strong> O Suno detém a propriedade da gravação.</li>
              <li className="flex items-start gap-2">❌ <strong>Sem Monetização:</strong> Você não pode subir no Spotify, Apple Music ou ativar anúncios no YouTube.</li>
              <li className="flex items-start gap-2">✅ <strong>Uso Social:</strong> Você pode postar no Instagram/TikTok, mas DEVE dar crédito (ex: "Made with Suno").</li>
            </ul>
          </div>
          
          <div className="bg-green-900/10 border border-green-500/30 p-6 rounded-xl">
            <h4 className="font-bold text-green-400 mb-3 text-lg">Planos Pagos (Pro/Premier)</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">✅ <strong>Você É O DONO:</strong> A propriedade total da música é sua.</li>
              <li className="flex items-start gap-2">✅ <strong>Monetização Liberada:</strong> Pode vender, licenciar, usar em comerciais de TV, Spotify, etc.</li>
              <li className="flex items-start gap-2">✅ <strong>Sem Créditos:</strong> Não é obrigado a dizer que foi feito com IA (embora seja ético).</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Regras de "Input" (Upload de Áudio)</h3>
        <p>O Suno agora permite que você faça upload de um áudio para estender. Cuidado aqui:</p>
        <WarningBox>
          Você <strong>NÃO PODE</strong> fazer upload de músicas protegidas por direitos autorais que não sejam suas. 
          <br/>Exemplo: Você não pode subir um trecho de uma música da Anitta e pedir pro Suno terminar. Isso viola os termos e pode banir sua conta.
          <br/>Use apenas suas próprias gravações (violão, voz) ou samples livres de royalties.
        </WarningBox>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Links Oficiais Importantes</h3>
        <ul className="space-y-4">
          <li>
            <LinkBtn href="https://suno.com/terms">Termos de Serviço Completos</LinkBtn>
            <p className="text-sm text-gray-500 ml-5">O documento jurídico oficial.</p>
          </li>
          <li>
            <LinkBtn href="https://help.suno.com/">Central de Ajuda e FAQs</LinkBtn>
            <p className="text-sm text-gray-500 ml-5">Respostas para dúvidas frequentes sobre faturamento e direitos.</p>
          </li>
        </ul>
      </>
    )
  }
];

const MONETIZATION_LESSONS: Lesson[] = [
  {
    id: 'seo_youtube_advanced',
    trackId: 'monetization',
    title: '1. SEO de Elite: Domine a Busca do YouTube',
    description: 'Aprenda sobre Cauda Longa, Tags secretas e como ser encontrado.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p>
          O YouTube é o segundo maior motor de busca do mundo. A maioria dos músicos IA falha porque posta "Música Legal 01" e espera viralizar. 
          Você precisa de engenharia de descoberta.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">A Estratégia da Cauda Longa</h3>
        <p>Não tente competir com termos gigantes como "Jazz" ou "Lo-fi". Você vai perder para canais com milhões de inscritos.</p>
        
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-red-500 opacity-70">
            <span className="text-red-400 font-bold block mb-1">Cauda Curta (Impossível rankear)</span>
            <p className="text-xl">"Música Relaxante"</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-green-500">
            <span className="text-green-400 font-bold block mb-1">Cauda Longa (Onde está o dinheiro)</span>
            <p className="text-lg">"Música Relaxante para Gatos Dormirem em Dias de Chuva"</p>
          </div>
        </div>

        <Step number={1} title="Títulos Magnéticos">
          Use a fórmula: <strong>[Benefício Específico]</strong> + <strong>[Gênero Musical]</strong> + <strong>[Elemento Extra]</strong>.
          <br/>Ex: <em>"Foco Instantâneo ⚡ Dark Techno para Programar e Hackear [Sem Vocal]"</em>
        </Step>

        <Step number={2} title="O Segredo das Tags do Suno">
          O próprio prompt que você usou no Suno é uma mina de ouro de SEO.
          <br/>Se você usou <em>"atmospheric, reverb, 80s synth"</em>, coloque essas EXATAS palavras nas tags do seu vídeo. As pessoas procuram por essa sonoridade específica.
        </Step>

        <TipBox>
          Use ferramentas como <strong>Google Trends</strong> para ver o que está em alta. Se "Cyberpunk" está na moda por causa de um jogo, crie "Cyberpunk Music" imediatamente.
        </TipBox>
      </>
    )
  },
  {
    id: 'niches',
    trackId: 'monetization',
    title: '2. Nichos Lucrativos e Pouco Explorados',
    description: 'Além do Lofi: Pets, Datas Comemorativas e Frequências.',
    duration: '18 min',
    level: 'Business',
    content: () => (
      <>
        <p>
          Não atire para todo lado. Escolha um nicho e domine-o. O algoritmo adora consistência.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">1. Música para Pets 🐾</h3>
        <p>Um dos nichos mais fiéis. Donos deixam a TV ligada o dia todo para o cachorro não se sentir sozinho.</p>
        <ul className="list-disc list-inside mt-2 text-gray-400">
          <li><strong>Prompt Sugerido:</strong> <em>"Calming music for dogs, soft piano, minimal, slow tempo, no sudden noises, healing frequency"</em></li>
          <li><strong>Duração:</strong> Faça vídeos de 8 a 10 horas (looping).</li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">2. Datas Comemorativas 🎂</h3>
        <p>O volume de busca explode em datas específicas. Prepare o conteúdo com 1 mês de antecedência.</p>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="bg-gray-800 p-3 rounded">🎄 <strong>Natal:</strong> Jazz Natalino, Lofi Christmas.</div>
          <div className="bg-gray-800 p-3 rounded">🎃 <strong>Halloween:</strong> Spooky Ambient, Horror Soundscapes.</div>
          <div className="bg-gray-800 p-3 rounded">🎂 <strong>Aniversário:</strong> "Parabéns pra Você" em estilo Bossa Nova ou Heavy Metal.</div>
          <div className="bg-gray-800 p-3 rounded">❤️ <strong>Dia dos Namorados:</strong> Romantic Dinner Jazz.</div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">3. Backing Tracks (Para Músicos) 🎸</h3>
        <p>Músicos precisam de bases para treinar. O CPM (pago por visualização) aqui costuma ser mais alto.</p>
        <p className="text-sm bg-gray-900 p-2 rounded border border-gray-700 mt-2">
          <strong>Título Exemplo:</strong> "Blues Rock Backing Track in A Minor (Slow Blues Jam)"
        </p>
      </>
    )
  },
  {
    id: 'video_creation',
    trackId: 'monetization',
    title: '3. Produção de Vídeo: Lyric Videos & Visuais',
    description: 'Como prender a atenção visualmente sem gastar nada.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p>O YouTube é uma plataforma visual. Uma tela preta não funciona. Mas você não precisa filmar nada.</p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">A Força dos Lyric Videos (Vídeos com Letra)</h3>
        <p>
          Como o Suno gera letras incríveis, use isso a seu favor! Lyric Videos têm <strong>retenção altíssima</strong> porque as pessoas ficam lendo a letra enquanto a música toca.
        </p>
        
        <Step number={1} title="Ferramentas Automáticas">
          Ferramentas como <strong>CapCut</strong> e <strong>Canva</strong> possuem funções de "Auto-Lyrics". Elas ouvem o áudio e sincronizam o texto automaticamente. Você só precisa corrigir a grafia.
        </Step>

        <Step number={2} title="Stock Footage (Imagens de Banco)">
          Para o fundo, use sites gratuitos como <strong>Pexels</strong> ou <strong>Pixabay</strong>.
          <br/>Busque por: <em>"Abstract background loop", "Neon lights", "Rain on window"</em>.
        </Step>

        <Step number={3} title="Visualizers (Ondas Sonoras)">
          Para músicas instrumentais, ondas sonoras que reagem à batida hipnotizam a audiência.
          <br/>Use o site gratuito <LinkBtn href="https://vizzy.io">Vizzy.io</LinkBtn> para criar isso direto no navegador.
        </Step>

        <WarningBox>
          Evite usar imagens estáticas paradas por 3 minutos. O YouTube pode considerar "conteúdo repetitivo" e não monetizar. Adicione pelo menos partículas, chuva ou movimento de câmera (Ken Burns effect).
        </WarningBox>
      </>
    )
  },
  {
    id: 'money_rules',
    trackId: 'monetization',
    title: '4. Dinheiro, Copyright e Distribuição',
    description: 'Content ID, Whitelisting e como proteger seu canal.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p>Você criou, postou e está ganhando views. Agora, como transformar isso em dinheiro real e evitar problemas?</p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Spotify & Apple Music (DistroKid)</h3>
        <p>
          Além do YouTube, você deve colocar suas músicas nas plataformas de streaming. Para isso, você precisa de uma <strong>Distribuidora</strong>.
          A mais famosa é a DistroKid (paga-se uma anuidade e você fica com 100% dos royalties).
        </p>

        <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl my-6">
          <h4 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">⚠️ O Perigo do "YouTube Content ID"</h4>
          <p className="text-gray-300 text-sm mb-4">
            Quando você sobe música na DistroKid, eles perguntam: <em>"Adicionar ao YouTube Content ID?"</em> (Custa $4.95/ano + 20% da receita).
          </p>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
            <li><strong>Se você marcar SIM:</strong> A DistroKid vai reivindicar (dar claim) em qualquer vídeo que usar sua música. <strong>INCLUSIVE NO SEU PRÓPRIO CANAL.</strong></li>
            <li><strong>Resultado:</strong> Você recebe um aviso de copyright e o dinheiro dos anúncios vai para a DistroKid (que tira 20% e te repassa o resto), em vez de ir direto do YouTube para você (100%).</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">A Solução: Whitelisting (Lista Branca)</h3>
        <p>Se você optar pelo Content ID para proteger sua música de terceiros, você precisa avisar a distribuidora para "liberar" (Allowlist/Whitelist) o seu canal oficial.</p>
        <Step number={1} title="Tenha o Plano Pro do Suno">
          Isso garante que a música é SUA. Sem isso, você não pode nem subir na DistroKid.
        </Step>
        <Step number={2} title="Solicite a Liberação">
          Dentro do painel da sua distribuidora, procure por "YouTube Allowlist" e cole o link do seu canal. Isso impede que você processe a si mesmo.
        </Step>

        <TipBox>
          <strong>Resumo da Riqueza:</strong> 
          1. Crie música no Suno (Plano Pro). 
          2. Poste no YouTube (AdSense). 
          3. Suba no Spotify (Royalties de streaming). 
          4. Se a música viralizar, o Content ID protege você de cópias não autorizadas.
        </TipBox>
      </>
    )
  }
];

export const ALL_LESSONS = [...CREATION_LESSONS, ...MONETIZATION_LESSONS];

// Definição das Trilhas para a Sidebar
export const TRACKS: Track[] = [
  {
    id: 'creation',
    title: 'Masterclass Criação',
    icon: Music,
    lessons: CREATION_LESSONS
  },
  {
    id: 'monetization',
    title: 'Monetização YouTube',
    icon: DollarSign,
    lessons: MONETIZATION_LESSONS
  }
];

export const LESSONS = ALL_LESSONS; // Mantendo compatibilidade se necessário