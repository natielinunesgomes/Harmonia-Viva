import React from 'react';
import { Lesson, Track } from './types';
import { TipBox, WarningBox, Step } from './components/LessonContent';
import { 
  Music, DollarSign, Layers, Mic2, Database, 
  Cpu, Activity, 
  CheckCircle2, XCircle, 
  Palette, Youtube, 
  Users, ShoppingBag, Baby, 
  Dumbbell, Briefcase, BarChart4, Target, Globe2
} from 'lucide-react';

/* 
  CURRICULUM DESIGN: PROFESSIONAL MASTERCLASS (ENRICHED & TEXT-HEAVY)
  Total: 40 Lessons (20 Creation, 20 Business - YouTube Empire Focused)
  Tone: Technical, Deep Dive, Visually Rich.
*/

// --- COMPONENTES VISUAIS INLINE ---

const CodeBlock = ({ children }: { children?: React.ReactNode }) => (
  <div className="bg-[#0d1117] border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto my-4 shadow-inner leading-relaxed">
    {children}
  </div>
);

const ComparisonTable = ({ title, leftTitle, rightTitle, leftItems, rightItems }: { 
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}) => (
  <div className="my-8 border border-gray-700 rounded-xl overflow-hidden shadow-lg">
    <div className="bg-gray-800 p-4 text-center font-bold text-gray-200 border-b border-gray-700 uppercase tracking-widest text-sm">{title}</div>
    <div className="grid grid-cols-2">
      <div className="bg-red-900/10 p-6 border-r border-gray-700">
        <h5 className="font-bold text-red-400 mb-4 text-center uppercase text-xs tracking-wider border-b border-red-500/20 pb-2">{leftTitle}</h5>
        <ul className="space-y-4 text-sm text-gray-400">
          {leftItems.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 items-start leading-snug">
              <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> 
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-green-900/10 p-6">
        <h5 className="font-bold text-green-400 mb-4 text-center uppercase text-xs tracking-wider border-b border-green-500/20 pb-2">{rightTitle}</h5>
        <ul className="space-y-4 text-sm text-gray-300">
          {rightItems.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 items-start leading-snug">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> 
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// --- TRILHA 1: ENGENHARIA DE ÁUDIO GENERATIVO (SUNO V5) ---
// (Mantida intacta)

const CREATION_LESSONS: Lesson[] = [
  // FASE 1: FUNDAMENTOS
  {
    id: 'c1_architecture',
    trackId: 'creation',
    title: '1. Arquitetura de Áudio Neural',
    description: 'Deep Learning: Como modelos Autoregressivos e de Difusão esculpem som.',
    duration: '8 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-pink-500 mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Cpu className="w-5 h-5"/> O Motor Sob o Capô</h3>
          <p>
            O Suno v5 opera utilizando uma arquitetura híbrida de <strong>Transformers</strong> (similar ao GPT-4 para texto) e modelos de <strong>Difusão</strong>. Ao contrário de sintetizadores tradicionais que usam osciladores, o Suno prediz "tokens de áudio" em um espaço latente.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">O Processo de Inferência (4 Etapas)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
            <span className="text-pink-500 font-bold text-xl">01.</span>
            <h4 className="font-bold text-gray-200">Tokenização Semântica</h4>
            <p className="text-sm text-gray-400 mt-1">A IA converte seu texto ("Jazz triste") em vetores matemáticos que representam "tristeza" e "jazz".</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
             <span className="text-pink-500 font-bold text-xl">02.</span>
            <h4 className="font-bold text-gray-200">Geração Autoregressiva</h4>
            <p className="text-sm text-gray-400 mt-1">O modelo começa a prever o áudio milissegundo por milissegundo, decidindo a próxima frequência baseada na anterior.</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
             <span className="text-pink-500 font-bold text-xl">03.</span>
            <h4 className="font-bold text-gray-200">Refinamento (Difusão)</h4>
            <p className="text-sm text-gray-400 mt-1">Uma camada de difusão remove o ruído estático, transformando o chiado digital em som limpo (Hi-Fi).</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
             <span className="text-pink-500 font-bold text-xl">04.</span>
            <h4 className="font-bold text-gray-200">Upscaling Neural</h4>
            <p className="text-sm text-gray-400 mt-1">O áudio final é renderizado em 44.1kHz ou 48kHz para clareza estéreo.</p>
          </div>
        </div>

        <Step number={1} title="Temperatura e Variância">
          Todo modelo de IA possui um parâmetro oculto chamado "Temperatura". 
          <br/>
          • <strong>Prompt Vago:</strong> Alta temperatura (IA alucina, cria estruturas caóticas).
          <br/>
          • <strong>Prompt Específico:</strong> Baixa temperatura (IA segue ordens estritas).
          <br/>
          <em>Dica: Se você quer algo experimental, seja vago. Se quer um produto comercial, seja cirúrgico.</em>
        </Step>
      </>
    )
  },
  {
    id: 'c2_dashboard',
    trackId: 'creation',
    title: '2. Interface e Configuração Pro',
    description: 'Dominando o Create Mode (Custom) e gerenciamento de Library.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="lead">
          Amadores usam o "Simple Mode" (apenas descrição). Profissionais vivem no <strong>Custom Mode</strong>. Vamos dissecar cada controle do painel.
        </p>

        <div className="my-8 space-y-4">
           <div className="flex items-start gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="bg-pink-600 p-2 rounded text-white font-bold shrink-0">Switch</div>
              <div>
                <h4 className="font-bold text-white">v3.5 vs v5</h4>
                <p className="text-sm text-gray-400">
                  Sempre verifique o seletor de versão no topo. O v5 é superior em qualidade de áudio, mas o v3.5 ainda é útil para ideias abstratas ou glitch art.
                </p>
              </div>
           </div>

           <div className="flex items-start gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
              <div className="bg-blue-600 p-2 rounded text-white font-bold shrink-0">Toggle</div>
              <div>
                <h4 className="font-bold text-white">Instrumental Mode</h4>
                <p className="text-sm text-gray-400">
                  Ao ativar isso, o campo "Lyrics" desaparece. Use isso para criar Backing Tracks, Beats de Lo-fi ou Trilhas Sonoras de fundo.
                </p>
              </div>
           </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Gestão de Assets (Library)</h3>
        <p>Após gerar 100 músicas, seu dashboard virará um caos. Siga este protocolo:</p>
        
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
           <li className="bg-black border border-gray-800 p-3 rounded text-center hover:border-pink-500 transition-colors">
              <Database className="w-6 h-6 mx-auto mb-2 text-gray-500"/>
              <strong className="block text-white">Trash Imediato</strong>
              <span className="text-xs text-gray-500">Ouça 5s. Se for ruim, delete na hora. Não acumule lixo.</span>
           </li>
           <li className="bg-black border border-gray-800 p-3 rounded text-center hover:border-pink-500 transition-colors">
              <Database className="w-6 h-6 mx-auto mb-2 text-gray-500"/>
              <strong className="block text-white">Public vs Private</strong>
              <span className="text-xs text-gray-500">Mantenha privado o que for comercial. Publique o que for portfólio.</span>
           </li>
           <li className="bg-black border border-gray-800 p-3 rounded text-center hover:border-pink-500 transition-colors">
              <Database className="w-6 h-6 mx-auto mb-2 text-gray-500"/>
              <strong className="block text-white">Folders</strong>
              <span className="text-xs text-gray-500">Crie Playlists por Gênero ou Projeto (ex: "Álbum Rock 2025").</span>
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'c3_economy',
    trackId: 'creation',
    title: '3. Economia de Créditos (ROI)',
    description: 'Matemática dos créditos: Custo por geração e maximização de recursos.',
    duration: '5 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700">
           <div>
             <h2 className="text-3xl font-bold text-white">10 Créditos</h2>
             <p className="text-gray-400 uppercase text-xs tracking-widest mt-1">Custo por Ação</p>
           </div>
           <div className="text-right">
             <span className="text-2xl font-bold text-green-400">= 2 Músicas</span>
             <p className="text-gray-500 text-xs">Geração A + Geração B</p>
           </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tabela de Planos vs. Capacidade</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400 border border-gray-700 rounded-lg">
            <thead className="bg-gray-800 text-xs uppercase text-gray-200">
              <tr>
                <th className="px-4 py-3">Plano</th>
                <th className="px-4 py-3">Créditos/Mês</th>
                <th className="px-4 py-3">Músicas (aprox)</th>
                <th className="px-4 py-3 text-right">Direito Comercial</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-bold">Free</td>
                <td className="px-4 py-3">50 (diários)</td>
                <td className="px-4 py-3">10/dia</td>
                <td className="px-4 py-3 text-right text-red-500 font-bold">NÃO</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-800/20">
                <td className="px-4 py-3 font-bold text-pink-400">Pro</td>
                <td className="px-4 py-3">2.500</td>
                <td className="px-4 py-3">500</td>
                <td className="px-4 py-3 text-right text-green-500 font-bold">SIM</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-purple-400">Premier</td>
                <td className="px-4 py-3">10.000</td>
                <td className="px-4 py-3">2.000</td>
                <td className="px-4 py-3 text-right text-green-500 font-bold">SIM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <TipBox>
          <strong>Dica de Ouro:</strong> Créditos mensais (pagos) acumulam se não usados? <strong>Não todos.</strong> A renovação geralmente reseta o montante, embora existam "top-ups" permanentes. Verifique sempre o ToS atualizado, mas trate seus créditos mensais como "use ou perca".
        </TipBox>
      </>
    )
  },
  {
    id: 'c4_versions',
    trackId: 'creation',
    title: '4. Análise de Frequência: v3.5 vs v5',
    description: 'Entendendo a fidelidade de áudio, mixagem estéreo e artefatos.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p>
          A diferença entre as versões não é apenas "estilo", é puramente engenharia de sinal.
        </p>

        <ComparisonTable 
          title="Batalha de Engenharia: v3.5 vs v5"
          leftTitle="Motor v3.5 (Legacy)"
          rightTitle="Motor v5 (Beta/New)"
          leftItems={[
            "Frequência de corte em 16kHz (som abafado)",
            "Imagem estéreo estreita (quase mono)",
            "Vozes robóticas em notas altas",
            "Limite rígido de 2 minutos"
          ]}
          rightItems={[
            "Espectro completo até 22kHz (som cristalino)",
            "Mixagem Wide Stereo real",
            "Respiração e nuances humanas",
            "Gerações de até 4 minutos contínuos"
          ]}
        />

        <Step number={1} title="Quando usar o v3.5?">
           Use o v3.5 para estilos propositalmente "Lo-Fi", "Glitchcore", "Vaporwave" ou quando quiser que a música soe como uma transmissão de rádio antiga. A "falha" do v3.5 é sua característica estética.
        </Step>

        <Step number={2} title="O Salto do v5">
           O v5 entende <strong>espaço acústico</strong>. Se você pedir "Cantor em uma catedral", ele simulará o reverb de convolução real de uma catedral. No v3.5, isso seria apenas um eco genérico.
        </Step>
      </>
    )
  },

  // FASE 2: ENGENHARIA DE PROMPT
  {
    id: 'c5_prompt_logic',
    trackId: 'creation',
    title: '5. Engenharia de Prompt Semântico',
    description: 'Como estruturar comandos para o modelo de linguagem natural (NLP).',
    duration: '12 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p className="lead">
          Esqueça o "Keyword Stuffing" (jogar palavras aleatórias). O v5 quer entender a intenção e a física do som.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">A Fórmula Híbrida</h3>
        <p>A estrutura perfeita de prompt no v5 segue esta ordem lógica:</p>

        <div className="flex flex-col gap-2 my-6 font-mono text-sm">
           <div className="bg-gray-900 p-3 rounded border-l-4 border-blue-500">
             <span className="text-blue-400 font-bold">[BASE GENRE]</span>
             <span className="text-gray-500 mx-2">+</span>
             <span className="text-gray-300">"Delta Blues, Acoustic"</span>
           </div>
           <div className="bg-gray-900 p-3 rounded border-l-4 border-pink-500">
             <span className="text-pink-400 font-bold">[EMOTIONAL VIBE]</span>
             <span className="text-gray-500 mx-2">+</span>
             <span className="text-gray-300">"Melancholic, late night longing, introspective"</span>
           </div>
           <div className="bg-gray-900 p-3 rounded border-l-4 border-green-500">
             <span className="text-green-400 font-bold">[TECHNICAL SPECS]</span>
             <span className="text-gray-500 mx-2">+</span>
             <span className="text-gray-300">"Raw recording, room reverb, vinyl crackle texture"</span>
           </div>
        </div>

        <CodeBlock>
          Input Final: "Delta Blues, Acoustic, Melancholic, late night longing, introspective, Raw recording, room reverb, vinyl crackle texture"
        </CodeBlock>

        <WarningBox>
           <strong>Atenção com Adjetivos:</strong> Adjetivos como "Intense", "Soft", "Heavy" têm mais peso para a IA do que substantivos. "Heavy Drums" funciona melhor que apenas "Drums".
        </WarningBox>
      </>
    )
  },
  {
    id: 'c6_genre_taxonomy',
    trackId: 'creation',
    title: '6. Alquimia de Gêneros (Fusion)',
    description: 'Combinando estilos opostos para criar novos nichos de mercado.',
    duration: '15 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>
          O algoritmo de difusão não tem preconceitos. Ele tenta matematicamente interpolar qualquer coisa. A inovação vem da fusão de opostos.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Receitas de Fusão Testadas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-gradient-to-br from-purple-900/40 to-black p-4 rounded-xl border border-purple-500/30">
              <h4 className="font-bold text-white mb-2">Cyber-Orchestral</h4>
              <p className="text-xs text-gray-300 mb-2">Prompt: <em>"Dubstep, Heavy Bass Drops, Symphony Orchestra, Violin Solo, Epic Cinematic"</em></p>
              <div className="flex gap-2 text-[10px] uppercase text-purple-300 font-bold">
                 <span>Hans Zimmer</span>
                 <span>+</span>
                 <span>Skrillex</span>
              </div>
           </div>

           <div className="bg-gradient-to-br from-yellow-900/40 to-black p-4 rounded-xl border border-yellow-500/30">
              <h4 className="font-bold text-white mb-2">Bossa-Trap</h4>
              <p className="text-xs text-gray-300 mb-2">Prompt: <em>"Bossa Nova Guitar, Soft Jazz Vocals, Trap 808 beats, Hi-hat rolls, Rio de Janeiro vibe"</em></p>
              <div className="flex gap-2 text-[10px] uppercase text-yellow-300 font-bold">
                 <span>João Gilberto</span>
                 <span>+</span>
                 <span>Travis Scott</span>
              </div>
           </div>
        </div>

        <Step number={1} title="A Regra da Dominância">
           O primeiro gênero listado tende a dominar a estrutura rítmica.
           <br/>
           <em>"Rock + Techno"</em> = Bateria de Rock com sintetizadores.
           <br/>
           <em>"Techno + Rock"</em> = Batida eletrônica 4/4 com guitarras.
        </Step>
      </>
    )
  },
  {
    id: 'c7_atmosphere',
    trackId: 'creation',
    title: '7. Sound Design e Texturas',
    description: 'Saindo do som "padrão IA" com ruídos, ambientes e efeitos.',
    duration: '10 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>
          O "Som de IA" geralmente é limpo demais ou digitalmente plástico. Adicionar <strong>ruído de fundo</strong> traz realismo orgânico e disfarça artefatos.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">Lista de Texturas Essenciais</h3>
        <ul className="space-y-3">
           <li className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
              <span className="font-mono text-pink-400">Vinyl Crackle / Hiss</span>
              <span className="text-sm text-gray-400">Adiciona calor analógico e preenche silêncios digitais.</span>
           </li>
           <li className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
              <span className="font-mono text-pink-400">Rain / Thunderstorm</span>
              <span className="text-sm text-gray-400">Ótimo para Lo-Fi e faixas relaxantes.</span>
           </li>
           <li className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
              <span className="font-mono text-pink-400">Crowd Noise / Live</span>
              <span className="text-sm text-gray-400">Faz a música soar como uma gravação de show ao vivo.</span>
           </li>
           <li className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
              <span className="font-mono text-pink-400">Cassette Tape</span>
              <span className="text-sm text-gray-400">Introduz leve distorção e instabilidade de pitch (Warble).</span>
           </li>
        </ul>

        <TipBox>
           Use o termo <strong>"Wall of Sound"</strong> para criar mixagens densas e cheias, onde todos os instrumentos tocam juntos no volume máximo (estilo Phil Spector / Shoegaze).
        </TipBox>
      </>
    )
  },
  {
    id: 'c8_instrumentation',
    trackId: 'creation',
    title: '8. Instrumentação Cirúrgica',
    description: 'Como convocar instrumentos específicos e evitar a "banda genérica".',
    duration: '12 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>Se você pede apenas "Rock", a IA lhe dá guitarra, baixo e bateria genéricos. Especifique o <strong>timbre</strong>.</p>

        <div className="grid md:grid-cols-2 gap-8 my-6">
           <div>
              <h4 className="font-bold text-white mb-4 border-b border-pink-500 inline-block">Guitarra</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• <strong>"Fender Stratocaster Clean"</strong>: Som brilhante e funky.</li>
                <li>• <strong>"Palm Muted Distortion"</strong>: Som de metal abafado.</li>
                <li>• <strong>"Slide Guitar"</strong>: Som de blues country.</li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-white mb-4 border-b border-blue-500 inline-block">Sintetizadores</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• <strong>"Roland 808 Bass"</strong>: Grave profundo de Trap.</li>
                <li>• <strong>"Sawtooth Lead"</strong>: Som rasgado de EDM.</li>
                <li>• <strong>"Arpeggiated Plucks"</strong>: Notas rápidas sequenciais.</li>
              </ul>
           </div>
        </div>

        <Step number={1} title="A Regra da Exclusão">
           Às vezes, é sobre o que você <strong>não</strong> quer. 
           <br/>Prompt: <em>"Acoustic Pop, No Drums, Piano Only"</em>.
           <br/>O v5 respeita comandos negativos ("No Drums") melhor que versões anteriores, mas ainda pode falhar. Reforce com "Piano Solo" ou "A cappella".
        </Step>
      </>
    )
  },
  {
    id: 'c9_vocals',
    trackId: 'creation',
    title: '9. Vocal Persona & Flow',
    description: 'Controlando sotaque, idade, gênero e estilo de entrega vocal.',
    duration: '12 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>A voz é o elemento mais humano. Tags vagas geram vozes "padrão americano". Use descritores físicos.</p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">Matriz de Vocais</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400 border border-gray-700">
             <thead className="bg-gray-800 text-gray-200">
               <tr>
                 <th className="p-3">Tipo</th>
                 <th className="p-3">Tags Sugeridas</th>
                 <th className="p-3">Resultado Sonoro</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-gray-800">
                 <td className="p-3 font-bold">Pop Diva</td>
                 <td className="p-3"><code>Powerful, Belting, High-Pitch, Vibrato</code></td>
                 <td className="p-3">Voz estilo Adele/Ariana Grande.</td>
               </tr>
               <tr className="border-b border-gray-800">
                 <td className="p-3 font-bold">Indie Girl</td>
                 <td className="p-3"><code>Whispery, Breathy, Soft, Mumbled</code></td>
                 <td className="p-3">Voz estilo Billie Eilish.</td>
               </tr>
               <tr className="border-b border-gray-800">
                 <td className="p-3 font-bold">Old Soul</td>
                 <td className="p-3"><code>Raspy, Gravelly, Baritone, Aged</code></td>
                 <td className="p-3">Voz estilo Louis Armstrong / Johnny Cash.</td>
               </tr>
               <tr>
                 <td className="p-3 font-bold">Rap</td>
                 <td className="p-3"><code>Fast Flow, Staccato, Aggressive, Triplet Flow</code></td>
                 <td className="p-3">Ritmo percussivo e rápido.</td>
               </tr>
             </tbody>
          </table>
        </div>

        <TipBox>
           <strong>Para Músicas em Português:</strong> Adicione tags regionais como <em>"Brazilian Accent"</em>, <em>"MPB Style"</em> ou <em>"Sertanejo Vocals"</em> para evitar que a IA cante português com sotaque gringo.
        </TipBox>
      </>
    )
  },
  {
    id: 'c10_bpm_key',
    trackId: 'creation',
    title: '10. BPM e Teoria Musical',
    description: 'Controlando o andamento e a tonalidade para mixagem profissional.',
    duration: '8 min',
    level: 'Avançado',
    content: () => (
      <>
        <div className="flex gap-4 mb-6">
           <div className="flex-1 bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
              <Activity className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h4 className="font-bold text-white">BPM (Tempo)</h4>
              <p className="text-xs text-gray-400 mt-1">O v5 aceita números exatos. Use "128 BPM" para House, "90 BPM" para Hip Hop.</p>
           </div>
           <div className="flex-1 bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
              <Music className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-bold text-white">Key (Tonalidade)</h4>
              <p className="text-xs text-gray-400 mt-1">"C Minor" para triste/épico. "G Major" para feliz/pop. Essencial para DJs.</p>
           </div>
        </div>

        <Step number={1} title="Mudança de Tempo (Metatags)">
           Você pode alterar o BPM no meio da música usando tags na letra:
           <br/>
           <code>[Tempo Change: Fast]</code> ou <code>[Double Time]</code>.
           <br/>
           Isso é arriscado e pode causar alucinações, mas quando funciona, cria drops incríveis.
        </Step>
      </>
    )
  },

  // FASE 3: ESTRUTURA E ARRANJO
  {
    id: 'c11_metatags_basic',
    trackId: 'creation',
    title: '11. A Gramática das Metatags',
    description: 'Controle estrutural absoluto: [Intro], [Verse], [Chorus], [Outro].',
    duration: '10 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p className="lead">
          Sem metatags, o Suno é um fluxo de consciência. Com metatags, ele é um engenheiro estrutural.
        </p>

        <div className="space-y-4 my-6">
           <div className="bg-gray-800 border-l-4 border-blue-500 p-4">
              <div className="flex justify-between items-center mb-1">
                 <code className="bg-black/30 px-2 py-1 rounded text-blue-300 font-bold">[Intro]</code>
                 <span className="text-xs text-gray-500">0:00 - 0:15</span>
              </div>
              <p className="text-sm text-gray-300">Estabelece o tema instrumental. Dica: Use <code>[Short Intro]</code> para TikTok (retenção rápida).</p>
           </div>

           <div className="bg-gray-800 border-l-4 border-gray-500 p-4">
              <div className="flex justify-between items-center mb-1">
                 <code className="bg-black/30 px-2 py-1 rounded text-gray-300 font-bold">[Verse]</code>
                 <span className="text-xs text-gray-500">Narrativa</span>
              </div>
              <p className="text-sm text-gray-300">Baixa energia, foco na história. Instrumentação mais esparsa.</p>
           </div>

           <div className="bg-gray-800 border-l-4 border-pink-500 p-4">
              <div className="flex justify-between items-center mb-1">
                 <code className="bg-black/30 px-2 py-1 rounded text-pink-300 font-bold">[Chorus]</code>
                 <span className="text-xs text-gray-500">O Gancho</span>
              </div>
              <p className="text-sm text-gray-300">Alta energia, melodia repetitiva e memorável (Earworm).</p>
           </div>
        </div>

        <WarningBox>
           <strong>A Regra dos Colchetes:</strong> Tags devem estar SEMPRE em linhas separadas. 
           <br/>Errado: <code>[Chorus] Hoje eu vou...</code>
           <br/>Certo: 
           <br/><code>[Chorus]</code>
           <br/><code>Hoje eu vou...</code>
        </WarningBox>
      </>
    )
  },
  {
    id: 'c12_metatags_adv',
    trackId: 'creation',
    title: '12. Metatags de Dinâmica Avançada',
    description: 'Criando tensão e liberação com Pre-Chorus, Bridge e Drops.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>Músicas profissionais respiram. Elas sobem e descem. Use estas tags para evitar monotonia.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
           <div className="bg-[#0f1115] p-4 rounded border border-gray-700 hover:border-violet-500 transition-colors">
              <code className="text-violet-400 block mb-2 font-bold">[Pre-Chorus]</code>
              <p className="text-xs text-gray-400">O "Build-up". Aumenta a tensão, sobe o tom ou a intensidade da bateria para preparar o refrão.</p>
           </div>
           <div className="bg-[#0f1115] p-4 rounded border border-gray-700 hover:border-yellow-500 transition-colors">
              <code className="text-yellow-400 block mb-2 font-bold">[Bridge]</code>
              <p className="text-xs text-gray-400">A "Ponte". Geralmente após o segundo refrão. Muda a melodia e a progressão de acordes para limpar o paladar.</p>
           </div>
           <div className="bg-[#0f1115] p-4 rounded border border-gray-700 hover:border-red-500 transition-colors">
              <code className="text-red-400 block mb-2 font-bold">[Drop]</code>
              <p className="text-xs text-gray-400">Exclusivo para eletrônica. Onde o baixo e o bumbo batem com força máxima.</p>
           </div>
           <div className="bg-[#0f1115] p-4 rounded border border-gray-700 hover:border-blue-500 transition-colors">
              <code className="text-blue-400 block mb-2 font-bold">[Hook]</code>
              <p className="text-xs text-gray-400">Uma frase melódica curta e repetitiva, instrumental ou vocal, que define a identidade da música.</p>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'c13_instrumental_tags',
    trackId: 'creation',
    title: '13. Controlando Solos e Pausas',
    description: 'Forçando a IA a calar a voz e tocar instrumentos.',
    duration: '8 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          O modelo tem um viés forte para vocais. Ele tenta cantar o tempo todo. Para criar respiros instrumentais, você precisa "gritar" com ele via tags.
        </p>

        <Step number={1} title="A Técnica do Espaço Vazio">
           Não coloque apenas a tag. Coloque a tag e deixe espaço para a IA "pensar".
           <br/><br/>
           <CodeBlock>
             [Verse 1]<br/>
             Texto cantado...<br/>
             <br/>
             [Guitar Solo]<br/>
             (Deixe esta área vazia, ou use pontuação como "..." para forçar tempo)<br/>
             <br/>
             [Chorus]
           </CodeBlock>
        </Step>

        <TipBox>
           Se a IA insistir em alucinar vozes durante o solo (cantando "guitar solo" ou palavras sem sentido), tente usar tags mais descritivas: <code>[Instrumental Break: Electric Guitar Shredding]</code>.
        </TipBox>
      </>
    )
  },
  {
    id: 'c14_lyrics_prosody',
    trackId: 'creation',
    title: '14. Prosódia: Ensinando a IA a Cantar',
    description: 'Como a métrica do texto afeta o ritmo e a melodia (Flow).',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          Prosódia é o ritmo natural da fala. A IA tenta encaixar suas palavras em compassos musicais (4/4). Se você escrever um testamento sem pausas, ela vai "rapear" atropelado.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">Contagem de Sílabas</h3>
        <ComparisonTable 
          title="Simetria Lírica"
          leftTitle="Assimétrico (Caótico)"
          rightTitle="Simétrico (Melódico)"
          leftItems={[
            "Eu fui na rua ontem (5)",
            "E comprei um monte de coisas legais pra gente comer em casa (18)",
            "(A IA vai correr desesperadamente na segunda linha)"
          ]}
          rightItems={[
            "Fui na rua ontem cedo (7)",
            "Comprei tudo sem medo (7)",
            "(A IA cria uma melodia estável e agradável)"
          ]}
        />

        <Step number={1} title="Hifenação Forçada">
           Para esticar uma palavra (Melisma), use hifens:
           <br/>
           <code>Aaaa - mor, eu quero vo - cê</code>
        </Step>
      </>
    )
  },
  {
    id: 'c15_rhyme_schemes',
    trackId: 'creation',
    title: '15. Estruturas de Rima (AABB, ABAB)',
    description: 'Padrões de rima que ajudam a IA a resolver melodias.',
    duration: '10 min',
    level: 'Intermediário',
    content: () => (
      <>
        <p>
          A IA usa a rima como uma "dica" de que a frase musical acabou. Rimas fortes ajudam a criar cadências perfeitas (resolução harmônica).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-sm">
           <div className="bg-gray-800 p-4 rounded border-t-4 border-pink-500">
              <strong className="block text-white text-lg mb-2">AABB</strong>
              <p className="text-gray-400 mb-2">Padrão simples de Pop/Funk.</p>
              <div className="font-mono text-gray-300 bg-black/20 p-2 rounded">
                 Coração (A)<br/>
                 Paixão (A)<br/>
                 Você (B)<br/>
                 Viver (B)
              </div>
           </div>
           <div className="bg-gray-800 p-4 rounded border-t-4 border-blue-500">
              <strong className="block text-white text-lg mb-2">ABAB</strong>
              <p className="text-gray-400 mb-2">Padrão de Baladas/Rock.</p>
              <div className="font-mono text-gray-300 bg-black/20 p-2 rounded">
                 Escuro (A)<br/>
                 Medo (B)<br/>
                 Muro (A)<br/>
                 Cedo (B)
              </div>
           </div>
           <div className="bg-gray-800 p-4 rounded border-t-4 border-green-500">
              <strong className="block text-white text-lg mb-2">AAAA</strong>
              <p className="text-gray-400 mb-2">Padrão de Rap/Drill (Monorima).</p>
              <div className="font-mono text-gray-300 bg-black/20 p-2 rounded">
                 Forte (A)<br/>
                 Norte (A)<br/>
                 Sorte (A)<br/>
                 Corte (A)
              </div>
           </div>
        </div>
      </>
    )
  },

  // FASE 4: PÓS-PROCESSAMENTO E WORKFLOW
  {
    id: 'c16_extend',
    trackId: 'creation',
    title: '16. O Workflow "Extend" (Modular)',
    description: 'Nunca tente gerar uma música inteira de uma vez. Construa em blocos.',
    duration: '20 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="lead">
          A chance de a IA acertar uma música de 4 minutos inteira é baixa. A chance de acertar 60 segundos é alta. Use isso.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">O Protocolo de Extensão</h3>
        <ol className="relative border-l border-gray-700 ml-4 space-y-6">
           <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-pink-600 rounded-full -left-4 ring-4 ring-gray-900 font-bold text-white">1</span>
              <h4 className="font-bold text-white">A Semente</h4>
              <p className="text-sm text-gray-400">Gere apenas o <code>[Verse 1]</code> e <code>[Chorus]</code>. Nada mais.</p>
           </li>
           <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full -left-4 ring-4 ring-gray-900 font-bold text-white">2</span>
              <h4 className="font-bold text-white">A Seleção</h4>
              <p className="text-sm text-gray-400">Escolha a melhor versão. Clique nos três pontinhos (...) {'>'} <strong>Extend</strong>.</p>
           </li>
           <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full -left-4 ring-4 ring-gray-900 font-bold text-white">3</span>
              <h4 className="font-bold text-white">A Continuação</h4>
              <p className="text-sm text-gray-400">Limpe o campo de Style (ou mantenha se quiser consistência). No campo Lyrics, coloque APENAS o <code>[Verse 2]</code> e o próximo <code>[Chorus]</code>. Mude a tag de tempo (timestamp) para começar no final da parte boa.</p>
           </li>
           <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-600 rounded-full -left-4 ring-4 ring-gray-900 font-bold text-white">4</span>
              <h4 className="font-bold text-white">O Final</h4>
              <p className="text-sm text-gray-400">Repita até chegar no <code>[Outro]</code>. Depois, use "Get Whole Song" para colar tudo.</p>
           </li>
        </ol>
      </>
    )
  },
  {
    id: 'c17_inpainting',
    trackId: 'creation',
    title: '17. In-painting: Cirurgia de Áudio',
    description: 'Corrigindo erros específicos sem perder o resto da música.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          O cantor errou a letra? A bateria atravessou? Não jogue a música fora. Use o <strong>In-painting</strong> (disponível no v5 Pro).
        </p>

        <Step number={1} title="Como Funciona">
           O In-painting permite que você "mascare" uma área do espectrograma de áudio e peça para a IA "re-imaginar" apenas aquele trecho, mantendo o contexto anterior e posterior intacto.
        </Step>

        <WarningBox>
           <strong>Limitação:</strong> O In-painting funciona melhor para corrigir letras ou mudar a melodia vocal. É difícil remover um instrumento específico (ex: "tirar só a bateria") se ele estiver mixado no fundo, pois a IA gera o áudio mixado (downmixed).
        </WarningBox>
      </>
    )
  },
  {
    id: 'c18_audio_input',
    trackId: 'creation',
    title: '18. Audio Input: Colaboração Humana',
    description: 'Transformando batucadas e cantaroladas em obras primas.',
    duration: '12 min',
    level: 'Avançado',
    content: () => (
      <>
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-900/20 to-transparent p-6 rounded-xl border border-blue-500/30">
           <Mic2 className="w-12 h-12 text-blue-400" />
           <div>
             <h3 className="text-xl font-bold text-white">Do Caos à Ordem</h3>
             <p className="text-gray-300">
               O Suno pode usar um áudio de até 60s como "seed" (semente). Ele analisará o ritmo e o pitch.
             </p>
           </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Aplicações Criativas</h3>
        <ul className="space-y-4">
           <li className="bg-gray-800 p-4 rounded-lg">
             <strong>1. O Compositor de Chuveiro:</strong> Grave você cantando a melodia (mesmo desafinado). Use o prompt <em>"Professional Singer, Pitch Corrected"</em>. A IA manterá sua melodia mas corrigirá a afinação e mudará o timbre.
           </li>
           <li className="bg-gray-800 p-4 rounded-lg">
             <strong>2. Beatmaker de Mesa:</strong> Batuque um ritmo na mesa com canetas. Use o prompt <em>"Complex Drum and Bass beat, high studio quality"</em>. A IA transformará o som da caneta em caixas e bumbos reais.
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'c19_covers',
    trackId: 'creation',
    title: '19. Covers & Remixes (Style Transfer)',
    description: 'Mudando o gênero radicalmente mantendo a composição.',
    duration: '10 min',
    level: 'Avançado',
    content: () => (
      <>
        <p>
          A ferramenta de Cover é essencialmente uma transferência de estilo neural. Ela preserva a sequência melódica e harmônica, mas re-renderiza a instrumentação.
        </p>

        <TipBox>
           <strong>Use para A/B Testing:</strong> Crie uma música em versão "Piano Ballad". Se a letra for boa, faça um Cover em "Pop Punk" e outro em "EDM". Veja qual versão engaja mais no TikTok sem ter que reescrever a música.
        </TipBox>

        <Step number={1} title="Remasterização via AI">
           Tem uma música velha do Suno v3 com qualidade ruim? Faça upload dela no v5 e use a função Cover com o <strong>mesmo prompt</strong> e tags como <em>"High Fidelity, Remastered"</em>. A IA limpará o áudio "recriando-o" com o motor novo.
        </Step>
      </>
    )
  },
  {
    id: 'c20_polish',
    trackId: 'creation',
    title: '20. Exportação e Stems',
    description: 'Preparando arquivos para mixagem externa (DAW).',
    duration: '10 min',
    level: 'Profissional',
    content: () => (
      <>
        <p>
          Para uso comercial sério, o arquivo MP3 direto do Suno não é suficiente. Você precisa pós-processar.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-3">Workflow Profissional</h3>
        <div className="space-y-4">
           <div className="flex gap-4">
              <div className="w-8 flex flex-col items-center">
                 <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">1</div>
                 <div className="h-full w-0.5 bg-gray-700 my-1"></div>
              </div>
              <div className="pb-4">
                 <h4 className="font-bold text-white">Download Stems (Separados)</h4>
                 <p className="text-sm text-gray-400">Seja assinante Pro. Baixe a opção "Stems". Isso separa Voz e Instrumental em arquivos WAV diferentes.</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="w-8 flex flex-col items-center">
                 <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
                 <div className="h-full w-0.5 bg-gray-700 my-1"></div>
              </div>
              <div className="pb-4">
                 <h4 className="font-bold text-white">Limpeza Espectral</h4>
                 <p className="text-sm text-gray-400">Leve o vocal para uma DAW (Reaper/Ableton). Use um EQ para cortar frequências abaixo de 100Hz (remove "mud") e acima de 16kHz (remove chiado digital).</p>
              </div>
           </div>

           <div className="flex gap-4">
              <div className="w-8 flex flex-col items-center">
                 <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
              </div>
              <div>
                 <h4 className="font-bold text-white">Masterização Externa</h4>
                 <p className="text-sm text-gray-400">Use o BandLab Mastering ou Ozone para "colar" as faixas novamente com compressão multibanda.</p>
              </div>
           </div>
        </div>
      </>
    )
  }
];

