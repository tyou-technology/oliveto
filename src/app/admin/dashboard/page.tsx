
export default function DashboardPage() {

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Stats cards */}
        {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">*/}
        {/*  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">*/}
        {/*    <div className="flex items-center justify-between mb-4">*/}
        {/*      <div className="p-3 bg-[#00FF90]/10 rounded-xl">*/}
        {/*        <Scale className="w-6 h-6 text-[#00FF90]" />*/}
        {/*      </div>*/}
        {/*      <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-1 rounded-full">*/}
        {/*        +2 este mês*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*    <p className="text-3xl font-bold">12</p>*/}
        {/*    <p className="text-sm text-neutral-400 mt-1">Perícias Ativas</p>*/}
        {/*  </div>*/}

        {/*  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">*/}
        {/*    <div className="flex items-center justify-between mb-4">*/}
        {/*      <div className="p-3 bg-blue-500/10 rounded-xl">*/}
        {/*        <FolderOpen className="w-6 h-6 text-blue-400" />*/}
        {/*      </div>*/}
        {/*      <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">*/}
        {/*        Em dia*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*    <p className="text-3xl font-bold">8</p>*/}
        {/*    <p className="text-sm text-neutral-400 mt-1">*/}
        {/*      Obrigações Contábeis*/}
        {/*    </p>*/}
        {/*  </div>*/}

        {/*  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">*/}
        {/*    <div className="flex items-center justify-between mb-4">*/}
        {/*      <div className="p-3 bg-amber-500/10 rounded-xl">*/}
        {/*        <ClipboardCheck className="w-6 h-6 text-amber-400" />*/}
        {/*      </div>*/}
        {/*      <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">*/}
        {/*        1 pendente*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*    <p className="text-3xl font-bold">3</p>*/}
        {/*    <p className="text-sm text-neutral-400 mt-1">*/}
        {/*      Auditorias em Curso*/}
        {/*    </p>*/}
        {/*  </div>*/}

        {/*  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">*/}
        {/*    <div className="flex items-center justify-between mb-4">*/}
        {/*      <div className="p-3 bg-purple-500/10 rounded-xl">*/}
        {/*        <FileText className="w-6 h-6 text-purple-400" />*/}
        {/*      </div>*/}
        {/*      <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">*/}
        {/*        4 novos*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*    <p className="text-3xl font-bold">47</p>*/}
        {/*    <p className="text-sm text-neutral-400 mt-1">Documentos</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*/!* Main grid *!/*/}
        {/*<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">*/}
        {/*  /!* Processes *!/*/}
        {/*  <div className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">*/}
        {/*    <div className="flex items-center justify-between p-6 border-b border-white/10">*/}
        {/*      <h2 className="text-lg font-semibold">*/}
        {/*        Processos em Andamento*/}
        {/*      </h2>*/}
        {/*      <Link*/}
        {/*        href={ROUTES.ADMIN.DASHBOARD.PROCESSOS || "#"}*/}
        {/*        className="text-sm text-[#00FF90] hover:underline flex items-center gap-1"*/}
        {/*      >*/}
        {/*        Ver todos <ChevronRight className="w-4 h-4" />*/}
        {/*      </Link>*/}
        {/*    </div>*/}
        {/*    <div className="divide-y divide-white/5">*/}
        {/*      {activeProcesses.map((process) => (*/}
        {/*        <div*/}
        {/*          key={process.id}*/}
        {/*          className="p-6 hover:bg-white/5 transition-colors"*/}
        {/*        >*/}
        {/*          <div className="flex items-start justify-between mb-3">*/}
        {/*            <div>*/}
        {/*              <div className="flex items-center gap-2 mb-1">*/}
        {/*                <span className="text-xs text-neutral-500 font-mono">*/}
        {/*                  {process.id}*/}
        {/*                </span>*/}
        {/*                {process.status === "concluido" ? (*/}
        {/*                  <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-0.5 rounded-full flex items-center gap-1">*/}
        {/*                    <CheckCircle2 className="w-3 h-3" /> Concluído*/}
        {/*                  </span>*/}
        {/*                ) : (*/}
        {/*                  <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">*/}
        {/*                    <Clock className="w-3 h-3" /> Em andamento*/}
        {/*                  </span>*/}
        {/*                )}*/}
        {/*              </div>*/}
        {/*              <h3 className="font-medium">{process.title}</h3>*/}
        {/*            </div>*/}
        {/*            <div className="text-right">*/}
        {/*              <p className="text-xs text-neutral-500">Prazo</p>*/}
        {/*              <p className="text-sm">{process.deadline}</p>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">*/}
        {/*            <div*/}
        {/*              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${*/}
        {/*                process.status === "concluido"*/}
        {/*                  ? "bg-[#00FF90]"*/}
        {/*                  : "bg-amber-400"*/}
        {/*              }`}*/}
        {/*              style={{ width: `${process.progress}%` }}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <p className="text-xs text-neutral-500 mt-2">*/}
        {/*            {process.progress}% concluído*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  /!* Right column *!/*/}
        {/*  <div className="space-y-6">*/}
        {/*    /!* Upcoming tasks *!/*/}
        {/*    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">*/}
        {/*      <div className="flex items-center justify-between p-6 border-b border-white/10">*/}
        {/*        <h2 className="text-lg font-semibold">Próximos Prazos</h2>*/}
        {/*        <Calendar className="w-5 h-5 text-neutral-400" />*/}
        {/*      </div>*/}
        {/*      <div className="p-4 space-y-3">*/}
        {/*        {upcomingTasks.map((task, idx) => (*/}
        {/*          <div*/}
        {/*            key={idx}*/}
        {/*            className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"*/}
        {/*          >*/}
        {/*            <div className="text-center min-w-[50px]">*/}
        {/*              <p className="text-lg font-bold text-[#00FF90]">*/}
        {/*                {task.date.split(" ")[0]}*/}
        {/*              </p>*/}
        {/*              <p className="text-xs text-neutral-500">*/}
        {/*                {task.date.split(" ")[1]}*/}
        {/*              </p>*/}
        {/*            </div>*/}
        {/*            <div className="flex-1">*/}
        {/*              <p className="font-medium text-sm">{task.title}</p>*/}
        {/*              <p className="text-xs text-neutral-500">{task.time}</p>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}

        {/*    /!* Quick actions *!/*/}
        {/*    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">*/}
        {/*      <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>*/}
        {/*      <div className="grid grid-cols-2 gap-3">*/}
        {/*        <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">*/}
        {/*          <Plus className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />*/}
        {/*          <span className="text-xs text-neutral-400 group-hover:text-white">*/}
        {/*            Enviar Doc*/}
        {/*          </span>*/}
        {/*        </button>*/}
        {/*        <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">*/}
        {/*          <MessageSquare className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />*/}
        {/*          <span className="text-xs text-neutral-400 group-hover:text-white">*/}
        {/*            Nova Mensagem*/}
        {/*          </span>*/}
        {/*        </button>*/}
        {/*        <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">*/}
        {/*          <FileText className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />*/}
        {/*          <span className="text-xs text-neutral-400 group-hover:text-white">*/}
        {/*            Relatórios*/}
        {/*          </span>*/}
        {/*        </button>*/}
        {/*        <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">*/}
        {/*          <TrendingUp className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />*/}
        {/*          <span className="text-xs text-neutral-400 group-hover:text-white">*/}
        {/*            Análises*/}
        {/*          </span>*/}
        {/*        </button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*/!* Recent documents *!/*/}
        {/*<div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">*/}
        {/*  <div className="flex items-center justify-between p-6 border-b border-white/10">*/}
        {/*    <h2 className="text-lg font-semibold">Documentos Recentes</h2>*/}
        {/*    <Link*/}
        {/*      href={ROUTES.ADMIN.DASHBOARD.DOCUMENTOS || "#"}*/}
        {/*      className="text-sm text-[#00FF90] hover:underline flex items-center gap-1"*/}
        {/*    >*/}
        {/*      Ver todos <ChevronRight className="w-4 h-4" />*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*  <div className="overflow-x-auto">*/}
        {/*    <table className="w-full">*/}
        {/*      <thead>*/}
        {/*        <tr className="text-left text-sm text-neutral-500 border-b border-white/5">*/}
        {/*          <th className="px-6 py-4 font-medium">Documento</th>*/}
        {/*          <th className="px-6 py-4 font-medium">Tipo</th>*/}
        {/*          <th className="px-6 py-4 font-medium">Data</th>*/}
        {/*          <th className="px-6 py-4 font-medium">Status</th>*/}
        {/*          <th className="px-6 py-4 font-medium text-right">Ações</th>*/}
        {/*        </tr>*/}
        {/*      </thead>*/}
        {/*      <tbody className="divide-y divide-white/5">*/}
        {/*        {recentDocuments.map((doc, idx) => (*/}
        {/*          <tr*/}
        {/*            key={idx}*/}
        {/*            className="hover:bg-white/5 transition-colors"*/}
        {/*          >*/}
        {/*            <td className="px-6 py-4">*/}
        {/*              <div className="flex items-center gap-3">*/}
        {/*                <div className="p-2 bg-white/5 rounded-lg">*/}
        {/*                  <FileText className="w-5 h-5 text-neutral-400" />*/}
        {/*                </div>*/}
        {/*                <span className="font-medium">{doc.name}</span>*/}
        {/*              </div>*/}
        {/*            </td>*/}
        {/*            <td className="px-6 py-4">*/}
        {/*              <span className="text-xs bg-white/10 px-2 py-1 rounded">*/}
        {/*                {doc.type}*/}
        {/*              </span>*/}
        {/*            </td>*/}
        {/*            <td className="px-6 py-4 text-neutral-400">{doc.date}</td>*/}
        {/*            <td className="px-6 py-4">*/}
        {/*              {doc.status === "novo" ? (*/}
        {/*                <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-1 rounded-full">*/}
        {/*                  Novo*/}
        {/*                </span>*/}
        {/*              ) : (*/}
        {/*                <span className="text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded-full">*/}
        {/*                  Visualizado*/}
        {/*                </span>*/}
        {/*              )}*/}
        {/*            </td>*/}
        {/*            <td className="px-6 py-4">*/}
        {/*              <div className="flex items-center justify-end gap-2">*/}
        {/*                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">*/}
        {/*                  <Eye className="w-4 h-4 text-neutral-400" />*/}
        {/*                </button>*/}
        {/*                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">*/}
        {/*                  <Download className="w-4 h-4 text-neutral-400" />*/}
        {/*                </button>*/}
        {/*              </div>*/}
        {/*            </td>*/}
        {/*          </tr>*/}
        {/*        ))}*/}
        {/*      </tbody>*/}
        {/*    </table>*/}
        {/*  </div>*/}
        {/*</div>*/}
    </div>
  );
}
