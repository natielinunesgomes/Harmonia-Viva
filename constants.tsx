import React from 'react';
import { Lesson, Track } from './types';
import { TipBox, WarningBox, Step, LinkBtn } from './components/LessonContent';
import { 
  Music, Youtube, Star, 
  CheckCircle2, XCircle, 
  PenTool, Speaker, ShieldCheck, Zap, Activity,
  Mic2, Database, Globe2, Palette, Search,
  Users, DollarSign, Briefcase, MousePointer2, MonitorPlay,
  LogIn, LayoutDashboard
} from 'lucide-react';

// --- COMPONENTES VISUAIS INLINE (PREMIUM DESIGN) ---

const CodeBlock = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative group my-6">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
    <div className="relative bg-[#0d1117] border border-gray-700 rounded-lg p-6 font-mono text-sm text-gray-300 overflow-x-auto shadow-2xl leading-relaxed select-text">
      <div className="absolute top-2 right-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Suno Prompt</div>
      {children}
    </div>
  </div>
);

const ComparisonTable = ({ title, leftTitle, rightTitle, leftItems, rightItems }: { 
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}) => (
  <div className="my-10 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl bg-black/40 backdrop-blur-sm">
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-center font-bold text-gray-100 border-b border-gray-700 uppercase tracking-[0.2em] text-xs shadow-lg">{title}</div>
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-6 md:border-r border-gray-800 bg-red-900/5 hover:bg-red-900/10 transition-colors">
        <h5 className="font-extrabold text-red-400 mb-6 text-center uppercase text-xs tracking-wider flex items-center justify-center gap-2">
           <XCircle className="w-4 h-4" /> {leftTitle}
        </h5>
        <ul className="space-y-4 text-sm text-gray-400">
          {leftItems.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 items-start leading-relaxed bg-red-500/5 p-3 rounded-lg border border-red-500/10">
              <span className="text-red-500/50 font-mono text-xs mt-0.5">0{i+1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 bg-green-900/5 hover:bg-green-900/10 transition-colors">
        <h5 className="font-extrabold text-green-400 mb-6 text-center uppercase text-xs tracking-wider flex items-center justify-center gap-2">
           <CheckCircle2 className="w-4 h-4" /> {rightTitle}
        </h5>
        <ul className="space-y-4 text-sm text-gray-300">
          {rightItems.map((item: string, i: number) => (
            <li key={i} className="flex gap-3 items-start leading-relaxed bg-green-500/5 p-3 rounded-lg border border-green-500/10 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> 
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ConceptCard = ({ title, icon: Icon, children, color = "blue" }: any) => {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",
    amber: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400",
    green: "from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-400",
  };
  const current = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-gradient-to-br ${current} border rounded-xl p-6 my-6 hover:scale-[1.01] transition-transform duration-300 shadow-xl`}>
      <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${current.split(" ").pop()}`}>
        <Icon className="w-5 h-5" /> {title}
      </h4>
      <div className="text-gray-300 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
};

// --- TRILHA 1: FUNDAMENTOS & ENGENHARIA DE ÁUDIO (SUNO V5) ---
// Total: 20 Aulas (10 Iniciante/Fundamentos + 10 Avançado)

export const CREATION_LESSONS: Lesson[] = [
  // --- FASE 1: FUNDAMENTOS E PRIMEIROS PASSOS (AULAS 1-10) ---
  {
    id: 'c1_access_intro',
    trackId: 'creation',
    title: '1. O Portal da Criação: Acesso e Cadastro',
    description: 'Seu primeiro contato com a ferramenta que vai mudar sua vida musical.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="mb-8">
           <p className="text-lg text-gray-200 leading-relaxed">
             Bem-vindo ao <strong>Suno AI</strong>. Diferente de outras ferramentas complexas que exigem instalação no computador, o Suno roda 100% na nuvem. Isso significa que você pode criar obras-primas usando um PC gamer superpotente ou um celular básico no ônibus.
           </p>
        </div>

        <Step number={1} title="Acessando a Plataforma">
           Abra seu navegador e digite <LinkBtn href="https://suno.com">suno.com</LinkBtn>. 
           <br/>Você verá uma interface moderna, parecida com o Spotify, cheia de músicas criadas por outras pessoas. Essa é a página "Explore".
        </Step>

        <Step number={2} title="O Cadastro (Sign Up)">
           No canto inferior esquerdo (ou superior direito no mobile), clique em <strong>"Sign Up"</strong>.
           <br/><br/>
           <span className="text-pink-400 font-bold">Recomendação:</span> Use sua conta <strong>Google</strong>, <strong>Discord</strong> ou <strong>Microsoft</strong>. É mais rápido e seguro do que criar um login com senha do zero.
        </Step>

        <ConceptCard title="Por que preciso de conta?" icon={LogIn} color="blue">
           O Suno precisa salvar suas criações na sua "Library" (Biblioteca) pessoal. Sem uma conta, você não consegue salvar, baixar ou reivindicar a autoria das suas músicas.
        </ConceptCard>
      </>
    )
  },
  {
    id: 'c2_credits_economy',
    trackId: 'creation',
    title: '2. A Economia de Créditos (Grátis vs Pro)',
    description: 'Entenda como funciona o sistema de "moedas" do Suno para não ficar zerado.',
    duration: '12 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-6 text-gray-300">
          O Suno opera com um sistema de créditos. Cada vez que você pede para a IA "trabalhar", você gasta créditos. Entender isso é vital para não desperdiçar recursos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
           <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <strong className="text-blue-400 block mb-2 text-xl">Plano Gratuito (Basic)</strong>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500"/> <strong>50 Créditos/Dia:</strong> Renovam todo dia.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500"/> <strong>~10 Músicas/Dia:</strong> Dá para brincar bastante.</li>
                <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-500"/> <strong>Sem Uso Comercial:</strong> Você não é dono da música.</li>
              </ul>
           </div>
           <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-6 rounded-xl border border-pink-500/30">
              <strong className="text-pink-400 block mb-2 text-xl">Planos Pagos (Pro/Premier)</strong>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500"/> <strong>2.500+ Créditos/Mês:</strong> Acumulativos no mês.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500"/> <strong>Propriedade Comercial:</strong> A música é 100% sua. Pode vender no Spotify.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-pink-500"/> <strong>Gerações Simultâneas:</strong> Cria mais rápido.</li>
              </ul>
           </div>
        </div>

        <TipBox>
           <strong>Matemática do Custo:</strong> 1 Clique em "Create" custa <strong>10 Créditos</strong>. Esse clique gera <strong>2 variações</strong> de música. Ou seja, cada música custa 5 créditos.
        </TipBox>
      </>
    )
  },
  {
    id: 'c3_interface_tour',
    trackId: 'creation',
    title: '3. Tour Pela Interface: Onde Clicar?',
    description: 'Navegando pelo painel de controle sem se perder.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-4 text-gray-300">
          A interface do Suno é dividida em três áreas principais. Vamos focar no menu lateral esquerdo.
        </p>

        <div className="space-y-4">
           <div className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-white transition-colors">
             <div className="bg-gray-800 p-3 rounded-full"><Search className="w-5 h-5 text-white"/></div>
             <div>
               <strong className="text-white block">Explore</strong>
               <p className="text-sm text-gray-400">Onde você ouve o que está "bombando" no mundo. Ótimo para ter inspiração de prompts.</p>
             </div>
           </div>

           <div className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-pink-500 transition-colors">
             <div className="bg-pink-600 p-3 rounded-full"><Zap className="w-5 h-5 text-white"/></div>
             <div>
               <strong className="text-pink-400 block">Create (O Mais Importante)</strong>
               <p className="text-sm text-gray-400">É aqui que a mágica acontece. Clicar aqui abre o painel de criação onde digitaremos nossos comandos.</p>
             </div>
           </div>

           <div className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-white transition-colors">
             <div className="bg-gray-800 p-3 rounded-full"><Database className="w-5 h-5 text-white"/></div>
             <div>
               <strong className="text-white block">Library</strong>
               <p className="text-sm text-gray-400">Onde ficam <strong>suas</strong> músicas. Se você criou, estará aqui para sempre (ou até você apagar).</p>
             </div>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'c4_create_simple',
    trackId: 'creation',
    title: '4. Sua Primeira Música (Simple Mode)',
    description: 'Criando algo rápido apenas com uma descrição de texto.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <Step number={1} title="Ativando o Modo Criar">
           Clique em <strong>"Create"</strong> no menu lateral.
           <br/>Por padrão, o Suno pode abrir no "Custom Mode" (Modo Personalizado). Verifique se há um botão ("toggle") no topo escrito <strong>Custom Mode</strong>. Se estiver ativado (colorido), <strong>desative-o</strong> por enquanto.
        </Step>

        <ConceptCard title="O que é o Simple Mode?" icon={MousePointer2} color="green">
           No Simple Mode, existe apenas uma caixa de texto: <strong>"Song Description"</strong>.
           <br/>Aqui você descreve o tema e o estilo juntos. A IA vai escrever a letra, escolher o título e compor a música sozinha. É o "piloto automático".
        </ConceptCard>

        <Step number={2} title="O Prompt de Teste">
           Digite na caixa:
           <code className="block mt-2 bg-black p-3 rounded text-green-400 font-mono text-sm">
             A happy pop song about learning how to use artificial intelligence, upbeat tempo, female vocals
           </code>
        </Step>

        <TipBox>
           Note a opção <strong>Instrumental</strong> abaixo da caixa de texto. Se marcada, a IA criará apenas a melodia, sem voz. Deixe desmarcada para este teste.
        </TipBox>
      </>
    )
  },
  {
    id: 'c5_generating_analyzing',
    trackId: 'creation',
    title: '5. Gerando e Analisando Resultados',
    description: 'O que fazer depois de clicar no botão "Create".',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-4 text-gray-300">
          Ao clicar no botão amarelo <strong>Create</strong>, a mágica começa. O Suno vai gerar <strong>duas versões</strong> diferentes do seu pedido (Geralmente chamadas de V1 e V2).
        </p>

        <div className="bg-gray-900 border-l-4 border-yellow-500 p-6 rounded-r-xl my-6">
           <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2"><Activity className="w-5 h-5"/> Tempo de Espera</h4>
           <p className="text-gray-300 text-sm">
             A geração leva entre 30 segundos a 2 minutos. Enquanto isso, você verá as capas dos álbuns sendo criadas e o status "Generating...". <strong>Não atualize a página.</strong>
           </p>
        </div>

        <Step number={1} title="O Julgamento">
           Quando terminar, aperte o <strong>Play</strong> em cada uma.
           <br/>Raramente as duas serão boas. Geralmente uma acerta a melodia e a outra acerta a letra. Ou as duas são ruins. Ou as duas são incríveis.
           <br/>Essa variabilidade é normal em IA Generativa.
        </Step>

        <p className="text-gray-400 text-sm mt-4">
           Gostou de uma? Clique nos três pontinhos (...) ao lado dela e selecione <strong>"Download Video"</strong> para compartilhar no WhatsApp.
        </p>
      </>
    )
  },
  {
    id: 'c6_custom_mode_intro',
    trackId: 'creation',
    title: '6. A Chave do Poder: Custom Mode',
    description: 'Por que você deve abandonar o Simple Mode agora mesmo.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <WarningBox>
           O Simple Mode é divertido, mas limitado. Ele mistura letra e estilo, e a IA frequentemente se confunde. Se você quer ser um criador sério, ative o <strong>Custom Mode</strong>.
        </WarningBox>

        <Step number={1} title="Ativando o Custom Mode">
           No topo da aba Create, clique no interruptor <strong>Custom Mode</strong>.
           <br/>A interface vai mudar. Agora você tem controle total.
        </Step>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <strong className="text-white block mb-1">Campo: Lyrics (Letra)</strong>
              <p className="text-xs text-gray-400">Aqui você cola sua própria poesia, ou pede pra IA gerar uma sobre um tema específico.</p>
           </div>
           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <strong className="text-white block mb-1">Campo: Style of Music</strong>
              <p className="text-xs text-gray-400">Aqui definimos Gênero, Instrumentos e Vibe. Sem misturar com o tema da letra.</p>
           </div>
           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <strong className="text-white block mb-1">Campo: Title</strong>
              <p className="text-xs text-gray-400">Nome da música. Afeta a geração da capa do álbum.</p>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'c7_custom_lyrics',
    trackId: 'creation',
    title: '7. Custom Mode: Dominando a Letra',
    description: 'Escrevendo ou gerando letras que a IA consegue cantar.',
    duration: '20 min',
    level: 'Iniciante',
    content: () => (
      <>
        <ConceptCard title="Estrutura é Tudo" icon={LayoutDashboard} color="purple">
           A IA lê a formatação do texto. Blocos de texto juntos são cantados rápido. Linhas puladas são pausas.
           <br/>Use "Tags" entre colchetes para guiar a IA.
        </ConceptCard>

        <CodeBlock>
          [Verse 1]
          Hoje o dia amanheceu cinza
          (Pausa curta na linha de baixo)
          Mas eu sinto o sol dentro de mim
          
          [Chorus]
          VAMOS VOAR! (Maiúsculas indicam grito/energia)
          Para longe daqui...
        </CodeBlock>

        <Step number={1} title="Botão 'Generate Lyrics'">
           Está sem criatividade? No Custom Mode, há um botão "Generate Lyrics". Clique nele e descreva "Um amor perdido em Paris". A IA vai preencher o campo de letra com uma estrutura perfeita de Verso/Refrão para você editar.
        </Step>
      </>
    )
  },
  {
    id: 'c8_custom_style',
    trackId: 'creation',
    title: '8. Custom Mode: Definindo o Estilo',
    description: 'Como pedir exatamente o som que você imagina.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-6 text-gray-300">
          O campo <strong>Style of Music</strong> é onde a engenharia de áudio acontece. O Suno não entende frases longas aqui. Ele entende <strong>palavras-chave (Tags)</strong> separadas por vírgula.
        </p>

        <ComparisonTable 
          title="Como Escrever Estilos"
          leftTitle="Errado (Frase)"
          rightTitle="Certo (Tags)"
          leftItems={["Uma musica triste de piano tocada na chuva tipo Adele"]}
          rightItems={["Sad Pop Ballad, Emotional Piano, Rain Texture, Strong Female Vocals, Slow BPM"]}
        />

        <TipBox>
           <strong>Segredo do v5:</strong> O Suno foi treinado majoritariamente em inglês. Mesmo que sua música seja em português, escreva o estilo em <strong>INGLÊS</strong> para melhor qualidade. Ex: Use "Acoustic Guitar" em vez de "Violão".
        </TipBox>
      </>
    )
  },
  {
    id: 'c9_versions_model',
    trackId: 'creation',
    title: '9. Versões do Modelo (v3.5 vs v4 vs v5)',
    description: 'Escolhendo o motor certo para sua Ferrari.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-4 text-gray-300">
          No painel de criação, você verá um seletor de versão (geralmente v3.5, v4 ou v5). Qual usar?
        </p>

        <div className="space-y-4">
           <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-blue-500">
              <strong className="text-white block">v3.5 (O Clássico)</strong>
              <p className="text-sm text-gray-400">Excelente para músicas mais estruturadas (Pop, Rock). Tende a seguir a letra muito bem. Máximo de 2 minutos por geração (depois precisa estender).</p>
           </div>
           <div className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-pink-500">
              <strong className="text-white block">v4 / v5 (A Nova Geração)</strong>
              <p className="text-sm text-gray-400">Qualidade de áudio superior (48kHz). Entende estruturas complexas. Consegue gerar músicas de até 4 minutos de uma vez só. Porém, às vezes "alucina" mais na letra.</p>
           </div>
        </div>

        <Step number={1} title="Recomendação">
           Comece sempre com a versão mais recente (v5) selecionada. Se ela estiver ignorando seus comandos, tente voltar para a v3.5.
        </Step>
      </>
    )
  },
  {
    id: 'c10_library_management',
    trackId: 'creation',
    title: '10. Organização e Biblioteca',
    description: 'Mantendo a casa limpa e suas criações salvas.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-6 text-gray-300">
          Depois de um dia criando, sua Library estará uma bagunça. Aprenda a organizar.
        </p>

        <div className="grid md:grid-cols-3 gap-4 text-center">
           <div className="p-4 bg-gray-800 rounded-lg">
             <div className="text-red-400 font-bold mb-2">Trash (Lixeira)</div>
             <p className="text-xs text-gray-400">Não tenha dó. Se a música ficou ruim, delete. Isso limpa sua mente para focar nas boas.</p>
           </div>
           <div className="p-4 bg-gray-800 rounded-lg">
             <div className="text-pink-400 font-bold mb-2">Public vs Private</div>
             <p className="text-xs text-gray-400">Por padrão, suas músicas são públicas no link. Você pode mudar para Private se for um projeto secreto.</p>
           </div>
           <div className="p-4 bg-gray-800 rounded-lg">
             <div className="text-blue-400 font-bold mb-2">Playlists</div>
             <p className="text-xs text-gray-400">Crie playlists como "Ideias de Rock", "Para YouTube", "Falhas Engraçadas".</p>
           </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-pink-900 to-purple-900 p-6 rounded-2xl text-center border border-pink-500/30">
           <h2 className="text-2xl font-bold text-white mb-2">Parabéns! 🎓</h2>
           <p className="text-pink-200">
             Você completou o módulo básico. Você já sabe operar a máquina. 
             Nas próximas 10 aulas, vamos deixar de ser operadores e virar <strong>Engenheiros de Áudio</strong>.
           </p>
        </div>
      </>
    )
  },

  // --- FASE 2: ENGENHARIA AVANÇADA (AULAS 11-20) ---
  
  {
    id: 'c11_advanced_metatags',
    trackId: 'creation',
    title: '11. Metatags: A Partitura Invisível',
    description: 'Controlando a estrutura da música com comandos profissionais.',
    duration: '20 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Você já usou [Verse] e [Chorus]. Agora vamos para a liga profissional. Metatags são comandos que dizem <strong>COMO</strong> cantar e tocar, não O QUE cantar.
        </p>

        <CodeBlock>
          [Intro]
          (Synthwave buildup, slow tempo)
          
          [Verse 1]
          Caminhando na chuva...
          
          [Pre-Chorus] 
          (Building tension, drums entering)
          Sinto que algo vai mudar...
          
          [Chorus]
          (Explosion of sound, anthemic)
          AGORA VAI!
          
          [Bridge]
          (Slow down, emotional piano only)
          Mas se você não vier...
          
          [Guitar Solo]
          
          [Outro]
          (Fade out to silence)
        </CodeBlock>

        <TipBox>
           Tags descritivas como <code>(Whispering)</code> ou <code>(Screaming)</code> dentro dos parênteses funcionam muito bem no v5 para mudar a intenção vocal.
        </TipBox>
      </>
    )
  },
  {
    id: 'c12_style_engineering',
    trackId: 'creation',
    title: '12. A Fórmula da Vibe (Style Engineering)',
    description: 'Como combinar gêneros improváveis para criar sons únicos.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="mb-6 text-gray-300">
          Um prompt "Rock" gera um rock genérico. Um prompt de engenharia gera um hit. 
          Use a <strong>Fórmula Vibe</strong>:
        </p>

        <div className="bg-black/30 p-6 rounded-xl border border-gray-800 flex flex-col gap-4 text-center md:flex-row md:text-left items-center justify-between">
           <div className="flex-1">
             <span className="text-xs text-gray-500 uppercase font-bold">Base</span>
             <div className="text-xl text-white font-bold">Gênero Principal</div>
           </div>
           <div className="text-gray-600 text-2xl">+</div>
           <div className="flex-1">
             <span className="text-xs text-gray-500 uppercase font-bold">Atmosfera</span>
             <div className="text-xl text-blue-400 font-bold">Adjetivos</div>
           </div>
           <div className="text-gray-600 text-2xl">+</div>
           <div className="flex-1">
             <span className="text-xs text-gray-500 uppercase font-bold">Técnica</span>
             <div className="text-xl text-pink-400 font-bold">Instrumentos</div>
           </div>
        </div>

        <Step number={1} title="Exemplo Prático: Cyber-Sertanejo">
           <strong>Prompt:</strong> "Brazilian Sertanejo, Cyberpunk Atmosphere, Neon Synthwave textures, Acoustic Guitar mixed with 808 bass, Auto-tuned Vocals, Sad but energetic"
           <br/>Resultado: Algo único que não existe no rádio, mas o Suno cria.
        </Step>
      </>
    )
  },
  {
    id: 'c13_instrumental_control',
    trackId: 'creation',
    title: '13. Controlando o Silêncio e Solos',
    description: 'A arte de fazer a IA calar a boca e tocar.',
    duration: '20 min',
    level: 'Avançado',
    content: () => (
      <>
        <ConceptCard title="O Horror ao Vazio" icon={Music} color="blue">
           A IA tenta preencher cada segundo com voz. Se você quer um instrumental longo, precisa "reservar" o espaço na caixa de Lyrics.
        </ConceptCard>

        <CodeBlock>
          [Chorus]
          Cantando o refrão...
          
          [Instrumental Interlude]
          ........................
          ........................
          (Os pontos ajudam a IA a entender o tempo de duração)
          
          [Saxophone Solo]
          
          [Verse 2]
        </CodeBlock>

        <WarningBox>
          Não escreva "Solo de Guitarra" (em português) dentro dos colchetes se o prompt de estilo estiver em inglês. Mantenha a consistência: <code>[Guitar Solo]</code>.
        </WarningBox>
      </>
    )
  },
  {
    id: 'c14_extend_feature',
    trackId: 'creation',
    title: '14. A Função Extend (O Segredo das Músicas Longas)',
    description: 'Como transformar um clipe de 2 minutos em uma saga de 5 minutos.',
    duration: '25 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          O Suno gera blocos de até 2 minutos (na v3.5) ou 4 (na v5). Se sua música acabou no meio do refrão, não chore. Use o <strong>Extend</strong>.
        </p>

        <Step number={1} title="Selecionando o Ponto de Corte">
           Vá na música que você gostou &gt; Três pontos (...) &gt; <strong>Extend</strong>.
           <br/>Uma timeline vai aparecer. Ouça e pause EXATAMENTE onde a música ficou boa (antes de ficar ruim ou acabar). Ex: 01:50.
        </Step>

        <Step number={2} title="Continuando a História">
           O campo de Lyrics vai esvaziar (ou mostrar a parte antiga). Apague o que já foi cantado e coloque <strong>apenas a continuação</strong> da letra.
           <br/>Adicione novas tags como <code>[Verse 3]</code> ou <code>[Outro]</code>.
        </Step>

        <TipBox>
           <strong>Mudança de Gênero:</strong> Você pode mudar o Style Prompt no Extend! Comece com "Acoustic Ballad" e estenda mudando para "Heavy Metal". A IA fará uma transição gradual épica.
        </TipBox>
      </>
    )
  },
  {
    id: 'c15_inpainting',
    trackId: 'creation',
    title: '15. Inpainting: Cirurgia Corretiva',
    description: 'Corrigindo uma palavra errada sem perder a música perfeita.',
    duration: '20 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl mb-8">
           <h3 className="text-amber-400 font-bold flex items-center gap-2 text-xl"><PenTool className="w-5 h-5"/> O Bisturi da IA</h3>
           <p className="text-gray-300 mt-2">
             Imagine que a música ficou perfeita, mas a IA cantou "coração" como "curação". Antigamente, você perdia a música. Agora, usamos o Inpainting.
           </p>
        </div>

        <Step number={1} title="Pintando o Erro">
           Vá em Edit &gt; <strong>Inpaint (Beta)</strong>.
           <br/>Use o mouse para "pintar" a área da onda sonora onde está a palavra errada. Seja preciso. Pinte apenas o erro.
        </Step>

        <Step number={2} title="Reescrevendo">
           Na caixa de texto do Inpaint, mude a letra ou tente escrever foneticamente (ex: "Co-ra-ção") para forçar a pronúncia correta. O Suno vai regenerar apenas aquele pedacinho, mantendo o resto da música intacto.
        </Step>
      </>
    )
  },
  {
    id: 'c16_audio_input',
    trackId: 'creation',
    title: '16. Audio Input: Você é o Instrumento',
    description: 'Usando sua voz, batucada ou assobio como base.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <div className="flex items-center gap-4 bg-blue-900/20 p-6 rounded-xl mb-6 border border-blue-500/30">
           <Mic2 className="w-12 h-12 text-blue-400" />
           <div>
              <h3 className="text-white font-bold text-lg">Colaboração Humano-IA</h3>
              <p className="text-gray-300 text-sm">O Suno permite upload de áudio (até 60s). Ele usará o ritmo e a melodia do seu áudio, mas mudará o timbre.</p>
           </div>
        </div>

        <h4 className="text-white font-bold mb-3">Ideias de Uso:</h4>
        <ul className="space-y-3 text-gray-300 text-sm">
           <li className="flex gap-2"><CheckCircle2 className="text-green-500 w-4 h-4"/> <strong>Beatbox to Drums:</strong> Faça um beatbox tosco com a boca. Peça estilo "Heavy Metal Drums". O Suno transforma em bateria real.</li>
           <li className="flex gap-2"><CheckCircle2 className="text-green-500 w-4 h-4"/> <strong>Assobio para Violino:</strong> Assobie uma melodia linda. Peça "Orchestral Violin".</li>
           <li className="flex gap-2"><CheckCircle2 className="text-green-500 w-4 h-4"/> <strong>Rascunho de Violão:</strong> Grave um áudio ruim no celular tocando violão e peça para a IA transformar em "Studio Quality Guitar".</li>
        </ul>
      </>
    )
  },
  {
    id: 'c17_v5_fidelity',
    trackId: 'creation',
    title: '17. Segredos do Modelo v5 (Alta Fidelidade)',
    description: 'Como extrair o som cristalino de 48kHz.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          O modelo v5 não é apenas "mais inteligente". Ele tem uma taxa de amostragem (Sample Rate) maior. Ele consegue produzir agudos cristalinos e graves profundos que a v3 não conseguia.
        </p>

        <CodeBlock>
          Tags Obrigatórias para v5:
          "High Fidelity, 48kHz, Studio Master, Wide Stereo, Crisp Vocals, Deep Sub-bass"
        </CodeBlock>
        
        <p className="text-gray-300 text-sm mt-4">
           Essas tags não funcionavam bem na v3, mas na v5 elas realmente mudam a equalização da música. Se sua música soar abafada, adicione "Bright Mix".
        </p>
      </>
    )
  },
  {
    id: 'c18_covers_remix',
    trackId: 'creation',
    title: '18. Covers e Remixes: O Multiverso',
    description: 'Transformando sua música em 10 gêneros diferentes.',
    duration: '15 min',
    level: 'Avançado',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Você criou uma letra incrível, mas a música ficou "méh". Não jogue fora a letra. Use o recurso <strong>Cover</strong> (ou Reuse Prompt).
        </p>

        <Step number={1} title="Estratégia de Remix">
           Pegue sua música original. Vá em Reuse Prompt.
           <br/>Mantenha a letra.
           <br/>Apague o Style completamente e mude radicalmente. De "Reggae" para "Cyberpunk Industrial".
           <br/>Clique em Create.
        </Step>

        <TipBox>
           Artistas famosos lançam versões "Acoustic", "Remix" e "Sped Up" da mesma música. Faça o mesmo. Crie um EP com 3 versões da sua melhor música. Isso aumenta suas chances de agradar públicos diferentes.
        </TipBox>
      </>
    )
  },
  {
    id: 'c19_download_quality',
    trackId: 'creation',
    title: '19. Exportação e Qualidade (WAV vs MP3)',
    description: 'Preparando o arquivo para o mundo real.',
    duration: '10 min',
    level: 'Profissional',
    content: () => (
      <>
        <div className="flex gap-4 items-center bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
           <Database className="w-10 h-10 text-blue-500" />
           <div>
             <h3 className="text-white font-bold">MP3 vs WAV</h3>
             <p className="text-gray-400 text-sm">A diferença entre amador e profissional.</p>
           </div>
        </div>

        <ul className="space-y-4">
           <li className="bg-black/20 p-4 rounded-lg">
             <strong className="text-pink-400 block">MP3 (Grátis/Basic)</strong>
             <span className="text-gray-400 text-sm">Arquivo comprimido. O Suno corta as frequências mais altas para economizar espaço. Bom para mandar no WhatsApp, ruim para Spotify ou edição de vídeo.</span>
           </li>
           <li className="bg-black/20 p-4 rounded-lg">
             <strong className="text-green-400 block">WAV (Pro/Premier)</strong>
             <span className="text-gray-400 text-sm">Lossless (Sem perda). É o áudio puro que saiu do servidor. Essencial se você vai editar no CapCut, Premiere ou masterizar depois.</span>
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'c20_final_workflow',
    trackId: 'creation',
    title: '20. O Workflow Completo (Resumo)',
    description: 'Do zero ao Spotify: O checklist do Engenheiro de Áudio.',
    duration: '15 min',
    level: 'Profissional',
    content: () => (
      <>
        <div className="mt-4 p-8 bg-gradient-to-r from-green-900 to-emerald-900 rounded-3xl text-center border border-green-500/30 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Você Concluiu a Engenharia de Áudio! 🏆</h2>
           <p className="text-green-200 text-lg relative z-10 max-w-2xl mx-auto mb-8">
             Você agora domina a ferramenta mais poderosa da música atual.
           </p>

           <div className="text-left bg-black/40 p-6 rounded-xl max-w-lg mx-auto backdrop-blur-md border border-green-500/20">
              <h4 className="text-green-400 font-bold mb-4 uppercase text-xs tracking-widest border-b border-green-500/30 pb-2">Seu Checklist Final:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                 <li>✅ 1. Ideia Inicial + Custom Mode</li>
                 <li>✅ 2. Style Prompt (Fórmula Vibe) + Metatags</li>
                 <li>✅ 3. Geração (v5) + Curadoria (Lixo vs Ouro)</li>
                 <li>✅ 4. Extensão (Extend) até finalizar a música</li>
                 <li>✅ 5. Inpainting (Correção de erros)</li>
                 <li>✅ 6. Download em WAV</li>
                 <li>✅ 7. (Opcional) Masterização Externa</li>
              </ul>
           </div>
           
           <p className="text-gray-400 text-xs mt-6 italic relative z-10">
             Próxima parada: Como ganhar dinheiro com esses arquivos WAV na trilha "Business".
           </p>
        </div>
      </>
    )
  }
];