// --- TRILHA 2: NEGÓCIOS - YOUTUBE EMPIRE & CASH COW CHANNELS ---
// Foco: Estratégias validadas, dados de mercado, tutoriais técnicos de software e psicologia de retenção.

const ADVANCED_BUSINESS_LESSONS: Lesson[] = [
  // FASE 1: A ESTRATÉGIA "CASH COW"
  {
    id: 'b1_mindset',
    trackId: 'monetization',
    title: '1. O Mindset de Império: Artista vs Ativo',
    description: 'Transforme seu canal em Imobiliária Digital. Dados sobre o valor de revenda de canais.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-700 p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Briefcase className="w-6 h-6 text-blue-500"/> "Digital Real Estate"
          </h3>
          <p className="text-gray-300 mt-4 leading-relaxed">
             Para ter sucesso com IA, você precisa abandonar o ego de "Artista" e adotar a mentalidade de "Gestor de Ativos". Um vídeo no YouTube não é apenas conteúdo; é um <strong>imóvel digital</strong>. Uma vez publicado, ele ocupa um espaço no servidor do Google e pode gerar renda passiva (aluguel via AdSense) por anos, sem que você precise trabalhar nele novamente.
          </p>
          <p className="text-gray-300 mt-4 leading-relaxed">
             Diferente de um post no Instagram que "morre" em 24 horas, um vídeo de "Música para Dormir" ganha relevância com o tempo. Quanto mais tempo as pessoas assistem (Watchtime), mais o algoritmo entende que aquele "imóvel" é valioso e manda mais "inquilinos" (espectadores) para lá.
          </p>
        </div>

        <ComparisonTable 
          title="Mentalidade de Artista vs Mentalidade de Império"
          leftTitle="O Artista (Ego)"
          rightTitle="O CEO (Dados)"
          leftItems={[
            "Foca na perfeição musical e complexidade harmônica",
            "Métricas de vaidade (Likes, Fama, Reconhecimento)",
            "Posta quando sente 'inspiração' (inconsistente)",
            "Renda imprevisível (Shows/Streaming)"
          ]}
          rightItems={[
            "Foca na utilidade (Ajudar a dormir/focar/treinar)",
            "Métricas de caixa (CPM, RPM, CTR, Retenção)",
            "Posta com consistência industrial (3x/semana)",
            "Renda Passiva e Escalável (Múltiplos Canais)"
          ]}
        />
        
        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg mt-6">
           <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><BarChart4 className="w-4 h-4"/> Dado de Mercado Real</h4>
           <p className="text-sm text-gray-300 leading-relaxed">
             Canais monetizados de 'Faceless Music' são vendidos em marketplaces como o Flippa por um multiplicador de <strong>24x a 36x o lucro mensal</strong>. Isso significa que se você construir um canal que gera apenas $500/mês (aprox. R$ 2.500), esse canal é um ativo que vale entre <strong>$12.000 e $18.000</strong> (R$ 60.000 a R$ 90.000) se você decidir vendê-lo à vista.
           </p>
        </div>
      </>
    )
  },
  {
    id: 'b2_kids_market',
    trackId: 'monetization',
    title: '2. O Oceano Bilionário Infantil (Nursery Rhymes)',
    description: 'Estratégias para entrar no nicho mais visualizado da história do YouTube.',
    duration: '25 min',
    level: 'Business',
    content: () => (
      <>
        <p className="lead text-gray-300 leading-relaxed">
          Cocomelon e Galinha Pintadinha não são sorte. São ciência de retenção aplicada a cérebros em desenvolvimento. O nicho infantil é, de longe, o maior volume de tráfego da internet. Enquanto um adulto assiste a um tutorial uma vez, uma criança assiste ao mesmo vídeo de "Cinco Patinhos" cinquenta vezes no mesmo dia. Isso gera uma métrica de "Replay Rate" absurda que o algoritmo do YouTube ama.
        </p>

        <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 rounded-xl my-6">
           <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2 text-lg"><Baby className="w-6 h-6"/> A Fórmula de Retenção Infantil</h4>
           <ul className="space-y-4 text-gray-300">
             <li className="leading-relaxed">• <strong>Repetição Cíclica:</strong> Crianças gostam de prever o que vai acontecer. A música deve ter uma estrutura simples (AABB) e repetir o refrão 4-6 vezes. A previsibilidade gera conforto e dopamina no cérebro infantil.</li>
             <li className="leading-relaxed">• <strong>Prompt Suno Vencedor:</strong> Use sempre: <code>"Nursery rhyme, xylophone, glockenspiel, simple major melody, female vocals, enthusiastic, 120bpm, kids bop style, educational lyrics"</code>. A voz feminina aguda ou de outra criança funciona melhor.</li>
             <li className="leading-relaxed">• <strong>Visual Hipnótico:</strong> Use cores primárias saturadas (Vermelho, Amarelo, Azul) com alto contraste. Use IA (Midjourney com o parâmetro <code>--niji 6</code>) para gerar personagens fofos com olhos grandes (proporção neotênica).</li>
           </ul>
        </div>

        <WarningBox>
           <strong>Regulamentação COPPA (Crucial):</strong>
           <br/>Ao fazer upload, você é obrigado por lei a marcar a opção <strong>"Sim, é conteúdo para crianças"</strong>.
           <br/><br/>
           <strong>O que muda?</strong>
           <br/>❌ Você perde: Comentários, Tela Final, Notificações, e anúncios personalizados (o que reduz o CPM).
           <br/>✅ Você ganha: Recomendação infinita no aplicativo dedicado <strong>YouTube Kids</strong>. O volume de views compensa o valor menor do anúncio. É um jogo de escala massiva.
        </WarningBox>
      </>
    )
  },
  {
    id: 'b3_healing_niche',
    trackId: 'monetization',
    title: '3. Frequências de Cura (O Nicho de Ouro)',
    description: 'Tutorial técnico: Convertendo áudio para 432Hz, 528Hz e Tons Isocrônicos.',
    duration: '20 min',
    level: 'Profissional',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Este nicho tem o público mais fiel (retorno diário) e maior tempo de exibição (dormem ouvindo). Diferente do nicho infantil, aqui buscamos o público adulto com insônia, ansiedade ou que pratica meditação. A chave não é a música em si, mas a <strong>promessa da frequência</strong>.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">Tabela de Frequências Lucrativas (SEO Keywords)</h3>
        <p className="text-gray-400 text-sm mb-4">Use estes termos exatos nos seus títulos para capturar tráfego de busca:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
           <div className="bg-gray-800 p-4 rounded border border-purple-500/30">
             <strong className="text-purple-300 text-lg block mb-1">432 Hz</strong>
             <span className="text-gray-400 text-sm">A "Frequência do Universo". Promete paz interior e desbloqueio emocional.</span>
           </div>
           <div className="bg-gray-800 p-4 rounded border border-blue-500/30">
             <strong className="text-blue-300 text-lg block mb-1">528 Hz</strong>
             <span className="text-gray-400 text-sm">A "Frequência do Amor" ou Reparo de DNA. Muito buscada para cura física.</span>
           </div>
           <div className="bg-gray-800 p-4 rounded border border-green-500/30">
             <strong className="text-green-300 text-lg block mb-1">963 Hz</strong>
             <span className="text-gray-400 text-sm">A "Frequência de Deus" ou Ativação Pineal. Nicho espiritual forte.</span>
           </div>
        </div>

        <Step number={1} title="Tutorial: Conversão Real no Audacity">
           O Suno gera em 440Hz (Padrão da indústria musical). O público "Healing" odeia 440Hz e considera "artificial". Você precisa converter.
           <br/><br/><strong>Passo a Passo (Audacity Grátis):</strong>
           <br/>1. Importe o áudio do Suno (WAV).
           <br/>2. Selecione toda a faixa (Ctrl+A).
           <br/>3. Vá no menu <em>Efeitos {'>'} Alterar Altura (Change Pitch)</em>.
           <br/>4. Na caixa "Frequência de", digite <strong>440</strong>. Na caixa "para", digite <strong>432</strong> (ou a frequência desejada).
           <br/>5. Clique em OK. O áudio ficará levemente mais grave e lento, o que aumenta o efeito relaxante.
           <br/>6. Exporte como WAV. No título do YouTube, coloque "[432Hz]" bem grande no início. Isso é o seu principal diferencial de SEO.
        </Step>
      </>
    )
  },
  {
    id: 'b4_phonk_gym',
    trackId: 'monetization',
    title: '4. Phonk & Gym: O Combustível do TikTok',
    description: 'O nicho de alta energia. Subgêneros (Drift, House) e estética visual.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <div className="flex gap-4 items-center bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
           <Dumbbell className="w-12 h-12 text-red-500" />
           <div>
             <h4 className="font-bold text-white text-lg">Aggressive Phonk / Sigma Grindset</h4>
             <p className="text-gray-300 text-sm mt-2 leading-relaxed">
               Este é um gênero viral dominado por clipes de carros tunados (JDM), animes de luta e fisiculturismo. O público é jovem, masculino e engajado. O CPM é médio ($3-$5), mas o potencial viral via Shorts/TikTok é explosivo, o que traz inscritos muito rápido para o canal.
             </p>
           </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">A Estética Sonora do Phonk</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          O Phonk não é limpo. Ele deve soar "sujo", distorcido e agressivo. O Suno v5 consegue criar isso se você usar as palavras certas. O segredo está no "Cowbell" (aquele sino metálico) e no baixo distorcido (808).
        </p>

        <TipBox>
           <strong>Prompt de Ouro Suno v5:</strong> 
           <br/><code>"Drift Phonk, Aggressive, Distorted 808 cowbell melody, High bpm, energetic, memphis vocal samples, dark atmosphere, lo-fi texture, compression heavy"</code>.
        </TipBox>

        <p className="mt-6 text-sm text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-gray-800">
           <strong>Estratégia Visual:</strong> Use vídeos de bancos gratuitos como Pexels ou Pixabay com tags "Gym", "Workout", "Neon Car", "Drift". A edição deve ser rápida, com cortes secos exatamente na batida do cowbell ou do bumbo da bateria. Sincronia é tudo nesse nicho.
        </p>
      </>
    )
  },
  {
    id: 'b5_lofi_brand',
    trackId: 'monetization',
    title: '5. Branding: Criando sua "Lo-Fi Girl"',
    description: 'Como usar consistência de personagem para criar comunidade e identidade.',
    duration: '18 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Canais genéricos com fotos de bancos de imagem aleatórias morrem rápido. Canais com "Mascotes" ou Personagens criam fãs leais. A "Lofi Girl" é icônica não pela música, mas pela personagem estudando. As pessoas criam uma <strong>relação parassocial</strong> com o personagem; elas sentem que estão estudando "junto com ela". Crie a sua versão.
        </p>
        
        <h3 className="text-xl font-bold text-white mt-6 mb-4">Workflow de Personagem Consistente (Midjourney)</h3>
        <p className="text-gray-300 text-sm mb-4">
          O maior desafio da IA de imagem era manter o rosto igual em várias fotos. Com o parâmetro <code>--cref</code> (Character Reference), isso foi resolvido.
        </p>

        <CodeBlock>
           /imagine prompt: [DESCRIÇÃO DO PERSONAGEM] wearing headphones, studying at a desk near a rainy window, cozy room full of plants, night time, lo-fi aesthetic style, studio ghibli inspired --ar 16:9 --cref [URL_DA_SUA_IMAGEM_BASE] --cw 100
        </CodeBlock>
        
        <Step number={1} title="Estratégia de Identidade">
           1. Gere um personagem base que você ame.
           <br/>2. Dê um nome a ele(a). Ex: "Coding Kyle", "Study with Sarah".
           <br/>3. Coloque o nome do personagem no nome do canal.
           <br/>4. Use o <code>--cref</code> para gerar esse mesmo personagem em situações diferentes: lendo na biblioteca, tomando café na chuva, dormindo no sofá.
           <br/>5. Isso cria uma "vida" para o canal. Os inscritos comentam: "Onde o Kyle está hoje?". Isso é ouro para o engajamento.
        </Step>
      </>
    )
  },

  // FASE 2: PRODUÇÃO TÉCNICA AVANÇADA
  {
    id: 'b6_visual_looping',
    trackId: 'monetization',
    title: '6. Engenharia Visual: Loops Infinitos',
    description: 'Tutorial de ferramentas para animar imagens estáticas (Motionleap, Wallpaper Engine).',
    duration: '20 min',
    level: 'Profissional',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          O YouTube penaliza imagens 100% estáticas (o vídeo parece um slide de PowerPoint quebrado). Para monetizar sem problemas de "Conteúdo Reutilizado", você precisa de <strong>"Micro-movimentos"</strong>. O algoritmo precisa detectar pixels mudando de lugar para classificar aquilo como vídeo real.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
           <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-lg">
              <h4 className="text-pink-400 font-bold mb-3 text-lg">Nível 1: Motionleap (Mobile)</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Opção Grátis/Barata. Baixe o app no celular. Importe sua imagem do Midjourney. Adicione elementos de sobreposição (Overlay) como: <strong>Chuva, Fumaça de Café, Brilho de Velas ou Partículas de Poeira</strong>. Exporte como vídeo 1080p de 6 segundos. É simples, mas funciona para começar.
              </p>
           </div>
           <div className="bg-black border border-gray-800 p-6 rounded-xl shadow-lg">
              <h4 className="text-blue-400 font-bold mb-3 text-lg">Nível 2: Wallpaper Engine / OBS</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Opção Pro. Compre o software Wallpaper Engine no Steam ($4). Lá existem milhares de wallpapers animados em 4K de altíssima qualidade (Cyberpunk, Anime, Natureza). Configure para rodar na sua tela, esconda os ícones e grave a tela usando o <strong>OBS Studio</strong>. É a forma mais barata de ter visuais de nível Hollywood.
              </p>
           </div>
        </div>
        
        <Step number={1} title="A Técnica do Cross-Dissolve">
           No editor de vídeo, você terá um clipe curto (ex: 10 segundos) e um áudio longo (1 hora).
           <br/>1. Coloque o clipe de vídeo na timeline.
           <br/>2. Copie e cole ele centenas de vezes até cobrir o áudio.
           <br/>3. O problema: O corte entre o fim do clipe e o começo do próximo será visível (pulo seco).
           <br/>4. A solução: Adicione uma transição de <strong>"Cross Dissolve"</strong> (Dissolver) de 1 segundo entre CADA repetição do vídeo. Isso mistura o final de um com o começo do outro, tornando o loop visualmente "infinito" e suave.
        </Step>
      </>
    )
  },
  {
    id: 'b7_audio_stitching',
    trackId: 'monetization',
    title: '7. Costura de Áudio (Zero Crossing)',
    description: 'Tutorial: Transformando 2 minutos em 1 hora sem "cliques" ou cortes perceptíveis.',
    duration: '25 min',
    level: 'Profissional',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Se o ouvinte perceber quando a música acaba e recomeça, a "hipnose" quebra e ele fecha o vídeo. O "Loop" deve ser invisível (Seamless). Em música ambiente, um corte seco gera um "clique" audível ou uma mudança brusca na respiração da música. Isso destrói a retenção.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">O Conceito de Zero Crossing</h3>
        <p className="text-gray-400 text-sm mb-4">
           O som é uma onda. Se você corta a onda no ponto alto e cola em um ponto baixo, o alto-falante dá um estalo (pop). O corte ideal é onde a onda cruza a linha zero (silêncio absoluto), mas isso é difícil de achar. Por isso usamos o Crossfade.
        </p>

        <Step number={1} title="Workflow no Editor (Premiere/DaVinci/CapCut)">
           <br/>1. Coloque a música original do Suno na timeline (Track 1).
           <br/>2. Duplique-a e coloque na faixa de baixo (Track 2).
           <br/>3. Arraste a Cópia da Track 2 para que ela comece <strong>antes</strong> da música da Track 1 terminar. Crie uma sobreposição grande (de 10 a 15 segundos).
           <br/>4. Aplique uma transição de áudio chamada <strong>"Constant Power"</strong> (ou Crossfade) nessa área de sobreposição em ambas as faixas.
           <br/>5. Ajuste o ponto de encontro para que as batidas (bumbos) fiquem sincronizadas. Se for música sem bateria (Ambient), é só misturar.
           <br/>6. Ouça de olhos fechados. Se você não conseguir notar onde a música mudou, está perfeito.
           <br/>7. Agora selecione esses dois blocos, agrupe (Nest) e duplique esse "bloco costurado" até dar 1 hora.
        </Step>
      </>
    )
  },
  {
    id: 'b8_ctr_masterclass',
    trackId: 'monetization',
    title: '8. Thumbnails: Psicologia das Cores',
    description: 'Como aumentar seu CTR (Click-Through Rate) usando contraste e emoção.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          A Thumbnail é responsável por 70% do sucesso do vídeo. Se ninguém clicar, ninguém ouve sua música. Não faça "arte", faça "isca". O cérebro humano escaneia o YouTube muito rápido. Você tem milissegundos para chamar a atenção.
        </p>

        <ComparisonTable 
          title="Thumbnails que Falham vs Que Funcionam"
          leftTitle="Amador (Baixo CTR)"
          rightTitle="Pro (Alto CTR)"
          leftItems={[
            "Texto pequeno, fonte fina ou cursiva (ilegível)",
            "Cores pastéis ou lavadas (Baixo contraste)",
            "Muitos elementos bagunçados (poluição visual)",
            "Sem ponto focal claro (o olho não sabe onde olhar)"
          ]}
          rightItems={[
            "Texto GIGANTE e Sans-Serif (máx 3 palavras: 'DEEP SLEEP')",
            "Saturação e Contraste aumentados no editor (+20%)",
            "Brilho/Glow em objetos específicos (janela, fogo, neon)",
            "Regra dos Terços (Foco claro no rosto ou objeto)"
          ]}
        />
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-6">
           <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-pink-500"/> Psicologia das Cores por Nicho</h4>
           <ul className="space-y-3 text-gray-300 text-sm">
             <li>• <strong>Sono/Meditação:</strong> Use Azul Escuro, Roxo Profundo e Preto. Essas cores sinalizam "noite", "calma" e "profundidade". Evite branco ou amarelo forte.</li>
             <li>• <strong>Foco/Estudo (Lo-Fi):</strong> Use Laranja, Amarelo Quente e Marrom. Sinalizam "conforto", "café", "luz de abajur" e "outono".</li>
             <li>• <strong>Phonk/Gym:</strong> Use Vermelho Sangue, Neon Pink e Preto. Sinalizam "perigo", "agressividade", "energia" e "poder".</li>
           </ul>
        </div>
      </>
    )
  },
  {
    id: 'b9_seo_stacking',
    trackId: 'monetization',
    title: '9. SEO Stacking: Dominando a Busca',
    description: 'Como usar o Tubebuddy/VidIQ para encontrar palavras-chave de cauda longa.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Não tente ranquear para a palavra "Jazz". É impossível competir com canais de 10 milhões de inscritos nessa palavra genérica. O segredo é o <strong>Long Tail SEO</strong> (Palavras-chave de cauda longa). Você quer ranquear para frases específicas que têm menos concorrência mas intenção de busca muito alta.
        </p>
        
        <h3 className="text-xl font-bold text-white mt-6 mb-3">A Técnica do "Keyword Stacking"</h3>
        <p className="text-gray-300 text-sm mb-4">
           O YouTube lê metadados em camadas. Você deve repetir sua palavra-chave principal (ex: "432Hz Healing") em todos os níveis:
        </p>
        
        <ul className="list-decimal list-inside space-y-2 text-gray-300 mb-6 ml-4">
           <li><strong>Nome do Arquivo Bruto:</strong> Antes de subir o vídeo, renomeie o arquivo de <code>video_final.mp4</code> para <code>432hz_healing_sleep_music.mp4</code>. O YouTube lê isso.</li>
           <li><strong>Começo do Título:</strong> As primeiras 3 palavras têm mais peso.</li>
           <li><strong>Primeira linha da descrição:</strong> Repita o título na primeira frase de forma natural.</li>
           <li><strong>Tags do Canal:</strong> Não apenas tags do vídeo, mas nas configurações do canal.</li>
        </ul>

        <CodeBlock>
          Exemplo de Título Otimizado (Stacking):
          "Instant Relief from Anxiety - Deep Healing Frequency 432Hz for Sleep & Insomnia"
        </CodeBlock>
        <p className="text-xs text-gray-400 mt-2">
           Note que neste título atacamos 5 nichos diferentes em uma frase: "Relief from Anxiety" (Dor), "Deep Healing" (Solução), "432Hz" (Método), "Sleep" (Uso), "Insomnia" (Problema). Isso triplica suas chances de ser encontrado.
        </p>
      </>
    )
  },
  {
    id: 'b10_shorts_strategy',
    trackId: 'monetization',
    title: '10. Shorts como Isca (Funil de Tráfego)',
    description: 'A configuração técnica "Related Video" para explodir seu canal.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Shorts pagam muito mal (centavos), mas trazem inscritos muito rápido. O erro da maioria é deixar o view morrer no Short. Você deve usar o Short apenas como um "Outdoor" que aponta para sua "Loja" (o vídeo longo de 1 hora, que paga bem).
        </p>

        <Step number={1} title="Configuração do Funil 'Related Video'">
           O YouTube removeu os links clicáveis nos comentários dos Shorts para evitar spam. A ÚNICA forma de linkar é usando a ferramenta nativa "Vídeo Relacionado".
           <br/><br/>
           1. Crie um Short com o <strong>melhor momento</strong> (Drop/Refrão) do seu vídeo longo.
           <br/>2. Adicione uma legenda fixa e grande no vídeo: "Full Song Link ▶️" (com uma seta apontando para baixo).
           <br/>3. Suba o Short.
           <br/>4. Vá no YouTube Studio (Versão Desktop). Abra o Short em "Detalhes".
           <br/>5. Na barra lateral direita, encontre a opção <strong>"Vídeo Relacionado" (Related Video)</strong>.
           <br/>6. Selecione o vídeo de 1 hora correspondente.
           <br/><em>Resultado: Um botão "Play" aparece nativamente na tela do Short, exatamente onde você apontou a seta, levando o usuário direto para o vídeo longo. A conversão disso é altíssima.</em>
        </Step>
      </>
    )
  },

  // FASE 3: MONETIZAÇÃO E ESCALA
  {
    id: 'b11_cpm_reality',
    trackId: 'monetization',
    title: '11. A Realidade do CPM (Quanto Paga?)',
    description: 'Dados reais de RPM por nicho e geografia. Onde está o dinheiro.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Muitos iniciantes se frustram porque fazem 100 mil views e ganham pouco dinheiro. Isso acontece porque escolheram o nicho errado ou o país errado. O CPM (Custo por Mil Views) varia drasticamente baseado no poder de compra do público e na idade.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
           <div className="bg-gray-800 p-6 rounded-xl border-t-4 border-green-500 shadow-lg">
              <strong className="block text-white mb-2 flex items-center gap-2 text-lg"><DollarSign className="w-5 h-5 text-green-400"/> Alta Renda</strong>
              <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Finance, Tech, Crypto</span>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                <strong>RPM: $10 - $25</strong>. 
                <br/>Ex: "Música para Traders Focarem" ou "Coding Music". O anunciante aqui é banco ou corretora, eles pagam muito caro.
              </p>
           </div>
           <div className="bg-gray-800 p-6 rounded-xl border-t-4 border-blue-500 shadow-lg">
              <strong className="block text-white mb-2 flex items-center gap-2 text-lg"><Activity className="w-5 h-5 text-blue-400"/> Média Renda</strong>
              <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded text-xs font-bold uppercase">Meditação, Sleep, Gym</span>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                <strong>RPM: $3 - $7</strong>. 
                <br/>O equilíbrio perfeito entre volume e valor. Anunciantes de apps de saúde, colchões e suplementos.
              </p>
           </div>
           <div className="bg-gray-800 p-6 rounded-xl border-t-4 border-yellow-500 shadow-lg">
              <strong className="block text-white mb-2 flex items-center gap-2 text-lg"><Users className="w-5 h-5 text-yellow-400"/> Volume Puro</strong>
              <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded text-xs font-bold uppercase">Kids, Shorts, Meme</span>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                <strong>RPM: $0.30 - $1.50</strong>. 
                <br/>Paga pouco por view, mas é fácil fazer 10 milhões de views. É o jogo das "Vacas Leiteiras" (Cash Cows).
              </p>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'b12_affiliate_hacks',
    trackId: 'monetization',
    title: '12. Afiliados: Monetizando com 0 Inscritos',
    description: 'Programas de afiliados específicos para canais de música (Amazon, Sweetwater).',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          O maior erro é esperar as 4.000 horas do AdSense para começar a ganhar dinheiro. Você pode (e deve) monetizar desde o primeiro vídeo usando Marketing de Afiliados. Como seus vídeos são "utilitários" (servem para dormir, estudar, treinar), seu público tem necessidades físicas que podem ser atendidas com produtos.
        </p>
        
        <ul className="space-y-6 mt-6">
           <li className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-pink-500 transition-colors">
              <strong className="text-pink-400 block mb-2 text-lg">Para Canais de Sleep/Meditação</strong>
              <p className="text-gray-300 text-sm leading-relaxed">
                 Cadastre-se na <strong>Amazon Associates</strong>. As pessoas que buscam música para dormir geralmente têm desconforto. Crie links para "Fones de Ouvido Sleep-mask" (aquelas faixas de cabeça bluetooth confortáveis para dormir de lado) ou Máquinas de Ruído Branco.
                 <br/><br/>
                 <em>Copy para descrição: "🎧 O fone mais confortável para dormir de lado que eu uso: [Link]"</em>. Isso converte muito.
              </p>
           </li>
           <li className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-pink-500 transition-colors">
              <strong className="text-pink-400 block mb-2 text-lg">Para Canais de Estudo/Lo-fi</strong>
              <p className="text-gray-300 text-sm leading-relaxed">
                 Seu público quer produtividade. Venda planners digitais, luminárias de mesa estilo "Aesthetic" ou assinaturas de software como Notion (muitos pagam comissão). Se você usa IA, seja afiliado das ferramentas de IA que você usa.
              </p>
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'b13_selling_assets',
    trackId: 'monetization',
    title: '13. Venda de Ativos Digitais (Gumroad)',
    description: 'Transforme seus arquivos WAV em produtos para Streamers e RPG.',
    duration: '20 min',
    level: 'Profissional',
    content: () => (
      <>
        <div className="flex items-center gap-6 bg-gradient-to-r from-purple-900/20 to-transparent p-8 rounded-2xl border border-purple-500/30 mb-8">
           <ShoppingBag className="w-16 h-16 text-purple-400 shrink-0" />
           <div>
             <h3 className="font-bold text-white text-xl">O Modelo "Streamer Safe Pack"</h3>
             <p className="text-gray-300 text-sm mt-2 leading-relaxed">
               Streamers da Twitch e YouTubers morrem de medo de levar "Copyright Strike" (DMCA) e perder a monetização de suas lives. Eles precisam desesperadamente de música de fundo segura e de alta qualidade. Você tem gigabytes disso no seu HD.
             </p>
           </div>
        </div>

        <h4 className="text-white font-bold mb-4">Como criar seu produto em 24h:</h4>
        <Step number={1} title="A Oferta Irresistível">
           1. Selecione suas 50 melhores faixas de Lo-Fi, Synthwave ou Rock instrumental.
           <br/>2. Empacote em um arquivo ZIP com qualidade alta (WAV ou MP3 320kbps).
           <br/>3. Crie um produto no <strong>Gumroad</strong> ou <strong>Hotmart</strong> chamado "Streamer Safe Music Pack - 100% DMCA Free".
           <br/>4. Preço: Entre $15 e $25 USD (venda em dólar para ganhar 5x).
           <br/>5. Licença (importante): Escreva um texto simples dizendo "Ao comprar, você tem licença vitalícia para usar em suas lives e vídeos monetizados, sem medo de strike. Só é proibido revender as músicas".
           <br/>6. Coloque o link no topo da descrição de <strong>todos</strong> os seus vídeos: "⬇️ Download this music for your streams".
        </Step>
      </>
    )
  },
  {
    id: 'b14_community_tab',
    trackId: 'monetization',
    title: '14. Hackeando a Aba Comunidade',
    description: 'Como reativar inscritos mortos usando Enquetes de Imagem.',
    duration: '12 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          A Aba Comunidade do YouTube é frequentemente ignorada, mas ela tem um alcance viral bizarro, muitas vezes maior que os próprios vídeos. O YouTube mostra seus posts de comunidade para pessoas que <strong>ainda não são inscritas</strong> no seu canal, mas assistiram a algo parecido. É uma ferramenta de descoberta poderosa.
        </p>

        <TipBox>
           <strong>A Estratégia da Enquete Visual (Image Poll):</strong> 
           <br/>Não faça enquetes de texto. Faça enquetes de imagem.
           <br/><br/>
           Pergunte: "Qual vibe você prefere para o próximo vídeo de relaxamento?"
           <br/>Opção A: [Imagem de Chuva na Janela gerada no Midjourney]
           <br/>Opção B: [Imagem de Floresta Mágica gerada no Midjourney]
           <br/><br/>
           <strong>Por que funciona?</strong> Pessoas adoram clicar em enquetes visuais, o esforço é zero. Cada clique conta como "engajamento" para o algoritmo. Quando alguém vota, o YouTube entende que essa pessoa está interessada no seu canal e passa a recomendar seus vídeos na Home dela novamente, "ressuscitando" inscritos mortos.
        </TipBox>
      </>
    )
  },
  {
    id: 'b15_global_reach',
    trackId: 'monetization',
    title: '15. Estratégia de Alcance Global',
    description: 'Como usar metadados traduzidos para ganhar views da Índia, Brasil e Indonésia.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <div className="flex items-center gap-4 mb-6">
           <Globe2 className="w-10 h-10 text-blue-400" />
           <p className="text-gray-300 leading-relaxed text-sm">
             A maior vantagem de fazer música instrumental é que ela <strong>não tem idioma</strong>. Um piano soa igual no Brasil, na Rússia ou na Indonésia. Se você limita seu título ao Português ou Inglês, está deixando 80% do dinheiro na mesa.
           </p>
        </div>

        <Step number={1} title="Tradução Automática de Metadados (Nativa do YouTube)">
           Não coloque títulos misturados (Ex: "Music for Sleep / Musica para Dormir"). Isso confunde o algoritmo. Use a ferramenta certa:
           <br/><br/>
           1. No YouTube Studio, vá em <strong>Legendas/CC</strong> no menu lateral.
           <br/>2. Clique em "Adicionar Idioma".
           <br/>3. Selecione os mercados gigantes: <strong>Espanhol, Português, Hindi, Indonésio e Árabe</strong>.
           <br/>4. Copie seu título e descrição, jogue no Google Translate (ou ChatGPT) e cole nos campos correspondentes de cada idioma.
           <br/><br/>
           <strong>Resultado Mágico:</strong> Se um usuário da Índia buscar "Sleep Music" em Hindi, o YouTube mostrará seu vídeo com o título e descrição traduzidos automaticamente para Hindi. Para ele, parecerá um conteúdo local. Isso triplica seu CTR global instantaneamente.
        </Step>
      </>
    )
  },
  {
    id: 'b16_analytics_avd',
    trackId: 'monetization',
    title: '16. Analytics: AVD e Retenção Relativa',
    description: 'Como ler o gráfico de retenção para saber se sua música é boa ou chata.',
    duration: '15 min',
    level: 'Profissional',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Esqueça Likes e Comentários. Para canais de música longa, a única métrica que importa para viralizar é o <strong>AVD (Average View Duration)</strong> ou Duração Média da Visualização. O YouTube quer manter as pessoas na plataforma. Se seu vídeo de 1 hora segura as pessoas por 20 minutos, o algoritmo vai promovê-lo insanamente.
        </p>

        <div className="flex gap-4 mb-6">
           <div className="flex-1 bg-gray-900 border border-gray-800 p-4 rounded text-center">
              <BarChart4 className="w-8 h-8 text-green-500 mx-auto mb-2"/>
              <h4 className="font-bold text-white">AVD (Duração Média)</h4>
              <p className="text-xs text-gray-400 mt-2">
                Meta: <strong>30% a 40%</strong> em vídeos de 1 hora. <br/>Se conseguir 15-20 minutos de média, o vídeo tem potencial de milhões de views.
              </p>
           </div>
           <div className="flex-1 bg-gray-900 border border-gray-800 p-4 rounded text-center">
              <Target className="w-8 h-8 text-red-500 mx-auto mb-2"/>
              <h4 className="font-bold text-white">Dips (Quedas)</h4>
              <p className="text-xs text-gray-400 mt-2">
                Olhe o gráfico. Quedas bruscas significam que a música ficou chata, alta demais ou mudou de ritmo. Use o editor do YouTube para cortar esse trecho pós-upload.
              </p>
           </div>
        </div>
        <WarningBox>
           <strong>A Intro é a Morte:</strong> Em canais de música, <strong>JAMAIS faça introdução falada</strong> ("Olá pessoal, se inscrevam..."). Nem introdução visual de logo de 10 segundos.
           <br/>A música deve começar no milissegundo 0:00. O usuário clicou para ouvir, não para esperar. Qualquer segundo de silêncio ou fala no início fará 50% das pessoas fecharem o vídeo imediatamente (Bounce Rate).
        </WarningBox>
      </>
    )
  },
  {
    id: 'b17_outsourcing',
    trackId: 'monetization',
    title: '17. Escala: Terceirização (SOPs)',
    description: 'Como contratar editores baratos para gerenciar 5 canais simultaneamente.',
    duration: '18 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Você começou como "Eu-quipe", fazendo tudo. Mas para ter um Império de 5 ou 10 canais, você precisa se tornar CEO. Tarefas repetitivas (como fazer o loop de 1 hora ou criar a thumbnail) devem ser delegadas assim que o primeiro canal der lucro ($300-$500/mês). Use esse dinheiro para comprar seu tempo de volta.
        </p>

        <h3 className="text-white font-bold mb-4">O Protocolo de Delegação (SOP)</h3>
        <ul className="list-disc list-inside space-y-4 text-gray-300">
           <li className="leading-relaxed"><strong>Grave o Processo:</strong> Use o Loom para gravar sua tela enquanto você faz a edição do vídeo, o loop e a thumbnail. Narre o que está fazendo. Esse vídeo é o seu "Treinamento".</li>
           <li className="leading-relaxed"><strong>Onde contratar:</strong> Sites como <strong>VintePila</strong> (Brasil) ou <strong>OnlineJobs.ph</strong> (Filipinas) têm editores dispostos a fazer trabalhos simples por valores acessíveis. A tarefa de "Looping" é mecânica e barata.</li>
           <li className="leading-relaxed"><strong>Seu novo papel:</strong> Você para de editar e foca apenas na <strong>Inteligência</strong>: Gerar Prompts no Suno, Análise de Dados (quais nichos estão em alta) e Controle de Qualidade final.</li>
        </ul>
      </>
    )
  },
  {
    id: 'b18_protecting_asset',
    trackId: 'monetization',
    title: '18. Proteção de Ativo (Content ID)',
    description: 'Nuances sobre direitos autorais em IA e como evitar re-uploads.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          O YouTube é uma selva. Se seu canal crescer, ele <strong>vai</strong> ser copiado. Canais "Sanguessugas" vão baixar seu vídeo e postar no canal deles. Como a lei de Copyright para IA ainda é uma área cinzenta, a melhor proteção é a estratégia técnica.
        </p>

        <Step number={1} title="Defesa em Camadas">
           1. <strong>Marca d'água Queimada:</strong> Sempre coloque o logo do seu canal com 5% a 10% de opacidade no canto do vídeo durante a renderização (não use apenas a ferramenta de marca d'água do YouTube, pois ela não fica no arquivo baixado). Isso torna o re-upload "sujo" e difícil de limpar.
           <br/><br/>
           2. <strong>Metadados de Autoridade:</strong> A melhor proteção é ser o primeiro. Se você postar primeiro e tiver mais views, o algoritmo do YouTube saberá que você é a fonte original (Source of Truth). Ele priorizará seu vídeo nas buscas.
           <br/><br/>
           3. <strong>Content ID (Cuidado):</strong> Se você usa uma distribuidora (como DistroKid) para lançar no Spotify, o Content ID do YouTube será ativado automaticamente. Isso protegerá seu vídeo, mas cuidado: As distribuidoras estão banindo contas de IA pura. Use com cautela ou prefira focar apenas na monetização do YouTube (AdSense) sem distribuidora externa.
        </Step>
      </>
    )
  },
  {
    id: 'b19_playlists_power',
    trackId: 'monetization',
    title: '19. O Poder das Playlists Internas',
    description: 'Aumentando o "Session Time" e criando jornadas para o usuário.',
    duration: '12 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          O YouTube tem uma métrica secreta chamada <strong>"Session Time"</strong>. É o tempo total que o usuário fica no site depois de clicar no seu vídeo. Se alguém assiste seu vídeo e depois sai do YouTube, isso é ruim. Se alguém assiste seu vídeo e depois assiste <i>outro</i> vídeo seu, seu canal ganha muitos pontos de autoridade.
        </p>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-purple-400"/> A Estratégia da Jornada Diária</h4>
            <p className="text-gray-300 text-sm mb-4">
              Não crie playlists aleatórias. Crie playlists baseadas na <strong>Rotina do Usuário</strong>. Guie ele pelo dia.
            </p>
            <ul className="space-y-3 text-gray-300 text-sm">
                <li>• <strong>07:00 AM:</strong> Playlist "⚡ Morning Focus & Energy" (Jazz Animado/Lo-Fi rápido)</li>
                <li>• <strong>02:00 PM:</strong> Playlist "📚 Deep Work Afternoon" (Binaural/Concentração)</li>
                <li>• <strong>10:00 PM:</strong> Playlist "🌙 Instant Sleep & Insomnia Relief" (Ambient/432Hz)</li>
            </ul>
            <p className="text-gray-400 text-xs mt-4 italic">
               Dica Pro: Coloque o link da Playlist "Próximo Passo" na <strong>Tela Final</strong> e no <strong>Card</strong> dos vídeos. Se o usuário está ouvindo a música de foco, sugira a de descanso para depois. Mantenha ele no seu ecossistema 24h.
            </p>
        </div>
      </>
    )
  },
  {
    id: 'b20_exit_strategy',
    trackId: 'monetization',
    title: '20. O Grande Cheque: Exit Strategy',
    description: 'Como vender seu canal por 30x o lucro mensal em sites como Flippa.',
    duration: '20 min',
    level: 'Profissional',
    content: () => (
      <>
        <div className="bg-green-900/20 border border-green-500/30 p-8 rounded-2xl mb-8 shadow-2xl">
           <h3 className="text-2xl font-bold text-green-400 flex items-center gap-3 mb-4"><DollarSign className="w-8 h-8"/> O "Exit" (A Saída)</h3>
           <p className="text-gray-200 text-lg leading-relaxed">
             A maioria dos YouTubers acha que vai viver de AdSense para sempre. O Empreendedor Digital sabe que o maior lucro está na <strong>VENDA do ativo</strong>. Canais "Faceless" (sem rosto) são ativos extremamente líquidos e fáceis de vender porque não dependem da sua imagem. Investidores compram esses canais para diversificar renda, assim como compram apartamentos para alugar.
           </p>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">A Matemática da Venda (Valuation)</h3>
        <ul className="space-y-4 text-gray-300 mb-8 bg-black/20 p-6 rounded-xl border border-gray-800">
           <li className="flex justify-between border-b border-gray-700 pb-2">
             <span>Lucro Mensal Médio (últimos 6-12 meses):</span>
             <span className="font-bold text-white">$1.000 (R$ 5.000)</span>
           </li>
           <li className="flex justify-between border-b border-gray-700 pb-2">
             <span>Multiplicador de Mercado (Padrão):</span>
             <span className="font-bold text-white">24x a 36x</span>
           </li>
           <li className="flex justify-between pt-2">
             <span className="text-green-400 font-bold">Valor de Venda (À Vista):</span>
             <span className="font-bold text-green-400 text-xl">$24.000 - $36.000 <br/><span className="text-sm font-normal text-gray-500">(R$ 120k - R$ 180k)</span></span>
           </li>
        </ul>

        <p className="text-gray-300 leading-relaxed mb-8">
           Sites como <strong>Flippa</strong>, <strong>Empire Flippers</strong> e <strong>Mid-Man</strong> são marketplaces seguros e regulamentados onde você pode listar seu canal para venda.
           <br/><br/>
           <strong>O Plano Final:</strong> Construa o canal desde o dia 1 pensando que ele é uma empresa que pode ser vendida, não um diário pessoal. Mantenha as métricas limpas, não leve strikes e mantenha uma receita estável. Quando cansar, venda-o pelo preço de um carro de luxo ou um apartamento.
        </p>
        
        <div className="text-center py-8">
          <p className="font-bold text-white text-2xl animate-pulse">
             Você completou a Masterclass. <br/>Agora vá construir seu Império.
          </p>
        </div>
      </>
    )
  }
];

export const ALL_LESSONS = [...CREATION_LESSONS, ...ADVANCED_BUSINESS_LESSONS];

// Definição das Trilhas para a Sidebar
export const TRACKS: Track[] = [
  {
    id: 'creation',
    title: 'Engenharia de Áudio (v5)',
    icon: Music,
    lessons: CREATION_LESSONS
  },
  {
    id: 'monetization',
    title: 'YouTube Music Empire',
    icon: Youtube, 
    lessons: ADVANCED_BUSINESS_LESSONS
  }
];

export const LESSONS = ALL_LESSONS;