import { ExternalLinkIcon, RocketIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import type { MissionInfo } from "../../lib/api/missionPatches";

interface MissionBadgeProps {
    spacecraft: string;
    missionInfo: MissionInfo | null;
    crewCount: number;
}

function MissionBadge({ spacecraft, missionInfo, crewCount }: MissionBadgeProps) {
    return (
        <div className="relative overflow-hidden rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent" />

            <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
                {/* Mission Patches */}
                {missionInfo && missionInfo.patches && missionInfo.patches.length > 0 ? (
                    <div className="shrink-0 flex items-center justify-center flex-wrap gap-4 group/patch">
                        {missionInfo.patches.map((patchUrl, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -inset-3 bg-white/5 rounded-full blur-xl opacity-0 group-hover/patch:opacity-100 transition-opacity duration-500" />
                                <img
                                    src={patchUrl}
                                    alt={`${spacecraft} Mission Patch ${index + 1}`}
                                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-2xl filter hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="shrink-0 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/5 border border-white/10">
                        <RocketIcon className="w-12 h-12 text-gray-500" />
                    </div>
                )}

                {/* Mission Info */}
                <div className="flex-1 text-center sm:text-left space-y-3 min-w-0">
                    <div className="space-y-1.5">
                        <Badge
                            variant="outline"
                            className="text-xs text-gray-300 bg-white/5 border border-white/10"
                        >
                            Misja · {crewCount} {crewCount === 1 ? "członek" : crewCount < 5 ? "członków" : "członków"} załogi
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            {spacecraft}
                        </h2>
                    </div>

                    {missionInfo && (
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                            {missionInfo.description}
                        </p>
                    )}

                    {missionInfo?.wikiUrl && (
                        <a
                            href={missionInfo.wikiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200 group/link"
                        >
                            <span className="border-b border-transparent group-hover/link:border-white/40 transition-colors duration-200">
                                Dowiedz się więcej
                            </span>
                            <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MissionBadge;