// --- TRILHA 2: NEGÓCIOS & YOUTUBE ---
// Total: 20 Aulas (10 Iniciante + 10 Avançado)

export const ADVANCED_BUSINESS_LESSONS: Lesson[] = [
  // --- FASE 1: FUNDAMENTOS DO CANAL (AULAS 1-10) ---
  {
    id: 'b1_faceless_model',
    trackId: 'monetization',
    title: '1. O Império Invisível (Faceless Channels)',
    description: 'A revolução dos canais Dark e por que a sua "falta de fama" é seu maior ativo.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="bg-black border border-gray-800 p-8 rounded-2xl mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
             <Briefcase className="w-8 h-8 text-blue-500"/> Influenciador vs. Produtor
          </h3>
          <p className="text-gray-300 leading-relaxed">
             O modelo antigo do YouTube exigia carisma, beleza e exposição. Você virava escravo da sua imagem.
             O modelo <strong>Faceless (Canal Dark)</strong> trata o vídeo como um ativo imobiliário. O vídeo trabalha 24h por dia, sem férias, sem burnout e sem mostrar seu rosto.
          </p>
        </div>

        <ComparisonTable 
          title="Modelo de Negócio"
          leftTitle="YouTuber Tradicional"
          rightTitle="Império de Mídia (Você)"
          leftItems={["Vende o Ego", "Se parar de postar, a renda zera", "Difícil de vender o canal"]}
          rightItems={["Vende Utilidade (Música/Foco)", "Renda Passiva de vídeos antigos", "Ativo vendável (Exit Strategy)"]}
        />
        
        <p className="text-gray-400 text-sm mt-4 text-center">
           A Lofi Girl (canal Lofi hip hop radio) é o maior exemplo. Ninguém sabe quem é o dono, mas o canal vale milhões.
        </p>
      </>
    )
  },
  {
    id: 'b2_niches',
    trackId: 'monetization',
    title: '2. Oceano Azul: Escolhendo Nichos Lucrativos',
    description: 'Saindo do genérico e encontrando tribos famintas por conteúdo.',
    duration: '20 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-6 text-gray-300">
          "Música Relaxante" é um Oceano Vermelho (saturado). Você precisa <strong>nichar para baixo</strong> (Sub-nichar).
        </p>

        <div className="grid md:grid-cols-3 gap-6">
           <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:-translate-y-2 transition-transform duration-300 cursor-default">
             <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-4"><MonitorPlay className="text-purple-400 w-5 h-5"/></div>
             <strong className="text-purple-400 text-lg">Gamer Focus</strong>
             <p className="text-xs text-gray-400 mt-2">Synthwave agressivo para jogar League of Legends/CS:GO. Público fiel e engajado.</p>
           </div>
           <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:-translate-y-2 transition-transform duration-300 cursor-default">
             <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mb-4"><Zap className="text-green-400 w-5 h-5"/></div>
             <strong className="text-green-400 text-lg">Gym Phonk</strong>
             <p className="text-xs text-gray-400 mt-2">Música ultra agressiva para bater PR na academia. Viraliza muito no TikTok/Shorts.</p>
           </div>
           <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:-translate-y-2 transition-transform duration-300 cursor-default">
             <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"><Globe2 className="text-blue-400 w-5 h-5"/></div>
             <strong className="text-blue-400 text-lg">Solfeggio/Cura</strong>
             <p className="text-xs text-gray-400 mt-2">Frequências específicas (528Hz, 432Hz) para cura espiritual e meditação. CPM altíssimo.</p>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'b3_visual_identity',
    trackId: 'monetization',
    title: '3. Branding: Pareça uma Gravadora',
    description: 'Como usar IA de imagem para criar uma marca de R$ 10.000,00 com zero custo.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-4 text-gray-300">
          O usuário julga o livro pela capa em milissegundos. Se seu canal tem foto de anime pixelada e banner torto, você perdeu.
        </p>
        
        <Step number={1} title="O Nome (Naming)">
           Evite: "Canal do Pedrinho Games".
           <br/>Use: Conceitos Abstratos em Inglês (passa autoridade global).
           <br/>Exemplos: <em>Ethereal Mind, Bass Nation, Focus Flow, Zen Sanctuary</em>.
        </Step>

        <Step number={2} title="O Logo e Banner (Midjourney/Bing)">
           Use este prompt no Bing Image Creator:
           <code className="block bg-black p-3 rounded mt-2 text-green-400 text-xs font-mono">
             Minimalist vector logo for a music channel called "Zen Flow", lotus flower icon, cyan and white color palette, flat design, vector art --no text
           </code>
        </Step>
      </>
    )
  },
  {
    id: 'b4_free_tools',
    trackId: 'monetization',
    title: '4. O Arsenal Gratuito (Ferramentas)',
    description: 'Softwares profissionais que não custam nada para começar.',
    duration: '12 min',
    level: 'Iniciante',
    content: () => (
      <>
        <ul className="grid gap-4">
           <li className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
             <div className="bg-gray-800 p-2 rounded text-white font-bold">CapCut PC</div>
             <div>
               <p className="text-white font-bold">Edição de Vídeo</p>
               <p className="text-sm text-gray-400">Melhor que Premiere para iniciantes. Tem legendas automáticas e efeitos prontos.</p>
             </div>
           </li>
           <li className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
             <div className="bg-gray-800 p-2 rounded text-white font-bold">Canva</div>
             <div>
               <p className="text-white font-bold">Thumbnails</p>
               <p className="text-sm text-gray-400">Use os templates de "YouTube Thumbnail". A versão grátis é suficiente.</p>
             </div>
           </li>
           <li className="flex items-start gap-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
             <div className="bg-gray-800 p-2 rounded text-white font-bold">Audacity</div>
             <div>
               <p className="text-white font-bold">Edição de Áudio</p>
               <p className="text-sm text-gray-400">Para fazer loops perfeitos (crossfade) e mudar a frequência (432Hz).</p>
             </div>
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'b5_first_video',
    trackId: 'monetization',
    title: '5. Pipeline de Produção: Do Zero ao Upload',
    description: 'Passo a passo técnico da montagem do vídeo.',
    duration: '20 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="mb-4 text-gray-300">A fórmula de um vídeo de música de sucesso é: <strong>Ambiente Imersivo + Áudio Consistente</strong>.</p>
        
        <Step number={1} title="A Imagem Base">
           Gere uma imagem Wide (16:9) no Midjourney. "Cozy bedroom raining outside lo-fi aesthetic --ar 16:9".
        </Step>
        
        <Step number={2} title="O Movimento (O Pulo do Gato)">
           O YouTube odeia imagens estáticas (parece slide de powerpoint). 
           No CapCut, adicione "Effects &gt; Nature &gt; Snow/Rain" ou "Particles". Adicione uma leve animação de "Zoom In" (Keyframes) bem lenta. Isso engana o algoritmo e conta como vídeo real.
        </Step>
        
        <Step number={3} title="O Áudio em Loop">
           Pegue sua música do Suno (2-4 min). Duplique ela na timeline até dar 1 hora. Use uma transição de "Dissolve" entre os clipes para não dar um tranco no ouvido.
        </Step>
      </>
    )
  },
  {
    id: 'b6_thumbnails',
    trackId: 'monetization',
    title: '6. Psicologia da Thumbnail (CTR)',
    description: 'Como ganhar o clique em um mar de concorrência.',
    duration: '15 min',
    level: 'Iniciante',
    content: () => (
      <>
        <ConceptCard title="A Regra dos 3 Elementos" icon={Palette} color="purple">
           O cérebro processa imagens rápido. Sua thumb deve ter no MÁXIMO 3 pontos de foco:
           <br/>1. Um Fundo Contrastante.
           <br/>2. Um Elemento Emocional Claro (Rosto triste, Paisagem linda).
           <br/>3. Texto Gigante (Máx 3 palavras).
        </ConceptCard>

        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
           <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
             <strong className="text-red-400 block mb-2">Thumb Ruim</strong>
             <p className="text-xs text-gray-400">Texto pequeno, cores pastéis, muita informação, captura de tela aleatória.</p>
           </div>
           <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
             <strong className="text-green-400 block mb-2">Thumb Viral</strong>
             <p className="text-xs text-gray-400">Saturação alta, brilho (Glow), fonte Sans-Serif Bold, rosto expressivo ou cenário onírico.</p>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'b7_seo_titles',
    trackId: 'monetization',
    title: '7. SEO e Palavras-Chave de Cauda Longa',
    description: 'Como ser encontrado por quem procura exatamente o que você fez.',
    duration: '20 min',
    level: 'Iniciante',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Não tente competir por "Música para Dormir" (Cauda Curta). Os canais gigantes já dominam isso.
          Vá para a <strong>Cauda Longa</strong> (Long Tail).
        </p>

        <ComparisonTable 
          title="Estratégia de Palavras-Chave"
          leftTitle="Genérico (Impossível ranquear)"
          rightTitle="Específico (Fácil ranquear)"
          leftItems={["Relaxing Music", "Study Music", "Gym Music"]}
          rightItems={["Relaxing Music for Anxiety and Overthinking", "Lofi Hip Hop for Late Night Study raining", "Aggressive Phonk for Deadlift PR"]}
        />

        <TipBox>
           Use a barra de pesquisa do YouTube. Comece a digitar "music for..." e veja o que o autocompletar sugere. Aquilo são buscas reais. Use exatamente aquelas frases no seu título.
        </TipBox>
      </>
    )
  },
  {
    id: 'b8_upload_checklist',
    trackId: 'monetization',
    title: '8. O Ritual de Upload Perfeito',
    description: 'Checklist técnico para garantir que o algoritmo entenda seu vídeo.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="space-y-3">
           <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
             <CheckCircle2 className="text-green-500"/>
             <span className="text-gray-300 text-sm"><strong>Nome do Arquivo:</strong> Renomeie o arquivo final. Nada de <code>video_final_02.mp4</code>. Use <code>musica_para_dormir_chuva.mp4</code>. O Google lê isso.</span>
           </div>
           <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
             <CheckCircle2 className="text-green-500"/>
             <span className="text-gray-300 text-sm"><strong>Descrição (Primeiras 2 linhas):</strong> Repita a palavra-chave principal do título de forma natural.</span>
           </div>
           <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
             <CheckCircle2 className="text-green-500"/>
             <span className="text-gray-300 text-sm"><strong>Tags:</strong> Misture amplas (#music) com específicas (#lofirain).</span>
           </div>
           <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
             <CheckCircle2 className="text-green-500"/>
             <span className="text-gray-300 text-sm"><strong>Cards e Tela Final:</strong> Sempre linke para outro vídeo do seu canal para criar um "Binge Watching Loop".</span>
           </div>
        </div>
      </>
    )
  },
  {
    id: 'b9_monetization_rules',
    trackId: 'monetization',
    title: '9. Regras do Jogo (YPP)',
    description: 'Entendendo os requisitos de 1.000 inscritos e 4.000 horas.',
    duration: '10 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="grid grid-cols-2 gap-4 text-center mt-4 mb-8">
           <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-2xl shadow-lg border border-blue-500/20">
              <strong className="text-4xl text-white font-black block mb-2">1K</strong>
              <p className="text-blue-200 text-xs uppercase tracking-widest">Inscritos</p>
           </div>
           <div className="bg-gradient-to-br from-pink-900 to-pink-800 p-6 rounded-2xl shadow-lg border border-pink-500/20">
              <strong className="text-4xl text-white font-black block mb-2">4K</strong>
              <p className="text-pink-200 text-xs uppercase tracking-widest">Horas</p>
           </div>
        </div>
        
        <p className="text-gray-300 text-sm">
           Em canais de música (vídeos longos), as 4.000 horas são fáceis. Se uma pessoa ouve sua playlist de 1 hora para dormir, você só precisa de 4.000 views. O desafio real são os inscritos.
        </p>

        <WarningBox>
           <strong>Cuidado com Shorts:</strong> As horas assistidas no Feed de Shorts <strong>NÃO CONTAM</strong> para as 4.000 horas de monetização de vídeos longos. Use Shorts apenas para pescar inscritos.
        </WarningBox>
      </>
    )
  },
  {
    id: 'b10_mindset',
    trackId: 'monetization',
    title: '10. O Vale da Morte e a Consistência',
    description: 'Sobrevivendo aos primeiros 30 dias sem visualizações.',
    duration: '12 min',
    level: 'Iniciante',
    content: () => (
      <>
        <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-yellow-500 my-6">
           <h4 className="text-yellow-500 font-bold text-lg mb-2">A Regra dos 30 Vídeos</h4>
           <p className="text-gray-300 text-sm italic">
             "O YouTube não sabe quem você é. Os primeiros 30 vídeos não são para ganhar views, são para treinar a IA do YouTube sobre qual é o seu público."
           </p>
        </div>

        <p className="text-gray-300 mb-4">
           A maioria desiste no vídeo 10. O crescimento é exponencial, não linear. Você fica no zero por meses, e de repente um vídeo estoura e puxa todos os outros.
        </p>

        <ul className="space-y-2 text-gray-400 text-sm">
           <li>✅ Poste 2 a 3 vezes por semana (Horário fixo).</li>
           <li>✅ Não apague vídeos com poucas views (eles podem viralizar meses depois).</li>
           <li>✅ Foque em melhorar 1% a cada vídeo (melhor thumb, melhor áudio).</li>
        </ul>
      </>
    )
  },

  // --- FASE 2: ESCALA E ESTRATÉGIA AVANÇADA (AULAS 11-20) ---
  {
    id: 'b11_cpm_reality',
    trackId: 'monetization',
    title: '11. A Geografia do Dinheiro (CPM & RPM)',
    description: 'Como ganhar 10x mais focando nos países Tier 1.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Nem todo view vale o mesmo. O YouTube paga baseado no poder de compra do país de quem assiste.
        </p>

        <div className="overflow-hidden rounded-xl border border-gray-700 shadow-2xl mb-8">
           <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-gray-800 text-gray-200 uppercase font-bold text-xs">
               <tr>
                 <th className="p-4">Região (Tier)</th>
                 <th className="p-4">Países</th>
                 <th className="p-4 text-right">RPM Estimado (por 1k views)</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-800 bg-gray-900/50">
               <tr className="hover:bg-gray-800 transition-colors">
                 <td className="p-4 text-green-400 font-bold">Tier 1 (Rico)</td>
                 <td className="p-4">EUA, Reino Unido, Austrália, Canadá</td>
                 <td className="p-4 text-right font-mono text-green-400">$10 - $25</td>
               </tr>
               <tr className="hover:bg-gray-800 transition-colors">
                 <td className="p-4 text-yellow-400 font-bold">Tier 2 (Médio)</td>
                 <td className="p-4">Europa Oriental, Japão, Coreia</td>
                 <td className="p-4 text-right font-mono text-yellow-400">$4 - $8</td>
               </tr>
               <tr className="hover:bg-gray-800 transition-colors">
                 <td className="p-4 text-red-400 font-bold">Tier 3 (Baixo)</td>
                 <td className="p-4">Brasil, Índia, Indonésia</td>
                 <td className="p-4 text-right font-mono text-red-400">$0.50 - $2</td>
               </tr>
             </tbody>
           </table>
        </div>

        <ConceptCard title="Estratégia Global" icon={Globe2} color="blue">
           Como seus vídeos são de música (sem fala), você PODE e DEVE mirar no Tier 1.
           <br/>Nunca escreva títulos em Português. Use Inglês. O brasileiro entende "Relaxing Music", mas o americano não entende "Música Relaxante".
        </ConceptCard>
      </>
    )
  },
  {
    id: 'b12_visual_engineering',
    trackId: 'monetization',
    title: '12. Engenharia Visual Avançada (Loops)',
    description: 'Fugindo do "Conteúdo Reutilizado" com loops complexos.',
    duration: '25 min',
    level: 'Profissional',
    content: () => (
      <>
        <WarningBox>
           <strong>Perigo:</strong> Se você usar uma imagem estática por 1 hora, o YouTube pode negar sua monetização alegando "Conteúdo Repetitivo" ou "Baixo Esforço".
        </WarningBox>

        <p className="text-gray-300 mt-4 mb-6">
           Você precisa transformar a imagem em um "Cinemagraph" (Foto viva).
        </p>

        <Step number={1} title="Ferramentas de Animação">
           1. <strong>Wallpaper Engine (Steam):</strong> Baixe wallpapers animados em 4K, grave a tela (OBS Studio) e use como base. Custa barato e a qualidade é insana.
           <br/>2. <strong>Motionleap (Mobile):</strong> App que anima água, céu e adiciona overlays de chuva.
        </Step>

        <Step number={2} title="A Técnica do Canvas Híbrido">
           No editor de vídeo, coloque uma camada de partículas (poeira, neve, faíscas de fogo) sobre a imagem com opacidade 30%. Isso garante que *todos* os pixels da tela mudem a cada frame, satisfazendo o algoritmo de detecção de movimento do YouTube.
        </Step>
      </>
    )
  },
  {
    id: 'b13_audio_stitching',
    trackId: 'monetization',
    title: '13. Audio Stitching: O Loop Invisível',
    description: 'Técnica de edição para emendar músicas sem cortes bruscos.',
    duration: '20 min',
    level: 'Profissional',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Nada quebra mais a imersão de quem está dormindo do que um silêncio total ou um corte seco quando a música repete.
        </p>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
           <h4 className="text-white font-bold mb-4">O Crossfade Manual (Regra dos 10s)</h4>
           <div className="relative h-20 bg-black rounded-lg overflow-hidden border border-gray-700 flex items-center">
             <div className="absolute left-0 w-2/3 h-full bg-blue-500/30 border-r border-blue-500 flex items-center justify-center text-xs">Clip A (Terminando)</div>
             <div className="absolute right-0 w-2/3 h-full bg-green-500/30 border-l border-green-500 flex items-center justify-center text-xs">Clip B (Começando)</div>
             <div className="absolute left-1/3 right-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 flex items-center justify-center">
                <span className="bg-black/80 px-2 py-1 rounded text-[10px] text-white">Zona de Crossfade (10s)</span>
             </div>
           </div>
        </div>

        <Step number={1} title="Execução">
           Não coloque um clipe encostado no outro. Coloque o Clip B em uma trilha abaixo, começando 10 segundos antes do Clip A acabar. Aplique "Fade Out" no Clip A e "Fade In" no Clip B durante essa sobreposição.
        </Step>
      </>
    )
  },
  {
    id: 'b14_seo_stacking',
    trackId: 'monetization',
    title: '14. SEO Stacking: Dominação de Busca',
    description: 'A técnica avançada de empilhar palavras-chave para hackear o ranking.',
    duration: '20 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          O YouTube escaneia seu vídeo em 3 camadas. Você precisa colocar a palavra-chave (ex: "Deep Sleep") em todas elas.
        </p>

        <ul className="space-y-4">
           <li className="bg-gray-900 p-4 rounded-lg border-l-4 border-blue-500">
             <strong className="text-blue-400 block mb-1">Nível 1: Metadados</strong>
             <span className="text-sm text-gray-400">Título, Descrição e Tags. (O básico).</span>
           </li>
           <li className="bg-gray-900 p-4 rounded-lg border-l-4 border-purple-500">
             <strong className="text-purple-400 block mb-1">Nível 2: Arquivo Bruto (Raw File)</strong>
             <span className="text-sm text-gray-400">O nome do arquivo .mp4 que você sobe. Renomeie para <code>deep_sleep_music_432hz.mp4</code>. O YouTube lê isso.</span>
           </li>
           <li className="bg-gray-900 p-4 rounded-lg border-l-4 border-red-500">
             <strong className="text-red-400 block mb-1">Nível 3: Legendas Ocultas (Closed Captions)</strong>
             <span className="text-sm text-gray-400">Mesmo sem fala, você pode subir um arquivo de legenda .srt com marcadores de tempo descritivos: "[00:00] Relaxing deep sleep music starts". Isso conta muito para o SEO.</span>
           </li>
        </ul>
      </>
    )
  },
  {
    id: 'b15_shorts_funnel',
    trackId: 'monetization',
    title: '15. O Funil de Shorts (Ponte para o Longo)',
    description: 'Usando o alcance viral dos Shorts para bombear vídeos de 1 hora.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Shorts dão visualizações rápidas mas pagam mal. Vídeos longos pagam bem mas crescem devagar. O segredo é o <strong>Funil</strong>.
        </p>

        <Step number={1} title="Criação do Teaser">
           Pegue o melhor momento (o "Hook") da sua música de 3 minutos. Gere um vídeo vertical (9:16).
           Coloque um texto na tela: "Quer dormir em 5 minutos? Ouça a versão completa 👇".
        </Step>

        <Step number={2} title="O Link Mágico (Related Video)">
           No YouTube Studio (PC), ao editar o Short, há um campo chamado "Vídeo Relacionado". Selecione seu vídeo longo de 1 hora.
           Isso cria um botão clicável "▶️ Created from..." direto na tela do Short. É a única forma de linkar vídeos nativamente.
        </Step>
      </>
    )
  },
  {
    id: 'b16_global_reach',
    trackId: 'monetization',
    title: '16. Localização de Metadados (Alcance Global)',
    description: 'Como fazer seu vídeo aparecer em buscas em Japonês, Russo e Árabe.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-4">
          Sua música é universal. Por que seu título está só em Inglês?
        </p>

        <ConceptCard title="Tradução Nativa do YouTube" icon={Globe2} color="amber">
           Vá em Detalhes do Vídeo &gt; Legendas &gt; Adicionar Idioma.
           <br/>Você pode adicionar traduções oficiais do Título e Descrição.
           <br/><br/>
           Se um usuário do Japão buscar por "música para dormir" (em japonês), o YouTube mostrará SEU vídeo com o título traduzido automaticamente. Isso triplica seu alcance potencial.
        </ConceptCard>

        <TipBox>
           Idiomas prioritários para música: Espanhol, Português, Hindi, Árabe, Japonês, Russo e Indonésio.
        </TipBox>
      </>
    )
  },
  {
    id: 'b17_affiliate',
    trackId: 'monetization',
    title: '17. Monetização Alternativa (Afiliados)',
    description: 'Ganhando dinheiro antes mesmo de monetizar com AdSense.',
    duration: '15 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-6">
          Não deixe a descrição vazia. Ela é um outdoor imobiliário. Venda produtos que resolvam o problema do seu público.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
           <div className="bg-gray-800 p-4 rounded-lg">
             <strong className="text-purple-400 block mb-2">Canal de Sono/Lofi</strong>
             <p className="text-sm text-gray-400">Amazon Associates: Fones de ouvido com cancelamento de ruído, luminárias RGB, cadeiras confortáveis, chás de camomila.</p>
           </div>
           <div className="bg-gray-800 p-4 rounded-lg">
             <strong className="text-green-400 block mb-2">Canal de Foco/Gym</strong>
             <p className="text-sm text-gray-400">ClickBank/Hotmart: Suplementos, Planners digitais, Apps de produtividade, Equipamentos de treino.</p>
           </div>
        </div>

        <p className="text-gray-300 text-sm mt-4">
           Coloque o link na primeira linha da descrição: "🎵 O fone que eu uso para produzir: [Link]".
        </p>
      </>
    )
  },
  {
    id: 'b18_community_tab',
    trackId: 'monetization',
    title: '18. Hack de Engajamento: Aba Comunidade',
    description: 'Como reativar inscritos mortos e validar ideias.',
    duration: '10 min',
    level: 'Business',
    content: () => (
      <>
        <p className="text-gray-300 mb-4">
          A Aba Comunidade (Community Tab) aparece no feed até de quem não ativou o sininho.
        </p>

        <Step number={1} title="Enquetes Visuais (Image Polls)">
           O YouTube adora enquetes de imagem. Elas têm engajamento altíssimo pois exigem apenas um clique.
           <br/>Poste duas capas de álbum geradas por IA e pergunte: "Qual vibe vocês querem no próximo vídeo? A ou B?".
        </Step>

        <p className="text-gray-300 text-sm">
           Isso cria um compromisso. Quem votou na opção A sente que "ajudou a criar" o vídeo e vai clicar quando ele sair.
        </p>
      </>
    )
  },
  {
    id: 'b19_outsourcing',
    trackId: 'monetization',
    title: '19. Automação e Terceirização (Scaling)',
    description: 'Como gerenciar 5 canais ao mesmo tempo sem ficar louco.',
    duration: '20 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="flex items-center gap-4 bg-gray-900 p-6 rounded-xl border border-gray-800 mb-6">
           <Users className="w-10 h-10 text-blue-500" />
           <div>
              <h3 className="text-white font-bold">Mentalidade de CEO</h3>
              <p className="text-gray-400 text-sm">Você deve trabalhar NO negócio, não PARA o negócio. O trabalho braçal (looping, upload) deve ser delegado.</p>
           </div>
        </div>

        <Step number={1} title="Crie um SOP (Standard Operating Procedure)">
           Grave a tela do seu computador fazendo o processo inteiro de um vídeo (Gerar Suno -&gt; Midjourney -&gt; CapCut -&gt; Upload). Fale explicando.
        </Step>

        <Step number={2} title="Contrate Barato">
           Vá no Workana ou VintePila. Envie o vídeo do SOP. Pague R$ 20 - R$ 50 por pacote de vídeos. Seu tempo vale muito mais que isso focado em estratégia e novos canais.
        </Step>
      </>
    )
  },
  {
    id: 'b20_exit_strategy',
    trackId: 'monetization',
    title: '20. O Grande Cheque: Vendendo o Canal (Exit)',
    description: 'Como vender seu canal monetizado por 30x o lucro mensal.',
    duration: '25 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-8 rounded-3xl text-center border border-green-500/30 shadow-2xl relative overflow-hidden mb-8">
           <DollarSign className="absolute top-0 left-0 text-green-500/10 w-48 h-48 -rotate-12" />
           <h2 className="text-3xl font-bold text-white mb-2 relative z-10">O Jogo do Equity</h2>
           <p className="text-green-200 text-lg relative z-10">
             Canais Dark são ativos digitais. Eles têm valor de mercado (Valuation).
           </p>
        </div>

        <p className="text-gray-300 mb-6">
           Se seu canal lucra $500/mês de forma passiva (AdSense), ele vale entre <strong>24x a 36x</strong> esse valor no mercado.
           Ou seja, você pode vendê-lo por <strong>$12.000 a $18.000</strong> à vista.
        </p>

        <Step number={1} title="Onde Vender?">
           Sites como <strong>Flippa</strong>, <strong>Empire Flippers</strong> ou grupos privados de investidores de mídia.
        </Step>

        <Step number={2} title="Preparação para Venda">
           Mantenha a contabilidade limpa. Não misture canais no mesmo AdSense se planeja vender separadamente. O comprador quer ver um histórico de 6 a 12 meses de receita estável.
        </Step>

        <div className="mt-8 text-center text-gray-500 italic text-sm border-t border-gray-800 pt-6">
           Parabéns. Você completou a trilha de Negócios. Agora você tem o conhecimento técnico (Suno) e estratégico (YouTube) para construir seu império.
        </div>
      </>
    )
  }
];

// --- TRILHA BÔNUS: DICAS DE MESTRE (MANTIDA A VERSÃO ENRICHED) ---

export const BONUS_LESSONS: Lesson[] = [
  {
    id: 'bonus1_mastering_lufs',
    trackId: 'bonus',
    title: '1. O Segredo do LUFS (Masterização Profissional)',
    description: 'Por que sua música soa "baixa" perto de artistas famosos e a ciência do Loudness.',
    duration: '20 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border border-yellow-500/50 p-6 rounded-xl mb-8 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
           <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
             <Speaker className="w-6 h-6 animate-pulse"/> A Guerra do Volume
           </h2>
           <p className="text-gray-200 leading-relaxed mb-4">
             O áudio cru do Suno geralmente sai a <strong>-18 LUFS</strong> (Loudness Units Full Scale). As músicas profissionais no Spotify tocam a <strong>-14 LUFS</strong>, e no YouTube Music podem chegar a <strong>-9 LUFS</strong> (muito mais alto).
           </p>
           <p className="text-gray-200 leading-relaxed">
             Se sua música for baixa, o cérebro humano interpreta como "baixa qualidade" e pula. Você precisa <strong>Normalizar e Limitar</strong>.
           </p>
        </div>

        <Step number={1} title="A Solução Gratuita: BandLab Mastering">
           Não precisa pagar engenheiro. A IA do BandLab resolve isso em segundos.
           <br/><br/>
           1. Acesse <strong>BandLab Mastering (Web)</strong>.
           <br/>2. Arraste seu arquivo WAV do Suno.
           <br/>3. Escolha o preset:
           <ul className="list-disc list-inside ml-4 mt-2 text-gray-400 text-sm">
             <li><strong>Fire:</strong> Para Phonk, Gym e Trap (Foco em Graves e Pancada).</li>
             <li><strong>Universal:</strong> Para Pop, Lofi e Acústico (Equilíbrio).</li>
             <li><strong>Tape:</strong> Para Jazz e Soul (Adiciona calor analógico).</li>
           </ul>
        </Step>
      </>
    )
  },
  {
    id: 'bonus2_neuro_lyrics',
    trackId: 'bonus',
    title: '2. Copywriting Musical: O Efeito "Open Loop"',
    description: 'Técnicas de neurociência para fazer a pessoa ouvir a letra até o final.',
    duration: '20 min',
    level: 'Masterclass',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          Grandes compositores como Taylor Swift usam o conceito de <strong>"Storytelling Gap"</strong>. Eles abrem uma pergunta na primeira frase que só é respondida no refrão.
        </p>

        <ComparisonTable 
          title="Técnica do Gancho (The Hook)"
          leftTitle="Letra Amadora (Descritiva)"
          rightTitle="Letra Profissional (Misteriosa)"
          leftItems={[
            "O dia estava bonito",
            "Eu acordei e tomei café",
            "Fui para a rua caminhar"
          ]}
          rightItems={[
            "Você disse que nunca voltaria",
            "Mas vi sua sombra na minha porta",
            "Por que você mentiu?"
          ]}
        />
        
        <TipBox>
           <strong>Prompt Secreto:</strong> Peça ao ChatGPT: <em>"Reescreva esta letra usando a técnica 'In Media Res' (começar no meio da ação) e crie um mistério na primeira estrofe."</em>
        </TipBox>
      </>
    )
  },
  {
    id: 'bonus3_color_theory',
    trackId: 'bonus',
    title: '3. Teoria das Cores para Thumbnails',
    description: 'A regra 60-30-10 e cores complementares para explodir seu CTR.',
    duration: '15 min',
    level: 'Masterclass',
    content: () => (
      <>
        <p className="text-gray-300 leading-relaxed mb-6">
          O YouTube é um mar de vermelho e branco. Para se destacar, você deve usar a <strong>Roda de Cores</strong> a seu favor. O olho humano é programado para notar contraste.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
           <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
              <strong className="text-yellow-400 block mb-2">Combinação Lofi (Complementar)</strong>
              <p className="text-gray-400 text-sm">
                 Roxo (Fundo) + Amarelo (Luz da Janela/Texto).
                 <br/>O amarelo é o oposto do roxo na roda de cores, criando vibração máxima.
              </p>
           </div>
           <div className="bg-gray-900 p-5 rounded-xl border border-gray-800">
              <strong className="text-cyan-400 block mb-2">Combinação Tech/Futuro</strong>
              <p className="text-gray-400 text-sm">
                 Preto (Fundo) + Ciano Neon ou Magenta.
                 <br/>O alto contraste com o preto cria a sensação de "brilho".
              </p>
           </div>
        </div>

        <Step number={1} title="A Regra 60-30-10">
           Ao criar sua capa no Canva/Midjourney:
           <br/>- <strong>60%</strong> Cor Dominante (Fundo/Ambiente)
           <br/>- <strong>30%</strong> Cor Secundária (Objetos)
           <br/>- <strong>10%</strong> Cor de Ação (Texto ou Ponto Focal em cor oposta)
        </Step>
      </>
    )
  },
  {
    id: 'bonus4_legal_shield',
    trackId: 'bonus',
    title: '4. O Escudo Jurídico (Disputando Claims)',
    description: 'O texto exato para copiar e colar caso o YouTube marque sua música.',
    duration: '25 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="flex items-center gap-4 bg-red-900/20 p-6 rounded-xl border border-red-500/30 mb-6">
           <ShieldCheck className="w-12 h-12 text-red-400" />
           <div>
             <h3 className="text-xl font-bold text-white">Strike vs. Claim</h3>
             <p className="text-gray-300 text-sm">
               <strong>Strike:</strong> Penalidade grave. Seu canal pode cair.<br/>
               <strong>Content ID Claim:</strong> Apenas redireciona o dinheiro do vídeo para outra pessoa. É comum em IA e 99% das vezes é erro.
             </p>
           </div>
        </div>

        <p className="text-gray-300 mb-4">Se você tem a assinatura paga do Suno, você tem a licença comercial. Se receber um Claim, não aceite. Dispute.</p>

        <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-500">
           <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">Modelo de Disputa (Copie e Cole)</h4>
           <CodeBlock>
             "I dispute this claim on the grounds that I possess a valid commercial license for the audio content utilized in this video. 
             <br/><br/>
             This track was generated using Suno AI under a paid [Pro/Premier] Subscription, which explicitly grants me, the creator, full ownership and commercial rights to the generated output, in accordance with Suno's Terms of Service (Section 2 - Commercial Rights).
             <br/><br/>
             Please release this claim immediately as it holds no legal merit."
           </CodeBlock>
        </div>
      </>
    )
  },
  {
    id: 'bonus5_alchemy_frequencies',
    trackId: 'bonus',
    title: '5. A Alquimia das Frequências (432Hz & Binaural)',
    description: 'Transforme o áudio padrão em "Música de Cura" para dobrar a retenção.',
    duration: '30 min',
    level: 'Masterclass',
    content: () => (
      <>
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-violet-900 border border-indigo-500/30 p-8 rounded-2xl mb-8 shadow-2xl">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-40 h-40 text-white" />
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
             <Activity className="w-8 h-8 text-indigo-400"/> O Segredo da Retenção
           </h2>
           <p className="text-indigo-100 text-lg leading-relaxed relative z-10">
             Música padrão é afinada em <strong>440Hz</strong>. Porém, nos nichos de Meditação, Estudo e Sono, o público busca frequências específicas que "hackeiam" o cérebro.
             <br/><br/>
             Transformar sua música Suno para <strong>432Hz</strong> (Frequência do Universo) ou <strong>528Hz</strong> (Frequência do Milagre) não é misticismo, é física. O som fica mais "macio" e menos cansativo, fazendo a pessoa ouvir por horas.
           </p>
        </div>

        <Step number={1} title="A Conversão no Audacity (Grátis)">
           1. Baixe o <strong>Audacity</strong> (Software gratuito de áudio).
           <br/>2. Importe sua música do Suno.
           <br/>3. Selecione a faixa inteira (Ctrl + A).
           <br/>4. Vá em <strong>Efeitos &gt; Alterar Tom (Change Pitch)</strong>.
           <br/>5. Na caixa "Frequência (Hz)", mude de <strong>440</strong> para <strong>432</strong>.
           <br/>6. Aplique. A música ficará levemente mais grave e muito mais relaxante.
        </Step>

        <TipBox>
           <strong>Marketing:</strong> Coloque no título do vídeo: <em>"432Hz Miracle Tone"</em> ou <em>"Binaural Beats for Focus"</em>. Esses termos têm volumes de busca gigantescos e pouca concorrência de qualidade.
        </TipBox>
      </>
    )
  }
];

// --- EXPORTS ---

export const ALL_LESSONS = [...CREATION_LESSONS, ...ADVANCED_BUSINESS_LESSONS, ...BONUS_LESSONS];

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
  },
  {
    id: 'bonus',
    title: 'Bônus: Dicas de Mestre',
    icon: Star,
    lessons: BONUS_LESSONS
  }
];

export const LESSONS = ALL_LESSONS;